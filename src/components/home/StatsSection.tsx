'use client'
import { motion } from 'framer-motion'
import { ScrambleCounter } from '@/components/ui/ScrambleCounter'
import { BRAND, ANIMATION, SPACING, TYPOGRAPHY, RADIUS } from '@/lib/design-system'

const STATS = [
  { value: 3, suffix: '', label: 'ACTIVE CLIENTS', sub: 'tracked in Clients MOC' },
  { value: 2, suffix: '', label: 'INTERNAL SAAS PRODUCTS', sub: 'FitNexora & Fuxk_Scroll' },
  { value: 6, suffix: '', label: 'PRACTICE AREAS', sub: 'integrated service model' },
  { value: 2025, suffix: '', label: 'UDYAM REGISTERED', sub: 'UDYAM-RJ-15-0094091' },
]

const cardBg = (i: number) =>
  i % 2 === 0
    ? 'radial-gradient(145% 120% at 0% 0%, rgba(107,26,26,0.04) 0%, transparent 60%)'
    : 'radial-gradient(145% 120% at 100% 100%, rgba(107,26,26,0.04) 0%, transparent 60%)'

export function StatsSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-canvas)',
        padding: `${SPACING.section.md} 0`,
        position: 'relative',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute top-0 right-0 w-[640px] h-[640px] opacity-[0.03]"
          style={{
            background: `radial-gradient(circle, ${BRAND.primary} 0%, transparent 70%)`,
            transform: 'translate(30%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[480px] h-[480px] opacity-[0.03]"
          style={{
            background: `radial-gradient(circle, ${BRAND.primary} 0%, transparent 70%)`,
            transform: 'translate(-20%, 20%)',
          }}
        />
      </div>

      <div className="container-site">
        <motion.div
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: ANIMATION.duration.slow,
            ease: ANIMATION.ease,
          }}
        >
          <div>
            <span
              className="font-mono uppercase block mb-4"
              style={{
                fontSize: TYPOGRAPHY.label,
                color: BRAND.primary,
                letterSpacing: '0.22em',
              }}
            >
              PROOF OF DELIVERY
            </span>
            <h2
              className="font-display font-black tracking-normal"
              style={{
                fontSize: TYPOGRAPHY.section,
                color: 'var(--color-foreground)',
                lineHeight: 0.92,
              }}
            >
              Small Team.<br />Real Output.
            </h2>
          </div>
          <p
            className="max-w-[440px]"
            style={{
              fontSize: TYPOGRAPHY.bodySm,
              lineHeight: TYPOGRAPHY.leading.relaxed,
              color: 'var(--color-muted)',
            }}
          >
            The numbers below are deliberately small because the delivery model is small, direct, and accountable.
            Every project is handled by specialists, not a layer of account management.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.article
              key={s.label}
              className="group relative overflow-hidden rounded-[24px] border border-border bg-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: ANIMATION.duration.normal,
                delay: i * 0.1,
                ease: ANIMATION.ease,
              }}
              style={{
                borderRadius: RADIUS.xl,
                backgroundImage: cardBg(i),
                transition: `all ${ANIMATION.duration.fast}s cubic-bezier(${ANIMATION.ease.join(',')})`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = cardBg(i).replace('0.04', '0.08')
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage = cardBg(i)
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, ${BRAND.primary}, transparent 80%)` }}
                aria-hidden
              />

              <span
                className="absolute -top-3 -right-3 font-display font-black select-none pointer-events-none leading-none"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 7rem)',
                  color: BRAND.primary,
                  opacity: 0.04,
                }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em] rounded-full px-3 py-1"
                    style={{
                      color: BRAND.primary,
                      border: `1px solid ${BRAND.primaryMedium}`,
                      backgroundColor: BRAND.primarySoft,
                      borderRadius: RADIUS.full,
                    }}
                  >
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <ScrambleCounter
                  target={s.value}
                  suffix={s.suffix}
                  className="font-display font-black leading-none tracking-normal mt-6"
                  style={{
                    fontSize: TYPOGRAPHY.display,
                    lineHeight: TYPOGRAPHY.leading.tight,
                    background: `linear-gradient(135deg, var(--color-foreground) 40%, ${BRAND.primaryLight} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                />

                <div
                  className="mt-5 h-px w-10 transition-all duration-500 group-hover:w-16"
                  style={{ backgroundColor: BRAND.primary, opacity: 0.72 }}
                />

                <p
                  className="mt-4 font-mono uppercase"
                  style={{
                    fontSize: TYPOGRAPHY.label,
                    color: 'var(--color-muted)',
                    letterSpacing: '0.18em',
                  }}
                >
                  {s.label}
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{
                    color: 'var(--color-dead)',
                    lineHeight: TYPOGRAPHY.leading.normal,
                  }}
                >
                  {s.sub}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
