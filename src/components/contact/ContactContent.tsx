'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  AGENCY_EMAIL,
  AGENCY_LOCATION,
  AGENCY_PHONE,
  AGENCY_WHATSAPP,
  OFFICE_HOURS,
} from '@/lib/constants'
import { TextReveal } from '@/components/ui/TextReveal'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const contactItems = [
  { label: 'Email',    value: AGENCY_EMAIL,    href: `mailto:${AGENCY_EMAIL}`,  note: 'Fastest response',  external: false },
  { label: 'WhatsApp', value: AGENCY_PHONE,    href: AGENCY_WHATSAPP,           note: 'Tap to open chat',  external: true  },
  { label: 'Office',   value: AGENCY_LOCATION, href: null,                      note: 'Rajasthan, India',  external: false },
]

export function ContactContent({ formNode }: { formNode: React.ReactNode }) {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden grain"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-line-grid opacity-[0.16] pointer-events-none" />
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-8%', top: '15%',
          width: 'clamp(300px, 40vw, 640px)', height: 'clamp(300px, 40vw, 640px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col flex-1 mx-auto w-full pt-28 lg:pt-32 pb-16 lg:pb-24"
        style={{
          maxWidth: '1200px',
          paddingLeft:  'clamp(1.5rem, 4vw, 3rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 font-mono mb-12 lg:mb-16 animate-fade-up"
          style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
        >
          <Link href="/" className="hover-foreground transition-colors">HOME</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-muted)' }}>CONTACT</span>
        </nav>

        {/* ── 2-col grid: headline+info | form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-8 xl:gap-16 flex-1">

          {/* ── LEFT: headline + contact details ── */}
          <div className="flex flex-col">

            {/* Sticky wrapper on desktop */}
            <div className="lg:sticky lg:top-32 lg:self-start">

              <span
                className="font-mono uppercase block mb-5 animate-fade-up stagger-1"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ✦ GET IN TOUCH
              </span>

              {/* Big headline */}
              <div className="flex flex-col mb-7" style={{ gap: '0.02em' }}>
                <TextReveal
                  text="START A"
                  as="h1"
                  delay={0.1}
                  className="font-display font-black leading-none tracking-tighter uppercase"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', color: 'var(--color-foreground)' }}
                />
                <TextReveal
                  text="CONVERSATION."
                  as="h1"
                  delay={0.22}
                  className="font-display font-black leading-none tracking-tighter uppercase"
                  style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3.6rem)', color: 'var(--color-violet)' }}
                />
              </div>

              <p
                className="mb-10 animate-fade-up stagger-3"
                style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '400px' }}
              >
                Ready to build? We promise a technical engineer will read it, not a salesperson.
                Response within 2–4 hours.
              </p>

              {/* Contact rows */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="flex flex-col mb-8"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                {contactItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="group"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        data-cursor="pointer"
                        className="flex items-center justify-between py-4 gap-3"
                      >
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span
                            className="font-mono uppercase"
                            style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="font-display font-semibold transition-colors duration-200 group-hover:text-violet truncate"
                            style={{ fontSize: '0.95rem', color: 'var(--color-foreground)', lineHeight: 1.3 }}
                          >
                            {item.value}
                          </span>
                          <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                            {item.note}
                          </span>
                        </div>
                        <span
                          className="font-mono transition-all duration-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 shrink-0"
                          style={{ color: 'var(--color-violet-light)' }}
                        >
                          →
                        </span>
                      </a>
                    ) : (
                      <div className="flex flex-col gap-0.5 py-4">
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="font-display font-semibold"
                          style={{ fontSize: '0.95rem', color: 'var(--color-foreground)', lineHeight: 1.3 }}
                        >
                          {item.value}
                        </span>
                        <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                          {item.note}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="mb-10"
              >
                <a
                  href={AGENCY_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="inline-flex items-center gap-3 px-5 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:border-violet"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#25D366' }} />
                  Message on WhatsApp
                </a>
              </motion.div>

              {/* Status */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-5 flex-wrap"
              >
                <div className="flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: 'var(--color-violet)' }} />
                  <span className="font-mono uppercase" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}>
                    Active · Accepting Projects
                  </span>
                </div>
                <span className="hidden sm:block font-mono" style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.12em' }}>
                  {OFFICE_HOURS.weekdays}
                </span>
              </motion.div>

            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            className="flex flex-col"
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '32px',
            }}
          >
            <span
              className="font-mono uppercase block mb-3"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ SEND A MESSAGE
            </span>
            <h2
              className="font-display font-black leading-tight uppercase mb-8"
              style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'var(--color-foreground)' }}
            >
              Tell Us About<br />Your Project.
            </h2>

            {formNode}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
