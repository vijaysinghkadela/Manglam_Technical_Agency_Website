'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import MotionWrapper from '@/components/ui/MotionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import { pricingPlans, comparisonTable } from '@/lib/data/pricing';
import { FAQ } from '@/types';

const pricingFaqs: FAQ[] = [
  { q: 'Do you offer EMI or payment plans?', a: 'Currently we don\'t offer EMI. For project-based work, payments are split into milestones. For monthly services, you pay at the start of each month.' },
  { q: 'What happens if I want to cancel?', a: 'A 30-day written notice is required. All completed work will be delivered and outstanding payments settled within 15 days.' },
  { q: 'Are there any hidden charges?', a: 'No. Our pricing is fully transparent. Deliverables, timeline, and cost are outlined in your proposal before any work begins.' },
  { q: 'How do you handle scope changes?', a: 'All scope changes go through a written change request process. We assess impact on timeline and cost and get your approval before proceeding.' },
  { q: 'Is GST included in the prices?', a: 'Prices shown are pre-GST. GST will be applied as per applicable rates at the time of invoicing.' },
  { q: 'What currency do you bill in?', a: 'All prices are in Indian Rupees (₹). For international clients, we can discuss USD billing arrangements.' },
];

export default function PricingContent() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  return (
    <>
      {/* Toggle */}
      <section className="px-4 mb-8">
        <div className="max-w-xs mx-auto flex items-center bg-surface rounded-xl p-1 border border-border">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${billingPeriod === 'monthly' ? 'bg-brand text-white' : 'text-text-muted hover:text-text-primary'}`}
            id="pricing-toggle-monthly"
          >Monthly</button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all relative ${billingPeriod === 'annual' ? 'bg-brand text-white' : 'text-text-muted hover:text-text-primary'}`}
            id="pricing-toggle-annual"
          >
            Annual
            <span className="absolute -top-2 -right-2 px-2 py-1 bg-success text-white text-[10px] font-bold rounded-full">Save</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding pt-0">
        <div className="max-w-6xl mx-auto space-y-12">
          {pricingPlans.map((planGroup) => (
            <MotionWrapper key={planGroup.slug}>
              <div>
                <h2 className="text-xl font-heading font-bold text-text-primary mb-5 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-brand-light" />
                  </span>
                  {planGroup.service}
                  <span className="text-xs bg-surface-2 px-2 py-1 rounded-full border border-border text-text-muted ml-2">{planGroup.badge}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {planGroup.plans.map((plan) => (
                    <GlassCard key={plan.name} className={`relative ${plan.popular ? 'border-brand/40 shadow-lg shadow-brand/10' : ''}`}>
                      {plan.popular && <div className="absolute -top-3 left-6 px-3 py-1 bg-brand text-white text-xs font-bold rounded-full">Popular</div>}
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-heading font-bold gradient-text">{plan.price}</span>
                        <span className="text-sm text-text-muted">{plan.period}</span>
                      </div>
                      <ul className="space-y-2 my-5">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                            <Check className="w-4 h-4 text-success shrink-0 mt-1" />{f}
                          </li>
                        ))}
                      </ul>
                      <Link href={plan.ctaLink} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all group ${plan.popular ? 'bg-brand text-white hover:bg-brand-light' : 'border border-brand/30 text-text-primary hover:border-brand hover:bg-brand/5'}`}>
                        {plan.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Web Development Plans Compared" />
          <MotionWrapper>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-text-muted font-medium">Feature</th>
                    <th className="text-center py-3 px-4 text-text-primary font-semibold">Starter</th>
                    <th className="text-center py-3 px-4 text-brand-light font-semibold">Growth</th>
                    <th className="text-center py-3 px-4 text-text-primary font-semibold">Custom</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.feature} className="border-b border-border/50">
                      <td className="py-3 px-4 text-text-muted">{row.feature}</td>
                      {[row.starter, row.growth, row.custom].map((val, i) => (
                        <td key={i} className="text-center py-3 px-4">
                          {typeof val === 'boolean' ? (
                            val ? <Check className="w-4 h-4 text-success mx-auto" /> : <span className="text-text-muted/30">—</span>
                          ) : (
                            <span className="text-text-primary text-xs">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Payment Terms */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <MotionWrapper>
            <GlassCard hover={false}>
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">💳 Payment Terms</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                All projects begin with a signed agreement. Web development: 50% advance, 50% on delivery.
                Social media: monthly in advance by the 5th. Custom services: terms agreed in writing before project start.
                All prices are in Indian Rupees (₹). GST applicable as per current rates.
              </p>
            </GlassCard>
          </MotionWrapper>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Pricing FAQ" />
          <ServiceFAQ faqs={pricingFaqs} />
        </div>
      </section>
    </>
  );
}
