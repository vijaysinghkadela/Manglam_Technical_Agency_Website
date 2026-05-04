'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { TextReveal } from '@/components/ui/TextReveal'
import { servicePricingData, type ServicePricing, type PricingPlan } from '@/lib/data/pricing'
import { cn } from '@/lib/utils'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Duration = '1mo' | '6mo' | '12mo'

const TABS: { label: string; slug: string }[] = [
  { label: 'Meta Ads',       slug: 'social-media-marketing' },
  { label: 'Web & App Dev',  slug: 'saas-products' },
  { label: 'Cybersecurity',  slug: 'cybersecurity' },
  { label: 'AI & Automation', slug: 'ai-automation' },
  { label: 'Branding',       slug: 'branding' },
  { label: 'Content',        slug: 'content-creation' },
]

const comparisonData = {
  features: [
    'Written Agreement',
    'Dedicated Project Manager',
    'Source Code / Asset Delivery',
    '1-Year Post-Launch Support',
    '24/7 Monitoring',
    'Priority Support',
    'Monthly Analytics Report',
  ],
  columns: [
    { name: 'Freelancers',          values: [false, false, true,  false, false, false, false] },
    { name: 'Traditional Agencies', values: [true,  true,  false, false, false, false, true ] },
    { name: 'MTA (Us)',             values: [true,  true,  true,  true,  true,  true,  true ] },
  ],
}

/* ── helpers ─────────────────────────────────────────────── */
function getPlanPrice(plan: PricingPlan, duration: Duration): string {
  if (duration === '6mo' && plan.price6mo) return plan.price6mo
  if (duration === '12mo' && plan.price12mo) return plan.price12mo
  return plan.price
}

function getSavingsBadge(plan: PricingPlan, duration: Duration): string | null {
  if (duration === '6mo' && plan.savings6mo) return plan.savings6mo
  if (duration === '12mo' && plan.savings12mo) return plan.savings12mo
  return null
}

function getTotalBilled(plan: PricingPlan, duration: Duration): string | null {
  if (duration === '6mo' && plan.totalBilled6mo) return plan.totalBilled6mo
  if (duration === '12mo' && plan.totalBilled12mo) return plan.totalBilled12mo
  return null
}

/* ── PlanCard ────────────────────────────────────────────── */
function PlanCard({ plan, duration }: { plan: PricingPlan; duration: Duration }) {
  const price     = getPlanPrice(plan, duration)
  const savings   = getSavingsBadge(plan, duration)
  const total     = getTotalBilled(plan, duration)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        'relative flex flex-col border',
        plan.highlight ? 'border-[var(--color-violet)]' : 'border-[var(--color-border)]',
      )}
      style={{ backgroundColor: plan.highlight ? 'rgba(107,26,26,0.04)' : 'var(--color-card)' }}
    >
      {/* Popular badge */}
      {plan.highlight && (
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest px-3 py-1 z-10"
          style={{ backgroundColor: 'var(--color-violet)', color: '#fff' }}
        >
          ✦ Most Popular
        </span>
      )}

      {/* Header */}
      <div
        className="p-6 lg:p-8 pb-5"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <h3
          className="font-display font-black mb-1.5"
          style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--color-foreground)' }}
        >
          {plan.name}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.55 }}>
          {plan.tagline}
        </p>

        {/* Price block */}
        <div className="mt-5">
          <div className="flex items-end gap-2 flex-wrap">
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="font-display font-black leading-none"
                style={{
                  fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
                  color: plan.highlight ? 'var(--color-violet-light)' : 'var(--color-foreground)',
                }}
              >
                {price}
              </motion.span>
            </AnimatePresence>
            <span className="font-mono text-xs mb-1" style={{ color: 'var(--color-dead)' }}>
              {plan.period}
            </span>
            {savings && (
              <span
                className="font-mono text-[10px] px-2 py-0.5 mb-1"
                style={{
                  backgroundColor: 'rgba(107,26,26,0.12)',
                  color: 'var(--color-violet-light)',
                  letterSpacing: '0.06em',
                }}
              >
                {savings}
              </span>
            )}
          </div>

          {total && (
            <p className="font-mono mt-1.5" style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.06em' }}>
              {total}
            </p>
          )}
          {plan.adSpend && (
            <p className="font-mono mt-1" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.06em' }}>
              + ad spend: {plan.adSpend}
            </p>
          )}
        </div>
      </div>

      {/* Deliverables */}
      <div className="p-6 lg:p-8 pt-5 flex flex-col flex-1">
        <p
          className="font-mono uppercase mb-4"
          style={{ fontSize: '10px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}
        >
          ✦ What&apos;s included
        </p>

        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {plan.deliverables.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5"
              style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5 }}
            >
              <Check
                className="w-3.5 h-3.5 shrink-0 mt-[2px]"
                style={{ color: 'var(--color-violet)' }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Retainer note for project services */}
        {plan.retainerNote && (
          <div
            className="mb-6 p-3"
            style={{ backgroundColor: 'rgba(107,26,26,0.04)', border: '1px solid rgba(107,26,26,0.15)' }}
          >
            <p className="font-mono" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.07em', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--color-violet-light)' }}>Retainer options: </span>
              {plan.retainerNote}
            </p>
          </div>
        )}

        <Link
          href="/contact"
          data-cursor="pointer"
          className={cn(
            'inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-bold text-sm transition-all duration-300',
            plan.highlight
              ? 'hover:opacity-85'
              : 'hover:border-[var(--color-violet)] hover:text-[var(--color-violet-light)]',
          )}
          style={
            plan.highlight
              ? { backgroundColor: 'var(--color-violet)', color: '#fff' }
              : { border: '1px solid var(--color-border)', color: 'var(--color-muted)' }
          }
        >
          Get Started
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  )
}

