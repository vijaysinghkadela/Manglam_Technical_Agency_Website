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
    body: "1-year free on web projects, guaranteed. We don\u0027t disappear after launch.",
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
    <section style={{ backgroundColor:'var(--color-canvas)', padding:'112px 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <span className="font-mono uppercase block mb-3" style={{ fontSize:'11px', color:'var(--color-violet-light)', letterSpacing:'0.22em' }}>
              WHY CHOOSE US
            </span>
            <h2 className="font-display font-black text-white tracking-tight leading-[0.92] mb-6"
              style={{ fontSize:'clamp(28px, 4vw, 60px)' }}>
              Built Different.<br />Delivered Right.
            </h2>
            <p className="text-[15px] leading-[1.7] mb-4" style={{ color:'var(--color-muted)' }}>
              We&apos;re not a body shop or an overseas outsourcing mill. MTA is a lean, Rajasthan-based
              agency that treats every project like our own product.
            </p>
            <p className="text-[15px] leading-[1.7]" style={{ color:'var(--color-muted)' }}>
              When you work with us, you get direct access to the people building your solution —
              no account managers, no ticket queues, no runaround.
            </p>
          </div>

          <div className="flex flex-col">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="py-6 flex items-start gap-4 border-b"
                style={{ borderColor:'var(--color-border)' }}
              >
                <Check className="w-5 h-5 mt-1 shrink-0" style={{ color:'var(--color-violet)' }} />
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color:'var(--color-muted)' }}>{val.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
