'use client'

import { motion } from 'framer-motion'
import { BRAND, ANIMATION } from '@/lib/design-system'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  accent?: boolean
  delay?: number
}

export function SectionLabel({
  children,
  className = '',
  accent = true,
  delay = 0,
}: SectionLabelProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ANIMATION.duration.normal,
        delay,
        ease: ANIMATION.ease,
      }}
      className={`inline-flex items-center gap-2 font-mono uppercase tracking-widest ${className}`}
      style={{
        fontSize: '11px',
        color: accent ? BRAND.primary : 'var(--color-muted)',
        letterSpacing: '0.22em',
      }}
    >
      {accent && (
        <span
          className="w-6 h-px"
          style={{ backgroundColor: BRAND.primary }}
        />
      )}
      {children}
    </motion.span>
  )
}
