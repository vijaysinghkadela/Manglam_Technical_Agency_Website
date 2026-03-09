'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Variant = 'default' | 'pointer' | 'text' | 'link'

export function MagneticCursor() {
  const [ready,   setReady]   = useState(false)
  const [visible, setVisible] = useState(false)
  const variantRef = useRef<Variant>('default')
  const [variant, setVariant] = useState<Variant>('default')

  // Use a ref so `move` never needs `visible` in its deps
  const visibleRef = useRef(false)

  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.35 })
  const ry = useSpring(my, { stiffness: 220, damping: 26, mass: 0.35 })

  const lastVariantCheck = useRef(0)

  // Stable callback — no state deps, uses refs for visibility
  const move = useCallback((e: MouseEvent) => {
    mx.set(e.clientX)
    my.set(e.clientY)

    if (!visibleRef.current) {
      visibleRef.current = true
      setVisible(true)
    }

    const now = performance.now()
    if (now - lastVariantCheck.current > 80) {
      lastVariantCheck.current = now
      const el  = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      const hit = el?.closest('[data-cursor]')?.getAttribute('data-cursor') as Variant | null
      const next = hit ?? 'default'
      if (next !== variantRef.current) {
        variantRef.current = next
        setVariant(next)
      }
    }
  }, [mx, my]) // stable — no state deps

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setTimeout(() => setReady(true), 0)

    const hide = () => { visibleRef.current = false; setVisible(false) }
    const show = () => { visibleRef.current = true;  setVisible(true)  }

    window.addEventListener('mousemove',           move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [move])

  if (!ready) return null

  const sizes: Record<Variant, { w: number; h: number }> = {
    default: { w: 32, h: 32 },
    pointer: { w: 18, h: 18 },
    text:    { w: 68, h: 24 },
    link:    { w: 48, h: 48 },
  }
  const { w, h } = sizes[variant]

  return (
    <>
      {/* Dot: instant follow — theme-aware color */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9999"
        style={{
          x: mx, y: my,
          translateX: '-50%', translateY: '-50%',
          width: 5, height: 5,
          backgroundColor: 'var(--color-foreground)',
          opacity: (visible && variant !== 'pointer') ? 1 : 0,
          willChange: 'transform',
          transition: 'opacity 0.15s',
        }}
      />
      {/* Ring: spring follow — theme-aware border */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-9998"
        style={{
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
          width:  w,
          height: h,
          opacity:         visible ? 1 : 0,
          backgroundColor: variant === 'pointer' ? 'var(--color-violet)' : 'transparent',
          borderColor:     variant === 'pointer' ? 'var(--color-violet)' : 'var(--color-cursor-ring)',
          willChange:      'transform',
          transition:      'width 0.18s ease, height 0.18s ease, background-color 0.18s ease, opacity 0.15s',
        }}
      />
    </>
  )
}
