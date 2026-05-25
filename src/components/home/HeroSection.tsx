'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MagneticButton } from '@/components/ui/MagneticButton'
import OrbitalRing from '@/components/home/OrbitalRing'
import { MTA_STATS } from '@/lib/data/stats'
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

// Trust badges with status colors - module level to prevent re-creation
const TRUST_BADGES = [
  { label: 'Rajasthan-based technical team', color: '#10b981' },
  { label: 'MSME details available on request', color: '#3b82f6' },
  { label: 'Small team, direct responsibility', color: 'var(--color-violet)' },
]

// Stats with status indicators - module level to prevent re-creation
const STATS = [
  { label: `${MTA_STATS.activeClients} Active Clients`, color: '#10b981' },
  { label: `${MTA_STATS.internalSaaS} Internal SaaS`, color: '#3b82f6' },
  { label: 'MSME profile', color: 'var(--color-violet)' },
  { label: 'Bikaner, RJ', color: '#f59e0b' },
]

// Pre-defined styles to prevent re-creation
const GLOW_STYLES = {
  position: 'absolute' as const,
  right: '-5%',
  top: '5%',
  width: 'clamp(300px, 45vw, 900px)',
  height: 'clamp(300px, 45vw, 900px)',
  borderRadius: '9999px',
  background: 'radial-gradient(circle, rgba(var(--color-accent-rgb),0.15) 0%, transparent 70%)',
  filter: 'blur(60px)',
}

const PRIMARY_BUTTON_STYLES = {
  background: 'linear-gradient(135deg, var(--color-violet) 0%, color-mix(in srgb, var(--color-violet) 70%, #fff) 100%)',
  color: 'white',
  borderRadius: '9999px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.1) inset',
}

const SECONDARY_BUTTON_STYLES = {
  color: 'var(--color-violet)',
  borderColor: 'var(--color-violet)',
  background: 'transparent',
  borderRadius: '9999px',
}

const BADGE_BASE_STYLE = {
  fontSize: '0.625rem',
  color: 'var(--color-muted)',
  letterSpacing: '0.16em',
  borderColor: 'var(--color-border)',
  background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb),0.08) 0%, rgba(255,255,255,0.02) 100%)',
  borderRadius: '9999px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
}

