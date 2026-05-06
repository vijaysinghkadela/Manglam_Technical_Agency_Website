"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquareMore, RefreshCcw, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/cn";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface DailyUsage {
  date: string;
  count: number;
}

const STORAGE_KEY = "mta-chatbot-state-v1";
const DAILY_LIMIT_KEY = "mta-daily-limit-v1";
// Keep up to 30 messages in local history; API accepts max 20.
const MAX_HISTORY = 30;
const DAILY_MESSAGES_LIMIT = 20;

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I am the MTA website assistant. Tell me what you need, and I will help you choose the right service, compare options, or answer questions about the live site.",
};

const QUICK_PROMPTS = [
  "Recommend the best service for my business.",
  "Compare your pricing plans for me.",
  "I need a website and AI automation.",
  "Explain your compliance and delivery process.",
];

function trimMessages(messages: ChatMessage[]) {
  return messages.slice(-MAX_HISTORY);
}

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function loadDailyUsage(): DailyUsage {
  const today = getTodayString();
  try {
    const raw = window.localStorage.getItem(DAILY_LIMIT_KEY);
    if (!raw) return { date: today, count: 0 };
    const parsed = JSON.parse(raw) as DailyUsage;
    // Reset counter on a new day.
    if (parsed.date !== today) return { date: today, count: 0 };
    return parsed;
  } catch {
    return { date: today, count: 0 };
  }
}

function saveDailyUsage(usage: DailyUsage) {
  try {
    window.localStorage.setItem(DAILY_LIMIT_KEY, JSON.stringify(usage));
  } catch {
    // Ignore storage failures.
  }
}

