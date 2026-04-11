'use client'
import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children:   ReactNode
  className?: string
  style?:     CSSProperties
  intensity?: number  // 0.04–0.12 — opacity of brand spotlight
}

/**
 * SpotlightCard with optimized mouse tracking
 * Uses CSS variables + RAF throttling for smooth 60fps performance
 * Compatible with all browsers: Chrome, Safari, Firefox, Edge, Opera
 */
export function SpotlightCard({ children, className = '', style, intensity = 0.055 }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup: cancel pending RAF on unmount
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-[28px] border border-border bg-card transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:scale-[1.01] ${className}`}
      style={{
        ...style,
        backgroundColor: 'var(--color-card)',
        borderColor: isHovered ? 'var(--color-accent-border)' : 'var(--color-border)',
        boxShadow: isHovered
          ? '0 24px 72px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.03)'
          : '0 14px 40px rgba(0,0,0,0.10)',
        backgroundImage: isHovered
          ? `radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--color-accent-rgb), ${intensity}), transparent 68%)`
          : 'none',
      }}
      onMouseMove={(e) => {
        if (!ref.current) return

        // Cancel previous RAF if still pending (throttling to 60fps)
        if (rafIdRef.current !== null) return

        rafIdRef.current = requestAnimationFrame(() => {
          if (!ref.current) return

          const r = ref.current.getBoundingClientRect()
          const x = e.clientX - r.left
          const y = e.clientY - r.top

          // Use CSS variables to avoid state updates on every mousemove
          ref.current.style.setProperty('--mouse-x', `${x}px`)
          ref.current.style.setProperty('--mouse-y', `${y}px`)
          
          rafIdRef.current = null
        })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = null
        }
      }}
    >
      {children}
    </div>
  )
}
