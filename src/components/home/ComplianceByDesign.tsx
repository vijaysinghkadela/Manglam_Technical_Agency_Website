'use client'
import { motion } from 'framer-motion'
import { Lock, FileText, CreditCard, Package } from 'lucide-react'
import Link from 'next/link'
import { BRAND, ANIMATION } from '@/lib/design-system'

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
    <section className="border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(56px, 9vw, 104px) 0' }}>
      <div className="container-site">
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 sm:gap-8 mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: ANIMATION.ease }}
        >
          <div>
            <p className="font-mono text-label tracking-[0.22em] uppercase mb-3" style={{ color: BRAND.primary }}>
              LEGAL & COMPLIANCE BY DESIGN
            </p>
            <h2
              className="font-display font-black tracking-normal leading-[0.92]"
              style={{ fontSize: 'clamp(28px, 4vw, 56px)', color: 'var(--color-foreground)' }}
            >
              Delivery that stands up<br />in a contract review.
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap text-sm">
            <Link
              href="/research"
              className="font-mono text-sm transition-colors rounded-full border border-border px-4 py-2"
              style={{ color: BRAND.primary }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = BRAND.primary }}
            >
              Read Research →
            </Link>
            <Link
              href="/legal"
              className="font-mono text-sm transition-colors rounded-full border border-border px-4 py-2"
              style={{ color: BRAND.primary }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = BRAND.primary }}
            >
              Open Legal Hub →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <motion.article
              key={item.title}
              className="group relative overflow-hidden rounded-[24px] border border-border bg-card p-6 sm:p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: ANIMATION.ease }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, ${BRAND.primary}, transparent 75%)` }}
                aria-hidden
              />

              <span
                className="absolute top-4 right-5 font-display font-black select-none pointer-events-none"
                style={{ fontSize: '64px', lineHeight: 1, color: BRAND.primary, opacity: 0.05 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div
                className="w-10 h-10 flex items-center justify-center mb-5 rounded-xl transition-colors duration-300"
                style={{
                  border: '1px solid rgba(107,26,26,0.18)',
                  backgroundColor: 'rgba(107,26,26,0.05)',
                }}
              >
                <item.Icon className="w-4 h-4 transition-colors duration-300" style={{ color: BRAND.primary }} />
              </div>

              <h3
                className="font-display font-bold text-lg mb-2 transition-colors duration-200"
                style={{ color: 'var(--color-foreground)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', lineHeight: 1.72 }}>
                {item.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

