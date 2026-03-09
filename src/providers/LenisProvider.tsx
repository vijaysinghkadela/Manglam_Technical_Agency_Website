'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect, useRef } from 'react'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Skip smooth scrolling on touch devices or when user prefers reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration:        1.1,       // slightly faster for snappier feel
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    let id: number
    const raf = (time: number) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
