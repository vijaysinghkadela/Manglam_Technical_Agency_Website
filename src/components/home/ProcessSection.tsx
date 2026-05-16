'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { leadToDeliveryPipeline } from '@/lib/data/research'
import { BRAND, ANIMATION } from '@/lib/design-system'

const stageIcons = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']

export function ProcessSection() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(72px, 10vw, 128px) 0' }}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: ANIMATION.ease }}
          className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-6 sm:gap-8 lg:gap-14 mb-12 lg:mb-16"
        >
          <div className="rounded-[28px] border border-border bg-card p-8 sm:p-10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-[3px] h-full"
              style={{ background: `linear-gradient(180deg, ${BRAND.primary}, transparent)` }}
            />
            <span
              className="font-mono uppercase block mb-3"
              style={{ fontSize: '11px', color: BRAND.primary, letterSpacing: '0.22em' }}
            >
              LEAD TO DELIVERY
            </span>
            <h2
              className="font-display font-black leading-[0.92] tracking-normal"
              style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3rem)', color: 'var(--color-foreground)' }}
            >
              Ten stages.<br />One accountable system.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.72]" style={{ color: 'var(--color-muted)' }}>
              The pipeline is contract-governed from first sensitive interaction to handover and retention.
              Each stage has a trigger, outputs, and control boundaries.
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-card p-8 sm:p-10 relative">
            <div
              className="absolute top-0 right-0 w-[3px] h-full"
              style={{ background: `linear-gradient(180deg, transparent, ${BRAND.primary})` }}
            />
            <p className="font-mono uppercase mb-3" style={{ fontSize: '11px', color: BRAND.primary, letterSpacing: '0.22em' }}>
              STAGE {active !== null ? String(active).padStart(2, '0') : '—'} OF 10
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '520px' }}>
              {active !== null
                ? leadToDeliveryPipeline.find(s => s.stage === active)?.title ?? 'Select a stage'
                : 'Tap any stage below to explore its actions, outputs, and legal controls.'}
            </p>
          </div>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-[38px] top-0 bottom-0 w-[1px] hidden md:block"
            style={{ backgroundColor: 'var(--color-border)', opacity: 0.5 }}
          />

          <div className="flex flex-col gap-3">
            {leadToDeliveryPipeline.map((stage, index) => {
              const isOpen = active === stage.stage

              return (
                <motion.article
                  key={stage.stage}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.03, ease: ANIMATION.ease }}
                  className={`overflow-hidden rounded-[24px] border transition-all duration-300`}
                  style={{
                    borderColor: isOpen ? `color-mix(in srgb, ${BRAND.primary} 40%, var(--color-border))` : 'var(--color-border)',
                    backgroundColor: 'var(--color-card)',
                    boxShadow: isOpen
                      ? `0 0 0 1px color-mix(in srgb, ${BRAND.primary} 12%, transparent), 0 8px 24px rgba(0,0,0,0.06)`
                      : 'none',
                  }}
                >
                  <button
                    onClick={() => setActive(isOpen ? null : stage.stage)}
                    className="w-full flex items-start gap-4 sm:gap-6 text-left transition-colors duration-200 px-6 sm:px-8 py-6 sm:py-8 touch-manipulation relative"
                    style={{ touchAction: 'manipulation' }}
                    aria-expanded={isOpen}
                    aria-controls={`process-stage-${stage.stage}`}
                  >
                    <div className="relative shrink-0" style={{ minWidth: '76px' }}>
                      <span
                        className="font-black leading-none font-mono block transition-colors duration-400"
                        style={{
                          fontSize: 'clamp(28px, 4.5vw, 52px)',
                          color: isOpen ? BRAND.primary : 'var(--color-dead)',
                        }}
                      >
                        {stageIcons[index]}
                      </span>
                      <span
                        className={`hidden md:block absolute -left-[22px] top-1/2 w-[12px] h-[12px] rounded-full border-2 transition-all duration-300`}
                        style={{
                          backgroundColor: isOpen ? BRAND.primary : 'var(--color-card)',
                          borderColor: isOpen ? BRAND.primary : 'var(--color-border)',
                          transform: 'translateY(-50%)',
                          boxShadow: isOpen ? `0 0 0 4px color-mix(in srgb, ${BRAND.primary} 20%, transparent)` : 'none',
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3
                          className="font-display font-bold transition-colors duration-200"
                          style={{
                            fontSize: 'clamp(17px, 2.2vw, 26px)',
                            color: isOpen ? 'var(--color-foreground)' : 'var(--color-muted)',
                          }}
                        >
                          {stage.title}
                        </h3>
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '10px', color: BRAND.primary, letterSpacing: '0.16em' }}
                        >
                          {isOpen ? 'Open' : 'Tap to expand'}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--color-dead)', lineHeight: 1.6 }}>
                        {stage.trigger}
                      </p>
                    </div>

                    <motion.span
                      className="font-mono text-2xl shrink-0"
                      style={{ color: isOpen ? BRAND.primary : 'var(--color-dead)', paddingTop: '2px' }}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: ANIMATION.ease }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`process-stage-${stage.stage}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 border-t px-6 sm:px-8 py-6 sm:py-8"
                          style={{
                            borderColor: 'var(--color-border)',
                            backgroundColor: 'var(--color-surface)',
                          }}
                        >
                            <div className="rounded-[20px] border border-border bg-card p-5 sm:p-6">
                              <p className="font-mono uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.18em', color: BRAND.primary }}>
                                Actions
                              </p>
                              <ul className="space-y-2">
                                {stage.actions.map((item) => (
                                  <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-muted)' }}>
                                    <span style={{ color: BRAND.primary, opacity: 0.7, marginTop: '2px', fontSize: '10px' }}>▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="rounded-[20px] border border-border bg-card p-5 sm:p-6">
                              <p className="font-mono uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.18em', color: BRAND.primary }}>
                                Outputs
                              </p>
                              <ul className="space-y-2">
                                {stage.outputs.map((item) => (
                                  <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-muted)' }}>
                                    <span style={{ color: BRAND.primary, opacity: 0.7, marginTop: '2px', fontSize: '10px' }}>▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="rounded-[20px] border border-border bg-card p-5 sm:p-6">
                            <p className="font-mono uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.18em', color: BRAND.primary }}>
                              Control
                            </p>
                            <p
                              className="text-[13px] leading-relaxed mb-4"
                              style={{
                                color: 'var(--color-muted)',
                                borderLeft: `2px solid ${BRAND.primary}`,
                                paddingLeft: '12px',
                              }}
                            >
                              {stage.control}
                            </p>
                            {stage.legalInstruments.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {stage.legalInstruments.map((instrument) => (
                                  <span
                                    key={instrument}
                                    className="font-mono text-[10px] px-2 py-1 rounded-full"
                                    style={{
                                      border: `1px solid color-mix(in srgb, ${BRAND.primary} 20%, transparent)`,
                                      color: BRAND.primary,
                                      backgroundColor: `color-mix(in srgb, ${BRAND.primary} 6%, transparent)`,
                                    }}
                                  >
                                    {instrument}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
