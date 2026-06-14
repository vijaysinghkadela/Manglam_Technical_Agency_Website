'use client'
import { motion } from 'framer-motion'
import { Lock, FileText, CreditCard, Package } from 'lucide-react'
const highlights = [
  {
    Icon: Lock,
    title: 'NDA Before Discovery',
    detail: 'Sensitive discovery and architecture conversations are gated by signed confidentiality controls.',
  },
  {
    Icon: FileText,
    title: 'Service-Specific Contract Set',
    detail: 'Each engagement route maps to required agreements and conditional DPA attachments.',
  },
  {
    Icon: CreditCard,
    title: 'Payment-Gated Delivery Progression',
    detail: 'Phase transitions are tied to milestone clearance to protect delivery continuity.',
  },
  {
    Icon: Package,
    title: 'Mandatory Handover Package',
    detail: 'Final delivery includes operational runbooks, documentation, and controlled asset transfer.',
  },
]

export function ComplianceByDesign() {
  return (
    <section className="section border-t border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-site">
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 sm:gap-10 lg:gap-16 mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="font-mono text-label tracking-[0.22em] uppercase mb-4" style={{ color: 'var(--color-violet)' }}>
              LEGAL & COMPLIANCE BY DESIGN
            </p>
            <h2
              className="font-display font-black tracking-normal leading-[0.92]"
              style={{ fontSize: 'clamp(28px, 4vw, 56px)', color: 'var(--color-foreground)' }}
            >
              Delivery that stands up<br />in a contract review.
            </h2>
          </div>

        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {highlights.map((item, i) => (
            <motion.article
              key={item.title}
              className="group relative overflow-hidden rounded-[24px] border border-border bg-card p-10 sm:p-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, var(--color-violet), transparent 75%)` }}
                aria-hidden
              />

              <span
                className="absolute top-5 right-6 font-display font-black select-none pointer-events-none"
                style={{ fontSize: '72px', lineHeight: 1, color: 'var(--color-violet)', opacity: 0.04 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div
                className="w-11 h-11 flex items-center justify-center mb-8 rounded-xl transition-colors duration-300"
                style={{
                  border: '1px solid rgba(var(--color-accent-rgb),0.18)',
                  backgroundColor: 'rgba(var(--color-accent-rgb),0.05)' }}
              >
                <item.Icon className="w-4.5 h-4.5 transition-colors duration-300" style={{ color: 'var(--color-violet)' }} />
              </div>

              <h3
                className="font-display font-bold text-[17px] sm:text-lg mb-4 transition-colors duration-200"
                style={{ color: 'var(--color-foreground)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-[1.75]" style={{ color: 'var(--color-muted)' }}>
                {item.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