function getPageLabel(pathname: string) {
  if (pathname === "/") return "Home";
  if (pathname === "/services") return "Services";
  if (pathname === "/pricing") return "Pricing";
  if (pathname === "/contact") return "Contact";
  if (pathname === "/blog") return "Blog";
  if (pathname === "/portfolio") return "Portfolio";
  if (pathname === "/research") return "Research";
  if (pathname === "/legal") return "Legal";
  if (pathname === "/trust-center") return "Trust Center";
  if (pathname.startsWith("/services/")) {
    const slug = pathname.split("/")[2] ?? "";
    return `Service: ${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`;
  }
  if (pathname.startsWith("/blog/")) return "Blog article";
  if (pathname.startsWith("/portfolio/")) return "Portfolio item";
  return pathname.replace(/\//g, " • ").replace(/^ • /, "") || "Website";
}

export function SiteChatbot() {
  const pathname = usePathname() || "/";
  const pageLabel = useMemo(() => getPageLabel(pathname), [pathname]);

  const panelStyle = {
    backgroundColor: "var(--color-card)",
    backgroundImage:
      "radial-gradient(circle at top right, rgba(var(--color-accent-rgb), 0.08), transparent 42%), linear-gradient(180deg, var(--color-card), var(--color-surface))",
  };

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [ready, setReady] = useState(false);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage>({
    date: getTodayString(),
    count: 0,
  });

  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const dailyRemaining = Math.max(0, DAILY_MESSAGES_LIMIT - dailyUsage.count);
  const isLimitReached = dailyUsage.count >= DAILY_MESSAGES_LIMIT;

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          setMessages(trimMessages(parsed.messages));
        }
      }
    } catch {
      // Fall back to the welcome message.
    }
    setDailyUsage(loadDailyUsage());
    setReady(true);
  }, []);

  // Persist message history.
  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
  }, [messages, ready]);

  // Scroll to bottom on new messages.
  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, isSending]);

  // Auto-focus input when panel opens.
  useEffect(() => {
    if (open) {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  async function sendMessage(messageText: string) {
    const trimmed = messageText.trim();
    if (!trimmed || isSending) return;

    if (isLimitReached) {
      toast.error(
        `Daily limit of ${DAILY_MESSAGES_LIMIT} messages reached. Try again tomorrow.`,
      );
      return;
    }

    setOpen(true);

    const nextMessages = trimMessages([
      ...messages,
      { role: "user", content: trimmed },
    ]);
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    // Track daily usage before the API call.
    const newUsage: DailyUsage = {
      date: getTodayString(),
      count: dailyUsage.count + 1,
    };
    setDailyUsage(newUsage);
    saveDailyUsage(newUsage);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // API accepts at most 20 messages; slice before sending.
          messages: nextMessages.slice(-20),
          pathname,
          pageTitle: document.title,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !data?.success || !data.message) {
        throw new Error(
          data?.message ?? "The chatbot could not answer that request right now.",
        );
      }

      setMessages((current) =>
        trimMessages([
          ...current,
          {
            role: "assistant",
            content:
              data.message ?? "I can help with that. Could you share one more detail?",
          },
        ]),
      );
    } catch (error) {
      const fallback =
        error instanceof Error
          ? error.message
          : "The assistant is temporarily unavailable.";
      toast.error(fallback);
      setMessages((current) =>
        trimMessages([
          ...current,
          {
            role: "assistant",
            content:
              "I am having trouble reaching the assistant service right now. Please try again in a moment, or use the contact form for a direct quote.",
          },
        ]),
      );
    } finally {
      setIsSending(false);
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }

  function resetConversation() {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    toast.success("Chat reset");
  }

  function handleQuickPrompt(prompt: string) {
    void sendMessage(prompt);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* ── Floating trigger ─────────────────────────────────────── */}
      {/*
       * motion.div handles all animation; Dialog.Trigger+asChild on the
       * inner button avoids any Radix/Framer Motion prop-merge conflicts.
       */}
      <motion.div
        className="fixed bottom-5 right-5 z-[70]"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.18 } }}
        whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
      >
        <Dialog.Trigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center gap-3 rounded-full border border-border bg-card/95 px-4 py-3 text-left text-foreground",
              "shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl",
              "transition-colors duration-200",
              "hover:border-[color:var(--color-accent-border)] hover:bg-[color:var(--color-accent-soft)] hover:shadow-[0_24px_70px_rgba(107,26,26,0.26)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
            )}
            aria-label={open ? "Close AI assistant" : "Open AI assistant"}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            {/* Bot icon with pulsing online indicator */}
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
              <Bot className="h-5 w-5" />
              {/* Outer pulse ring */}
              <motion.span
                animate={{ scale: [1, 2, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400"
                aria-hidden="true"
              />
              {/* Solid dot on top */}
              <span
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-400"
                aria-hidden="true"
              />
            </span>

            {/* Text label — visible on all screen sizes */}
            <span className="flex min-w-0 flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted sm:text-[10px] lg:text-[11px]">
                MTA Chat
              </span>
              <span className="font-display text-[13px] font-black leading-tight sm:text-[15px] lg:text-[17px]">
                AI Assistant
              </span>
            </span>
          </button>
        </Dialog.Trigger>
      </motion.div>

      {/* ── Chat panel ───────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[75] bg-black/50 backdrop-blur-[3px]"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.97 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                style={panelStyle}
                className={cn(
                  "fixed z-[80] flex flex-col overflow-hidden rounded-3xl border border-border bg-card/95 text-foreground shadow-[0_32px_100px_rgba(0,0,0,0.30)] backdrop-blur-xl outline-none",
                  // Mobile — above the trigger, full available width
                  "bottom-24 left-3 right-3 h-[min(80vh,640px)] max-h-[calc(100dvh-6.5rem)]",
                  // Tablet — anchor bottom-right
                  "sm:left-auto sm:right-6 sm:bottom-24 sm:w-[468px] sm:h-[min(82vh,720px)] sm:max-h-[calc(100dvh-7rem)]",
                  // Desktop — slightly wider
                  "lg:w-[510px] lg:h-[min(84vh,780px)]",
                )}
              >
                {/* ── Header ──────────────────────────────────────── */}
                <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] shadow-[0_8px_20px_rgba(107,26,26,0.14)]">
                      <MessageSquareMore className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <Dialog.Title className="font-display text-[17px] font-black leading-tight sm:text-[20px] lg:text-[22px]">
                        MTA AI Assistant
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:text-[10px] lg:text-[11px]">
                        Live context · {pageLabel}
                      </Dialog.Description>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={resetConversation}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-canvas/75 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-foreground sm:text-[10px] lg:text-[11px]"
                    >
                      <RefreshCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      Reset
                    </button>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-canvas/75 text-foreground transition-colors hover:bg-[color:var(--color-accent-soft)] sm:h-10 sm:w-10"
                        aria-label="Close chat"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                {/* ── Sub-header: description + quick prompts ──────── */}
                <div className="border-b border-border px-5 py-4">
                  <p className="text-[13px] leading-relaxed text-muted sm:text-[14px] lg:text-[16px]">
                    Ask about services, pricing, compliance, project fit, or the
                    current page. I use live site context to answer.
                  </p>

                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={isSending || isLimitReached}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="rounded-[16px] border border-border bg-canvas/75 px-3 py-2.5 text-left text-[12px] leading-relaxed text-foreground transition-colors hover:border-[color:var(--color-accent-border)] hover:bg-[color:var(--color-accent-soft)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-[13px] lg:text-[15px]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Message log ──────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                  <div
                    className="flex flex-col gap-3"
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions text"
                  >
                    {messages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={cn(
                          "flex",
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start",
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[90%] rounded-[18px] px-4 py-3 whitespace-pre-wrap break-words",
                            // Responsive text sizes
                            "text-[13px] leading-[1.65] sm:text-[15px] sm:leading-[1.7] lg:text-[17px]",
                            message.role === "user"
                              ? "bg-[linear-gradient(135deg,rgba(var(--color-accent-rgb),0.95),rgba(var(--color-accent-rgb),0.80))] text-white shadow-[0_10px_24px_rgba(107,26,26,0.22)]"
                              : "border border-border bg-card/90 text-foreground shadow-[0_4px_14px_rgba(0,0,0,0.08)]",
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}

                    {isSending && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-2 rounded-[18px] border border-border bg-card/90 px-5 py-3.5">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-accent)]" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-accent)] [animation-delay:150ms]" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-accent)] [animation-delay:300ms]" />
                        </div>
                      </div>
                    )}

                    <div ref={scrollAnchorRef} />
                  </div>
                </div>

                {/* ── Input area ───────────────────────────────────── */}
                <div className="border-t border-border px-4 py-4 sm:px-5">
                  {isLimitReached ? (
                    <div className="rounded-2xl border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] px-4 py-4 text-center">
                      <p className="text-[14px] font-semibold text-foreground sm:text-[15px]">
                        Daily limit of {DAILY_MESSAGES_LIMIT} messages reached.
                      </p>
                      <p className="mt-1.5 text-[12px] text-muted sm:text-[13px]">
                        Resets at midnight. Use the contact form for urgent
                        queries.
                      </p>
                    </div>
                  ) : (
                    <form
                      aria-busy={isSending}
                      onSubmit={(event) => {
                        event.preventDefault();
                        void sendMessage(input);
                      }}
                      className="flex flex-col gap-3"
                    >
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" &&
                            !event.shiftKey &&
                            !event.nativeEvent.isComposing
                          ) {
                            event.preventDefault();
                            void sendMessage(input);
                          }
                        }}
                        rows={3}
                        disabled={isSending}
                        placeholder="Describe your goal, service need, budget, and timeline..."
                        className="min-h-[88px] w-full resize-none rounded-[16px] border border-border bg-canvas/85 px-4 py-3 text-[14px] leading-6 text-foreground outline-none placeholder:text-muted focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent-soft)] disabled:opacity-60 sm:text-[15px] lg:text-[16px]"
                      />

                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:text-[10px] lg:text-[11px]">
                          {dailyRemaining} of {DAILY_MESSAGES_LIMIT} left today
                        </p>

                        <button
                          type="submit"
                          disabled={isSending || !input.trim()}
                          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,rgba(var(--color-accent-rgb),0.98),rgba(90,23,21,0.95))] px-4 py-2.5 font-display text-[13px] font-black text-white shadow-[0_8px_20px_rgba(107,26,26,0.22)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[14px] lg:text-[16px]"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Send
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
