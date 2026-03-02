'use client'
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      data-cursor="pointer"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center
                 border border-border bg-canvas hover:border-violet hover:bg-violet/10
                 transition-all duration-300 group"
    >
      <ArrowUp className="w-4 h-4 text-muted group-hover:text-violet transition-colors" />
    </button>
  )
}
