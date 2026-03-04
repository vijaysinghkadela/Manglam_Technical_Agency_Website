'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Variant = 'default' | 'pointer' | 'text' | 'link'

export function MagneticCursor() {
  const [ready,   setReady]   = useState(false)
  const [visible, setVisible] = useState(false)
  const variantRef = useRef<Variant>('default')
  const [variant, setVariant] = useState<Variant>('default')

  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.35 })
  const ry = useSpring(my, { stiffness: 220, damping: 26, mass: 0.35 })

  // Throttled variant detection — only runs every 80ms instead of every frame
  const lastVariantCheck = useRef(0)

  const move = useCallback((e: MouseEvent) => {
    mx.set(e.clientX)
    my.set(e.clientY)
    if (!visible) setVisible(true)

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
  }, [mx, my, visible])

  useEffect(() => {
    // Touch devices: skip entirely
    if (!window.matchMedia('(pointer: fine)').matches) return
    setTimeout(() => setReady(true), 0)

    const hide = () => setVisible(false)
    const show = () => setVisible(true)

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
    default: { w: 32,  h: 32 },
    pointer: { w: 18,  h: 18 },
    text:    { w: 68,  h: 24 },
    link:    { w: 48,  h: 48 },
  }
  const { w, h } = sizes[variant]

  return (
    <>
      {/* Dot: instant follow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-9999"
        style={{
          x: mx, y: my,
          translateX: '-50%', translateY: '-50%',
          width: 5, height: 5,
          opacity: (visible && variant !== 'pointer') ? 1 : 0,
          willChange: 'transform',
          transition: 'opacity 0.15s',
        }}
      />
      {/* Ring: spring follow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-9998"
        style={{
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
          width:  w,
          height: h,
          opacity:         visible ? 1 : 0,
          backgroundColor: variant === 'pointer' ? 'rgba(124,58,237,0.88)' : 'transparent',
          borderColor:     variant === 'pointer' ? '#7C3AED' : 'rgba(255,255,255,0.18)',
          willChange:      'transform',
          transition:      'width 0.18s ease, height 0.18s ease, background-color 0.18s ease, opacity 0.15s',
        }}
      />
    </>
  )
}
