'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Web Development',
    price: '₹50,000',
    type: 'one-time',
    features: ['Custom Next.js Website', 'Responsive Design', 'CMS Integration', '1-Year Free Support'],
    href: '/services/web-development',
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
    { name: 'Freelancers', values: [false, false, true, false, false, false, false] },
    { name: 'Traditional Agencies', values: [true, true, false, false, false, false, true] },
    { name: 'MTA (Us)', values: [true, true, true, true, true, true, true] },
  ],
}

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Pricing"
        label="NO HIDDEN FEES"
        title="Transparent Pricing."
        subheading="No games, no tiers nobody needs. We publish our rates so you know exactly what to expect before we even speak."
      />

      {/* Pricing Cards */}
      <section className="py-28 bg-surface border-t border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between flex-wrap gap-6 items-end mb-12">
            <h2 className="font-display text-3xl font-bold text-white">Starting Rates</h2>

            {/* Pill Toggle */}
            <div className="flex items-center bg-card p-1 border border-border">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                  billing === 'monthly' ? 'bg-violet text-white' : 'text-muted hover:text-white'
                }`}
                data-cursor="pointer"
                aria-label="Monthly billing"
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                  billing === 'annual' ? 'bg-violet text-white' : 'text-muted hover:text-white'
                }`}
                data-cursor="pointer"
                aria-label="Annual billing"
              >
                Annual <span className="text-[11px] opacity-70">(-20%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan, i) => {
              const displayPrice = billing === 'annual' && plan.type === 'per month'
                ? '₹96,000'
                : plan.price
              const displayType = billing === 'annual' && plan.type === 'per month'
                ? 'per year'
                : plan.type

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card border border-border p-8 lg:p-10 flex flex-col gap-6 transition-all duration-500 hover:border-violet/30"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                      {plan.type !== 'scoped project' && (
                        <span className="text-[11px] font-mono text-muted uppercase tracking-[0.18em] mt-1 block">{displayType}</span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-white"
                      style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}>{displayPrice}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-border" />

                  {/* Features */}
                  <div className="flex flex-col gap-3 flex-1">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet shrink-0" />
                        <span className="font-medium">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={plan.href}
                    className="inline-flex items-center justify-center w-full py-3 text-sm font-semibold border border-border text-muted hover:text-white hover:border-violet transition-all"
                    data-cursor="link"
                  >
                    View Details →
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-28 bg-canvas">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-white">The Difference</h2>
            <p className="text-muted mt-2">See why businesses choose MTA over traditional alternatives.</p>
          </div>

          <div className="bg-card border border-border overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-mono text-xs text-muted uppercase tracking-widest py-5 px-6 w-[40%]">Features / Approach</th>
                    {comparisonData.columns.map((col, i) => (
                      <th key={col.name} className={`font-mono text-xs uppercase tracking-widest py-5 px-6 w-[20%] ${i === 2 ? 'text-violet font-bold' : 'text-muted'}`}>
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((feature, rowIndex) => (
                    <tr key={feature} className="group hover:bg-surface transition-colors border-b border-border last:border-0">
                      <td className="py-5 px-6 text-sm text-white font-medium">
                        {feature}
                      </td>
                      {comparisonData.columns.map((col) => {
                        const hasFeature = col.values[rowIndex]
                        return (
                          <td key={`${col.name}-${feature}`} className="py-5 px-6 text-sm">
                            {hasFeature ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-violet/15 text-violet text-xs font-bold">✓</span>
                            ) : (
                              <span className="text-dead font-bold">—</span>
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
      <section className="py-28 bg-canvas">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-black text-white mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Start Your Project</h2>
          <p className="text-muted mb-10">Get a free consultation and honest scope — no sales pitch.</p>
          <MagneticButton href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-display font-black text-[16px] hover:bg-violet hover:text-white transition-all duration-300"
          >
            Contact Us →
          </MagneticButton>
        </div>
      </section>
    </main>
  )
}
