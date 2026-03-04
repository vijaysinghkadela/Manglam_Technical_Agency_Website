'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal }    from '@/components/ui/TextReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const OrbitalRing = dynamic(() => import('@/components/home/OrbitalRing'), { ssr: false })

const EASE_OUT: [number,number,number,number] = [0.16, 1, 0.3, 1]

const SERVICES = [
  'Cybersecurity',
  'AI Automation',
  'SaaS Products',
  'Social Media Marketing',
  'Content Creation',
  'Branding',
  'Web Development',
  'Application Development',
  'AI Agents',
]

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY  = useTransform(scrollYProgress, [0,1], ['0%', '22%'])
  const txtY = useTransform(scrollYProgress, [0,1], ['0%', '10%'])

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden grain"
      style={{ backgroundColor:'var(--color-canvas)' }}
    >
      {/* Line grid — parallax */}
      <motion.div
        style={{ y:bgY }}
        className="absolute inset-0 bg-line-grid pointer-events-none"
        aria-hidden
      />

      {/* Content */}
      <motion.div
        style={{ y:txtY }}
        className="relative z-10 w-full container-site pt-[128px] pb-16 lg:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-12 items-center">

          {/* Left */}
          <div className="flex flex-col gap-6">
            {/* Micro label */}
            <motion.span
              className="font-mono uppercase"
              style={{ fontSize:'11px', color:'var(--color-muted)', letterSpacing:'0.22em' }}
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.6, delay:0.1 }}
            >
              ✦ Manglam Technical Agency — Lean, High-Impact Technical Agency
            </motion.span>

            {/* Statement — three lines */}
            <div className="flex flex-col max-w-full" style={{ gap:'0.04em', overflowWrap:'break-word', hyphens:'none' }}>
              <TextReveal
                text="WE BUILD"
                as="h1"
                delay={0.25}
                className="font-display font-black text-white"
                style={{ fontSize:'clamp(2rem, 5vw, 4.5rem)', lineHeight:0.92, letterSpacing:'-0.03em', whiteSpace:'nowrap' }}
              />
              <TextReveal
                text="DIGITAL"
                as="h1"
                delay={0.35}
                className="font-display font-black"
                style={{
                  fontSize:     'clamp(2rem, 5vw, 4.5rem)',
                  lineHeight:    0.92,
                  letterSpacing:'-0.03em',
                  color:         'var(--color-violet)',
                  paddingLeft:   'clamp(8px, 1.5vw, 20px)',
                }}
              />
              <TextReveal
                text="INFRASTRUCTURE"
                as="h1"
                delay={0.45}
                className="font-display font-black text-white"
                style={{ fontSize:'clamp(2rem, 5vw, 4.5rem)', lineHeight:0.92, letterSpacing:'-0.03em' }}
              />
            </div>

            {/* Body */}
            <motion.p
              style={{ fontSize:'15px', lineHeight:1.65, color:'var(--color-muted)', maxWidth:'460px' }}
              initial={{ opacity:0, y:18 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.65, delay:0.7, ease:EASE_OUT }}
            >
              Delivering the output quality of a larger enterprise firm at the responsiveness and accountability of a boutique 3-4 professional team.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-5 flex-wrap"
              initial={{ opacity:0, y:18 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.65, delay:0.85, ease:EASE_OUT }}
            >
              <MagneticButton
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 font-display font-black text-[15px] transition-all duration-250"
                style={{ backgroundColor:'#FAFAFA', color:'var(--color-canvas)' }}
              >
                Book Discovery Workshop →
              </MagneticButton>
              <Link href="/portfolio" data-cursor="pointer"
                className="text-[14px] font-medium transition-colors border-b border-transparent hover:border-muted pb-1"
                style={{ color:'var(--color-muted)' }}
              >
                See Our Work
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              className="flex items-center gap-2 flex-wrap font-mono uppercase"
              style={{ fontSize:'11px', color:'var(--color-dead)', letterSpacing:'0.12em' }}
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.5, delay:1.1 }}
            >
              {['50+ Projects','20+ Clients','3 Years','Rajasthan'].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 && <span style={{ color:'var(--color-violet)' }}>·</span>}
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Mobile service badges — visible only on mobile */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 mt-2" style={{ scrollbarWidth:'none' }}>
              {SERVICES.map(s => (
                <span
                  key={s}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                  style={{
                    border:'1px solid var(--color-border)',
                    backgroundColor:'rgba(255,255,255,0.05)',
                    color:'#FAFAFA',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right — orbital visual (desktop only) */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity:0, scale:0.88 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.9, delay:0.5, ease:EASE_OUT }}
          >
            <OrbitalRing />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-[clamp(1.5rem,4vw,3rem)] hidden lg:flex items-center gap-4">
        <div className="relative overflow-hidden" style={{ width:'1px', height:'56px', backgroundColor:'var(--color-border)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full bg-white"
            animate={{ height:['0%','100%'], top:['0%','100%'] }}
            transition={{ repeat:Infinity, duration:2, ease:'linear' }}
          />
        </div>
        <span
          className="font-mono uppercase"
          style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.22em', writingMode:'vertical-rl', transform:'rotate(180deg)' }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
