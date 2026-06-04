'use client'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Cog } from 'lucide-react'

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
  const [interactive, setInteractive] = useState(false)
  const isTouch = useSyncExternalStore(subscribe, getSnapshot, () => false)
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 })
  const ry = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 })

  useEffect(() => {
    if (isTouch) return
    document.documentElement.classList.add('custom-cursor-hidden')

    const move = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, select, summary, [role="button"], [data-cursor]'),
      )

      mx.set(e.clientX)
      my.set(e.clientY)
      setInteractive(isInteractive)
      setVisible(true)
    }
    const hide = () => setVisible(false)
    const show = () => setVisible(true)
    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
      document.documentElement.classList.remove('custom-cursor-hidden')
    }
  }, [mx, my, isTouch])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: rx, y: ry, translateX: '-50%', translateY: '-50%',
        width: interactive ? 42 : 32,
        height: interactive ? 42 : 32,
        opacity: visible ? 1 : 0,
        willChange: 'transform, width, height' }}
      transition={{ duration: 0.18 }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full border border-[rgba(var(--color-accent-rgb),0.38)] bg-card/80 text-violet shadow-[0_10px_28px_rgba(var(--color-accent-rgb),0.18)] backdrop-blur-md">
        <Cog className={interactive ? 'h-5 w-5 animate-[spin_1.4s_linear_infinite]' : 'h-4 w-4 animate-[spin_4s_linear_infinite]'} />
      </div>
    </motion.div>
  )
}
