'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { leadToDeliveryPipeline } from '@/lib/data/research'
const stageIcons = ['01', '02', '03', '04', '05', '06', '07', '08', '09']

export function ProcessSection() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="container-site">
        <motion.div
          initial={false}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 sm:gap-10 lg:gap-16 mb-16 lg:mb-20"
        >
          <div className="glass-card rounded-[28px] p-10 sm:p-12">
            <div
              className="absolute top-0 left-0 w-[3px] h-full"
              style={{ background: `linear-gradient(180deg, var(--color-violet), transparent)` }}
            />
            <span
            className="font-mono uppercase block mb-4"
            style={{ fontSize: '11px', color: 'var(--color-violet)', letterSpacing: '0.22em' }}
          >
            LEAD TO DELIVERY
          </span>
          <h2
              className="font-display font-black leading-[0.92] tracking-normal"
              style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3rem)', color: 'var(--color-foreground)' }}
            >
              Nine stages.<br />One accountable system.
            </h2>
            <p className="mt-6 text-[15px] leading-[1.72]" style={{ color: 'var(--color-muted)' }}>
              The pipeline is contract-governed from first sensitive interaction to handover and retention.
              Each stage has a trigger, outputs, and control boundaries.
            </p>
          </div>

          <div className="glass-card rounded-[28px] p-10 sm:p-12">
            <div
              className="absolute top-0 right-0 w-[3px] h-full"
              style={{ background: `linear-gradient(180deg, transparent, var(--color-violet))` }}
            />
            <p className="font-mono uppercase mb-4" style={{ fontSize: '11px', color: 'var(--color-violet)', letterSpacing: '0.22em' }}>
              STAGE {active !== null ? String(active).padStart(2, '0') : '—'} OF {leadToDeliveryPipeline.length}
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

          <div className="flex flex-col gap-4">
            {leadToDeliveryPipeline.map((stage, index) => {
              const isOpen = active === stage.stage

              return (
                <motion.article
                  key={stage.stage}
                  initial={false}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className={`overflow-hidden rounded-[24px] border transition-all duration-300`}
                  style={{
                    borderColor: isOpen ? `color-mix(in srgb, var(--color-violet) 40%, var(--color-border))` : 'var(--color-border)',
                    backgroundColor: 'var(--color-card)',
                    boxShadow: isOpen
                      ? `0 0 0 1px color-mix(in srgb, var(--color-violet) 12%, transparent), 0 8px 24px rgba(0,0,0,0.06)`
                      : 'none' }}
                >
                  <button
                    onClick={() => setActive(isOpen ? null : stage.stage)}
                    className="w-full flex items-start gap-6 sm:gap-8 text-left transition-colors duration-200 px-8 sm:px-10 py-8 sm:py-10 touch-manipulation relative"
                    style={{ touchAction: 'manipulation' }}
                    aria-expanded={isOpen}
                    aria-controls={`process-stage-${stage.stage}`}
                  >
                    <div className="relative shrink-0" style={{ minWidth: '76px' }}>
                      <span
                        className="font-black leading-none font-mono block transition-colors duration-400"
                        style={{
                          fontSize: 'clamp(28px, 4.5vw, 52px)',
                          color: isOpen ? 'var(--color-violet)' : 'var(--color-dead)' }}
                      >
                        {stageIcons[index]}
                      </span>
                      <span
                        className={`hidden md:block absolute -left-[22px] top-1/2 w-[12px] h-[12px] rounded-full border-2 transition-all duration-300`}
                        style={{
                          backgroundColor: isOpen ? 'var(--color-violet)' : 'var(--color-card)',
                          borderColor: isOpen ? 'var(--color-violet)' : 'var(--color-border)',
                          transform: 'translateY(-50%)',
                          boxShadow: isOpen ? `0 0 0 4px color-mix(in srgb, var(--color-violet) 20%, transparent)` : 'none' }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3
                          className="font-display font-bold transition-colors duration-200"
                          style={{
                            fontSize: 'clamp(17px, 2.2vw, 26px)',
                            color: isOpen ? 'var(--color-foreground)' : 'var(--color-muted)' }}
                        >
                          {stage.title}
                        </h3>
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '10px', color: 'var(--color-violet)', letterSpacing: '0.16em' }}
                        >
                          {isOpen ? 'Open' : 'Tap to expand'}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--color-dead)', lineHeight: 1.6 }}>
                        {stage.trigger}
                      </p>
                    </div>

                    <motion.span
                      className="font-mono text-2xl shrink-0"
                      style={{ color: isOpen ? 'var(--color-violet)' : 'var(--color-dead)', paddingTop: '2px' }}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t px-8 sm:px-10 py-8 sm:py-10"
                          style={{
                            borderColor: 'var(--color-border)',
                            backgroundColor: 'var(--color-surface)' }}
                        >
                            <div className="rounded-[20px] border border-border bg-card p-6 sm:p-8">
                              <p className="font-mono uppercase mb-4" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--color-violet)' }}>
                                Actions
                              </p>
                              <ul className="space-y-3">
                                {stage.actions.map((item) => (
                                  <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-muted)' }}>
                                    <span style={{ color: 'var(--color-violet)', opacity: 0.7, marginTop: '2px', fontSize: '10px' }}>▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="rounded-[20px] border border-border bg-card p-6 sm:p-8">
                              <p className="font-mono uppercase mb-4" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--color-violet)' }}>
                                Outputs
                              </p>
                              <ul className="space-y-3">
                                {stage.outputs.map((item) => (
                                  <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-muted)' }}>
                                    <span style={{ color: 'var(--color-violet)', opacity: 0.7, marginTop: '2px', fontSize: '10px' }}>▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="rounded-[20px] border border-border bg-card p-6 sm:p-8">
                            <p className="font-mono uppercase mb-4" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--color-violet)' }}>
                              Control
                            </p>
                            <p
                              className="text-[13px] leading-relaxed mb-4"
                              style={{
                                color: 'var(--color-muted)',
                                borderLeft: `2px solid var(--color-violet)`,
                                paddingLeft: '12px' }}
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
                                      border: `1px solid color-mix(in srgb, var(--color-violet) 20%, transparent)`,
                                      color: 'var(--color-violet)',
                                      backgroundColor: `color-mix(in srgb, var(--color-violet) 6%, transparent)` }}
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
