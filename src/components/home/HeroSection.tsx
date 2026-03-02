'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal }    from '@/components/ui/TextReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import Link from 'next/link'

const EASE_OUT: [number,number,number,number] = [0.16, 1, 0.3, 1]

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
        className="relative z-10 w-full container-site pt-[128px] pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 lg:gap-16 items-center">

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
            <div className="flex flex-col" style={{ gap:'0.04em' }}>
              <TextReveal
                text="WE BUILD"
                as="h1"
                delay={0.25}
                className="font-display font-black text-white"
                style={{ fontSize:'clamp(56px, 9vw, 130px)', lineHeight:0.90, letterSpacing:'-0.04em' }}
              />
              <TextReveal
                text="DIGITAL"
                as="h1"
                delay={0.35}
                className="font-display font-black"
                style={{
                  fontSize:     'clamp(56px, 9vw, 130px)',
                  lineHeight:    0.90,
                  letterSpacing:'-0.04em',
                  color:         'var(--color-violet)',
                  paddingLeft:   'clamp(12px, 2vw, 28px)',
                }}
              />
              <TextReveal
                text="INFRASTRUCTURE"
                as="h1"
                delay={0.45}
                className="font-display font-black text-white"
                style={{ fontSize:'clamp(56px, 9vw, 130px)', lineHeight:0.90, letterSpacing:'-0.04em' }}
              />
            </div>

            {/* Body */}
            <motion.p
              style={{ fontSize:'17px', lineHeight:1.65, color:'var(--color-muted)', maxWidth:'480px' }}
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
                className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-black text-[15px] transition-all duration-250"
                style={{ backgroundColor:'#FAFAFA', color:'var(--color-canvas)' }}
              >
                Book Discovery Workshop →
              </MagneticButton>
              <Link href="/portfolio" data-cursor="pointer"
                className="text-[14px] font-medium transition-colors border-b border-transparent hover:border-muted pb-0.5"
                style={{ color:'var(--color-muted)' }}
              >
                See Our Work
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              className="flex items-center gap-2 font-mono uppercase"
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
          </div>

          {/* Right — orbital visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity:0, scale:0.88 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.9, delay:0.5, ease:EASE_OUT }}
          >
            <div className="relative w-[400px] h-[400px] flex items-center justify-center">
              {/* Outer dashed ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ border:'1px dashed var(--color-border)', animation:'spin-cw 64s linear infinite' }}
              />
              {/* Inner violet ring */}
              <div
                className="absolute inset-[44px] rounded-full"
                style={{ border:'1px solid rgba(124,58,237,0.25)', animation:'spin-ccw 42s linear infinite' }}
              />
              {/* 6×6 dot grid */}
              <div className="grid grid-cols-6 gap-[18px]">
                {Array.from({ length:36 }).map((_,i) => (
                  <div key={i}
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      backgroundColor: i % 5 === 0 ? 'var(--color-violet)' : 'var(--color-border)',
                      boxShadow:       i % 5 === 0 ? '0 0 8px rgba(124,58,237,0.65)' : 'none',
                    }}
                  />
                ))}
              </div>
              {/* Floating pills */}
              {[
                { text:'Next.js',       dx:'-130px', dy:'-96px',  delay:0    },
                { text:'Cybersecurity', dx:'114px',  dy:'-52px',  delay:0.2  },
                { text:'AI Automation', dx:'-72px',  dy:'126px',  delay:0.4  },
              ].map(p => (
                <motion.div
                  key={p.text}
                  className="absolute flex items-center gap-1.5 font-mono"
                  style={{
                    x: p.dx, y: p.dy,
                    fontSize:        '11px',
                    padding:         '6px 12px',
                    backgroundColor: 'var(--color-card)',
                    border:          '1px solid var(--color-border)',
                    color:           '#FAFAFA',
                    whiteSpace:      'nowrap',
                  }}
                  animate={{
                    y: [`${p.dy}`, `calc(${p.dy} - 11px)`, `${p.dy}`],
                  }}
                  transition={{ repeat:Infinity, duration:4 + p.delay * 2, ease:'easeInOut', delay:p.delay }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor:'var(--color-violet)' }}
                  />
                  {p.text}
                </motion.div>
              ))}
            </div>
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
