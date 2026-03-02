'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

interface Props {
  target:    number
  suffix:    string
  duration?: number
  className?: string
  style?:     CSSProperties
}

const DIGITS = '0123456789'

export function ScrambleCounter({ target, suffix, duration = 1600, className, style }: Props) {
  const [display, setDisplay] = useState('0')
  const ref     = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true

      const t0 = performance.now()
      let rafId: number

      const tick = (now: number) => {
        const elapsed  = now - t0
        const progress = Math.min(elapsed / duration, 1)
        const eased    = 1 - Math.pow(1 - progress, 3)
        const current  = Math.round(eased * target)

        if (progress < 0.75) {
          const len = String(target).length
          setDisplay(
            Array.from({ length: len }, () =>
              DIGITS[Math.floor(Math.random() * DIGITS.length)]
            ).join('')
          )
        } else {
          setDisplay(String(current))
        }

        if (progress < 1) { rafId = requestAnimationFrame(tick) }
        else { setDisplay(String(target)) }
      }

      rafId = requestAnimationFrame(tick)
    }, { threshold: 0.5 })

    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      <span className="text-violet">{suffix}</span>
    </span>
  )
}
