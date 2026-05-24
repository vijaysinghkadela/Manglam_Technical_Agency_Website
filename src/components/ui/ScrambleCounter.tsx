'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '0123456789'

interface Props {
  target:    number
  suffix?:   string
  duration?: number
  className?: string
  style?:    React.CSSProperties
}

export function ScrambleCounter({ target, suffix = '', duration = 1500, className, style }: Props) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const rafRef = useRef<number | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const t0 = performance.now()
    const count = String(target).length

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = Math.round(eased * target)

      if (p < 0.75) {
        setDisplay(
          Array.from({ length: count }, () =>
            CHARS[Math.floor(Math.random() * 10)]
          ).join('')
        )
      } else {
        setDisplay(String(cur))
      }

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(String(target))
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      <span style={{ color: 'var(--color-violet)' }}>{suffix}</span>
    </span>
  )
}