const SCROLL_ANIMATION = {
  duration: 0.5,
  delay: 1.5,
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const txtY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const isDesktop = useMediaQuery('(min-width: 1024px)') ?? false
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimateScrollCue = isDesktop && !prefersReducedMotion

  return (
    <section
      ref={ref}
      id="hero-section"
      className="relative w-full min-h-[92svh] flex items-center overflow-hidden grain"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      {/* Line grid - parallax on desktop only */}
      <motion.div
        style={{ y: isDesktop ? bgY : '0%' }}
        className="absolute inset-0 bg-line-grid pointer-events-none opacity-[0.18]"
        aria-hidden
      />

      {/* Violet radial glow - right side */}
      <motion.div
        style={{ y: isDesktop ? glowY : '0%' }}
        className="absolute pointer-events-none"
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <div style={GLOW_STYLES} />
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
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 65%)' }}
      />

      {/* Content - parallax on desktop only */}
      <motion.div
        style={{ y: isDesktop ? txtY : '0%' }}
        className="relative z-10 w-full container-site page-hero-safe pb-14 sm:pb-16 lg:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 sm:gap-8 max-w-[760px]">
            {/* Micro label */}
            <motion.div
              className="flex min-w-0 items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="h-px"
                style={{ width: '24px', backgroundColor: 'var(--color-violet)', opacity: 0.72 }}
              />
              <span
                className="min-w-0 font-mono uppercase leading-relaxed"
                style={{
                  fontSize: '0.6875rem',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.16em' }}
              >
                MTA · Rajasthan Technical Partner
              </span>
            </motion.div>

            {/* Trust Badges - Enhanced */}
            <motion.div
              className="hidden sm:flex sm:flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {TRUST_BADGES.map((item) => (
                <motion.span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono uppercase transition-all duration-300 hover:border-violet hover:bg-[rgba(var(--color-accent-rgb),0.12)]"
                  style={BADGE_BASE_STYLE}
                  whileHover={{ scale: 1.02 }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Statement - three lines */}
            <h1
              aria-label="We build digital infrastructure"
              className="flex max-w-full flex-col font-display font-black tracking-normal uppercase"
              style={{
                gap: '0.55rem',
                overflowWrap: 'break-word',
                hyphens: 'none',
                lineHeight: 0.94,
                fontSize: 'clamp(2rem, 7.5vw, 5.1rem)',
                color: 'var(--color-foreground)' }}
            >
              <span>We build</span>
              <span style={{ color: 'var(--color-violet)', paddingLeft: 'clamp(0px, 2vw, 20px)' }}>
                digital
              </span>
              <span style={{ fontSize: 'clamp(1.4rem, 5.5vw, 4.5rem)' }}>infrastructure</span>
            </h1>

            {/* Body */}
            <motion.p
              className="text-[15px] leading-relaxed max-w-[34rem]"
              style={{ color: 'var(--color-muted)' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Practical web, automation, security, and content support for teams that want direct
              communication with the people doing the work.
            </motion.p>

            {/* CTAs - Enhanced */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton
                href="/contact"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-5 font-display font-black text-[14px] sm:text-[15px] transition-all duration-300 min-h-[56px] sm:min-h-[60px] rounded-full"
                style={PRIMARY_BUTTON_STYLES}
              >
                <span>Book Discovery Workshop</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </MagneticButton>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/portfolio"
                  data-cursor="pointer"
                  className="group inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2 rounded-full border-2 px-7 sm:px-9 lg:px-10 py-4 sm:py-5 lg:py-5 text-[14px] sm:text-[15px] font-semibold transition-all duration-300 min-h-[56px] sm:min-h-[60px] hover:bg-[rgba(var(--color-accent-rgb),0.08)] hover:shadow-[0_4px_20px_rgba(var(--color-accent-rgb),0.15)]"
                  style={SECONDARY_BUTTON_STYLES}
                >
                  See Our Work
                  <span className="group-hover:translate-x-1 transition-transform inline-block duration-300">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats - Enhanced with colored indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              {STATS.map((stat) => (
                <motion.span
                  key={stat.label}
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-center transition-all duration-300 hover:scale-[1.02]"
                  style={BADGE_BASE_STYLE}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: stat.color }}
                  />
                  <span className="font-mono uppercase whitespace-nowrap text-[10px]">{stat.label}</span>
                </motion.span>
              ))}
            </motion.div>

            {/* Mobile service badges */}
            <div className="flex flex-wrap lg:hidden gap-2 pt-1">
              {SERVICES.map((s) => (
                <span
                  key={s}
                  className="rounded-full shrink-0 px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:border-violet/30 bg-[rgba(var(--color-accent-rgb),0.08)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right - orbital visual (desktop only) */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative min-h-[500px]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow behind orbital */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '65%',
                height: '65%',
                borderRadius: '9999px',
                background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 70%)',
                filter: 'blur(20px)' }}
            />
            <OrbitalRing />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-[clamp(1.5rem,4vw,3rem)] hidden lg:flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={SCROLL_ANIMATION}
        onClick={() => {
          const hero = document.getElementById('hero-section')
          if (hero) {
            window.scrollTo({
              top: hero.offsetHeight,
              behavior: 'smooth',
            })
          }
        }}
        aria-label="Scroll to content"
      >
        <div
          className="relative overflow-hidden"
          style={{ width: '1px', height: '56px', backgroundColor: 'var(--color-border)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ backgroundColor: 'var(--color-violet)', opacity: 0.8 }}
            animate={shouldAnimateScrollCue ? { height: ['0%', '100%'], top: ['0%', '100%'] } : { height: '100%', top: '0%' }}
            transition={shouldAnimateScrollCue ? { repeat: Infinity, duration: 2.2, ease: 'linear' } : { duration: 0 }}
          />
        </div>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: '0.625rem',
            color: 'var(--color-dead)',
            letterSpacing: '0.16em',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
      </motion.button>
    </section>
  )
}
