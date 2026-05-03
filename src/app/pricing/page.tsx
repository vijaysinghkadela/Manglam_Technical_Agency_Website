'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { TextReveal } from '@/components/ui/TextReveal'
import { servicePricingData, type ServicePricing, type PricingPlan } from '@/lib/data/pricing'
import { cn } from '@/lib/utils'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const TABS: { label: string; slug: string }[] = [
  { label: 'Meta Ads', slug: 'social-media-marketing' },
  { label: 'Web & App Dev', slug: 'saas-products' },
  { label: 'Cybersecurity', slug: 'cybersecurity' },
  { label: 'AI & Automation', slug: 'ai-automation' },
  { label: 'Branding', slug: 'branding' },
  { label: 'Content', slug: 'content-creation' },
]

const comparisonData = {
  features: [
    'Written Agreement',
    'Dedicated Project Manager',
    'Source Code Delivery',
    '1-Year Maintenance',
    '24/7 Monitoring',
    'Priority Support',
    'Monthly Analytics',
  ],
  columns: [
    { name: 'Freelancers',          values: [false, false, true,  false, false, false, false] },
    { name: 'Traditional Agencies', values: [true,  true,  false, false, false, false, true ] },
    { name: 'MTA (Us)',             values: [true,  true,  true,  true,  true,  true,  true ] },
  ],
}

function PlanCard({ plan }: { plan: PricingPlan; serviceSlug?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        'relative flex flex-col border p-6 lg:p-8',
        plan.highlight
          ? 'border-[var(--color-violet)]'
          : 'border-[var(--color-border)]',
      )}
      style={{ backgroundColor: plan.highlight ? 'rgba(107,26,26,0.04)' : 'var(--color-card)' }}
    >
      {plan.highlight && (
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest px-3 py-1"
          style={{
            backgroundColor: 'var(--color-violet)',
            color: '#fff',
          }}
        >
          ✦ Popular
        </span>
      )}

      <div className="mb-6">
        <h3
          className="font-display font-black mb-1"
          style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', color: 'var(--color-foreground)' }}
        >
          {plan.name}
        </h3>
        <p
          style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5 }}
        >
          {plan.tagline}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className="font-display font-black"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: plan.highlight ? 'var(--color-violet-light)' : 'var(--color-foreground)',
            }}
          >
            {plan.price}
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: 'var(--color-dead)' }}
          >
            {plan.period}
          </span>
        </div>
        {plan.annualLabel && (
          <p
            className="font-mono mt-1"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.08em' }}
          >
            {plan.annualLabel}
          </p>
        )}
        {plan.adSpend && (
          <p
            className="font-mono mt-1"
            style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.08em' }}
          >
            Ad spend: {plan.adSpend}
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-2.5 flex-1 mb-8">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5"
            style={{ fontSize: '13px', color: 'var(--color-muted)' }}
          >
            <Check
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: 'var(--color-violet)' }}
            />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        data-cursor="pointer"
        className={cn(
          'inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-bold text-sm transition-all duration-300',
          plan.highlight
            ? 'hover:bg-opacity-80'
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
    </motion.div>
  )
}

function ServiceTab({ service }: { service: ServicePricing }) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {service.plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} serviceSlug={service.slug} />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {service.note && (
          <p
            className="font-mono"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.08em', maxWidth: '600px' }}
          >
            {service.note}
          </p>
        )}
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors duration-200 whitespace-nowrap"
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

