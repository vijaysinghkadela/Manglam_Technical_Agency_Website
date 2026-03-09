'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { leadToDeliveryPipeline } from '@/lib/data/research'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

export function ProcessSection() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(56px, 9vw, 96px) 0' }}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-12 lg:mb-16"
        >
          <div>
            <span
              className="font-mono uppercase block mb-3"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              LEAD TO DELIVERY
            </span>
            <h2
              className="font-display font-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}
            >
              Ten Stages.<br />One Accountable System.
            </h2>
          </div>
          <p className="self-end" style={{ fontSize: '15px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '460px' }}>
            The pipeline is contract-governed from first sensitive interaction to handover and
            retention. Each stage has a trigger, outputs, and control boundaries.
          </p>
        </motion.div>

        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {leadToDeliveryPipeline.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.03, ease: EASE }}
            >
              <button
                onClick={() => setActive(active === stage.stage ? null : stage.stage)}
                className="w-full flex items-start gap-6 lg:gap-10 text-left group transition-colors duration-200"
                style={{ padding: '20px 0', margin: '0' }}
                aria-expanded={active === stage.stage}
              >
                {/* Stage number */}
                <span
                  className="font-black leading-none font-mono shrink-0 transition-colors duration-400"
                  style={{
                    fontSize: 'clamp(28px, 4.5vw, 52px)',
                    color: active === stage.stage ? 'var(--color-violet)' : 'var(--color-border)',
                    minWidth: '80px',
                    paddingTop: '4px',
                  }}
                >
                  {String(stage.stage).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display font-bold transition-colors duration-200"
                    style={{
                      fontSize: 'clamp(17px, 2.2vw, 26px)',
                      color: active === stage.stage ? 'var(--color-foreground)' : 'var(--color-muted)',
                    }}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed mt-1.5" style={{ color: 'var(--color-dead)', lineHeight: 1.6 }}>
                    {stage.trigger}
                  </p>
                </div>

                {/* Toggle icon */}
                <motion.span
                  className="font-mono text-2xl shrink-0"
                  style={{ color: active === stage.stage ? 'var(--color-violet)' : 'var(--color-dead)', paddingTop: '2px' }}
                  animate={{ rotate: active === stage.stage ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {active === stage.stage && (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      style={{
                        padding: '0 0 24px',
                        paddingLeft: 'clamp(16px, 8vw, 88px)',
                        borderLeft: '2px solid rgba(124,58,237,0.25)',
                        marginLeft: 'clamp(16px, 2.5vw, 40px)',
                        marginBottom: '4px',
                      }}
                    >
                      <div>
                        <p className="font-mono uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--color-violet-light)' }}>
                          Actions
                        </p>
                        <ul className="space-y-1.5">
                          {stage.actions.map((item) => (
                            <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-muted)' }}>
                              <span style={{ color: 'var(--color-violet)', opacity: 0.5, marginTop: '2px', fontSize: '10px' }}>▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--color-violet-light)' }}>
                          Outputs
                        </p>
                        <ul className="space-y-1.5">
                          {stage.outputs.map((item) => (
                            <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-muted)' }}>
                              <span style={{ color: 'var(--color-violet)', opacity: 0.5, marginTop: '2px', fontSize: '10px' }}>▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-mono uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--color-violet-light)' }}>
                          Control
                        </p>
                        <p
                          className="text-[13px] leading-relaxed mb-4"
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
