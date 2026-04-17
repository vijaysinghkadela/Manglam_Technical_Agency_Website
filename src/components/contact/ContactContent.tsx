'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  AGENCY_EMAIL,
  AGENCY_LOCATION,
  AGENCY_PHONE,
  AGENCY_WHATSAPP,
  AGENCY_X_URL,
  AGENCY_FACEBOOK_URL,
  OFFICE_HOURS,
} from '@/lib/constants'
import { TextReveal } from '@/components/ui/TextReveal'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const contactItems = [
  { label: 'Email', value: AGENCY_EMAIL, href: `mailto:${AGENCY_EMAIL}`, note: 'Fastest response', external: false },
  { label: 'WhatsApp', value: AGENCY_PHONE, href: AGENCY_WHATSAPP, note: 'Tap to open chat', external: true },
  { label: 'Office', value: AGENCY_LOCATION, href: null, note: 'Rajasthan, India', external: false },
]

export function ContactContent({ formNode }: { formNode: ReactNode }) {
  return (
    <section
      className="relative w-full overflow-hidden grain"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <div className="absolute inset-0 bg-line-grid opacity-[0.16] pointer-events-none" />
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-8%',
          top: '15%',
          width: 'clamp(300px, 40vw, 640px)',
          height: 'clamp(300px, 40vw, 640px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,26,26,0.08) 0%, transparent 65%)',
        }}
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col px-[clamp(1rem,3.2vw,3rem)] pb-16 pt-24 sm:pt-28 lg:pt-32 lg:pb-24"
      >
        <nav
          className="mb-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] sm:mb-14 lg:mb-16"
          style={{ color: 'var(--color-dead)' }}
        >
          <Link href="/" className="hover-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-muted)' }}>Contact</span>
        </nav>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: 'Response window', value: '2–4 hours' },
            { label: 'Consultation', value: 'Engineer-led' },
            { label: 'Time zone', value: 'IST, Mon–Sat' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[20px] border border-border bg-[rgba(255,255,255,0.02)] px-4 py-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-dead)' }}>
                {item.label}
              </p>
              <p className="mt-2 font-display text-[15px] font-semibold leading-tight" style={{ color: 'var(--color-foreground)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-14">
          <div className="order-1 flex flex-col lg:pr-6">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span
                className="mb-5 block font-mono uppercase tracking-[0.22em] text-violet-light"
                style={{ fontSize: '11px' }}
              >
                Get in touch
              </span>

              <div className="mb-7 flex flex-col" style={{ gap: '0.02em' }}>
                <TextReveal
                  text="START A"
                  as="h1"
                  delay={0.1}
                  className="font-display font-black leading-none tracking-normal uppercase"
                  style={{ fontSize: 'clamp(2.2rem, 4.8vw, 5.2rem)', color: 'var(--color-foreground)' }}
                />
                <TextReveal
                  text="CONVERSATION."
                  as="h1"
                  delay={0.22}
                  className="font-display font-black leading-none tracking-normal uppercase"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.9rem)', color: '#6B1A1A' }}
                />
              </div>

              <p
                className="mb-10 max-w-[420px]"
                style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-muted)' }}
              >
                Ready to build? We promise a technical engineer will read it, not a salesperson.
                Response within 2–4 hours.
              </p>

              <div className="mb-10 flex flex-wrap gap-2">
                {['Engineer-led replies', 'DPDP compliant', 'Rajasthan / IST'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border bg-card px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
                    style={{ color: 'var(--color-dead)' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-3"
              >
                {contactItems.map((item) => (
                  <motion.div key={item.label} variants={fadeUp}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        data-cursor="pointer"
                        className="group flex min-h-[76px] items-start justify-between gap-4 rounded-[22px] border border-border bg-card px-4 py-4 sm:px-5 sm:py-5"
                      >
                        <div className="flex min-w-0 flex-col gap-1">
                          <span
                            className="font-mono uppercase"
                            style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="min-w-0 break-all font-display font-semibold transition-colors duration-200 group-hover:text-violet-light sm:break-normal"
                            style={{ fontSize: '0.98rem', color: 'var(--color-foreground)', lineHeight: 1.35 }}
                          >
                            {item.value}
                          </span>
                          <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                            {item.note}
                          </span>
                        </div>
                        <span
                          className="shrink-0 font-mono transition-all duration-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                          style={{ color: '#6B1A1A' }}
                        >
                          →
                        </span>
                      </a>
                    ) : (
                      <div className="flex min-h-[76px] flex-col gap-1 rounded-[22px] border border-border bg-card px-4 py-4 sm:px-5 sm:py-5">
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="font-display font-semibold"
                          style={{ fontSize: '0.98rem', color: 'var(--color-foreground)', lineHeight: 1.35 }}
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

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="mt-10 rounded-[22px] border border-[rgba(107,26,26,0.18)] bg-[rgba(107,26,26,0.06)] p-4 sm:p-5"
              >
                <a
                  href={AGENCY_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:border-violet"
                  style={{ color: 'var(--color-muted)' }}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full animate-pulse bg-[#25D366]" />
                  Message on WhatsApp
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                    <span className="block h-2 w-2 shrink-0 rounded-full animate-pulse" style={{ backgroundColor: '#6B1A1A' }} />
                    <span className="font-mono uppercase" style={{ fontSize: '10px', color: '#6B1A1A', letterSpacing: '0.18em' }}>
                      Active · Accepting Projects
                    </span>
                  </div>
                  <span className="hidden font-mono sm:block" style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.12em' }}>
                    {OFFICE_HOURS.weekdays}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={AGENCY_X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-[#6B1A1A]/50 hover:text-foreground"
                    aria-label="X (Twitter)"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={AGENCY_FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-[#6B1A1A]/50 hover:text-foreground"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-dead)' }}>
                    Follow us
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            className="order-2 flex flex-col"
          >
            <div className="rounded-[28px] border border-border bg-card p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-6 lg:p-8">
              <span
                className="mb-3 block font-mono uppercase tracking-[0.22em] text-violet-light"
                style={{ fontSize: '11px' }}
              >
                Send a message
              </span>
              <h2
                className="mb-6 font-display font-black uppercase leading-tight"
                style={{ fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', color: 'var(--color-foreground)' }}
              >
                Tell Us About
                <br />
                Your Project.
              </h2>

              {formNode}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

