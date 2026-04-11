'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { TextReveal } from '@/components/ui/TextReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import {
  BRAND,
  ANIMATION,
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOW,
  GRADIENT,
} from '@/lib/design-system'

const OrbitalRing = dynamic(() => import('@/components/home/OrbitalRing'), { ssr: false })

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
  { label: 'Udyam-registered delivery partner', color: '#3b82f6' },
  { label: 'Boutique execution, senior oversight', color: BRAND.primary },
]

// Stats with status indicators - module level to prevent re-creation
const STATS = [
  { label: '3 Active Clients', color: '#10b981' },
  { label: '2 Internal SaaS', color: '#3b82f6' },
  { label: 'Udyam 2025', color: BRAND.primary },
  { label: 'Bikaner, RJ', color: '#f59e0b' },
]

// Pre-defined styles to prevent re-creation
const GLOW_STYLES = {
  position: 'absolute' as const,
  right: '-5%',
  top: '5%',
  width: 'clamp(300px, 45vw, 900px)',
  height: 'clamp(300px, 45vw, 900px)',
  borderRadius: RADIUS.full,
  background: GRADIENT.glow,
  filter: 'blur(60px)',
}

const PRIMARY_BUTTON_STYLES = {
  background: GRADIENT.brand,
  color: 'white',
  borderRadius: RADIUS.full,
  boxShadow: `${SHADOW.lg}, 0 0 0 1px rgba(255,255,255,0.1) inset`,
}

const SECONDARY_BUTTON_STYLES = {
  color: BRAND.primary,
  borderColor: BRAND.primary,
  background: 'transparent',
  borderRadius: RADIUS.full,
}

const BADGE_BASE_STYLE = {
  fontSize: TYPOGRAPHY.micro,
  color: 'var(--color-muted)',
  letterSpacing: TYPOGRAPHY.tracking.wider,
  borderColor: 'var(--color-border)',
  background: GRADIENT.brandSoft,
  borderRadius: RADIUS.full,
  boxShadow: SHADOW.sm,
}

const SCROLL_ANIMATION = {
  duration: ANIMATION.duration.normal,
  delay: 1.5,
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const txtY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const isDesktop = useMediaQuery('(min-width: 1024px)') ?? false

  return (
    <section
      ref={ref}
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
        transition={{ duration: ANIMATION.duration.reveal, delay: 0.3 }}
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
          borderRadius: RADIUS.full,
          background: `radial-gradient(circle, ${BRAND.primarySoft} 0%, transparent 65%)`,
        }}
      />

      {/* Content - parallax on desktop only */}
      <motion.div
        style={{ y: isDesktop ? txtY : '0%' }}
        className="relative z-10 w-full container-site pt-[88px] sm:pt-[108px] lg:pt-[112px] pb-10 sm:pb-12 lg:pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-5 sm:gap-6 max-w-[760px]">
            {/* Micro label */}
            <motion.div
              className="flex min-w-0 items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: ANIMATION.duration.slow, delay: 0.05, ease: ANIMATION.ease }}
            >
              <span
                className="h-px"
                style={{ width: '24px', backgroundColor: BRAND.primary, opacity: 0.72 }}
              />
              <span
                className="min-w-0 font-mono uppercase leading-relaxed"
                style={{
                  fontSize: TYPOGRAPHY.label,
                  color: 'var(--color-muted)',
                  letterSpacing: TYPOGRAPHY.tracking.wider,
                }}
              >
                MTA · Rajasthan Technical Partner
              </span>
            </motion.div>

            {/* Trust Badges - Enhanced */}
            <motion.div
              className="hidden sm:flex sm:flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ANIMATION.duration.normal, delay: 0.12, ease: ANIMATION.ease }}
            >
              {TRUST_BADGES.map((item) => (
                <motion.span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono uppercase transition-all duration-300 hover:border-[#6B1A1A] hover:bg-[rgba(107,26,26,0.12)]"
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
            <div
              className="flex flex-col max-w-full"
              style={{ gap: SPACING.gap.sm, overflowWrap: 'break-word', hyphens: 'none' }}
            >
              <TextReveal
                text="WE BUILD"
                as="h1"
                delay={0.25}
                className="font-display text-[2.55rem] font-black sm:text-[4.1rem] lg:text-[5.1rem]"
                style={{
                  lineHeight: TYPOGRAPHY.leading.tight,
                  letterSpacing: TYPOGRAPHY.tracking.normal,
                  color: 'var(--color-foreground)',
                  overflowWrap: 'anywhere',
                }}
              />
              <TextReveal
                text="DIGITAL"
                as="h1"
                delay={0.35}
                className="font-display text-[2.55rem] font-black sm:text-[4.1rem] lg:text-[5.1rem] pl-[clamp(0px,2vw,20px)]"
                style={{
                  lineHeight: TYPOGRAPHY.leading.tight,
                  letterSpacing: TYPOGRAPHY.tracking.normal,
                  color: BRAND.primary,
                  overflowWrap: 'anywhere',
                }}
              />
              <TextReveal
                text="INFRASTRUCTURE"
                as="h1"
                delay={0.45}
                className="font-display text-[1.85rem] font-black sm:text-[3rem] lg:text-[3.8rem]"
                style={{
                  lineHeight: 0.96,
                  letterSpacing: TYPOGRAPHY.tracking.normal,
                  color: 'var(--color-foreground)',
                  overflowWrap: 'anywhere',
                }}
              />
            </div>

            {/* Body */}
            <motion.p
              className="text-[15px] leading-relaxed max-w-[34rem]"
              style={{ color: 'var(--color-muted)' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ANIMATION.duration.slow, delay: 0.7, ease: ANIMATION.ease }}
            >
              Delivering the output quality of a larger enterprise firm at the responsiveness
              and accountability of a boutique 3–4 professional team.
            </motion.p>

            {/* CTAs - Enhanced */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ANIMATION.duration.slow, delay: 0.85, ease: ANIMATION.ease }}
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
                  className="group inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2 rounded-full border-2 px-7 sm:px-9 lg:px-10 py-4 sm:py-5 lg:py-5 text-[14px] sm:text-[15px] font-semibold transition-all duration-300 min-h-[56px] sm:min-h-[60px] hover:bg-[rgba(107,26,26,0.08)] hover:shadow-[0_4px_20px_rgba(107,26,26,0.15)]"
                  style={SECONDARY_BUTTON_STYLES}
                >
                  See Our Work
                  <span className="group-hover:translate-x-1 transition-transform inline-block duration-300">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats - Enhanced with colored indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: ANIMATION.duration.normal, delay: 1.1 }}
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
                  className="rounded-full shrink-0 px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:border-[#6B1A1A]/30 bg-[rgba(107,26,26,0.08)] border border-[var(--color-border)] text-[var(--color-foreground)]"
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
            transition={{ duration: 1.1, delay: 0.4, ease: ANIMATION.ease }}
          >
            {/* Glow behind orbital */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '65%',
                height: '65%',
                borderRadius: RADIUS.full,
                background: `radial-gradient(circle, ${BRAND.primarySoft} 0%, transparent 70%)`,
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
        transition={SCROLL_ANIMATION}
      >
        <div
          className="relative overflow-hidden"
          style={{ width: '1px', height: '56px', backgroundColor: 'var(--color-border)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ backgroundColor: BRAND.primary, opacity: 0.8 }}
            animate={{ height: ['0%', '100%'], top: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
          />
        </div>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: TYPOGRAPHY.micro,
            color: 'var(--color-dead)',
            letterSpacing: TYPOGRAPHY.tracking.wider,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
