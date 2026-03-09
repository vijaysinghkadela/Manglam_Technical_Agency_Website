'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { TextReveal } from '@/components/ui/TextReveal'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const plans = [
  {
    name: 'Web & SaaS Development',
    price: '₹50,000',
    type: 'one-time',
    features: ['Custom Next.js Website', 'Responsive Design', 'CMS Integration', '1-Year Free Support'],
    href: '/services/saas-products',
    recommended: true,
  },
  {
    name: 'Social Media',
    price: '₹10,000',
    type: 'per month',
    features: ['12 Posts / Month', '2 Platforms', 'Analytics Report', 'Community Management'],
    href: '/services/social-media-marketing',
  },
  {
    name: 'Cybersecurity',
    price: '₹20,000',
    type: 'per year',
    features: ['Security Audit', 'Vulnerability Assessment', 'Threat Monitoring', 'Incident Response'],
    href: '/services/cybersecurity',
  },
  {
    name: 'AI Automation',
    price: 'Custom',
    type: 'scoped project',
    features: ['Process Audit', 'API Integration', 'Custom Dashboards', 'Workflow Automation'],
    href: '/services/ai-automation',
  },
  {
    name: 'Branding & Identity',
    price: 'Starting at ₹10,000',
    type: 'tiered offerings',
    features: ['Discovery Workshop', 'Comprehensive Brand System', 'Asset Guidelines', 'Brand Guardian Retainer'],
    href: '/services/branding',
  },
  {
    name: 'SaaS Products & Subscriptions',
    price: 'Starting at ₹5,000',
    type: 'per month',
    features: ['Tenant Setup & Migration', 'Custom API Integrations', 'Dedicated Database Instance', 'Enterprise SSO'],
    href: '/services/saas-products',
  },
  {
    name: 'Content Creation & Strategy',
    price: 'Starting at ₹15,000',
    type: 'retainer or project',
    features: ['SEO-Optimized Blog Posts', 'Social Media Copy', 'Email Newsletters', 'Whitepapers & Guides'],
    href: '/services/content-creation',
  },
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

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden grain"
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
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-28 lg:pt-36 pb-12 lg:pb-16">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 font-mono mb-14 lg:mb-24"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>PRICING</span>
          </motion.nav>

          {/* Headline */}
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
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', color: 'var(--color-foreground)' }}
              />
              <TextReveal
                text="RATES."
                as="h1"
                delay={0.22}
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', color: 'var(--color-violet)' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-8 lg:mt-10"
              style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '480px' }}
            >
              No games, no tiers nobody needs. We publish our rates so you know exactly what to expect before we even speak.
            </motion.p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between mt-10 lg:mt-14">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ ALL PRICES IN INR · GST APPLICABLE
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

      {/* ── PLANS — Editorial rows ────────────────────────── */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12 lg:mb-16"
          >
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                STARTING RATES
              </span>
              <h2
                className="font-display font-black leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)', color: 'var(--color-foreground)' }}
              >
                What You&apos;ll Pay
              </h2>
            </div>

            {/* Billing toggle */}
            <div
              className="flex items-center p-1 border border-border"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                  billing === 'monthly' ? 'bg-violet text-white' : 'text-muted hover-foreground'
                }`}
                data-cursor="pointer"
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                  billing === 'annual' ? 'bg-violet text-white' : 'text-muted hover-foreground'
                }`}
                data-cursor="pointer"
              >
                Annual <span className="opacity-60 text-xs">(-20%)</span>
              </button>
            </div>
          </motion.div>

          {/* Plan rows */}
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {plans.map((plan, i) => {
              const displayPrice =
                billing === 'annual' && plan.type === 'per month' ? '₹96,000' : plan.price
              const displayType =
                billing === 'annual' && plan.type === 'per month' ? 'per year' : plan.type

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: EASE }}
                  className="group relative"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  {/* Violet left accent on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: 'var(--color-violet)' }}
                  />

                  {/* Recommended banner */}
                  {plan.recommended && (
                    <div className="flex items-center gap-2 px-6 lg:px-8 pt-5">
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
                        style={{
                          border: '1px solid rgba(124,58,237,0.4)',
                          color: 'var(--color-violet-light)',
                          backgroundColor: 'rgba(124,58,237,0.06)',
                        }}
                      >
                        ✦ Popular
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_160px] gap-6 lg:gap-0 px-6 lg:px-8 py-8 lg:py-10 items-center">

                    {/* Left: name + features */}
                    <div className="flex flex-col gap-4 lg:pr-12">
                      <div>
                        <h3
                          className="font-display font-bold"
                          style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', color: 'var(--color-foreground)', lineHeight: 1.2 }}
                        >
                          {plan.name}
                        </h3>
                        {plan.type !== 'scoped project' && (
                          <span
                            className="font-mono uppercase mt-1 block"
                            style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}
                          >
                            {displayType}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {plan.features.map((f) => (
                          <span
                            key={f}
                            className="flex items-center gap-1.5"
                            style={{ fontSize: '13px', color: 'var(--color-muted)' }}
                          >
                            <Check
                              className="w-3 h-3 shrink-0"
                              style={{ color: 'var(--color-violet)' }}
                            />
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Middle: price */}
                    <div className="lg:border-l lg:border-border lg:pl-8">
                      <p
                        className="font-display font-black leading-none"
                        style={{
                          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                          color: plan.recommended ? 'var(--color-violet-light)' : 'var(--color-foreground)',
                        }}
                      >
                        {displayPrice}
                      </p>
                    </div>

                    {/* Right: CTA */}
                    <div className="lg:border-l lg:border-border lg:pl-8 flex items-center">
                      <Link
                        href={plan.href}
                        data-cursor="link"
                        className="inline-flex items-center gap-2 font-display font-bold text-sm transition-colors duration-200 group-hover:text-violet"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <p
            className="font-mono mt-8"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.1em' }}
          >
            All prices in INR · GST applicable · Discovery Workshop ₹25,000 credited on project sign-off
          </p>
        </div>
      </section>

      {/* ── DISCOVERY WORKSHOP CALLOUT ───────────────────── */}
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
            style={{ border: '1px solid rgba(124,58,237,0.3)', padding: 'clamp(24px, 4vw, 48px)', backgroundColor: 'rgba(124,58,237,0.03)' }}
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
                Discovery Workshop — ₹25,000
              </h2>
              <p
                style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '520px' }}
              >
                Every engagement begins with a scoped Discovery Workshop. We map your requirements, calculate ROI, and hand you a written architecture blueprint — fully credited towards your project on sign-off.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 font-display font-black text-[14px] hover:bg-violet hover:text-white transition-all duration-300 whitespace-nowrap"
              style={{ border: '1px solid var(--color-violet)', color: 'var(--color-violet-light)' }}
              data-cursor="pointer"
            >
              Book Workshop →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────── */}
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
              {/* Mobile fade */}
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
                                style={{ backgroundColor: 'rgba(124,58,237,0.12)', color: 'var(--color-violet)' }}
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

      {/* ── CTA ─────────────────────────────────────────── */}
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
