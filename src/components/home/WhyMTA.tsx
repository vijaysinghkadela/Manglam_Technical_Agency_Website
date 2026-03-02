'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const values = [
  {
    title: 'India-Based, Globally-Minded',
    body: 'Rajasthan HQ with world-class standards. We combine local understanding with international quality.',
  },
  {
    title: 'Written Agreements for Every Project',
    body: 'No verbal commitments, ever. Clear contracts protect both sides.',
  },
  {
    title: 'Full-Stack Execution',
    body: 'Web, security, AI, automation — all under one roof. No need to coordinate between 5 vendors.',
  },
  {
    title: 'Post-Delivery Support',
    body: '1-year free on web projects, guaranteed. We don\'t disappear after launch.',
  },
  {
    title: 'Transparent Pricing',
    body: 'Published rates, no surprise invoices. You know the cost before you commit.',
  },
  {
    title: 'Proven Delivery',
    body: 'MNSS website: 3 weeks, exactly as scoped. We deliver on time, every time.',
  },
]

export function WhyMTA() {
  return (
    <section className="w-full bg-canvas py-28">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Sticky */}
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase block mb-3">
              WHY CHOOSE US
            </span>
            <h2 className="font-display font-black text-white tracking-tight leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}>
              Built Different.<br />Delivered Right.
            </h2>
            <p className="text-[15px] text-muted leading-[1.7] mb-4">
              We&apos;re not a body shop or an overseas outsourcing mill. MTA is a lean, Rajasthan-based
              agency that treats every project like our own product.
            </p>
            <p className="text-[15px] text-muted leading-[1.7]">
              When you work with us, you get direct access to the people building your solution —
              no account managers, no ticket queues, no runaround.
            </p>
          </div>

          {/* Right — Scrollable list */}
          <div className="flex flex-col">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="py-6 flex items-start gap-4 border-b border-border"
              >
                <Check className="w-5 h-5 text-violet mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {val.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{val.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
