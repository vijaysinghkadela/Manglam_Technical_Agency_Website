'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children:   React.ReactNode
  className?: string
  href?:      string
  style?:     React.CSSProperties
  onClick?:   () => void
  pull?:      number   // max px attraction
}

export function MagneticButton({ children, className = '', href, style, onClick, pull = 14 }: Props) {
  const x = useSpring(0, { stiffness: 180, damping: 18 })
  const y = useSpring(0, { stiffness: 180, damping: 18 })
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r   = ref.current.getBoundingClientRect()
    const dx  = (e.clientX - r.left - r.width  / 2) * 0.3
    const dy  = (e.clientY - r.top  - r.height / 2) * 0.3
    const cap = (v: number) => Math.max(-pull, Math.min(pull, v))
    x.set(cap(dx)); y.set(cap(dy))
  }

  const Tag = href ? motion.a : motion.div

  return (
    <Tag
      ref={ref as never}
      href={href}
      style={{ x, y, display: 'inline-flex', ...style }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      data-cursor="pointer"
      className={className}
    >
      {children}
    </Tag>
  )
}
