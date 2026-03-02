'use client'
import { useRef, useState, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children:   ReactNode
  className?: string
  style?:     CSSProperties
  intensity?: number  // 0.04–0.12 — opacity of violet spotlight
}

export function SpotlightCard({ children, className = '', style, intensity = 0.065 }: Props) {
  const [bg, setBg] = useState('transparent')
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, background: bg }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        setBg(`radial-gradient(
          300px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px,
          rgba(124,58,237,${intensity}),
          transparent 70%
        )`)
      }}
      onMouseLeave={() => setBg('transparent')}
    >
      {children}
    </div>
  )
}
