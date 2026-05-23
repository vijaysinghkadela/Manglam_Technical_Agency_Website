'use client'

import { ReactNode, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'brand' | 'accent' | 'subtle' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}

const Badge = memo(function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  interactive = false,
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4 py-2 text-[11px]',
    lg: 'px-5 py-2.5 text-[11px]',
  }

  const variantClasses = {
    default: 'bg-white/5 border-white/10 text-white/70 hover:border-white/20',
    brand: 'bg-[rgba(var(--color-accent-rgb),0.08)] border-[rgba(var(--color-accent-rgb),0.15)] text-accent',
    accent: 'bg-cyan-400/10 border-cyan-400/25 text-cyan-400',
    subtle: 'bg-card border-border text-muted',
    outline: 'bg-transparent border-border text-muted hover:border-white/20',
  }

  const MotionComponent = interactive ? motion.span : 'span'
  const motionProps = interactive
    ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      }
    : {}

  return (
    <MotionComponent
      className={cn(
        'inline-flex items-center gap-2 rounded-full border font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      style={{
        letterSpacing: size === 'sm' ? '0.16em' : '0.18em' }}
      {...motionProps}
    >
      {variant === 'brand' && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: 'var(--color-violet)' }}
        />
      )}
      {children}
    </MotionComponent>
  )
})

export default Badge
