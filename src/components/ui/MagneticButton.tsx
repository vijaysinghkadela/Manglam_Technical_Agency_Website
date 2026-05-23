'use client'
import { useRef, memo } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const MagneticButton = memo(function MagneticButton({ children, className = '', style, href, onClick }: Props) {
  const x = useSpring(0, { stiffness: 180, damping: 18 })
  const y = useSpring(0, { stiffness: 180, damping: 18 })
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || reducedMotion) return
    const r = ref.current.getBoundingClientRect()
    const cap = (v: number) => Math.max(-14, Math.min(14, v))
    x.set(cap((e.clientX - r.left - r.width / 2) * 0.3))
    y.set(cap((e.clientY - r.top - r.height / 2) * 0.3))
  }

  const Tag = href ? motion.a : motion.div

  return (
    <Tag
      ref={ref as never}
      href={href}
      style={{ x, y, display: 'inline-flex', willChange: 'transform', ...style }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      data-cursor="pointer"
      className={className}
    >
      {children}
    </Tag>
  )
})
