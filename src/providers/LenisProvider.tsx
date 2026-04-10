'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect, useRef, useMemo } from 'react'
import { isSafari, isIOS, isTouchDevice } from '@/lib/browser-detect'

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

  // Memoize the decision to use Lenis
  const shouldUseLenis = useMemo(() => {
    if (typeof window === 'undefined') return false
    
    // Skip on touch devices — native scroll is optimized
    if (isTouchDevice()) return false
    
    // Skip on Safari/iOS — Lenis conflicts with native momentum scrolling
    // This is a known issue: https://github.com/studio-freight/lenis/issues/170
    if (isSafari() || isIOS()) return false
    
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    
    return true
  }, [])

  useEffect(() => {
    if (!shouldUseLenis) return

    const lenis = new Lenis({
      duration: 1.1, // slightly faster for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      // Infinite scrolling prevention
      infinite: false,
    })
    lenisRef.current = lenis

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Expose lenis instance globally for external control (typed in src/types/window.d.ts)
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      delete window.__lenis
    }
  }, [shouldUseLenis])

  return <>{children}</>
}
