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

export function StatsSection() {
  return (
    <section 
      style={{ 
        backgroundColor: 'var(--color-canvas)', 
        padding: `${SPACING.section.md} 0`,
      }}
    >
      <div className="container-site">
        <motion.div
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ 
            duration: ANIMATION.duration.slow, 
            ease: ANIMATION.ease 
          }}
        >
          <div>
            <span 
              className="font-mono uppercase block mb-3" 
              style={{ 
                fontSize: TYPOGRAPHY.label, 
                color: BRAND.primary, 
                letterSpacing: '0.22em',
              }}
            >
              PROOF OF DELIVERY
            </span>
            <h2
              className="font-display font-black tracking-normal leading-[0.92]"
              style={{ 
                fontSize: TYPOGRAPHY.section, 
                color: 'var(--color-foreground)',
              }}
            >
              Small Team.<br />Real Output.
            </h2>
          </div>
          <p 
            style={{ 
              fontSize: TYPOGRAPHY.bodySm, 
              lineHeight: TYPOGRAPHY.leading.relaxed, 
              color: 'var(--color-muted)', 
              maxWidth: '460px',
            }}
          >
            The numbers below are deliberately small because the delivery model is small, direct, and accountable.
            Every project is handled by specialists, not a layer of account management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.article
              key={s.label}
              className="group relative overflow-hidden rounded-[24px] border border-border bg-card transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ 
                duration: ANIMATION.duration.normal, 
                delay: i * 0.08, 
                ease: ANIMATION.ease 
              }}
              style={{
                borderRadius: RADIUS.xl,
                transition: `all ${ANIMATION.duration.fast}s cubic-bezier(${ANIMATION.ease.join(',')})`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, ${BRAND.primary}, transparent 80%)` }}
                aria-hidden
              />

              <div className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <ScrambleCounter
                    target={s.value}
                    suffix={s.suffix}
                    className="font-display font-black leading-none tracking-normal"
                    style={{ 
                      fontSize: TYPOGRAPHY.hero, 
                      color: 'var(--color-foreground)',
                      lineHeight: TYPOGRAPHY.leading.tight,
                    }}
                  />
                  <span
                    className="font-mono uppercase tracking-[0.18em] rounded-full px-3 py-1 transition-all duration-300 group-hover:shadow-sm"
                    style={{
                      fontSize: TYPOGRAPHY.micro,
                      color: BRAND.primary,
                      border: `1px solid ${BRAND.primaryMedium}`,
                      backgroundColor: BRAND.primarySoft,
                      borderRadius: RADIUS.full,
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <div
                  className="mt-6 h-px w-10 transition-all duration-500 group-hover:w-16"
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
