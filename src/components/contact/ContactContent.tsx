'use client'

import { motion } from 'framer-motion'
import {
  AGENCY_EMAIL,
  AGENCY_LOCATION,
  AGENCY_PHONE,
  AGENCY_WHATSAPP,
  OFFICE_HOURS,
} from '@/lib/constants'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const contactItems = [
  {
    label:    'Email',
    value:    AGENCY_EMAIL,
    href:     `mailto:${AGENCY_EMAIL}`,
    note:     'Fastest response',
    external: false,
  },
  {
    label:    'WhatsApp',
    value:    AGENCY_PHONE,
    href:     AGENCY_WHATSAPP,
    note:     'Tap to open chat',
    external: true,
  },
  {
    label:    'Office',
    value:    AGENCY_LOCATION,
    href:     null,
    note:     'Rajasthan, India',
    external: false,
  },
]

export function ContactContent({ formNode }: { formNode: React.ReactNode }) {
  return (
    <section style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div
        className="grid grid-cols-1 lg:grid-cols-[44%_56%]"
        style={{ borderTop: '1px solid var(--color-border)', minHeight: '100vh' }}
      >

        {/* ── Left: sticky contact info panel ── */}
        <aside
          className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex flex-col"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRight: '1px solid var(--color-border)',
          }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col flex-1 p-10 xl:p-16 pt-16 xl:pt-20"
          >
            {/* Label */}
            <motion.span
              variants={fadeUp}
              className="font-mono uppercase block mb-10"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ DIRECT LINE
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="font-display font-black leading-none tracking-tighter uppercase mb-6"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 4rem)', color: 'var(--color-foreground)' }}
            >
              Let&apos;s Build<br />
              <span style={{ color: 'var(--color-violet)' }}>Something Real.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mb-12"
              style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '360px' }}
            >
              Skip the red tape — speak directly with our engineering team. We handle web, AI,
              cybersecurity, and automation for Indian businesses.
            </motion.p>

            {/* Contact rows */}
            <motion.div variants={stagger} className="flex flex-col mb-10">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="group"
                  style={{
                    borderTop: i === 0 ? '1px solid var(--color-border)' : 'none',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      data-cursor="pointer"
                      className="flex items-center justify-between py-5 transition-colors duration-200"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="font-display font-semibold transition-colors duration-200 group-hover:text-violet"
                          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', color: 'var(--color-foreground)', lineHeight: 1.3 }}
                        >
                          {item.value}
                        </span>
                        <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                          {item.note}
                        </span>
                      </div>
                      <span
                        className="font-mono text-lg transition-all duration-300 opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0"
                        style={{ color: 'var(--color-violet-light)' }}
                      >
                        →
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between py-5">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="font-display font-semibold"
                          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', color: 'var(--color-foreground)', lineHeight: 1.3 }}
                        >
                          {item.value}
                        </span>
                        <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                          {item.note}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div variants={fadeUp} className="mb-10">
              <a
                href={AGENCY_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="inline-flex items-center gap-3 px-5 py-3.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:border-violet"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: '#25D366' }}
                />
                Message on WhatsApp
              </a>
            </motion.div>

            {/* Office hours + status */}
            <motion.div
              variants={fadeUp}
              className="mt-auto pt-8"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="block w-2 h-2 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: 'var(--color-violet)' }}
                />
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}
                >
                  Active · Accepting Projects
                </span>
              </div>
              <p className="font-mono" style={{ fontSize: '11px', color: 'var(--color-dead)', lineHeight: 1.8 }}>
                {OFFICE_HOURS.weekdays}<br />{OFFICE_HOURS.weekend}
              </p>
            </motion.div>
          </motion.div>
        </aside>

        {/* ── Right: Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          viewport={{ once: true, amount: 0.05 }}
          className="p-10 xl:p-16 pt-16 xl:pt-20"
        >
          <span
            className="font-mono uppercase block mb-3"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            ✦ SEND A MESSAGE
          </span>
          <h2
            className="font-display font-black leading-tight uppercase mb-12"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-foreground)' }}
          >
            Tell Us About<br />Your Project.
          </h2>

          {formNode}
        </motion.div>

      </div>
    </section>
  )
}
