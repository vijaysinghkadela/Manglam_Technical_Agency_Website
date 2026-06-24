'use client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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
  const reducedMotion = useReducedMotion()
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, { stiffness: 120, damping: 28, mass: 0.6 })
  const ry = useSpring(my, { stiffness: 120, damping: 28, mass: 0.6 })
  const visibleRef = useRef(false)
  const interactiveRef = useRef(false)

  useEffect(() => {
    if (isTouch || reducedMotion) return

    const move = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, select, summary, [role="button"], [data-cursor]'),
      )

      mx.set(e.clientX)
      my.set(e.clientY)
      if (interactiveRef.current !== isInteractive) {
        interactiveRef.current = isInteractive
        setInteractive(isInteractive)
      }
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }
    const hide = () => {
      visibleRef.current = false
      setVisible(false)
    }
    const show = () => {
      visibleRef.current = true
      setVisible(true)
    }
    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [mx, my, isTouch, reducedMotion])

  if (isTouch || reducedMotion) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: rx, y: ry, translateX: '-50%', translateY: '-50%',
        width: interactive ? 24 : 14,
        height: interactive ? 24 : 14,
        opacity: visible ? 0.34 : 0,
        willChange: 'transform' }}
      transition={{ duration: 0.18 }}
    >
      <div className="h-full w-full rounded-full border border-[rgba(var(--color-accent-rgb),0.36)] bg-transparent shadow-[0_0_14px_rgba(var(--color-accent-rgb),0.08)]" />
    </motion.div>
  )
}
