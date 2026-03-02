'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function CTABanner() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const watermarkY = useTransform(scrollYProgress, [0,1], ['-6%','6%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor:'var(--color-violet)', padding:'128px 0' }}
    >
      {/* Parallax watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-display font-black text-white leading-none"
          style={{ fontSize:'clamp(180px, 28vw, 480px)', opacity:0.04 }}
        >
          MTA
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-site flex flex-col items-center text-center gap-8">
        <h2
          className="font-display font-black text-white leading-[0.92] tracking-tight"
          style={{ fontSize:'clamp(38px, 7vw, 96px)' }}
        >
          Scale With<br />Certainty
        </h2>
        <p style={{ fontSize:'17px', lineHeight:1.62, color:'rgba(255,255,255,0.55)', maxWidth:'420px' }}>
          Free consultation. Honest scope. Real timelines.<br />
          Book our ₹25,000 Discovery Workshop today.
        </p>
        <MagneticButton
          href="/contact"
          className="inline-flex items-center gap-2 font-display font-black text-[17px] px-8 py-4 transition-all duration-300"
          style={{ backgroundColor:'#FAFAFA', color:'var(--color-violet)' }}
        >
          Book Discovery Workshop →
        </MagneticButton>
        <p className="font-mono" style={{ fontSize:'12px', letterSpacing:'0.14em', color:'rgba(255,255,255,0.35)' }}>
          Or WhatsApp us — typical response within 2 hours
        </p>
      </div>
    </section>
  )
}
