'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/data/services'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Badge from '@/components/ui/Badge'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion()
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')
  const animateCards = !prefersReducedMotion && !isTouchDevice

  return (
    <section className="section border-t border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-site">
        <div className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span
              className="font-mono uppercase block mb-3"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              CORE SERVICE TRACKS
            </span>
            <h2
              className="font-display font-black tracking-normal leading-none"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', color: 'var(--color-foreground)' }}
            >
              Built to move from strategy to delivery without bloat.
            </h2>
            <p
              className="mt-5 max-w-[58ch] text-[15px] leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Transparent pricing, contract-bound delivery, and service cards that stay readable on phones,
              tablets, and large desktops.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {['Transparent pricing', 'Mobile-first layouts', 'Low-motion defaults'].map((chip) => (
              <Badge key={chip} variant="subtle" size="sm">
                {chip}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => {
            const num = String(idx + 1).padStart(2, '0')
            return (
              <motion.div
                key={service.slug}
                initial={animateCards ? { opacity: 0, y: 22 } : false}
                whileInView={animateCards ? { opacity: 1, y: 0 } : undefined}
                viewport={animateCards ? { once: true, margin: '-20px' } : undefined}
                transition={animateCards ? { duration: 0.45, delay: (idx % 3) * 0.05, ease: EASE } : undefined}
                className="relative"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '340px 320px' }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[30px] border border-border bg-card p-8 shadow-[0_18px_60px_rgba(0,0,0,0.04)] transition-all duration-300 sm:p-10"
                  data-cursor="link"
                >
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(var(--color-accent-rgb),0.08),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface transition-colors duration-300 group-hover:border-violet/30 group-hover:bg-[rgba(var(--color-accent-rgb),0.08)]"
                      >
                        <service.Icon
                          className="h-5 w-5 transition-colors duration-300 group-hover:text-violet-light"
                          style={{ color: 'var(--color-muted)' }}
                        />
                      </span>
                      <div>
                        <span
                          className="font-mono uppercase block"
                          style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                        >
                          {num}
                        </span>
                        <h3
                          className="mt-1 font-display font-bold leading-tight transition-colors duration-300 group-hover:text-violet-light"
                          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.3rem)', color: 'var(--color-foreground)', lineHeight: 1.15 }}
                        >
                          {service.name}
                        </h3>
                      </div>
                    </div>
                    <Badge
                      variant="subtle"
                      size="sm"
                      className="text-violet-light"
                    >
                      {service.priceLabel}
                    </Badge>
                  </div>

                  <p className="relative mt-5 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {service.tagline}
                  </p>

                  <div className="relative mt-6 flex flex-wrap gap-2.5">
                    {service.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="subtle" size="sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="relative mt-auto flex items-center justify-between gap-4 border-t border-border pt-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--color-violet-light)' }}>
                      View details
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 group-hover:border-violet group-hover:bg-violet">
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-colors duration-300 group-hover:text-white"
                        style={{ color: 'var(--color-muted)' }}
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
