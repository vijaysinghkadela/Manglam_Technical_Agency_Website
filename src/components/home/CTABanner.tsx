'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { AGENCY_WHATSAPP } from '@/lib/constants'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

const FLOATING_DOTS = [
  { x: '12%', y: '18%', size: 3, delay: 0    },
  { x: '88%', y: '12%', size: 2, delay: 0.6  },
  { x: '75%', y: '78%', size: 4, delay: 1.1  },
  { x: '22%', y: '72%', size: 2, delay: 0.3  },
  { x: '55%', y: '88%', size: 3, delay: 0.9  },
  { x: '92%', y: '50%', size: 2, delay: 0.45 },
  { x: '8%',  y: '45%', size: 3, delay: 1.4  },
]

export function CTABanner() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const watermarkY = useTransform(scrollYProgress, [0,1], ['-8%','8%'])
  const contentY   = useTransform(scrollYProgress, [0,1], ['4%', '-4%'])

  // Disable parallax + floating dots on mobile — major lag source on touch devices
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor:'var(--color-violet)', padding:'clamp(64px, 11vw, 112px) 0' }}
    >
      {/* Diagonal grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(255,255,255,0.025) 0px,
            rgba(255,255,255,0.025) 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
        aria-hidden
      />

      {/* Parallax watermark — desktop only */}
      <motion.div
        style={{ y: isDesktop ? watermarkY : '0%' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-display font-black text-white leading-none"
          style={{ fontSize:'clamp(180px, 28vw, 480px)', opacity:0.045, letterSpacing: '-0.05em' }}
        >
          MTA
        </span>
      </motion.div>

      {/* Floating dots — desktop only (7 infinite animations are expensive on mobile) */}
      {isDesktop && FLOATING_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: dot.x, top: dot.y,
            width: dot.size, height: dot.size,
            backgroundColor: 'rgba(255,255,255,0.25)',
          }}
          animate={{ y: [0, -12, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 3.5 + i * 0.4, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      ))}

      {/* Content — parallax on desktop only */}
      <motion.div
        style={{ y: isDesktop ? contentY : '0%' }}
        className="relative z-10 container-site flex flex-col items-center text-center gap-8"
      >
        <motion.span
          className="font-mono uppercase"
          style={{ fontSize:'11px', letterSpacing:'0.28em', color:'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          ✦ READY TO SCALE?
        </motion.span>

        <motion.h2
          className="font-display font-black text-white leading-[0.90] tracking-tight"
          style={{ fontSize:'clamp(40px, 8vw, 108px)' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
        >
          Scale With<br />Certainty
        </motion.h2>

        <motion.p
          style={{ fontSize:'17px', lineHeight:1.68, color:'rgba(255,255,255,0.62)', maxWidth:'440px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
        >
          Free consultation. Honest scope. Real timelines.<br />
          Book our ₹25,000 Discovery Workshop today.
        </motion.p>

        <motion.div
          className="flex items-center gap-5 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
        >
          <MagneticButton
            href="/contact"
            className="inline-flex items-center gap-2 font-display font-black text-[17px] px-8 py-4 transition-all duration-300"
            style={{ backgroundColor:'#FAFAFA', color:'var(--color-violet)' }}
          >
            Book Discovery Workshop →
          </MagneticButton>

          <a
            href={AGENCY_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 font-mono text-sm transition-all duration-200"
            style={{
              color: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(255,255,255,0.22)',
              padding: '14px 24px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#fff'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'
              ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.72)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)'
              ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
            }}
          >
            WhatsApp Us
          </a>
        </motion.div>

        <motion.p
          className="font-mono"
          style={{ fontSize:'12px', letterSpacing:'0.14em', color:'rgba(255,255,255,0.32)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Typical response within 2 hours · No commitment required
        </motion.p>
      </motion.div>
    </section>
  )
}
