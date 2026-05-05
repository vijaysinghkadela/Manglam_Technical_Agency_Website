'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageSquareMore, RefreshCcw, Send, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/cn'

type ChatRole = 'user' | 'assistant'

interface ChatMessage {
  role: ChatRole
  content: string
}

const STORAGE_KEY = 'mta-chatbot-state-v1'
const MAX_MESSAGES = 20

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'Hi, I am the MTA website assistant. Tell me what you need, and I will help you choose the right service, compare options, or answer questions about the live site.',
}

const QUICK_PROMPTS = [
  'Recommend the best service for my business.',
  'Compare your pricing plans for me.',
  'I need a website and AI automation.',
  'Explain your compliance and delivery process.',
]

function trimMessages(messages: ChatMessage[]) {
  return messages.slice(-MAX_MESSAGES)
}

function getPageLabel(pathname: string) {
  if (pathname === '/') return 'Home'
  if (pathname === '/services') return 'Services'
  if (pathname === '/pricing') return 'Pricing'
  if (pathname === '/contact') return 'Contact'
  if (pathname === '/blog') return 'Blog'
  if (pathname === '/portfolio') return 'Portfolio'
  if (pathname === '/research') return 'Research'
  if (pathname === '/legal') return 'Legal'
  if (pathname === '/trust-center') return 'Trust Center'
  if (pathname.startsWith('/services/')) {
    const slug = pathname.split('/')[2] ?? ''
    return `Service: ${slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}`
  }
  if (pathname.startsWith('/blog/')) return 'Blog article'
  if (pathname.startsWith('/portfolio/')) return 'Portfolio item'
  return pathname.replace(/\//g, ' • ').replace(/^ • /, '') || 'Website'
}

export function SiteChatbot() {
  const pathname = usePathname() || '/'
  const pageLabel = useMemo(() => getPageLabel(pathname), [pathname])
  const panelStyle = {
    backgroundColor: 'var(--color-card)',
    backgroundImage:
      'radial-gradient(circle at top right, rgba(var(--color-accent-rgb), 0.08), transparent 42%), linear-gradient(180deg, var(--color-card), var(--color-surface))',
  }
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [ready, setReady] = useState(false)

  const scrollAnchorRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        setReady(true)
        return
      }

      const parsed = JSON.parse(raw) as { messages?: ChatMessage[] }
      if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        setMessages(trimMessages(parsed.messages))
      }
    } catch {
      // Ignore storage corruption and fall back to the welcome message.
    } finally {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    if (!ready) return

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages,
      })
    )
  }, [messages, ready])

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, open, isSending])

  useEffect(() => {
    if (open) {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [open])

  async function sendMessage(messageText: string) {
    const trimmed = messageText.trim()
    if (!trimmed || isSending) return

    setOpen(true)
    const nextMessages = trimMessages([...messages, { role: 'user', content: trimmed }])
    setMessages(nextMessages)
    setInput('')
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          pathname,
          pageTitle: document.title,
        }),
      })

      const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null

      if (!response.ok || !data?.success || !data.message) {
        throw new Error(data?.message || 'The chatbot could not answer that request right now.')
      }

      setMessages((current) =>
        trimMessages([
          ...current,
          {
            role: 'assistant',
            content: data.message || 'I can help with that. Could you share one more detail?',
          },
        ])
      )
    } catch (error) {
      const fallback =
        error instanceof Error ? error.message : 'The assistant is temporarily unavailable.'
      toast.error(fallback)
      setMessages((current) =>
        trimMessages([
          ...current,
          {
            role: 'assistant',
            content:
              'I am having trouble reaching the assistant service at the moment. Please try again in a moment, or continue through the contact form if you want a direct quote.',
          },
        ])
      )
    } finally {
      setIsSending(false)
      window.requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }

  function resetConversation() {
    setMessages([WELCOME_MESSAGE])
    setInput('')
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage failures and keep the visible reset state.
    }
    window.requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
    toast.success('Chat reset')
  }

  function handleQuickPrompt(prompt: string) {
    void sendMessage(prompt)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full border border-border bg-card/95 px-4 py-3 text-left text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent-border)] hover:bg-[color:var(--color-accent-soft)] hover:shadow-[0_24px_70px_rgba(107,26,26,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
          )}
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
            <Bot className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-canvas bg-emerald-400" />
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Chat</span>
            <span className="font-display text-[14px] font-black leading-tight">MTA Assistant</span>
          </span>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[75] bg-black/45 backdrop-blur-[3px]"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={panelStyle}
                className="fixed bottom-4 left-4 right-4 z-[80] flex h-[min(82vh,760px)] max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[28px] border border-border bg-card/95 text-foreground shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl outline-none sm:left-auto sm:right-6 sm:bottom-6 sm:w-[440px]"
              >
                <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--color-accent-border)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] shadow-[0_14px_30px_rgba(107,26,26,0.14)]">
                        <MessageSquareMore className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <Dialog.Title className="font-display text-[18px] font-black leading-none">
                          MTA AI Assistant
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                          Live context synced · {pageLabel}
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetConversation}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-canvas/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:bg-[color:var(--color-accent-soft)] hover:text-foreground"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" />
                      Reset
                    </button>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-canvas/75 text-foreground transition-colors hover:bg-[color:var(--color-accent-soft)]"
                        aria-label="Close chat"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                <div className="border-b border-border px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted">
                    Ask about services, pricing, compliance, project fit, or what changed on the current page. I will
                    use the live site context to answer.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleQuickPrompt(prompt)}
                        className="rounded-2xl border border-border bg-canvas/75 px-3 py-3 text-left text-[12px] leading-relaxed text-foreground transition-colors hover:border-[color:var(--color-accent-border)] hover:bg-[color:var(--color-accent-soft)]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="flex flex-col gap-3" role="log" aria-live="polite" aria-relevant="additions text">
                    {messages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                      >
                        <div
                          className={cn(
                            'max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-7 whitespace-pre-wrap break-words',
                            message.role === 'user'
                              ? 'bg-[linear-gradient(135deg,rgba(var(--color-accent-rgb),0.98),rgba(var(--color-accent-rgb),0.88))] text-white shadow-[0_14px_30px_rgba(107,26,26,0.22)]'
                              : 'border border-border bg-card/90 text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.08)]'
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}

                    {isSending && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-2 rounded-[22px] border border-border bg-card/90 px-4 py-3 text-sm text-foreground">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-accent)]" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-accent)] [animation-delay:120ms]" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-accent)] [animation-delay:240ms]" />
                        </div>
                      </div>
                    )}

                    <div ref={scrollAnchorRef} />
                  </div>
                </div>

                <div className="border-t border-border p-4">
                  <form
                    aria-busy={isSending}
                    onSubmit={(event) => {
                      event.preventDefault()
                      void sendMessage(input)
                    }}
                    className="flex flex-col gap-3"
                  >
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                          event.preventDefault()
                          void sendMessage(input)
                        }
                      }}
                      rows={3}
                      placeholder="Describe your goal, service need, budget, and timeline..."
                      className="min-h-[92px] w-full resize-none rounded-[22px] border border-border bg-canvas/85 px-4 py-3 text-[14px] leading-6 text-foreground outline-none placeholder:text-muted focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent-soft)]"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        MTA knowledge base · site-aware responses
                      </p>

                      <button
                        type="submit"
                        disabled={isSending || !input.trim()}
                        className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,rgba(var(--color-accent-rgb),0.98),rgba(90,23,21,0.95))] px-4 py-2.5 font-display text-[13px] font-black text-white shadow-[0_12px_26px_rgba(107,26,26,0.18)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                        disabled={isSending}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
