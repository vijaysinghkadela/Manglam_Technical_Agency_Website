'use client'
import { useEffect, useState, useRef } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [show, setShow] = useState(false)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const fn = () => {
      // RAF throttling: Only schedule update if not already pending
      if (rafIdRef.current !== null) return
      rafIdRef.current = requestAnimationFrame(() => {
        setShow(window.scrollY > 500)
        rafIdRef.current = null
      })
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => {
      window.removeEventListener('scroll', fn)
      // Cleanup pending RAF on unmount
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  // Returns null until threshold. Never ever renders a text character.
  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      data-cursor="pointer"
      className="
        fixed z-50
        flex h-12 w-12 items-center justify-center
        rounded-full border border-border
        bg-card/90 backdrop-blur-md
        shadow-[0_16px_40px_rgba(0,0,0,0.24)]
        transition-all duration-300 group
        hover:-translate-y-0.5 hover:border-[color:var(--color-accent-border)] hover:bg-[color:var(--color-accent-soft)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2
        focus-visible:ring-offset-canvas
      "
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
        right: 'calc(1.5rem + env(safe-area-inset-right))' }}
    >
      <ArrowUp className="w-4 h-4 text-muted transition-colors group-hover:text-violet" />
    </button>
  )
}
