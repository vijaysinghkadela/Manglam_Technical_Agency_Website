'use client'

import { motion } from 'framer-motion'

import { useReducedMotion } from '@/hooks/useReducedMotion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  blur = false,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  blur?: boolean
}) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden="true"
            className={wordClassName ?? 'inline-block'}
            initial={reduced ? false : { opacity: 0, y: 40, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
            animate={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.72, delay: delay + index * 0.08, ease: EASE }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? <span aria-hidden="true">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  )
}
