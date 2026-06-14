'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Template({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        ease: [0.16, 1, 0.3, 1],
        duration: reducedMotion ? 0 : 0.36 }}
      style={{ opacity: 0, transform: 'translateY(10px)' }}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  )
}
