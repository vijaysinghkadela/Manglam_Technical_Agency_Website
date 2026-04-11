'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Variant = 'default' | 'pointer' | 'text' | 'link'

// Static size configuration - hoisted outside component to avoid re-creation
const SIZES: Record<Variant, { w: number; h: number }> = {
  default: { w: 32, h: 32 },
  pointer: { w: 18, h: 18 },
  text: { w: 68, h: 24 },
  link: { w: 48, h: 48 },
}

// Spring configuration - less aggressive
const SPRING_CONFIG = { stiffness: 180, damping: 22, mass: 0.4 }

export function MagneticCursor() {
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState<Variant>('default')

  // Refs for performance - avoid state updates in hot paths
  const variantRef = useRef<Variant>('default')
  const visibleRef = useRef(false)
  const lastVariantCheck = useRef(0)
  const rafId = useRef<number | null>(null)
  const mousePos = useRef({ x: -300, y: -300 })

  // Motion values
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, SPRING_CONFIG)
  const ry = useSpring(my, SPRING_CONFIG)

  // Stable RAF-throttled mouse handler
  const move = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY }
    mx.set(e.clientX)
    my.set(e.clientY)

    // Show cursor on first movement
    if (!visibleRef.current) {
      visibleRef.current = true
      setVisible(true)
    }

    // Throttle variant detection to every 100ms (less aggressive)
    const now = performance.now()
    if (now - lastVariantCheck.current > 100) {
      lastVariantCheck.current = now
      try {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
        const hit = el?.closest('[data-cursor]')?.getAttribute('data-cursor') as Variant | null
        const next = hit ?? 'default'
        if (next !== variantRef.current) {
          variantRef.current = next
          setVariant(next)
        }
      } catch {
        // Silent fail - elementFromPoint can throw in some edge cases
      }
    }
  }, [mx, my])

  // RAF-throttled handler wrapper
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        move(e)
        rafId.current = null
      })
    }
  }, [move])

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return

    // Delay ready state to avoid hydration flash and initial layout shifts
    const readyTimeout = setTimeout(() => setReady(true), 100)

    const hide = () => {
      visibleRef.current = false
      setVisible(false)
    }

    const show = () => {
      visibleRef.current = true
      setVisible(true)
    }

    // Passive event listener for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)

    return () => {
      clearTimeout(readyTimeout)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [handleMouseMove])

  // Don't render until ready to prevent hydration mismatch
  if (!ready) return null

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  const size = SIZES[variant]

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: rx,
        y: ry,
        translateX: '-50%',
        translateY: '-50%',
        width: size.w,
        height: size.h,
        opacity: visible ? 1 : 0,
        willChange: 'transform',
      }}
      animate={{
        width: size.w,
        height: size.h,
      }}
      transition={{
        width: { duration: 0.15, ease: 'easeOut' },
        height: { duration: 0.15, ease: 'easeOut' },
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: 'white',
          opacity: 0.9,
        }}
      />
    </motion.div>
  )
}