export default function PricingPage() {
  const [activeSlug, setActiveSlug] = useState<string>('social-media-marketing')
  const activeService = servicePricingData[activeSlug]

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>

      {/* HERO */}
      <section
        className="relative w-full min-h-[92svh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-10%',
            top: '15%',
            width: 'clamp(300px, 40vw, 700px)',
            height: 'clamp(300px, 40vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,26,26,0.07) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-12 lg:pb-16">

          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              className="font-mono uppercase block mb-6"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ NO HIDDEN FEES
            </motion.span>

            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <TextReveal
                text="HONEST"
                as="h1"
                delay={0.1}
                className="font-display font-black leading-none tracking-normal uppercase"
                style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', color: 'var(--color-foreground)' }}
              />
              <TextReveal
                text="RATES."
                as="h1"
                delay={0.22}
                className="font-display font-black leading-none tracking-normal uppercase"
                style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', color: 'var(--color-violet)' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-8 lg:mt-10"
              style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '480px' }}
            >
              Six services. Three plans each. INR pricing, no games. Pick your service below and see exactly what you get.
            </motion.p>
          </div>

          <div className="flex items-end justify-between mt-10 lg:mt-14">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ ALL PRICES IN INR · GST @18% APPLICABLE
            </span>
            <div className="hidden lg:flex flex-col items-center gap-2">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: '10px',
                  color: 'var(--color-dead)',
                  letterSpacing: '0.22em',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                Scroll
              </span>
              <div style={{ width: '1px', height: '48px', backgroundColor: 'var(--color-border)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-10 lg:mb-12"
          >
            <span
              className="font-mono uppercase block mb-3"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              SERVICE PRICING
            </span>
            <h2
              className="font-display font-black leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)', color: 'var(--color-foreground)' }}
            >
              Pick a Service
            </h2>
          </motion.div>

          {/* Tabs */}
          <div
            className="flex flex-wrap gap-2 mb-10 lg:mb-12"
            style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveSlug(tab.slug)}
                className="font-mono uppercase text-xs px-4 py-3 transition-all duration-200 relative"
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

          {/* Active service plans */}
          {activeService && <ServiceTab service={activeService} />}
        </div>
      </section>

      {/* DISCOVERY WORKSHOP CALLOUT */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(40px, 6vw, 72px) 0' }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center"
            style={{ border: '1px solid rgba(107,26,26,0.3)', padding: 'clamp(24px, 4vw, 48px)', backgroundColor: 'rgba(107,26,26,0.03)' }}
          >
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ALWAYS STARTS HERE
              </span>
              <h2
                className="font-display font-black mb-3"
                style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.9rem)', color: 'var(--color-foreground)', lineHeight: 1.1 }}
              >
                Discovery &amp; Scope Planning
              </h2>
              <p
                style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '520px' }}
              >
                Every engagement starts with requirement mapping and implementation planning before commercial and technical commitments are finalized.
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

      {/* COMPARISON TABLE */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-12 lg:mb-16"
          >
            <span
              className="font-mono uppercase block mb-3"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              COMPARISON
            </span>
            <h2
              className="font-display font-black"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}
            >
              The Difference
            </h2>
            <p
              className="mt-3"
              style={{ fontSize: '15px', color: 'var(--color-muted)', maxWidth: '480px', lineHeight: 1.72 }}
            >
              Why businesses choose MTA over traditional alternatives.
            </p>
          </motion.div>

          <div
            className="border border-border overflow-hidden"
            style={{ backgroundColor: 'var(--color-card)' }}
          >
            <div className="w-full overflow-x-auto relative">
              <div
                className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 lg:hidden"
                style={{ background: 'linear-gradient(to left, var(--color-card), transparent)' }}
              />
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th
                      className="font-mono text-xs uppercase tracking-widest py-5 px-6 w-[40%]"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Features / Approach
                    </th>
                    {comparisonData.columns.map((col, i) => (
                      <th
                        key={col.name}
                        className="font-mono text-xs uppercase tracking-widest py-5 px-6 w-[20%]"
                        style={{
                          color: i === 2 ? 'var(--color-violet)' : 'var(--color-muted)',
                          fontWeight: i === 2 ? 700 : 500,
                        }}
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
                      <td className="py-5 px-6 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                        {feature}
                      </td>
                      {comparisonData.columns.map((col) => {
                        const has = col.values[rowIndex]
                        return (
                          <td key={`${col.name}-${feature}`} className="py-5 px-6 text-sm">
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

      {/* CTA */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span
                className="font-mono uppercase block mb-4"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                GET STARTED
              </span>
              <h2
                className="font-display font-black mb-6 leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', color: 'var(--color-foreground)' }}
              >
                Start Your<br />Project
              </h2>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.72, maxWidth: '380px' }}>
                Free consultation and honest scope — no sales pitch, no lock-in.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 font-display font-black text-[15px] hover:bg-violet hover:text-white transition-all duration-300"
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
