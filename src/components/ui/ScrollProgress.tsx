'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.2 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-[150] h-px w-full origin-left bg-violet"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
