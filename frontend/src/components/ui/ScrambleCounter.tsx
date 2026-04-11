'use client'
import { useEffect, useRef, useState } from 'react'

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
  const ref     = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true

      const t0    = performance.now()
      const count = String(target).length
      let   raf: number

      const tick = (now: number) => {
        const p     = Math.min((now - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        const cur   = Math.round(eased * target)

        // Scramble phase (0–75%): random digits, same digit count as target
        setDisplay(
          p < 0.75
            ? Array.from({ length: count }, () =>
                CHARS[Math.floor(Math.random() * 10)]
              ).join('')
            : String(cur)
        )

        if (p < 1) { raf = requestAnimationFrame(tick) }
        else       { setDisplay(String(target)) }
      }

      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, { threshold: 0.2 })

    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      <span style={{ color: 'var(--color-violet)' }}>{suffix}</span>
    </span>
  )
}
