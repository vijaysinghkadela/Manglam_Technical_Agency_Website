'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
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
  const bgY   = useTransform(scrollYProgress, [0,1], ['0%', '22%'])
  const txtY  = useTransform(scrollYProgress, [0,1], ['0%', '10%'])
  const glowY = useTransform(scrollYProgress, [0,1], ['0%', '30%'])

  // Disable parallax on mobile/tablet — parallax is a major lag source on touch devices
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
      className="relative w-full min-h-screen flex items-center overflow-hidden grain"
      style={{ backgroundColor:'var(--color-canvas)' }}
    >
      {/* Line grid — parallax on desktop only */}
      <motion.div
        style={{ y: isDesktop ? bgY : '0%' }}
        className="absolute inset-0 bg-line-grid pointer-events-none opacity-[0.18]"
        aria-hidden
      />

      {/* Violet radial glow — right side, parallax on desktop only */}
      <motion.div
        style={{ y: isDesktop ? glowY : '0%' }}
        className="absolute pointer-events-none"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '5%',
          width: 'clamp(300px, 45vw, 900px)',
          height: 'clamp(300px, 45vw, 900px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
        }} />
      </motion.div>

      {/* Subtle top-left accent glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          left: '-15%',
          bottom: '10%',
          width: 'clamp(300px, 35vw, 600px)',
          height: 'clamp(300px, 35vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Content — parallax on desktop only */}
      <motion.div
        style={{ y: isDesktop ? txtY : '0%' }}
        className="relative z-10 w-full container-site pt-[128px] pb-16 lg:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-12 items-center">

          {/* Left */}
          <div className="flex flex-col gap-6">
            {/* Micro label */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity:0, x: -16 }}
              animate={{ opacity:1, x: 0 }}
              transition={{ duration:0.7, delay:0.05, ease: EASE_OUT }}
            >
              <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-violet)', opacity: 0.7 }} />
              <span
                className="font-mono uppercase"
                style={{ fontSize:'11px', color:'var(--color-muted)', letterSpacing:'0.22em' }}
              >
                Manglam Technical Agency — Lean, High-Impact Technical Agency
              </span>
            </motion.div>

            {/* Statement — three lines */}
            <div className="flex flex-col max-w-full" style={{ gap:'0.04em', overflowWrap:'break-word', hyphens:'none' }}>
              <TextReveal
                text="WE BUILD"
                as="h1"
                delay={0.25}
                className="font-display font-black"
                style={{ fontSize:'clamp(2.2rem, 6vw, 6rem)', lineHeight:0.92, letterSpacing:'-0.03em', color: 'var(--color-foreground)' }}
              />
              <TextReveal
                text="DIGITAL"
                as="h1"
                delay={0.35}
                className="font-display font-black"
                style={{
                  fontSize:     'clamp(2.2rem, 6vw, 6rem)',
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
                className="font-display font-black"
                style={{ fontSize:'clamp(1.6rem, 4.5vw, 4.5rem)', lineHeight:0.92, letterSpacing:'-0.03em', color: 'var(--color-foreground)' }}
              />
            </div>

            {/* Body */}
            <motion.p
              style={{ fontSize:'15px', lineHeight:1.72, color:'var(--color-muted)', maxWidth:'460px' }}
              initial={{ opacity:0, y:18 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.65, delay:0.7, ease:EASE_OUT }}
            >
              Delivering the output quality of a larger enterprise firm at the responsiveness
              and accountability of a boutique 3–4 professional team.
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
                className="inline-flex items-center gap-2 px-7 py-4 font-display font-black text-[15px] transition-all duration-300"
                style={{ backgroundColor:'var(--color-foreground)', color:'var(--color-canvas)' }}
              >
                Book Discovery Workshop →
              </MagneticButton>
              <Link href="/portfolio" data-cursor="pointer"
                className="group inline-flex items-center gap-2 text-[14px] font-medium transition-colors pb-1"
                style={{ color:'var(--color-muted)', borderBottom: '1px solid transparent' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--color-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' }}
              >
                See Our Work
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
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
              {['50+ Projects','20+ Clients','3 Years','Nagaur, Rajasthan'].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 && <span style={{ color:'var(--color-violet)', opacity: 0.6 }}>·</span>}
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Mobile service badges */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 mt-2" style={{ scrollbarWidth:'none' }}>
              {SERVICES.map(s => (
                <span
                  key={s}
                  className="shrink-0 px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
                  style={{
                    border:'1px solid var(--color-border)',
                    backgroundColor:'rgba(124,58,237,0.06)',
                    color:'var(--color-foreground)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right — orbital visual (desktop only) */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative"
            initial={{ opacity:0, scale:0.88 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1.1, delay:0.4, ease:EASE_OUT }}
          >
            {/* Glow behind orbital */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '65%',
                height: '65%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <OrbitalRing />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-[clamp(1.5rem,4vw,3rem)] hidden lg:flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <div className="relative overflow-hidden" style={{ width:'1px', height:'56px', backgroundColor:'var(--color-border)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ backgroundColor:'var(--color-violet)', opacity: 0.8 }}
            animate={{ height:['0%','100%'], top:['0%','100%'] }}
            transition={{ repeat:Infinity, duration:2.2, ease:'linear' }}
          />
        </div>
        <span
          className="font-mono uppercase"
          style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.22em', writingMode:'vertical-rl', transform:'rotate(180deg)' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
