'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useMemo, type CSSProperties } from 'react'

interface Props {
  text:       string
  className?: string
  delay?:     number
  as?:        'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  style?:     CSSProperties
}

const EASE: [number,number,number,number] = [0.33, 1, 0.68, 1]

export function TextReveal({ text, className, delay = 0, as: Tag = 'h2', style }: Props) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const words  = useMemo(() => text.split(' '), [text])

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', overflow: 'hidden', ...style }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '112%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.72, ease: EASE, delay: delay + i * 0.045 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
