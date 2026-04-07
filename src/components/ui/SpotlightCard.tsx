'use client'
import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children:   ReactNode
  className?: string
  style?:     CSSProperties
  intensity?: number  // 0.04–0.12 — opacity of violet spotlight
}

/**
 * SpotlightCard with optimized mouse tracking
 * Uses CSS variables + RAF throttling for smooth 60fps performance
 * Compatible with all browsers: Chrome, Safari, Firefox, Edge, Opera
 */
export function SpotlightCard({ children, className = '', style, intensity = 0.065 }: Props) {
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
      className={`transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${className}`}
      style={{
        ...style,
        background: isHovered 
          ? `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,58,237,${intensity}), transparent 70%)`
          : 'transparent'
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
