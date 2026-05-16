'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { BRAND, ANIMATION } from '@/lib/design-system'

const values = [
  {
    title: 'India-Based, Globally-Minded',
    body: 'Bikaner, Rajasthan HQ with world-class standards. We combine local understanding with international quality.',
  },
  {
    title: 'Written Agreements for Every Project',
    body: 'No verbal commitments, ever. Clear contracts protect both sides before a single line of code is written.',
  },
  {
    title: 'Full-Stack Execution',
    body: 'Web, security, AI, automation, all under one roof. No need to coordinate between multiple vendors.',
  },
  {
    title: 'Post-Delivery Support',
    body: 'Structured handover, documentation, and support planning are built into delivery. We stay accountable after launch.',
  },
  {
    title: 'Transparent Pricing',
    body: 'Product and service pricing is documented in advance, with clear scope and no hidden line items.',
  },
  {
    title: 'Proven Delivery',
    body: 'From internal SaaS builds to NGO web delivery, MTA executes with documentation-first planning and measurable outcomes.',
  },
]

export function WhyMTA() {
  return (
    <section style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(56px, 9vw, 104px) 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-6 lg:gap-14">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: ANIMATION.ease }}
            className="lg:sticky lg:top-[120px] lg:self-start flex flex-col gap-6 rounded-[28px] border border-border bg-card p-6 sm:p-8"
          >
            <div>
              <span className="font-mono uppercase block mb-3" style={{ fontSize: '11px', color: BRAND.primary, letterSpacing: '0.22em' }}>
                WHY CHOOSE US
              </span>
              <h2
                className="font-display font-black tracking-normal leading-[0.92] mb-5"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.85rem)', color: 'var(--color-foreground)' }}
              >
                Built Different.<br />Delivered Right.
              </h2>
              <p className="text-[15px] leading-[1.72] mb-4" style={{ color: 'var(--color-muted)' }}>
                We&apos;re not a body shop or an outsourcing mill. MTA is a lean agency that treats every project like our own product.
              </p>
              <p className="text-[15px] leading-[1.72]" style={{ color: 'var(--color-muted)' }}>
                When you work with us, you get direct access to the people building your solution, no account managers,
                no ticket queues, no runaround.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              {[['3', 'Active Clients'], ['2', 'SaaS Products'], ['6', 'Practice Areas']].map(([num, lbl]) => (
                <div
                  key={lbl}
                  className="rounded-2xl border border-border bg-surface px-3 py-4 text-center"
                >
                  <span className="block font-display font-black" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--color-foreground)' }}>
                    {num}
                  </span>
                  <span className="mt-2 block font-mono uppercase" style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {values.map((val, i) => (
              <motion.article
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: ANIMATION.ease }}
                className="group rounded-[24px] border border-border bg-card p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0 rounded-xl transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(107,26,26,0.08)', border: '1px solid rgba(107,26,26,0.18)' }}
                  >
                    <Check className="w-4 h-4" style={{ color: BRAND.primary }} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="font-display font-bold mb-1 transition-colors duration-200 group-hover:text-[#6B1A1A]"
                      style={{ fontSize: '17px', color: 'var(--color-foreground)', lineHeight: 1.2 }}
                    >
                      {val.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
                      {val.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

