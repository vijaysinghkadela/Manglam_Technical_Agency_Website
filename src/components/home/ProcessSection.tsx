'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { leadToDeliveryPipeline } from '@/lib/data/research'

export function ProcessSection() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(48px, 8vw, 80px) 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10 lg:mb-14">
          <div>
            <span
              className="font-mono uppercase block mb-3"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              LEAD TO DELIVERY
            </span>
            <h2 className="font-display font-black text-white leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}>
              Ten Stages.<br />One Accountable System.
            </h2>
          </div>
          <p className="self-end" style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-muted)', maxWidth: '460px' }}>
            The pipeline is contract-governed from first sensitive interaction to handover and retention. Each stage has a trigger,
            outputs, and control boundaries.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {leadToDeliveryPipeline.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setActive(active === stage.stage ? null : stage.stage)}
                className="w-full flex items-start gap-6 lg:gap-10 py-5 text-left group transition-colors duration-200"
                style={{ padding: '18px 8px', margin: '0 -8px' }}
              >
                <span
                  className="font-black leading-none font-mono shrink-0 transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(24px, 4vw, 42px)',
                    color: active === stage.stage ? 'rgba(124,58,237,0.45)' : 'var(--color-border)',
                    minWidth: '72px',
                    paddingTop: '4px',
                  }}
                >
                  {String(stage.stage).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display font-bold transition-colors duration-200"
                    style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', color: active === stage.stage ? '#FAFAFA' : 'var(--color-muted)' }}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--color-muted)' }}>
                    {stage.trigger}
                  </p>
                </div>

                <span
                  className="font-mono text-xl shrink-0 transition-all duration-200"
                  style={{
                    color: active === stage.stage ? 'var(--color-violet)' : 'var(--color-dead)',
                    transform: active === stage.stage ? 'rotate(45deg)' : 'rotate(0deg)',
                    paddingTop: '2px',
                  }}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {active === stage.stage && (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ padding: '0 8px 20px', paddingLeft: 'clamp(16px, 8vw, 80px)' }}>
                      <div>
                        <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--color-dead)' }}>
                          Actions
                        </p>
                        <ul className="space-y-2">
                          {stage.actions.map((item) => (
                            <li key={item} className="text-sm" style={{ color: 'var(--color-muted)' }}>
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--color-dead)' }}>
                          Outputs
                        </p>
                        <ul className="space-y-2">
                          {stage.outputs.map((item) => (
                            <li key={item} className="text-sm" style={{ color: 'var(--color-muted)' }}>
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--color-dead)' }}>
                          Control
                        </p>
                        <p
                          className="text-[13px] leading-relaxed mb-3"
                          style={{
                            color: 'var(--color-muted)',
                            borderLeft: '2px solid var(--color-violet)',
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
                                className="font-mono text-[10px] px-2 py-1"
                                style={{ border: '1px solid rgba(124,58,237,0.35)', color: 'var(--color-violet-light)' }}
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

              <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
