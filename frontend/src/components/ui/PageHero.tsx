'use client'
import { motion } from 'framer-motion'
import { TextReveal } from '@/components/ui/TextReveal'
import Link from 'next/link'
import type { CSSProperties } from 'react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  label:              string
  title:              string
  subtitle?:          string
  subheading?:        string   // alias for subtitle — used by many pages
  breadcrumb?:        { label: string; href: string }[]
  breadcrumbCurrent?: string   // simple current page label
  breadcrumbBase?:    string   // parent section label
  breadcrumbBaseHref?: string  // parent section href
}

export function PageHero({
  label,
  title,
  subtitle,
  subheading,
  breadcrumb,
  breadcrumbCurrent,
  breadcrumbBase,
  breadcrumbBaseHref,
}: Props) {
  const description = subtitle ?? subheading

  // Build breadcrumb entries: explicit array > base+current > current only
  const crumbs: { label: string; href?: string }[] = breadcrumb
    ? breadcrumb
    : breadcrumbBase && breadcrumbCurrent
      ? [
          { label: 'Home', href: '/' },
          { label: breadcrumbBase, href: breadcrumbBaseHref },
          { label: breadcrumbCurrent },
        ]
      : breadcrumbCurrent
        ? [{ label: 'Home', href: '/' }, { label: breadcrumbCurrent }]
        : []

  return (
    <section className="w-full bg-canvas pt-[140px] pb-16 relative overflow-hidden grain">
      {/* Line grid background */}
      <div className="absolute inset-0 bg-line-grid pointer-events-none opacity-60" aria-hidden />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 font-mono text-label mb-8"
            style={{ color: 'var(--color-dead)' }}
          >
            {crumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {b.href ? (
                  <Link href={b.href} className="hover-foreground transition-colors">{b.label}</Link>
                ) : (
                  <span style={{ color: 'var(--color-muted)' }}>{b.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          className="font-mono text-label tracking-[0.22em] uppercase block mb-4"
          style={{ color: 'var(--color-violet-light)' }}
        >
          {label}
        </motion.span>

        {/* Title */}
        <TextReveal
          text={title}
          as="h1"
          delay={0.1}
          className="font-display font-black tracking-tight leading-[0.92]"
          style={{ fontSize: 'clamp(40px, 6vw, 88px)', color: 'var(--color-foreground)' } as CSSProperties}
        />

        {/* Subtitle */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="text-[17px] leading-[1.65] mt-6 max-w-2xl"
            style={{ color: 'var(--color-muted)' }}
          >
            {description}
          </motion.p>
        )}

        {/* Gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{ transformOrigin: 'left' }}
          className="divider-gradient mt-16"
        />
      </div>
    </section>
  )
}

export default PageHero
