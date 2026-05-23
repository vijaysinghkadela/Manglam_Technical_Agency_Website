"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  RefreshCcw,
  Send,
  X,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/cn";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  failed?: boolean;
}

interface DailyUsage {
  date: string;
  count: number;
}

function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const STORAGE_KEY = "mta-chatbot-state-v3";
const DAILY_LIMIT_KEY = "mta-daily-limit-v4";
const MAX_HISTORY = 30;
const DAILY_MESSAGES_LIMIT = 20;
const API_CONTEXT_WINDOW = 15;
const COOKIE_MAX_AGE = 86_400; // 24 hours

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

function getFollowUpPrompts(lastMessage: string, pathname: string): string[] {
  const lower = lastMessage.toLowerCase();
  const prompts: string[] = [];

  if (/price|cost|₹|rs\.? ?\d|\d[\d,]*k|\d[\d,]*lakh/i.test(lower)) {
    prompts.push("What does that include?");
    prompts.push("Can I get a custom quote?");
  }

  if (/web development|ecommerce|ai automation|cybersecurity|social media|saas/i.test(lower)) {
    prompts.push("What's the typical timeline?");
    prompts.push("I want to discuss my requirements.");
  }

  if (/timeline|delivery|weeks?|months?|start/i.test(lower)) {
    prompts.push("How do I get started?");
    prompts.push("What do you need from me to begin?");
  }

  if (/project|client|example|portfolio|case study/i.test(lower)) {
    prompts.push("Show me more examples.");
    prompts.push("I have a similar project.");
  }

  if (/contact|form|whatsapp|quote/i.test(lower)) {
    prompts.push("Take me to the contact form.");
    prompts.push("What info do you need from me?");
  }

  if (/agreement|nda|dpa|legal|privacy|compliance/i.test(lower)) {
    prompts.push("Which agreement do I need?");
  }

  if (pathname === "/pricing" && prompts.length < 2) {
    prompts.push("Which bundle saves the most?");
  }

  if (prompts.length === 0) {
    prompts.push("What's the next step?");
    prompts.push("Tell me about your process.");
  }

  return prompts.slice(0, 3);
}

const BRAND = "var(--color-violet)";

