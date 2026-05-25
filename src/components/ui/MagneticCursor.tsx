'use client'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function subscribe(callback: () => void) {
  const mq = window.matchMedia('(pointer: fine)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot() {
  return !window.matchMedia('(pointer: fine)').matches
}

export function MagneticCursor() {
  const [visible, setVisible] = useState(false)
  const isTouch = useSyncExternalStore(subscribe, getSnapshot, () => false)
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 })
  const ry = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 })

  useEffect(() => {
    if (isTouch) return
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const hide = () => setVisible(false)
    const show = () => setVisible(true)
    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [mx, my, isTouch])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: rx, y: ry, translateX: '-50%', translateY: '-50%',
        width: 32, height: 32, opacity: visible ? 1 : 0, willChange: 'transform' }}
    >
      <div className="w-full h-full rounded-full bg-white opacity-90" />
    </motion.div>
  )
}
