"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, RefreshCcw, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/cn";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

interface DailyUsage {
  date: string;
  count: number;
}

function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const STORAGE_KEY = "mta-chatbot-state-v2";
const DAILY_LIMIT_KEY = "mta-daily-limit-v2";
const MAX_HISTORY = 30;
const DAILY_MESSAGES_LIMIT = 50;
const API_CONTEXT_WINDOW = 15;

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm MTA's website assistant — built on the live data from every service, project, and pricing page on this site.\n\nTell me **what you're trying to build** or **what problem you're solving**, and I'll point you to the right MTA service, a real **price range**, a **timeline**, and the next step. Try a prompt below or just type your question.",
};

const QUICK_PROMPTS = [
  "I want a website — where do I start?",
  "Compare web development vs AI automation.",
  "Show me your most relevant projects.",
  "What's your delivery process and timeline?",
];

// ── Inline markdown renderer ──────────────────────────────────────────────────

function parseInline(text: string, keyBase = "k"): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*\n]+?\*\*|\*[^*\n]+?\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const raw = match[0];
    if (raw.startsWith("**")) {
      nodes.push(
        <strong key={`${keyBase}-b${match.index}`} className="font-semibold text-foreground">
          {raw.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={`${keyBase}-i${match.index}`}>{raw.slice(1, -1)}</em>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function MessageContent({ content, id }: { content: string; id: string }) {
  const blocks: ReactNode[] = [];
  const lines = content.split("\n");
  let listItems: string[] = [];
  let textLines: string[] = [];
  let bk = 0;

  const flushText = () => {
    if (!textLines.length) return;
    const joined = textLines.join(" ");
    blocks.push(
      <p key={`${id}-p${bk++}`} className={blocks.length > 0 ? "mt-2" : undefined}>
        {parseInline(joined, `${id}-p${bk}`)}
      </p>,
    );
    textLines = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    const snapshot = [...listItems];
    const keyIndex = bk++;
    blocks.push(
      <ul key={`${id}-ul${keyIndex}`} className={cn("space-y-1", blocks.length > 0 && "mt-2")}>
        {snapshot.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B1A1A]/60" />
            <span>{parseInline(item, `${id}-li${keyIndex}-${i}`)}</span>
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushList();
      flushText();
      continue;
    }
    const listMatch = /^[-•*]\s+(.+)/.exec(line) ?? /^\d+[.)]\s+(.+)/.exec(line);
    if (listMatch) {
      flushText();
      listItems.push(listMatch[1]);
      continue;
    }
    flushList();
    textLines.push(line);
  }
  flushList();
  flushText();

  return <>{blocks}</>;
}

// ── MTA avatar for assistant messages ────────────────────────────────────────

function MTAAvatar() {
  return (
    <span
      aria-hidden
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)]"
    >
      <span
        className="font-display text-[11px] font-black leading-none"
        style={{ color: "#6B1A1A" }}
      >
        M
      </span>
    </span>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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
  if (pathname === "/services") return "All Services";
  if (pathname === "/pricing") return "Pricing";
  if (pathname === "/contact") return "Contact";
  if (pathname === "/blog") return "Blog";
  if (pathname === "/portfolio") return "Portfolio";
  if (pathname === "/research") return "Research";
  if (pathname === "/legal") return "Legal";
  if (pathname === "/trust-center") return "Trust Center";
  if (pathname.startsWith("/services/")) {
    const slug = pathname.split("/")[2] ?? "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  if (pathname.startsWith("/blog/")) return "Blog article";
  if (pathname.startsWith("/portfolio/")) return "Portfolio item";
  return pathname.replace(/\//g, " · ").replace(/^ · /, "") || "Website";
}

// ── Main component ────────────────────────────────────────────────────────────

export function SiteChatbot() {
  const pathname = usePathname() || "/";
  const pageLabel = useMemo(() => getPageLabel(pathname), [pathname]);

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
  const limitPercent = Math.min(100, (dailyUsage.count / DAILY_MESSAGES_LIMIT) * 100);

  // Quick prompts collapse after first user message.
  const hasUserMessages = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages],
  );

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          const loaded = parsed.messages.map((m, i) => ({
            ...m,
            id: m.id ?? `loaded-${i}`,
          }));
          setMessages(trimMessages(loaded));
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
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Auto-grow textarea.
  useEffect(() => {
    const ta = inputRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

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
      { id: genId(), role: "user", content: trimmed },
    ]);
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

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
          messages: nextMessages
            .slice(-API_CONTEXT_WINDOW)
            .map(({ role, content }) => ({ role, content })),
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
          data?.message ?? "The assistant could not answer that right now.",
        );
      }

      const replyText = data.message;
      setMessages((current) =>
        trimMessages([
          ...current,
          { id: genId(), role: "assistant", content: replyText },
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
            id: genId(),
            role: "assistant",
            content:
              "I'm having trouble reaching the service right now. Please try again in a moment, or use the **contact form** for a direct quote.",
          },
        ]),
      );
    } finally {
      setIsSending(false);
      window.requestAnimationFrame(() => inputRef.current?.focus());
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
    window.requestAnimationFrame(() => inputRef.current?.focus());
    toast.success("Conversation reset");
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* ── Floating trigger ─────────────────────────────────────── */}
      <motion.div
        className="fixed bottom-5 right-5 z-[70]"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.18 } }}
        whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
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
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
              <Bot className="h-5 w-5" />
              <motion.span
                animate={{ scale: [1, 2, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400"
                aria-hidden="true"
              />
              <span
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-400"
                aria-hidden="true"
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted sm:text-[10px]">
                MTA Chat
              </span>
              <span className="font-display text-[13px] font-black leading-tight sm:text-[15px]">
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
                className="fixed inset-0 z-[75] bg-black/40 backdrop-blur-[2px]"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundColor: "var(--color-card)",
                  backgroundImage:
                    "radial-gradient(circle at top right, rgba(107,26,26,0.07), transparent 42%), linear-gradient(180deg, var(--color-card), var(--color-surface))",
                }}
                className={cn(
                  "fixed z-[80] flex flex-col overflow-hidden rounded-3xl border border-border text-foreground shadow-[0_32px_100px_rgba(0,0,0,0.30)] backdrop-blur-xl outline-none",
                  "bottom-24 left-3 right-3 h-[min(80vh,640px)] max-h-[calc(100dvh-6.5rem)]",
                  "sm:left-auto sm:right-6 sm:bottom-24 sm:w-[468px] sm:h-[min(82vh,720px)] sm:max-h-[calc(100dvh-7rem)]",
                  "lg:w-[510px] lg:h-[min(84vh,780px)]",
                )}
              >
                {/* ── Header ──────────────────────────────────────── */}
                <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5 sm:py-3.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] shadow-[0_4px_12px_rgba(107,26,26,0.14)]">
                      <Bot className="h-4 w-4 text-[#6B1A1A]" />
                    </span>
                    <div className="min-w-0">
                      <Dialog.Title className="font-display text-[15px] font-black leading-tight sm:text-[17px] lg:text-[19px]">
                        MTA AI Assistant
                      </Dialog.Title>
                      <Dialog.Description className="mt-0.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        <span className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:text-[10px]">
                          Live context · {pageLabel}
                        </span>
                      </Dialog.Description>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={resetConversation}
                      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-canvas/75 px-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-foreground sm:h-9 sm:px-3 sm:text-[10px]"
                      aria-label="Reset conversation"
                    >
                      <RefreshCcw className="h-3 w-3" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-canvas/75 text-muted transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-foreground sm:h-9 sm:w-9"
                        aria-label="Close chat"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                {/* ── Quick prompts — collapse after first user message ── */}
                <AnimatePresence initial={false}>
                  {!hasUserMessages && (
                    <motion.div
                      key="quick-prompts"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-b border-border"
                    >
                      <div className="px-4 py-3 sm:px-5 sm:py-3.5">
                        <p className="text-[12px] leading-relaxed text-muted sm:text-[13px]">
                          Ask about services, pricing, compliance, or project fit — I use live site context to answer.
                        </p>
                        <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
                          {QUICK_PROMPTS.map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              disabled={isSending || isLimitReached}
                              onClick={() => void sendMessage(prompt)}
                              className="rounded-xl border border-border bg-canvas/75 px-2.5 py-2 text-left text-[11px] leading-snug text-foreground transition-colors hover:border-[color:var(--color-accent-border)] hover:bg-[color:var(--color-accent-soft)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:text-[12px]"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Message log ──────────────────────────────────── */}
                {/* min-h-0 is REQUIRED — flex children default to min-height:auto,
                    which lets content push past the parent and breaks overflow-y-auto. */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 py-4 sm:px-5"
                     style={{ WebkitOverflowScrolling: "touch" }}>
                  <div
                    className="flex flex-col gap-3"
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions text"
                  >
                    <AnimatePresence initial={false}>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className={cn(
                            "flex gap-2",
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start items-start",
                          )}
                        >
                          {message.role === "assistant" && <MTAAvatar />}
                          <div
                            className={cn(
                              "max-w-[85%] rounded-[16px] px-3.5 py-2.5",
                              "text-[13px] leading-[1.6] sm:text-[14px] sm:leading-[1.65] lg:text-[15px]",
                              message.role === "user"
                                ? "rounded-br-sm shadow-[0_8px_20px_rgba(107,26,26,0.22)]"
                                : "rounded-bl-sm border border-border shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
                            )}
                            style={
                              message.role === "user"
                                ? {
                                    background:
                                      "linear-gradient(135deg,rgba(107,26,26,0.95),rgba(80,18,18,0.88))",
                                    color: "#ffffff",
                                    backgroundColor: "rgba(107,26,26,0.92)",
                                  }
                                : {
                                    backgroundColor: "var(--color-card)",
                                    color: "var(--color-foreground)",
                                  }
                            }
                          >
                            {message.role === "assistant" ? (
                              <MessageContent
                                content={message.content}
                                id={message.id}
                              />
                            ) : (
                              <span className="whitespace-pre-wrap break-words">
                                {message.content}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* ── Typing indicator ─────────────────────────── */}
                    <AnimatePresence>
                      {isSending && (
                        <motion.div
                          key="typing"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-start gap-2"
                        >
                          <MTAAvatar />
                          <div className="flex items-center gap-1.5 rounded-[16px] rounded-bl-sm border border-border bg-card/90 px-3.5 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="h-2 w-2 rounded-full bg-[#6B1A1A]"
                                animate={{
                                  y: [0, -4, 0],
                                  opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                  duration: 0.85,
                                  repeat: Infinity,
                                  delay: i * 0.17,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={scrollAnchorRef} />
                  </div>
                </div>

                {/* ── Input area ───────────────────────────────────── */}
                <div className="border-t border-border px-3.5 py-3 sm:px-5 sm:py-3.5">
                  {isLimitReached ? (
                    <div className="rounded-2xl border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] px-4 py-3.5 text-center">
                      <p className="text-[13px] font-semibold text-foreground sm:text-[14px]">
                        Daily limit of {DAILY_MESSAGES_LIMIT} messages reached.
                      </p>
                      <p className="mt-1 text-[11px] text-muted sm:text-[12px]">
                        Resets at midnight ·{" "}
                        <a
                          href="/contact"
                          className="underline underline-offset-2 hover:text-foreground"
                        >
                          Contact us directly
                        </a>{" "}
                        for urgent queries.
                      </p>
                    </div>
                  ) : (
                    <form
                      aria-busy={isSending}
                      onSubmit={(e) => {
                        e.preventDefault();
                        void sendMessage(input);
                      }}
                      className="flex flex-col gap-1.5"
                    >
                      {/* Textarea + send button */}
                      <div className="relative">
                        <textarea
                          ref={inputRef}
                          rows={2}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              !e.shiftKey &&
                              !e.nativeEvent.isComposing
                            ) {
                              e.preventDefault();
                              void sendMessage(input);
                            }
                          }}
                          disabled={isSending}
                          placeholder="Describe your goal, service, budget, and timeline…"
                          className="mta-chat-input w-full resize-none rounded-2xl border border-border px-3.5 py-2.5 pr-12 text-[13px] leading-[1.5] outline-none focus:ring-1 disabled:opacity-60 sm:px-4 sm:text-[14px] lg:text-[15px]"
                          style={{
                            minHeight: "56px",
                            maxHeight: "160px",
                            color: "var(--color-foreground)",
                            backgroundColor: "var(--color-card)",
                            borderColor: "var(--color-border)",
                            caretColor: "#6B1A1A",
                          }}
                        />
                        <button
                          type="submit"
                          disabled={isSending || !input.trim()}
                          aria-label="Send message"
                          className="absolute bottom-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#6B1A1A] text-white shadow-[0_4px_14px_rgba(107,26,26,0.35)] transition-all hover:bg-[#4f1111] disabled:cursor-not-allowed disabled:opacity-40 sm:bottom-2 sm:right-2 sm:h-9 sm:w-9 sm:rounded-xl"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Compact meta row: progress + hint together */}
                      <div className="flex items-center justify-between gap-3 px-1">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <div className="h-1 max-w-[120px] flex-1 overflow-hidden rounded-full bg-border">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  limitPercent > 75 ? "#ef4444" : "#6B1A1A",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${limitPercent}%` }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                          </div>
                          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:text-[10px]">
                            {dailyRemaining}/{DAILY_MESSAGES_LIMIT} left
                          </span>
                        </div>
                        <span className="shrink-0 font-mono text-[9px] tracking-[0.08em] text-muted/60 sm:text-[10px]">
                          ↵ Send · ⇧↵ Newline
                        </span>
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
