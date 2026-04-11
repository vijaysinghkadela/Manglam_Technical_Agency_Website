'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'

interface TextRevealProps {
  text:       string
  as?:        'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?:     number
  className?: string
  style?:     React.CSSProperties
}

const EASE: [number,number,number,number] = [0.33, 1, 0.68, 1]

export function TextReveal({
  text, as: Tag = 'h2', delay = 0, className = '', style,
}: TextRevealProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const words  = useMemo(() => text.split(' '), [text])

  return (
    <div ref={ref} aria-label={text}>
      <Tag
        className={className}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.25em', ...style }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '115%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.042 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
