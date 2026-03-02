'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';

const plans = [
  {
    name: 'Web Development',
    price: '₹50,000',
    type: 'one-time',
    features: ['Custom Next.js Website', 'Responsive Design', 'CMS Integration', '1-Year Support'],
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
];

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
    {
      name: 'Freelancers',
      values: [false, false, true, false, false, false, false],
    },
    {
      name: 'Traditional Agencies',
      values: [true, true, false, false, false, false, true],
    },
    {
      name: 'MTA (Us)',
      values: [true, true, true, true, true, true, true],
    },
  ],
};

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Pricing"
        label="NO HIDDEN FEES"
        title="Transparent Pricing."
        subheading="No games, no tiers nobody needs. We publish our rates so you know exactly what to expect before we even speak."
      />

      {/* Plan Rows (Editorial List Format) */}
      <section className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between flex-wrap gap-6 items-end mb-12 border-b border-[#1F1F1F] pb-6">
            <h2 className="text-display-s text-white">Starting Rates</h2>
            
            {/* Minimal Toggle */}
            <div className="flex gap-6">
              <button
                onClick={() => setBilling('monthly')}
                className={`text-[13px] font-medium transition-colors ${
                  billing === 'monthly' ? 'text-white underline decoration-violet decoration-2 underline-offset-8' : 'text-muted hover:text-white/80'
                }`}
                data-cursor="pointer"
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`text-[13px] font-medium transition-colors ${
                  billing === 'annual' ? 'text-white underline decoration-violet decoration-2 underline-offset-8' : 'text-muted hover:text-white/80'
                }`}
                data-cursor="pointer"
              >
                Annual <span className="text-violet ml-1">(-20%)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            {plans.map((plan, i) => {
              // Apply discount logic if needed, simplify for UI
              const displayPrice = billing === 'annual' && plan.type === 'per month' 
                ? '₹96,000' 
                : plan.price;
                
              const displayType = billing === 'annual' && plan.type === 'per month' 
                ? 'per year' 
                : plan.type;

              return (
                <div
                  key={plan.name}
                  className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 py-10 border-b border-[#1F1F1F] group hover:bg-[#0E0E0E] transition-colors -mx-4 px-4 sm:mx-0 sm:px-4"
                >
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  </div>
                  
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl lg:text-5xl font-black text-white">{displayPrice}</span>
                    </div>
                    {plan.type !== 'scoped project' && (
                      <span className="text-sm font-mono text-muted uppercase tracking-widest mt-2">{displayType}</span>
                    )}
                  </div>

                  <div className="md:col-span-4 flex flex-col justify-center gap-2">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted font-mono">
                        <span className="text-violet">✦</span>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-start md:justify-end">
                    <Link
                      href={plan.href}
                      className="inline-flex items-center justify-center px-6 py-3 border border-[#1F1F1F] text-sm text-white hover:border-violet hover:bg-violet transition-colors w-full md:w-auto"
                      data-cursor="link"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-surface border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-display-m text-white">The Difference</h2>
          </div>

          <div className="w-full overflow-x-auto pb-6">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="font-mono text-xs text-muted uppercase tracking-wisest pb-6 border-b border-[#1F1F1F] w-[40%]">Features / Approach</th>
                  {comparisonData.columns.map((col, i) => (
                    <th key={col.name} className={`font-mono text-xs uppercase tracking-widest pb-6 border-b border-[#1F1F1F] w-[20%] ${i === 2 ? 'text-violet' : 'text-muted'}`}>
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.features.map((feature, rowIndex) => (
                  <tr key={feature} className="group hover:bg-[#111111] transition-colors">
                    <td className="py-5 border-b border-[#1F1F1F] text-sm text-white font-medium pl-4">
                      {feature}
                    </td>
                    {comparisonData.columns.map((col, colIndex) => {
                      const hasFeature = col.values[rowIndex];
                      return (
                        <td key={`${col.name}-${feature}`} className="py-5 border-b border-[#1F1F1F] text-sm">
                          {hasFeature ? (
                            <span className="text-violet font-bold text-lg">✓</span>
                          ) : (
                            <span className="text-[#2A2A2A] font-bold">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Footer CTA equivalent implemented in layout or globals, but adding a minimal push here */}
      <section className="py-32 bg-canvas">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-display-m text-white mb-10">Start Your Project</h2>
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-white text-black font-display font-bold text-xl hover:bg-violet hover:text-white transition-colors"
              data-cursor="pointer"
            >
              Contact Us →
            </Link>
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
