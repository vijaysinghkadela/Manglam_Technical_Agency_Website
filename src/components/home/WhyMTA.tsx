'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { MTA_STATS } from '@/lib/data/stats'
const values = [
  {
    title: 'Based in Bikaner, built for Indian businesses',
    body: 'You work with the technical team directly. No outsourcing chain, no handoff maze, and no vague ownership.',
  },
  {
    title: 'Written Agreements for Every Project',
    body: 'No verbal commitments, ever. Clear contracts protect both sides before a single line of code is written.',
  },
  {
    title: 'One team across web, security, AI, and growth',
    body: 'You do not need separate vendors for the website, lead flow, automation, campaign setup, and basic security review.',
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
    title: 'Real builds, not pitch-deck services',
    body: 'Our portfolio includes SaaS dashboards, CRM workflows, clinic systems, and an NGO website that visitors can inspect.',
  },
]

export function WhyMTA() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-16">

          <motion.div
            initial={false}
            whileInView={{ x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-[120px] lg:self-start flex flex-col gap-6 glass-card rounded-[28px] p-10 sm:p-12"
          >
            <div>
              <span className="font-mono uppercase block mb-3" style={{ fontSize: '11px', color: 'var(--color-violet)', letterSpacing: '0.22em' }}>
                WHY CHOOSE US
              </span>
              <h2
                className="marketing-heading font-display font-black tracking-normal leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.85rem)', color: 'var(--color-foreground)' }}
              >
                Small team.<br />Written scope.<br />Direct delivery.
              </h2>
              <p className="narrative-copy mb-5" style={{ color: 'var(--color-muted)' }}>
                MTA is a lean technical agency for business owners who want practical delivery, not a sales-heavy vendor.
              </p>
              <p className="narrative-copy" style={{ color: 'var(--color-muted)' }}>
                You speak with the people building your solution. Scope, pricing, approvals, and handover are documented before launch.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              {[[String(MTA_STATS.activeClients), 'Active Clients'], [String(MTA_STATS.internalSaaS), 'SaaS Products'], [String(MTA_STATS.practiceAreas), 'Practice Areas']].map(([num, lbl]) => (
                <div
                  key={lbl}
                  className="rounded-2xl border border-border bg-surface px-4 py-5 text-center"
                >
                  <span className="block font-display font-black" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--color-foreground)' }}>
                    {num}
                  </span>
                  <span className="mt-3 block font-mono uppercase" style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {values.map((val, i) => (
              <motion.article
                key={val.title}
                initial={false}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group glass-card rounded-[24px] p-8 sm:p-10"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0 rounded-xl transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(var(--color-accent-rgb),0.08)', border: '1px solid rgba(var(--color-accent-rgb),0.18)' }}
                  >
                    <Check className="w-4 h-4" style={{ color: 'var(--color-violet)' }} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="font-display font-bold mb-2 transition-colors duration-200 group-hover:text-violet"
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
