'use client'
import { useRef, useState, type CSSProperties } from 'react'

interface Props {
  children:   React.ReactNode
  className?: string
  intensity?: number
  style?:     CSSProperties
}

export function SpotlightCard({ children, className = '', intensity = 0.07, style }: Props) {
  const [bg, setBg] = useState('transparent')
  const ref         = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    setBg(`radial-gradient(320px circle at ${x}px ${y}px, rgba(124,58,237,${intensity}), transparent 70%)`)
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setBg('transparent')}
      style={{ background: bg, transition: 'background 0s', ...style }}
    >
      {children}
    </div>
  )
}
