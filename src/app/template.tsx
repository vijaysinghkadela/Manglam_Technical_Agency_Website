'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Template({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        ease: [0.16, 1, 0.3, 1], // Custom easeOut (smoother than standard)
        duration: reducedMotion ? 0 : 0.36 }}
    >
      {children}
    </motion.div>
  )
}
