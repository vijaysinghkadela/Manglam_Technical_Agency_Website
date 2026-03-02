'use client'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorVariant = 'default' | 'pointer' | 'text' | 'link' | 'drag'

export function MagneticCursor() {
  const [mounted,   setMounted]   = useState(false)
  const [visible,   setVisible]   = useState(false)
  const [variant,   setVariant]   = useState<CursorVariant>('default')

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const spring = { stiffness: 200, damping: 24, mass: 0.4 }
  const rx = useSpring(mx, spring)
  const ry = useSpring(my, spring)

  useEffect(() => {
    // Never run on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      const v = el?.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorVariant | null
      setVariant(v ?? 'default')
    }
    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)

    window.addEventListener('mousemove',           onMove,  { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove',           onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mx, my])

  // ← NEVER remove this guard. It prevents the SSR "N" artifact.
  if (!mounted) return null

  const ringW = { default:32, pointer:16, text:72, link:44, drag:56 }[variant]
  const ringH = variant === 'text' ? 26 : ringW
  const ringBg = { default:'transparent', pointer:'rgba(124,58,237,0.9)',
                   text:'transparent', link:'rgba(124,58,237,0.15)', drag:'rgba(124,58,237,0.1)' }[variant]
  const ringBorder = variant === 'pointer' ? '#7C3AED' : 'rgba(255,255,255,0.2)'

  return (
    <>
      {/* Dot — instant */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-9999"
        style={{
          x: mx, y: my,
          translateX: '-50%', translateY: '-50%',
          width: 5, height: 5,
          opacity: (visible && variant !== 'pointer') ? 1 : 0,
        }}
      />
      {/* Ring — spring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-9998"
        style={{
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
          width: ringW, height: ringH,
          backgroundColor: ringBg,
          borderColor: ringBorder,
          opacity: visible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease',
        }}
      />
    </>
  )
}