/* ── Duration toggle ─────────────────────────────────────── */
function DurationToggle({ value, onChange }: { value: Duration; onChange: (v: Duration) => void }) {
  const options: { label: string; value: Duration; hint?: string }[] = [
    { label: 'Monthly',   value: '1mo' },
    { label: '6 Months',  value: '6mo', hint: 'Save ~14%' },
    { label: '12 Months', value: '12mo', hint: 'Best value' },
  ]
  return (
    <div
      className="inline-flex border border-border overflow-hidden"
      style={{ backgroundColor: 'var(--color-card)' }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="relative flex flex-col items-center px-4 sm:px-6 py-2.5 transition-colors duration-150"
          style={{
            backgroundColor: value === opt.value ? 'var(--color-violet)' : 'transparent',
            color: value === opt.value ? '#fff' : 'var(--color-dead)',
            borderRight: '1px solid var(--color-border)',
          }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.12em]">{opt.label}</span>
          {opt.hint && (
            <span
              className="font-mono text-[9px] mt-0.5"
              style={{ color: value === opt.value ? 'rgba(255,255,255,0.75)' : 'var(--color-violet-light)' }}
            >
              {opt.hint}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

/* ── ServiceTab ──────────────────────────────────────────── */
function ServiceTab({ service, duration }: { service: ServicePricing; duration: Duration }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {service.plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} duration={duration} />
        ))}
      </div>

      {/* Service note + link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        {service.note && (
          <p
            className="font-mono"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.06em', maxWidth: '680px', lineHeight: 1.65 }}
          >
            {service.note}
          </p>
        )}
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors duration-200 whitespace-nowrap shrink-0"
          style={{ color: 'var(--color-violet-light)', letterSpacing: '0.1em' }}
          data-cursor="link"
        >
          View full service details
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function PricingPage() {
  const [activeSlug, setActiveSlug]   = useState<string>('social-media-marketing')
  const [duration, setDuration]       = useState<Duration>('1mo')
  const activeService = servicePricingData[activeSlug]

  // when switching to a project service, reset duration to '1mo' (duration toggle won't show)
  function handleTabChange(slug: string) {
    setActiveSlug(slug)
    if (!servicePricingData[slug]?.isRetainer) setDuration('1mo')
  }

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[92svh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-10%', top: '15%',
            width: 'clamp(300px, 40vw, 700px)', height: 'clamp(300px, 40vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,26,26,0.07) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-12 lg:pb-16">
          <motion.nav
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 font-mono mb-10 lg:mb-20"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>PRICING</span>
          </motion.nav>

          <div className="flex-1 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              className="font-mono uppercase block mb-6"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ NO HIDDEN FEES
            </motion.span>

            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <TextReveal text="HONEST" as="h1" delay={0.1}
                className="font-display font-black leading-none tracking-normal uppercase"
                style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', color: 'var(--color-foreground)' }}
              />
              <TextReveal text="RATES." as="h1" delay={0.22}
                className="font-display font-black leading-none tracking-normal uppercase"
                style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', color: 'var(--color-violet)' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-8 lg:mt-10"
              style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '480px' }}
            >
              Six services. Three plans each. INR pricing, no games — pick your service and see exactly what you get and what it costs.
            </motion.p>
          </div>

          <div className="flex items-end justify-between mt-10 lg:mt-14">
            <span className="font-mono uppercase" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}>
              ✦ ALL PRICES IN INR · GST @18% APPLICABLE
            </span>
            <div className="hidden lg:flex flex-col items-center gap-2">
              <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.22em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                Scroll
              </span>
              <div style={{ width: '1px', height: '48px', backgroundColor: 'var(--color-border)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANS ─────────────────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(56px, 9vw, 112px) 0' }}
      >
        <div className="container-site">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-10 lg:mb-12"
          >
            <span className="font-mono uppercase block mb-3" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}>
              SERVICE PRICING
            </span>
            <h2 className="font-display font-black leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)', color: 'var(--color-foreground)' }}>
              Pick a Service
            </h2>
          </motion.div>

          {/* Service tabs */}
          <div
            className="flex flex-wrap gap-0 mb-10 lg:mb-12"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => handleTabChange(tab.slug)}
                className="font-mono uppercase text-xs px-4 py-3 transition-all duration-200"
                style={{
                  letterSpacing: '0.14em',
                  color: activeSlug === tab.slug ? 'var(--color-violet-light)' : 'var(--color-dead)',
                  borderBottom: activeSlug === tab.slug ? '2px solid var(--color-violet)' : '2px solid transparent',
                  marginBottom: '-1px',
                  backgroundColor: 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Duration toggle — only for retainer services */}
          <AnimatePresence>
            {activeService?.isRetainer && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
              >
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-dead)' }}>
                  Billing period
                </span>
                <DurationToggle value={duration} onChange={setDuration} />
                {duration !== '1mo' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5"
                  >
                    <Zap className="w-3 h-3" style={{ color: 'var(--color-violet-light)' }} />
                    <span className="font-mono text-[11px]" style={{ color: 'var(--color-violet-light)' }}>
                      {duration === '6mo' ? 'Save ~14% · commit to 6 months' : 'Best value · commit to 12 months'}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Service category badge */}
          {activeService && (
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1"
                style={{
                  backgroundColor: activeService.isRetainer ? 'rgba(107,26,26,0.08)' : 'rgba(107,26,26,0.04)',
                  border: '1px solid rgba(107,26,26,0.2)',
                  color: 'var(--color-violet-light)',
                }}
              >
                {activeService.category}
              </span>
              <span className="font-mono text-[11px]" style={{ color: 'var(--color-dead)' }}>
                {activeService.isRetainer ? 'Ongoing monthly retainer' : 'One-time project engagement'}
              </span>
            </div>
          )}

          {/* Plan cards */}
          {activeService && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlug}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <ServiceTab service={activeService} duration={duration} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── DISCOVERY CALLOUT ─────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(40px, 6vw, 72px) 0' }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center p-8 sm:p-10"
            style={{ border: '1px solid rgba(107,26,26,0.3)', backgroundColor: 'rgba(107,26,26,0.03)' }}
          >
            <div>
              <span className="font-mono uppercase block mb-3" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}>
                ALWAYS STARTS HERE
              </span>
              <h2 className="font-display font-black mb-3" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.9rem)', color: 'var(--color-foreground)', lineHeight: 1.1 }}>
                Discovery &amp; Scope Planning
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '520px' }}>
                Every engagement starts with requirement mapping and implementation planning before commercial and technical commitments are finalized. No surprises.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 font-display font-black text-[14px] hover:bg-violet hover:text-white transition-all duration-300 whitespace-nowrap"
              style={{ border: '1px solid var(--color-violet)', color: 'var(--color-violet-light)' }}
              data-cursor="pointer"
            >
              Book Discovery Call →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-12 lg:mb-16"
          >
            <span className="font-mono uppercase block mb-3" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}>
              COMPARISON
            </span>
            <h2 className="font-display font-black" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}>
              The Difference
            </h2>
            <p className="mt-3" style={{ fontSize: '15px', color: 'var(--color-muted)', maxWidth: '480px', lineHeight: 1.72 }}>
              Why businesses choose MTA over traditional alternatives.
            </p>
          </motion.div>

          <div className="border border-border overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="w-full overflow-x-auto relative">
              <div
                className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 lg:hidden"
                style={{ background: 'linear-gradient(to left, var(--color-card), transparent)' }}
              />
              <table className="w-full min-w-[700px] text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th className="font-mono text-xs uppercase tracking-widest py-5 px-6 w-[40%]" style={{ color: 'var(--color-muted)' }}>
                      Features / Approach
                    </th>
                    {comparisonData.columns.map((col, i) => (
                      <th
                        key={col.name}
                        className="font-mono text-xs uppercase tracking-widest py-5 px-6"
                        style={{ color: i === 2 ? 'var(--color-violet)' : 'var(--color-muted)', fontWeight: i === 2 ? 700 : 500 }}
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((feature, rowIndex) => (
                    <tr
                      key={feature}
                      className="transition-colors duration-150"
                      style={{ borderBottom: '1px solid var(--color-border)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td className="py-4 px-6 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                        {feature}
                      </td>
                      {comparisonData.columns.map((col) => {
                        const has = col.values[rowIndex]
                        return (
                          <td key={`${col.name}-${feature}`} className="py-4 px-6 text-sm">
                            {has ? (
                              <span
                                className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold"
                                style={{ backgroundColor: 'rgba(107,26,26,0.12)', color: 'var(--color-violet)' }}
                              >
                                ✓
                              </span>
                            ) : (
                              <span className="font-bold" style={{ color: 'var(--color-dead)' }}>—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="font-mono uppercase block mb-4" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}>
                GET STARTED
              </span>
              <h2 className="font-display font-black mb-6 leading-tight" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', color: 'var(--color-foreground)' }}>
                Start Your<br />Project
              </h2>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.72, maxWidth: '380px' }}>
                Free consultation and honest scope — no sales pitch, no lock-in.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 font-display font-black text-[15px] hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: 'var(--color-foreground)', color: 'var(--color-canvas)' }}
                data-cursor="pointer"
              >
                Contact Us →
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 font-display font-bold text-[14px] hover:border-violet transition-all duration-300"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                data-cursor="pointer"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
