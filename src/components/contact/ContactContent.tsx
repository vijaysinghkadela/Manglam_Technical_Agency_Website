'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  AGENCY_EMAIL,
  AGENCY_LOCATION,
  AGENCY_PHONE,
  AGENCY_WHATSAPP,
  OFFICE_HOURS,
} from '@/lib/constants'
import { TextReveal } from '@/components/ui/TextReveal'
import Badge from '@/components/ui/Badge'

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
          background: 'radial-gradient(circle, rgba(var(--color-accent-rgb),0.08) 0%, transparent 65%)' }}
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col px-[clamp(1rem,3.2vw,3rem)] pb-24 pt-32 sm:pt-40 lg:pt-44 lg:pb-32"
      >
        <nav
          className="mb-12 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] sm:mb-16 lg:mb-24"
          style={{ color: 'var(--color-dead)' }}
        >
          <Link href="/" className="hover-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-muted)' }}>Contact</span>
        </nav>

        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
          {[
            { label: 'Response window', value: '2–4 hours' },
            { label: 'Consultation', value: 'Engineer-led' },
            { label: 'Time zone', value: 'IST, Mon–Sat' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[20px] border border-border bg-accent-soft px-5 py-5"
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

        <div className="grid flex-1 grid-cols-1 gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-24">
          <div className="order-1 flex flex-col lg:pr-6">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span
                className="mb-5 block font-mono uppercase tracking-[0.22em] text-violet-light"
                style={{ fontSize: '11px' }}
              >
                Get in touch
              </span>

              <div className="mb-12 flex flex-col" style={{ gap: '0.25rem' }}>
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
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.9rem)', color: 'var(--color-violet)' }}
                />
              </div>

              <p
                className="mb-16 max-w-[420px]"
                style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-muted)' }}
              >
                Ready to build? We promise a technical engineer will read it, not a salesperson.
                Response within 2–4 hours.
              </p>

              <div className="mb-16 flex flex-wrap gap-3">
                {['Engineer-led replies', 'DPDP compliant', 'Rajasthan / IST'].map((chip) => (
                  <Badge key={chip} variant="subtle" size="sm">
                    {chip}
                  </Badge>
                ))}
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-5"
              >
                {contactItems.map((item) => (
                  <motion.div key={item.label} variants={fadeUp}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        data-cursor="pointer"
                        className="group flex min-h-[92px] items-start justify-between gap-4 rounded-[22px] border border-border bg-card px-6 py-6 sm:px-8 sm:py-7"
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
                          style={{ color: 'var(--color-violet)' }}
                        >
                          →
                        </span>
                      </a>
                    ) : (
                      <div className="flex min-h-[92px] flex-col gap-1 rounded-[22px] border border-border bg-card px-6 py-6 sm:px-8 sm:py-7">
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
                className="mt-12 rounded-[22px] border border-[rgba(var(--color-accent-rgb),0.18)] bg-[rgba(var(--color-accent-rgb),0.06)] p-5 sm:p-6"
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
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                  <span className="block h-2 w-2 shrink-0 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-violet)' }} />
                  <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--color-violet)', letterSpacing: '0.18em' }}>
                    Active · Accepting Projects
                  </span>
                </div>
                <span className="hidden font-mono sm:block" style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.12em' }}>
                  {OFFICE_HOURS.weekdays}
                </span>
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
            <div className="rounded-[28px] border border-border bg-card p-8 shadow-[0_24px_80px_rgba(0,0,0,0.10)] sm:p-10 lg:p-12">
              <span
                className="mb-4 block font-mono uppercase tracking-[0.22em] text-violet-light"
                style={{ fontSize: '11px' }}
              >
                Send a message
              </span>
              <h2
                className="mb-10 font-display font-black uppercase leading-tight"
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

