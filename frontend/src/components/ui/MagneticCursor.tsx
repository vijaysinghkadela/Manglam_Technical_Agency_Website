'use client'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Variant = 'default' | 'pointer' | 'text' | 'link'

// Sizes defined outside component to prevent recreation
const SIZES: Record<Variant, { w: number; h: number }> = {
  default: { w: 32, h: 32 },
  pointer: { w: 18, h: 18 },
  text:    { w: 68, h: 24 },
  link:    { w: 48, h: 48 },
} as const

// Spring config defined outside to prevent recreation
const SPRING_CONFIG = { stiffness: 220, damping: 26, mass: 0.35 } as const

export function MagneticCursor() {
  const [ready,   setReady]   = useState(false)
  const [visible, setVisible] = useState(false)
  const variantRef = useRef<Variant>('default')
  const [variant, setVariant] = useState<Variant>('default')

  // Use refs to avoid state deps in callbacks
  const visibleRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const pendingMousePos = useRef<{ x: number; y: number } | null>(null)

  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, SPRING_CONFIG)
  const ry = useSpring(my, SPRING_CONFIG)

  const lastVariantCheck = useRef(0)

  // RAF-throttled position update for 60fps optimization
  const processMouseMove = useCallback(() => {
    rafIdRef.current = null
    
    const pos = pendingMousePos.current
    if (!pos) return
    
    mx.set(pos.x)
    my.set(pos.y)

    if (!visibleRef.current) {
      visibleRef.current = true
      setVisible(true)
    }

    const now = performance.now()
    if (now - lastVariantCheck.current > 80) {
      lastVariantCheck.current = now
      const el = document.elementFromPoint(pos.x, pos.y) as HTMLElement | null
      const hit = el?.closest('[data-cursor]')?.getAttribute('data-cursor') as Variant | null
      const next = hit ?? 'default'
      if (next !== variantRef.current) {
        variantRef.current = next
        setVariant(next)
      }
    }
  }, [mx, my])

  // Throttle mouse move with RAF for smooth 60fps updates
  const move = useCallback((e: MouseEvent) => {
    pendingMousePos.current = { x: e.clientX, y: e.clientY }
    
    // Only schedule RAF if one isn't already pending
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(processMouseMove)
    }
  }, [processMouseMove])

  useEffect(() => {
    // Skip on touch devices or reduced motion preference
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    // Use microtask to avoid blocking paint
    queueMicrotask(() => setReady(true))

    const hide = () => { visibleRef.current = false; setVisible(false) }
    const show = () => { visibleRef.current = true;  setVisible(true)  }

    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide, { passive: true })
    document.documentElement.addEventListener('mouseenter', show, { passive: true })
    
    return () => {
      // Clean up pending RAF on unmount
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [move])

  // Memoize size to prevent object recreation
  const { w, h } = useMemo(() => SIZES[variant], [variant])

  // Memoize style objects to prevent recreation on every render
  const dotStyle = useMemo(() => ({
    x: mx, 
    y: my,
    translateX: '-50%', 
    translateY: '-50%',
    width: 5, 
    height: 5,
    backgroundColor: 'var(--color-foreground)',
    opacity: (visible && variant !== 'pointer') ? 1 : 0,
    // Use transform for GPU acceleration (Framer Motion handles this via x/y)
    // will-change is set only when cursor is active/visible
    willChange: visible ? 'transform' : 'auto',
    transition: 'opacity 0.15s',
  }), [mx, my, visible, variant])

  const ringStyle = useMemo(() => ({
    x: rx, 
    y: ry,
    translateX: '-50%', 
    translateY: '-50%',
    width: w,
    height: h,
    opacity: visible ? 1 : 0,
    backgroundColor: variant === 'pointer' ? 'var(--color-violet)' : 'transparent',
    borderColor: variant === 'pointer' ? 'var(--color-violet)' : 'var(--color-cursor-ring)',
    // Only apply will-change when actively animating
    willChange: visible ? 'transform, width, height' : 'auto',
    transition: 'width 0.18s ease, height 0.18s ease, background-color 0.18s ease, opacity 0.15s',
  }), [rx, ry, w, h, visible, variant])

  if (!ready) return null

  return (
    <>
      {/* Dot: instant follow — theme-aware color */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9999"
        style={dotStyle}
      />
      {/* Ring: spring follow — theme-aware border */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-9998"
        style={ringStyle}
      />
    </>
  )
}
