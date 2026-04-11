'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, FileText, CreditCard, Package } from 'lucide-react'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

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
    <section className="border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(56px, 9vw, 96px) 0' }}>
      <div className="container-site">
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div>
            <p className="font-mono text-label tracking-[0.22em] uppercase mb-3" style={{ color: 'var(--color-violet-light)' }}>
              LEGAL & COMPLIANCE BY DESIGN
            </p>
            <h2
              className="font-display font-black tracking-tight leading-[0.92]"
              style={{ fontSize: 'clamp(28px, 4vw, 54px)', color: 'var(--color-foreground)' }}
            >
              Delivery that stands up<br />in a contract review.
            </h2>
          </div>
          <div className="flex items-center gap-5 flex-wrap text-sm">
            <Link
              href="/research"
              className="font-mono text-sm transition-colors"
              style={{ color: 'var(--color-violet-light)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-violet-light)' }}
            >
              Read Research →
            </Link>
            <Link
              href="/legal"
              className="font-mono text-sm transition-colors"
              style={{ color: 'var(--color-violet-light)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-violet-light)' }}
            >
              Open Legal Hub →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative bg-canvas p-7 transition-all duration-300"
              style={{
                border: '1px solid var(--color-border)',
                borderLeft: '2px solid var(--color-violet)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: EASE }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(124,58,237,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              {/* Watermark number */}
              <span
                className="absolute top-4 right-5 font-display font-black select-none pointer-events-none transition-all duration-500 group-hover:opacity-[0.08]"
                style={{ fontSize: '64px', lineHeight: 1, color: 'var(--color-violet)', opacity: 0.04 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div
                className="w-9 h-9 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:border-violet/50"
                style={{
                  border: '1px solid rgba(124,58,237,0.28)',
                  backgroundColor: 'rgba(124,58,237,0.07)',
                }}
              >
                <item.Icon className="w-4 h-4 transition-colors duration-300 group-hover:text-violet" style={{ color: 'var(--color-violet-light)' }} />
              </div>

              <h3
                className="font-display font-bold text-lg mb-2 transition-colors duration-200 group-hover:text-violet-light"
                style={{ color: 'var(--color-foreground)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', lineHeight: 1.72 }}>
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