function parseInline(text: string, keyBase = "k"): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*\n]+?\*\*|\*[^*\n]+?\*|`[^`\n]+?`|https?:\/\/[^\s<]+)/g;
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
    } else if (raw.startsWith("`")) {
      nodes.push(
        <code key={`${keyBase}-c${match.index}`} className="rounded bg-accent-soft px-1 py-0.5 font-mono text-[12px] text-accent sm:text-[13px]">
          {raw.slice(1, -1)}
        </code>,
      );
    } else if (raw.startsWith("http://") || raw.startsWith("https://")) {
      nodes.push(
        <a key={`${keyBase}-l${match.index}`} href={raw} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2 hover:text-accent">
          {raw}
        </a>,
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
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeBlockLang = "";

  const flushText = () => {
    if (!textLines.length) return;
    const joined = textLines.join(" ");
    blocks.push(
      <p key={`${id}-p${bk++}`} className={blocks.length > 0 ? "mt-2.5" : undefined}>
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
      <ul key={`${id}-ul${keyIndex}`} className={cn("space-y-1.5", blocks.length > 0 && "mt-2.5")}>
        {snapshot.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet/60" />
            <span>{parseInline(item, `${id}-li${keyIndex}-${i}`)}</span>
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  const flushCodeBlock = () => {
    if (!codeBlockLines.length) return;
    const code = codeBlockLines.join("\n");
    blocks.push(
      <pre
        key={`${id}-pre${bk++}`}
        className={cn(
          "overflow-x-auto rounded-xl border border-border bg-canvas/80 p-3.5 font-mono text-[12px] leading-[1.6] sm:p-4 sm:text-[13px]",
          blocks.length > 0 && "mt-2.5",
        )}
      >
        <code>{codeBlockLang ? `# ${codeBlockLang}\n` : ""}{code}</code>
      </pre>,
    );
    codeBlockLines = [];
    codeBlockLang = "";
  };

  for (const line of lines) {
    const codeBlockMarker = /^```(\w*)/.exec(line.trim());
    if (codeBlockMarker) {
      if (inCodeBlock) {
        flushList();
        flushText();
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushList();
        flushText();
        inCodeBlock = true;
        codeBlockLang = codeBlockMarker[1];
        codeBlockLines = [];
      }
      continue;
    }
    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }
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
  if (inCodeBlock) flushCodeBlock();

  return <>{blocks}</>;
}

function MTAAvatar() {
  return (
    <span
      aria-hidden
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-soft"
    >
      <span className="font-display text-[11px] font-black leading-none" style={{ color: BRAND }}>
        M
      </span>
    </span>
  );
}

function trimMessages(messages: ChatMessage[]) {
  return messages.slice(-MAX_HISTORY);
}

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function loadDailyUsage(): DailyUsage {
  const today = getTodayString();
  try {
    const raw = getCookie(DAILY_LIMIT_KEY);
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
    setCookie(DAILY_LIMIT_KEY, JSON.stringify(usage), COOKIE_MAX_AGE);
  } catch { /* noop */ }
}

function getPageLabel(pathname: string) {
  if (pathname === "/") return "Home";
  if (pathname === "/services") return "All Services";
  if (pathname === "/pricing") return "Pricing";
  if (pathname === "/contact") return "Contact";
  if (pathname === "/blog") return "Blog";
  if (pathname === "/portfolio") return "Portfolio";
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

export function SiteChatbot() {
  const pathname = usePathname() || "/";
  const pageLabel = useMemo(() => getPageLabel(pathname), [pathname]);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          return trimMessages(parsed.messages);
        }
      }
    } catch { /* fall back */ }
    return [WELCOME_MESSAGE];
  });
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage>(() => loadDailyUsage());
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const accumulatedRef = useRef("");

  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const dailyRemaining = Math.max(0, DAILY_MESSAGES_LIMIT - dailyUsage.count);
  const isLimitReached = dailyUsage.count >= DAILY_MESSAGES_LIMIT;
  const limitPercent = Math.min(100, (dailyUsage.count / DAILY_MESSAGES_LIMIT) * 100);

  const hasUserMessages = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages],
  );

  const followUpPrompts = useMemo(() => {
    if (!hasUserMessages) return [];
    if (isSending) return [];
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.role !== "assistant" || lastMsg.failed) return [];
    if (!lastMsg.content.trim()) return [];
    return getFollowUpPrompts(lastMsg.content, pathname);
  }, [messages, pathname, hasUserMessages, isSending]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
  }, [messages]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, isSending]);

  useEffect(() => {
    if (open) {
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const ta = inputRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  async function sendMessage(messageText: string, retryId?: string) {
    const trimmed = messageText.trim();
    if (!trimmed || isSending) return;

    if (isLimitReached) {
      toast.error(`Daily limit of ${DAILY_MESSAGES_LIMIT} messages reached. Try again tomorrow.`);
      return;
    }

    setOpen(true);
    setIsSending(true);

    let nextMessages: ChatMessage[];

    if (retryId) {
      // Remove the failed assistant message and resend the last user message
      const filtered = messages.filter((m) => m.id !== retryId);
      nextMessages = trimMessages(filtered);
    } else {
      nextMessages = trimMessages([
        ...messages,
        { id: genId(), role: "user", content: trimmed },
      ]);
    }
    setMessages(nextMessages);
    setInput("");

    const newUsage: DailyUsage = {
      date: getTodayString(),
      count: dailyUsage.count + 1,
    };
    setDailyUsage(newUsage);
    saveDailyUsage(newUsage);

    const replyId = genId();
    setStreamingId(replyId);

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

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream")) {
        // ── Streaming mode ──
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        accumulatedRef.current = "";

        setMessages((current) =>
          trimMessages([...current, { id: replyId, role: "assistant", content: "" }]),
        );

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulatedRef.current += decoder.decode(value, { stream: true });
          setMessages((current) =>
            current.map((m) =>
              m.id === replyId ? { ...m, content: accumulatedRef.current } : m,
            ),
          );
        }

        if (!accumulatedRef.current.trim()) {
          throw new Error("Empty response from assistant");
        }
      } else {
        // ── JSON mode (local fallback or error) ──
        const data = (await response.json().catch(() => null)) as {
          success?: boolean;
          message?: string;
        } | null;

        if (!response.ok || !data?.success || !data.message) {
          throw new Error(data?.message ?? "The assistant could not answer that right now.");
        }

        setMessages((current) =>
          trimMessages([
            ...current,
            { id: replyId, role: "assistant", content: data.message ?? "" },
          ]),
        );
      }
    } catch (error) {
      const fallbackMsg =
        error instanceof Error
          ? error.message
          : "The assistant is temporarily unavailable.";

      toast.error(fallbackMsg);

      // Mark the streaming message as failed if it exists
      setMessages((current) => {
        const hasStreamMsg = current.some((m) => m.id === replyId);
        if (hasStreamMsg) {
          return current.map((m) =>
            m.id === replyId
              ? { ...m, content: m.content || "Response interrupted.", failed: true }
              : m,
          );
        }
        return trimMessages([
          ...current,
          { id: replyId, role: "assistant", content: "I'm having trouble reaching the service right now. Please try again in a moment, or use the **contact form** for a direct quote.", failed: true },
        ]);
      });
    } finally {
      setIsSending(false);
      setStreamingId(null);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function retryLast() {
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant" && m.failed);
    if (!lastAssistant) return;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    void sendMessage(lastUser.content, lastAssistant.id);
  }

  function resetConversation() {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch { /* noop */ }
    window.requestAnimationFrame(() => inputRef.current?.focus());
    toast.success("Conversation reset");
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* ── Floating trigger ─────────────────────────────── */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-accent-border bg-card/95 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
        whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
        aria-label="Open AI assistant"
      >
        <span className="relative flex items-center justify-center">
          <Bot className="h-6 w-6 text-accent sm:h-7 sm:w-7" />
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400"
            aria-hidden="true"
          />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" aria-hidden="true" />
        </span>
      </motion.button>

      {/* ── Chat panel ───────────────────────────────────── */}
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
                    "radial-gradient(circle at top right, rgba(var(--color-accent-rgb),0.07), transparent 42%), linear-gradient(180deg, var(--color-card), var(--color-surface))" }}
                className={cn(
                  "fixed z-[80] flex flex-col overflow-hidden rounded-3xl border border-border text-foreground shadow-[0_32px_100px_rgba(0,0,0,0.30)] backdrop-blur-xl outline-none",
                  "bottom-24 left-3 right-3 h-[min(80vh,640px)] max-h-[calc(100dvh-6.5rem)]",
                  "sm:left-auto sm:right-6 sm:bottom-24 sm:w-[468px] sm:h-[min(82vh,720px)] sm:max-h-[calc(100dvh-7rem)]",
                  "lg:w-[510px] lg:h-[min(84vh,780px)]",
                )}
              >
                {/* ── Header ──────────────────────────────────── */}
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-6 sm:py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-border bg-accent-soft shadow-[0_4px_12px_rgba(var(--color-accent-rgb),0.14)]">
                      <Sparkles className="h-4.5 w-4.5 text-accent sm:h-5 sm:w-5" />
                    </span>
                    <div className="min-w-0">
                      <Dialog.Title className="font-display text-[15px] font-black leading-tight sm:text-[17px]">
                        MTA AI Assistant
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">
                          {pageLabel}
                        </span>
                      </Dialog.Description>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={resetConversation}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-canvas/75 px-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:bg-accent-soft hover:text-foreground sm:px-3.5 sm:text-[10px]"
                      aria-label="Reset conversation"
                    >
                      <RefreshCcw className="h-3 w-3" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-canvas/75 text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
                        aria-label="Close chat"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                {/* ── Quick prompts ──────────────────────────── */}
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
                      <div className="px-4 py-4 sm:px-6 sm:py-4">
                        <p className="text-[12px] leading-relaxed text-muted sm:text-[13px]">
                          Ask about services, pricing, compliance, or project fit — I use live site context to answer.
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-2.5">
                          {QUICK_PROMPTS.map((prompt) => (
                            <motion.button
                              key={prompt}
                              type="button"
                              disabled={isSending || isLimitReached}
                              onClick={() => void sendMessage(prompt)}
                              whileHover={{ x: 2 }}
                              className="group flex items-center gap-2 rounded-xl border border-border bg-canvas/75 px-3 py-2.5 text-left text-[11px] leading-snug text-foreground transition-colors hover:border-accent-border hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50 sm:px-3.5 sm:text-[12px]"
                            >
                              <span className="flex-1">{prompt}</span>
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-accent" />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Message log ────────────────────────────── */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 scrollbar-thin"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <div
                    className="flex flex-col gap-3.5"
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
                            message.role === "user" ? "justify-end" : "justify-start items-start",
                          )}
                        >
                          {message.role === "assistant" && <MTAAvatar />}
                          <div
                            className={cn(
                              "max-w-[85%] rounded-[18px]",
                              message.role === "user" ? "px-4 py-2.5" : "px-4 py-3",
                              "text-[13px] leading-[1.65] sm:text-[14px] sm:leading-[1.7] lg:text-[15px]",
                              message.role === "user"
                                ? "rounded-br-sm shadow-[0_8px_20px_rgba(var(--color-accent-rgb),0.22)]"
                                : "rounded-bl-sm border border-border shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
                              message.failed && "border-red-500/40",
                            )}
                            style={
                              message.role === "user"
                                ? {
                                    background:
                                      "linear-gradient(135deg,rgba(var(--color-accent-rgb),0.92),rgba(80,18,18,0.85))",
                                    color: "#ffffff",
                                  }
                                : {
                                    backgroundColor: "var(--color-card)",
                                    color: "var(--color-foreground)",
                                  }
                            }
                          >
                            {message.role === "assistant" ? (
                              <>
                                <MessageContent content={message.content} id={message.id} />
                                {message.id === streamingId && isSending && (
                                  <motion.span
                                    animate={{ opacity: [1, 0.2] }}
                                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                    className="inline-block h-[1em] w-[2px] align-middle"
                                    style={{ backgroundColor: BRAND }}
                                  />
                                )}
                              </>
                            ) : (
                              <span className="whitespace-pre-wrap break-words">
                                {message.content}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* ── Typing indicator ─────────────────────── */}
                    <AnimatePresence>
                      {isSending && streamingId && (() => {
                        const hasContent = messages.some(
                          (m) => m.id === streamingId && m.content.length > 0,
                        );
                        if (hasContent) return null; // hide dots once streaming started
                        return (
                          <motion.div
                            key="typing"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.18 }}
                            className="flex items-start gap-2"
                          >
                            <MTAAvatar />
                            <div className="flex items-center gap-1.5 rounded-[18px] rounded-bl-sm border border-border bg-card/90 px-4 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                              {[0, 1, 2].map((i) => (
                                <motion.span
                                  key={i}
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{ backgroundColor: BRAND }}
                                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.17, ease: "easeInOut" }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>

                    {/* ── Retry bar ──────────────────────────────── */}
                    <AnimatePresence>
                      {messages.some((m) => m.role === "assistant" && m.failed) && !isSending && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="flex justify-center"
                        >
                          <button
                            type="button"
                            onClick={retryLast}
                            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-400 transition-colors hover:bg-red-500/20 sm:text-[12px]"
                          >
                            <AlertCircle className="h-3 w-3" />
                            Retry failed response
                            <RefreshCcw className="h-3 w-3" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={scrollAnchorRef} />
                    {/* ── Follow-up suggestions ────────────────── */}
                    <AnimatePresence>
                      {followUpPrompts.length > 0 && (
                        <motion.div
                          key="follow-ups"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-wrap gap-2"
                        >
                          {followUpPrompts.map((prompt) => (
                            <motion.button
                              key={prompt}
                              type="button"
                              disabled={isSending || isLimitReached}
                              onClick={() => void sendMessage(prompt)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="rounded-full border border-border bg-canvas/60 px-3.5 py-2 text-[11px] text-muted transition-colors hover:border-accent-border hover:bg-accent-soft hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-[12px]"
                            >
                              {prompt}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* ── Input area ───────────────────────────────── */}
                <div className="border-t border-border px-4 py-3.5 sm:px-6 sm:py-4">
                  {isLimitReached ? (
                    <div className="rounded-2xl border border-accent-border bg-accent-soft px-5 py-4 text-center">
                      <p className="text-[13px] font-semibold text-foreground sm:text-[14px]">
                        Daily limit of {DAILY_MESSAGES_LIMIT} messages reached.
                      </p>
                      <p className="mt-1.5 text-[11px] text-muted sm:text-[12px]">
                        Resets at midnight ·{" "}
                        <a href="/contact" className="underline underline-offset-2 hover:text-foreground">
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
                      className="flex flex-col gap-2"
                    >
                      <div className="relative">
                        <textarea
                          ref={inputRef}
                          rows={2}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                              e.preventDefault();
                              void sendMessage(input);
                            }
                          }}
                          disabled={isSending}
                          placeholder="Describe your goal, service, budget, and timeline…"
                          aria-label="Type your message"
                          className="mta-chat-input w-full resize-none rounded-2xl border px-4 py-3 pr-13 text-[13px] leading-[1.55] outline-none transition-shadow focus:ring-2 focus:ring-accent/30 disabled:opacity-60 sm:text-[14px] lg:text-[15px]"
                          style={{
                            minHeight: "56px",
                            maxHeight: "160px",
                            color: "var(--color-foreground)",
                            backgroundColor: "var(--color-card)",
                            borderColor: "var(--color-border)",
                            caretColor: BRAND }}
                        />
                        <motion.button
                          type="submit"
                          disabled={isSending || !input.trim()}
                          aria-label="Send message"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.92 }}
                          className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-[0_4px_14px_rgba(var(--color-accent-rgb),0.35)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                          style={{ backgroundColor: BRAND }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.button>
                      </div>

                      <div className="flex items-center justify-between gap-3 px-0.5">
                        <div className="flex min-w-0 flex-1 items-center gap-2.5">
                          <div className="h-1 max-w-[120px] flex-1 overflow-hidden rounded-full bg-border">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: limitPercent > 75 ? "#ef4444" : BRAND }}
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
