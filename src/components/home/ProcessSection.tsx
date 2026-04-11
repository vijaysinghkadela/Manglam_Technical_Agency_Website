'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { leadToDeliveryPipeline } from '@/lib/data/research'
import { BRAND, ANIMATION, SPACING, TYPOGRAPHY, RADIUS } from '@/lib/design-system'

export function ProcessSection() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(56px, 9vw, 112px) 0' }}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: ANIMATION.ease }}
          className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-4 sm:gap-6 lg:gap-12 mb-10 lg:mb-14"
        >
          <div className="rounded-[28px] border border-border bg-card p-6 sm:p-8">
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

          <div className="rounded-[28px] border border-border bg-surface p-6 sm:p-8">
            <p className="font-mono uppercase mb-3" style={{ fontSize: '11px', color: BRAND.primary, letterSpacing: '0.22em' }}>
              HOW IT WORKS
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '520px' }}>
              The flow is designed to stay legible on mobile. Each row expands in place, keeping the user anchored
              while still exposing the actions, outputs, and legal controls behind the work.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {leadToDeliveryPipeline.map((stage, index) => {
            const isOpen = active === stage.stage

              return (
                <motion.article
                  key={stage.stage}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.03, ease: ANIMATION.ease }}
                  className="overflow-hidden rounded-[24px] border border-border bg-card"
                >
                  <button
                    onClick={() => setActive(isOpen ? null : stage.stage)}
                    className="w-full flex items-start gap-4 sm:gap-6 text-left transition-colors duration-200 px-5 sm:px-6 py-5 sm:py-6 touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                    aria-expanded={isOpen}
                    aria-controls={`process-stage-${stage.stage}`}
                  >
                    <span
                    className="font-black leading-none font-mono shrink-0 transition-colors duration-400"
                    style={{
                      fontSize: 'clamp(28px, 4.5vw, 52px)',
                      color: isOpen ? BRAND.primary : 'var(--color-border)',
                      minWidth: '76px',
                    }}
                  >
                    {String(stage.stage).padStart(2, '0')}
                  </span>

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
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 border-t border-border px-5 sm:px-6 py-5 sm:py-6"
                        style={{ backgroundColor: 'var(--color-surface)' }}
                      >
                        <div className="rounded-[20px] border border-border bg-canvas p-4 sm:p-5">
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

                        <div className="rounded-[20px] border border-border bg-canvas p-4 sm:p-5">
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

                        <div className="rounded-[20px] border border-border bg-canvas p-4 sm:p-5">
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
                                    border: '1px solid rgba(107,26,26,0.20)',
                                    color: BRAND.primary,
                                    backgroundColor: 'rgba(107,26,26,0.04)',
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
    </section>
  )
}

