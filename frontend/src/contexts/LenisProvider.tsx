'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect, useRef, useCallback } from 'react'

// Detect Safari browser (known to have issues with smooth scrolling libraries)
const isSafari = (): boolean => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium')
}

// Check if user prefers reduced motion
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if device is touch-only
const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  // Memoized RAF loop to prevent recreation
  const startRafLoop = useCallback((lenis: Lenis) => {
    const raf = (time: number) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)
  }, [])

  useEffect(() => {
    // Skip smooth scrolling on:
    // 1. Touch devices (causes jank)
    // 2. Reduced motion preference (accessibility)
    // 3. Safari (known compatibility issues with Lenis)
    if (isTouchDevice()) return
    if (prefersReducedMotion()) return
    if (isSafari()) return

    const lenis = new Lenis({
      duration:        1.1,       // slightly faster for snappier feel
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    // Start RAF loop
    startRafLoop(lenis)

    // Handle reduced motion preference changes at runtime
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // User enabled reduced motion - stop Lenis
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = null
        }
        lenis.destroy()
        lenisRef.current = null
      }
    }
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      // Clean up RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      // Clean up Lenis
      lenis.destroy()
      lenisRef.current = null
      // Clean up event listener
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [startRafLoop])

  return <>{children}</>
}
