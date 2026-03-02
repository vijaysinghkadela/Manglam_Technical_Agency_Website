'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function CTABanner() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const textY = useTransform(scrollYProgress, [0,1], ['-5%','5%'])

  return (
    <section ref={ref} className="w-full py-32 bg-violet relative overflow-hidden">
      {/* Giant watermark "MTA" — parallax */}
      <motion.div style={{ y:textY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display font-black text-white opacity-[0.04] leading-none"
          style={{ fontSize:'clamp(200px, 30vw, 500px)' }}
        >
          MTA
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-8">
        <h2 className="font-display font-black text-white leading-[0.92] tracking-tight"
          style={{ fontSize:'clamp(40px, 7vw, 100px)' }}>
          Ready to Build<br />Something Real?
        </h2>
        <p className="text-white/55 text-[17px] max-w-md leading-[1.6]">
          Free consultation. Honest scope. Real timelines.
          We deliver what we write down.
        </p>
        <MagneticButton
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet font-display font-black text-[17px] hover:bg-canvas hover:text-white transition-all duration-300"
        >
          Start Your Project →
        </MagneticButton>
        <p className="text-white/40 text-[12px] font-mono tracking-wider">
          or WhatsApp us directly — we respond within 2 hours
        </p>
      </div>
    </section>
  )
}
