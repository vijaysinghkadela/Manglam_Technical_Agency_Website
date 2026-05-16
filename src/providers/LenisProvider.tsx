'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect, useRef } from 'react'
import { isSafari, isIOS, isTouchDevice } from '@/lib/browser-detect'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * LenisProvider - Cross-browser optimized smooth scrolling
 *
 * Known issues addressed:
 * - Safari: Lenis conflicts with native momentum scrolling
 * - iOS: Touch scrolling + Lenis causes jank
 * - Reduced motion: Respects user preference
 * - Touch devices: Native scrolling is already optimized
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Determine if we should use Lenis
    const shouldUseLenis = (() => {
      if (typeof window === 'undefined') return false

      // Skip on touch devices — native scroll is optimized
      if (isTouchDevice()) return false

      // Skip on Safari/iOS — Lenis conflicts with native momentum scrolling
      if (isSafari() || isIOS()) return false

      // Skip if user prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

      return true
    })()

    if (!shouldUseLenis) return

    if (window.__lenis) {
      window.__lenis.destroy()
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
      syncTouch: false,
    })

    lenisRef.current = lenis

    let rafId: number
    let isActive = true

    const raf = (time: number) => {
      if (!isActive) return
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    window.__lenis = lenis

    // Handle visibility change - pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false
      } else {
        isActive = true
        rafId = requestAnimationFrame(raf)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isActive = false
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      delete window.__lenis
    }
  }, [])

  return <>{children}</>
}
