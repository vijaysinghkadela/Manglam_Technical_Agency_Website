'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsClient } from '@/hooks/useIsClient'

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isClient = useIsClient()
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Prevent flash during hydration
  if (!isClient) {
    return (
      <div 
        className="h-9 w-9 sm:w-[88px] rounded-full flex items-center justify-center"
        style={{ 
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)' }}
        aria-hidden="true"
      >
        <div className="w-3.5 h-3.5 rounded-full bg-muted/20" />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'

  return (
    <motion.button
      onClick={() => setTheme(nextTheme)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="relative h-9 w-9 sm:w-auto sm:min-w-[88px] rounded-full flex items-center justify-center gap-2 overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: isHovered
          ? isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(var(--color-accent-rgb), 0.08)'
          : 'var(--color-card)',
        border: `1px solid ${isHovered ? 'var(--color-violet)' : 'var(--color-border)'}`,
        boxShadow: isPressed
          ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
          : isHovered
            ? '0 4px 20px rgba(var(--color-accent-rgb), 0.15)'
            : '0 2px 8px rgba(0,0,0,0.08)' }}
      aria-label={`Switch to ${nextTheme} mode`}
      data-cursor="pointer"
      whileTap={{ scale: 0.95 }}
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 30% 30%, rgba(var(--color-accent-rgb), 0.15), transparent 70%)'
            : 'radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.12), transparent 70%)' }}
        transition={{ duration: 0.4 }}
      />

      {/* Icon container */}
      <div className="relative flex items-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center"
          >
            {isDark ? (
              <SunIcon className="w-[14px] h-[14px] text-amber-400" />
            ) : (
              <MoonIcon className="w-[14px] h-[14px] text-violet" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Label */}
        <motion.span
          className="hidden sm:block text-[11px] font-medium tracking-wide"
          style={{
            color: isDark ? '#FBBF24' : 'var(--color-violet)' }}
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0.8 }}
        >
          {isDark ? 'Light' : 'Dark'}
        </motion.span>
      </div>

      {/* Focus ring */}
      <div className="absolute inset-0 rounded-full ring-2 ring-violet/0 focus-within:ring-violet/50 transition-all duration-200" />
    </motion.button>
  )
}
