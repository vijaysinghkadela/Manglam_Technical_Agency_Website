'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export function TiltCard({
  children,
  className,
  max = 12,
  ...props
}: HTMLMotionProps<'div'> & {
  children: ReactNode
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const touch = useMediaQuery('(hover: none), (pointer: coarse)')
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 220, damping: 24 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 220, damping: 24 })

  const disabled = reduced || touch

  return (
    <motion.div
      ref={ref}
      className={cn('relative transform-gpu [transform-style:preserve-3d]', className)}
      style={disabled ? undefined : { rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(event) => {
        if (disabled || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        mx.set((event.clientX - rect.left) / rect.width)
        my.set((event.clientY - rect.top) / rect.height)
      }}
      onMouseLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.18), transparent 42%)' }}
        aria-hidden
      />
      {children}
    </motion.div>
  )
}
