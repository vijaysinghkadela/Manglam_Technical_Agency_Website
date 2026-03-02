'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal } from '@/components/ui/TextReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import Link from 'next/link'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY  = useTransform(scrollYProgress, [0,1], ['0%',  '25%'])
  const txtY = useTransform(scrollYProgress, [0,1], ['0%',  '12%'])

  return (
    <section ref={ref}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-canvas noise"
    >
      {/* Line grid — parallax bg */}
      <motion.div style={{ y: bgY }}
        className="absolute inset-0 line-grid pointer-events-none" aria-hidden="true"
      />

      {/* Content */}
      <motion.div style={{ y: txtY }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-[120px] pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-16 items-center">

          {/* Left: Main content */}
          <div className="flex flex-col gap-6">

            {/* Micro label */}
            <motion.span
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted"
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.5, delay:0.1 }}
            >
              ✦ Manglam Technical Agency — Rajasthan, India
            </motion.span>

            {/* Statement heading */}
            <div className="flex flex-col gap-0">
              <TextReveal
                text="WE BUILD"
                as="h1"
                delay={0.25}
                className="font-display font-black text-white leading-[0.90]"
                style={{ fontSize:'clamp(56px, 9vw, 130px)', letterSpacing:'-0.04em' }}
              />
              <TextReveal
                text="DIGITAL"
                as="h1"
                delay={0.35}
                className="font-display font-black text-violet leading-[0.90] pl-6 lg:pl-12"
                style={{ fontSize:'clamp(56px, 9vw, 130px)', letterSpacing:'-0.04em' }}
              />
              <TextReveal
                text="INFRASTRUCTURE"
                as="h1"
                delay={0.45}
                className="font-display font-black text-white leading-[0.90]"
                style={{ fontSize:'clamp(56px, 9vw, 130px)', letterSpacing:'-0.04em' }}
              />
            </div>

            {/* Body */}
            <motion.p
              className="text-muted text-[17px] leading-[1.65] max-w-[480px]"
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.7, ease:[0.16,1,0.3,1] }}
            >
              From custom websites to AI automation — end-to-end technology
              services for Indian businesses. Delivered on time, in writing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-5 flex-wrap"
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.85, ease:[0.16,1,0.3,1] }}
            >
              <MagneticButton
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-display font-black text-[15px] hover:bg-violet hover:text-white transition-all duration-250"
              >
                Start a Project →
              </MagneticButton>
              <Link href="/portfolio" data-cursor="pointer"
                className="text-muted text-[14px] font-medium hover:text-white transition-colors border-b border-transparent hover:border-muted pb-0.5"
              >
                See Our Work
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              className="flex items-center gap-2 font-mono text-[11px] text-muted tracking-[0.12em] uppercase"
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.5, delay:1.1 }}
            >
              <span>50+ Projects</span>
              <span className="text-violet">·</span>
              <span>20+ Clients</span>
              <span className="text-violet">·</span>
              <span>3 Years</span>
              <span className="text-violet">·</span>
              <span>Rajasthan</span>
            </motion.div>
          </div>

          {/* Right: Animated circular visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.9, delay:0.5, ease:[0.16,1,0.3,1] }}
          >
            <div className="relative w-[400px] h-[400px] flex items-center justify-center">

              {/* Outer dashed ring — slow CW */}
              <div className="absolute inset-0 rounded-full border border-dashed border-border"
                style={{ animation:'spin-cw 60s linear infinite' }}
              />
              {/* Inner violet ring — slow CCW */}
              <div className="absolute inset-[40px] rounded-full border border-violet/25"
                style={{ animation:'spin-ccw 40s linear infinite' }}
              />

              {/* 6×6 dot grid */}
              <div className="grid grid-cols-6 gap-5">
                {Array.from({ length:36 }).map((_, i) => (
                  <div key={i}
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: i % 5 === 0 ? '#7C3AED' : '#1F1F1F',
                      boxShadow:       i % 5 === 0 ? '0 0 8px rgba(124,58,237,0.7)' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Floating pills */}
              {[
                { label:'Next.js',       xPos:'-130px', yPos:'-100px', delay:0 },
                { label:'Cybersecurity', xPos:'110px',  yPos:'-60px',  delay:0.15 },
                { label:'AI Automation', xPos:'-80px',  yPos:'130px',  delay:0.3 },
              ].map(p => (
                <motion.div key={p.label}
                  className="absolute flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border font-mono text-[11px] text-white"
                  style={{ left: `calc(50% + ${p.xPos})`, top: `calc(50% + ${p.yPos})` }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat:Infinity, duration: 4 + p.delay * 2, ease:'easeInOut', delay:p.delay }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                  {p.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-12 items-center gap-4 hidden lg:flex">
        <div className="relative w-px h-14 bg-[#111] overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full bg-white"
            animate={{ height:['0%','100%'], top:['0%','100%'] }}
            transition={{ repeat:Infinity, duration:2, ease:'linear' }}
          />
        </div>
        <span className="font-mono text-[10px] text-dead tracking-[0.22em] uppercase"
          style={{ writingMode:'vertical-rl', transform:'rotate(180deg)' }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
