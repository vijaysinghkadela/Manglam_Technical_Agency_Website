'use client'
import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children:   React.ReactNode
  className?: string
  onClick?:   () => void
  href?:      string
  maxPull?:   number
}

export function MagneticButton({ children, className = '', onClick, href, maxPull = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect   = ref.current.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = (e.clientX - cx) * 0.32
    const dy     = (e.clientY - cy) * 0.32
    const capped = (v: number) => Math.max(-maxPull, Math.min(maxPull, v))
    x.set(capped(dx))
    y.set(capped(dy))
  }

  const onLeave = () => { x.set(0); y.set(0); setHovered(false) }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        data-cursor="pointer"
        style={{ x, y, display: 'inline-flex' }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        onClick={onClick}
        className={className}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div
      ref={ref}
      data-cursor="pointer"
      style={{ x, y, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}
