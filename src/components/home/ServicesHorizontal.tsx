'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/lib/data/services'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BRAND, ANIMATION, SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '@/lib/design-system'

const CARD_W = 372
const SIDE_PAD = 96

export function ServicesHorizontal() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const reducedMotion = useReducedMotion()
  const [vpW, setVpW] = useState(1280)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    setTimeout(() => {
      if (isMountedRef.current) setVpW(window.innerWidth)
    }, 0)

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const fn = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (isMountedRef.current) {
          setVpW(window.innerWidth)
        }
      }, 200)
    }

    window.addEventListener('resize', fn, { passive: true })
    return () => {
      isMountedRef.current = false
      window.removeEventListener('resize', fn)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const trackW = CARD_W * services.length
  const scrollDist = Math.max(trackW - (vpW - SIDE_PAD), 0)
  const sectionHeight = `calc(100vh + ${scrollDist}px)`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0px', `-${scrollDist}px`])

  if (isMobile || reducedMotion) {
    return (
      <section 
        ref={sectionRef} 
        style={{ 
          borderTop: '1px solid var(--color-border)', 
          position: 'relative',
          padding: `${SPACING.section.md} 0`,
        }}
      >
        <div className="container-site">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionLabel />
            <div 
              className="rounded-[28px] border border-border bg-card p-5 sm:p-6 transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderRadius: RADIUS['2xl'],
                boxShadow: SHADOW.sm,
                transition: `box-shadow ${ANIMATION.duration.fast}s ease`,
              }}
            >
              <p 
                className="text-sm sm:text-base leading-relaxed" 
                style={{ 
                  color: 'var(--color-muted)',
                  lineHeight: TYPOGRAPHY.leading.relaxed,
                }}
              >
                Tap any card to open a dedicated service page. On mobile, the stack stays readable and tactile instead of
                compressing into a tiny carousel.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Readable on phone', 'Direct service detail', 'No cramped swipe rail'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono uppercase transition-all duration-200 hover:border-[#6B1A1A]/30"
                    style={{ 
                      fontSize: TYPOGRAPHY.micro, 
                      color: 'var(--color-dead)', 
                      letterSpacing: '0.16em',
                      borderRadius: RADIUS.full,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-12">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ 
                  duration: ANIMATION.duration.normal, 
                  delay: i * 0.06, 
                  ease: ANIMATION.ease 
                }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="link"
                  className="group flex flex-col rounded-[24px] border border-border bg-card p-5 sm:p-6 transition-all duration-300 active:scale-[0.98] touch-manipulation hover:shadow-md"
                  style={{ 
                    touchAction: 'manipulation',
                    borderRadius: RADIUS.xl,
                    transition: `all ${ANIMATION.duration.fast}s cubic-bezier(${ANIMATION.ease.join(',')})`,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BRAND.primary }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)' }}
                >
                  <div
                    className="mb-4 h-px w-full"
                    style={{ background: `linear-gradient(90deg, ${BRAND.primary}, transparent 85%)` }}
                    aria-hidden
                  />
                  <div className="flex justify-between items-start">
                    <div
                      className="w-11 h-11 flex items-center justify-center border transition-all duration-300 group-hover:border-[#6B1A1A]/60 rounded-2xl group-hover:shadow-sm"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        borderRadius: RADIUS.md,
                      }}
                    >
                      <s.Icon 
                        className="w-4 h-4 transition-colors duration-300 group-hover:text-[#6B1A1A]" 
                        style={{ color: 'var(--color-muted)' }} 
                      />
                    </div>
                    <span
                      className="font-display font-black text-2xl sm:text-3xl leading-none transition-colors duration-500 group-hover:text-[#6B1A1A]"
                      style={{ 
                        color: 'var(--color-dead)', 
                        opacity: 0.6,
                        fontSize: TYPOGRAPHY.hero,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 
                    className="font-display font-bold mt-3 sm:mt-4 leading-tight" 
                    style={{ 
                      fontSize: TYPOGRAPHY.subsection, 
                      color: 'var(--color-foreground)',
                      lineHeight: TYPOGRAPHY.leading.tight,
                    }}
                  >
                    {s.name}
                  </h3>
                  <p 
                    className="text-sm mt-1.5 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none" 
                    style={{ 
                      color: 'var(--color-muted)',
                      lineHeight: TYPOGRAPHY.leading.relaxed,
                    }}
                  >
                    {s.tagline}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {s.features.slice(0, 2).map((f) => (
                      <li 
                        key={f} 
                        className="flex items-start gap-2 text-sm leading-relaxed" 
                        style={{ color: 'var(--color-dead)' }}
                      >
                        <span style={{ color: BRAND.primary, marginTop: '2px' }}>•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p 
                    className="font-mono text-[10px] sm:text-xs mt-2 sm:mt-3" 
                    style={{ color: BRAND.primary }}
                  >
                    {s.priceLabel}
                  </p>
                  <span 
                    className="text-sm mt-3 inline-flex items-center gap-1 min-h-[44px] transition-colors duration-200 group-hover:text-[#6B1A1A]" 
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Explore <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      style={{ 
        height: sectionHeight, 
        position: 'relative', 
        width: '100%',
      }}
      aria-label="Our Services"
    >
      <div
        className="flex flex-col overflow-hidden"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          backgroundColor: 'var(--color-canvas)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div 
          className="flex items-end justify-between shrink-0 pt-24 lg:pt-28 xl:pt-32 pb-10 lg:pb-12 container-site w-full"
        >
          <SectionLabel />
          <span 
            className="font-mono tracking-[0.2em]" 
            style={{ 
              fontSize: TYPOGRAPHY.label, 
              color: 'var(--color-muted)' 
            }}
          >
            {String(services.length).padStart(2, '0')} SERVICES
          </span>
        </div>

        <div className="flex-1 overflow-hidden min-h-0 flex items-stretch container-site w-full">
          <motion.div
            style={{ x, width: `${trackW}px`, flexShrink: 0 }}
            className="flex items-stretch"
          >
            {services.map((s, i) => (
              <SpotlightCard
                key={s.slug}
                style={{
                  width: `clamp(340px, 28vw, ${CARD_W}px)`,
                  flexShrink: 0,
                  borderRight: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-card)',
                  ...(i === 0 ? { borderLeft: '1px solid var(--color-border)' } : {}),
                }}
                className="relative flex flex-col group rounded-[28px] overflow-hidden"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#6B1A1A] transition-transform duration-500 origin-bottom scale-y-0 group-hover:scale-y-100"
                  style={{ transition: `transform ${ANIMATION.duration.slow}s cubic-bezier(${ANIMATION.ease.join(',')})` }}
                />
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="link"
                  className="flex flex-col h-full p-8 xl:p-10"
                >
                  <span
                    className="font-display font-black leading-none select-none transition-colors duration-500 group-hover:text-[#6B1A1A]"
                    style={{ 
                      fontSize: 'clamp(4rem, 7vw, 5.25rem)', 
                      color: 'var(--color-dead)',
                      lineHeight: TYPOGRAPHY.leading.tight,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div
                    className="w-11 h-11 flex items-center justify-center mt-5 border transition-all duration-300 group-hover:border-[#6B1A1A]/50 rounded-2xl group-hover:shadow-sm"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      borderRadius: RADIUS.md,
                    }}
                  >
                    <s.Icon
                      className="w-5 h-5 transition-colors duration-300 group-hover:text-[#6B1A1A]"
                      style={{ color: 'var(--color-muted)' }}
                    />
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <h3 
                      className="font-display font-bold leading-tight" 
                      style={{ 
                        fontSize: TYPOGRAPHY.subsection, 
                        color: 'var(--color-foreground)',
                        lineHeight: TYPOGRAPHY.leading.tight,
                      }}
                    >
                      {s.name}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed" 
                      style={{ 
                        color: 'var(--color-muted)',
                        lineHeight: TYPOGRAPHY.leading.relaxed,
                      }}
                    >
                      {s.tagline}
                    </p>
                    <ul className="flex flex-col gap-2 mt-1">
                      {s.features.slice(0, 3).map((f) => (
                        <li 
                          key={f} 
                          className="font-mono text-sm" 
                          style={{ color: 'var(--color-dead)' }}
                        >
                          — {f}
                        </li>
                      ))}
                    </ul>
                    <p 
                      className="font-mono text-xs" 
                      style={{ color: BRAND.primary }}
                    >
                      {s.priceLabel}
                    </p>
                    <span 
                      className="text-sm inline-flex items-center gap-1 mt-1 transition-colors duration-200 group-hover:text-[#6B1A1A]" 
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Explore Service
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>

        <div 
          className="shrink-0 max-w-[1440px] mx-auto px-6 lg:px-12 w-full h-px" 
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          <motion.div 
            className="h-full origin-left" 
            style={{ scaleX: scrollYProgress, backgroundColor: BRAND.primary }} 
          />
        </div>
        <div className="shrink-0 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-3 flex items-center justify-between">
          <span 
            className="font-mono uppercase" 
            style={{ 
              fontSize: TYPOGRAPHY.micro, 
              color: 'var(--color-dead)',
              letterSpacing: '0.22em',
            }}
          >
            ← scroll to explore all services →
          </span>
          <motion.span
            className="font-mono tracking-[0.16em]"
            style={{ 
              fontSize: TYPOGRAPHY.micro, 
              color: BRAND.primary 
            }}
          >
            {services.length} SERVICES
          </motion.span>
        </div>
      </div>
    </section>
  )
}

function SectionLabel() {
  return (
    <div>
      <span 
        className="font-mono uppercase block mb-2" 
        style={{ 
          fontSize: TYPOGRAPHY.label, 
          color: BRAND.primary, 
          letterSpacing: '0.22em',
        }}
      >
        WHAT WE DO
      </span>
      <h2 
        className="font-display font-black leading-[0.92] tracking-normal" 
        style={{ 
          fontSize: TYPOGRAPHY.section, 
          color: 'var(--color-foreground)',
          lineHeight: TYPOGRAPHY.leading.tight,
        }}
      >
        Services That<br />Scale With You
      </h2>
    </div>
  )
}
