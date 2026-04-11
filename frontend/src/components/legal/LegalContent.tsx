'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FileText, Lock, Plus, ExternalLink } from 'lucide-react'
import type { AgreementSummary, ApplicabilityRow, PolicyDocument } from '@/lib/data/legal'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  agreements: AgreementSummary[]
  matrix: ApplicabilityRow[]
  policies: PolicyDocument[]
}

export function LegalContent({ agreements, matrix, policies }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-24">

      {/* ── Agreement Catalog ── */}
      <div id="agreements">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10"
        >
          <span
            className="font-mono uppercase block mb-3"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            01 — AGREEMENT CATALOG
          </span>
          <h2
            className="font-display font-black leading-none tracking-tighter uppercase"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}
          >
            Agreements
          </h2>
        </motion.div>

        {/* Accordion rows */}
        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {agreements.map((a, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {/* Row header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 sm:gap-5 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Index */}
                  <span
                    className="font-mono shrink-0 w-7 text-right hidden sm:block"
                    style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.1em' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Code badge */}
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 shrink-0"
                    style={{
                      border: '1px solid rgba(124,58,237,0.35)',
                      color: 'var(--color-violet-light)',
                      backgroundColor: 'rgba(124,58,237,0.06)',
                    }}
                  >
                    {a.code}
                  </span>

                  {/* Name + visibility */}
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span
                      className="font-display font-bold truncate transition-colors duration-200 group-hover:text-violet"
                      style={{
                        fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                        color: 'var(--color-foreground)',
                      }}
                    >
                      {a.name}
                    </span>
                    {a.visibility === 'restricted-request' && (
                      <Lock
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: 'var(--color-dead)' }}
                      />
                    )}
                  </div>

                  {/* Primary use — hidden on small screens */}
                  <span
                    className="font-mono hidden xl:block shrink-0 max-w-[200px] truncate"
                    style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.06em' }}
                  >
                    {a.primaryUse.split('.')[0]}
                  </span>

                  {/* Expand icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="shrink-0 ml-auto"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="pb-8 sm:pl-12 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8"
                        style={{ borderTop: '1px solid var(--color-border)' }}
                      >
                        {/* Key Clauses */}
                        <div>
                          <span
                            className="font-mono uppercase block mb-4"
                            style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                          >
                            Key Clauses
                          </span>
                          <ul className="flex flex-col gap-2.5">
                            {a.keyClauses.map((clause) => (
                              <li
                                key={clause}
                                className="flex items-start gap-2.5"
                                style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}
                              >
                                <span
                                  style={{ color: 'var(--color-violet-light)', flexShrink: 0, marginTop: '1px' }}
                                >
                                  →
                                </span>
                                {clause}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Meta: Governing Laws + Companions + CTA */}
                        <div className="flex flex-col gap-6">
                          {/* Governing Laws */}
                          <div>
                            <span
                              className="font-mono uppercase block mb-3"
                              style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                            >
                              Governing Law
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {a.governingLaws.map((law) => (
                                <span
                                  key={law}
                                  className="font-mono"
                                  style={{
                                    fontSize: '10px',
                                    color: 'var(--color-muted)',
                                    border: '1px solid var(--color-border)',
                                    padding: '3px 8px',
                                  }}
                                >
                                  {law}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Companion Agreements */}
                          {a.companionAgreements.length > 0 && (
                            <div>
                              <span
                                className="font-mono uppercase block mb-3"
                                style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                              >
                                Companion Agreements
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {a.companionAgreements.map((code) => (
                                  <span
                                    key={code}
                                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5"
                                    style={{
                                      border: '1px solid rgba(124,58,237,0.35)',
                                      color: 'var(--color-violet-light)',
                                      backgroundColor: 'rgba(124,58,237,0.06)',
                                    }}
                                  >
                                    {code}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CTA */}
                          {a.requestable && (
                            <a
                              href="#request"
                              className="inline-flex items-center gap-2 font-mono uppercase transition-colors hover:text-violet w-fit"
                              style={{
                                fontSize: '10px',
                                color: 'var(--color-violet-light)',
                                letterSpacing: '0.16em',
                              }}
                            >
                              Request Template →
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Applicability Matrix ── */}
      <div id="matrix">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10"
        >
          <span
            className="font-mono uppercase block mb-3"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            02 — APPLICABILITY MATRIX
          </span>
          <h2
            className="font-display font-black leading-none tracking-tighter uppercase"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}
          >
            Service Matrix
          </h2>
        </motion.div>

        {/* Mobile: card view */}
        <div className="lg:hidden flex flex-col gap-3">
          {matrix.map((row, i) => (
            <motion.div
              key={row.service}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="p-5"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-card)' }}
            >
              <p
                className="font-display font-bold mb-4"
                style={{ fontSize: '15px', color: 'var(--color-foreground)' }}
              >
                {row.service}
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <span
                    className="font-mono uppercase block mb-2"
                    style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                  >
                    Required
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {row.required.map((code) => (
                      <span
                        key={code}
                        className="font-mono text-[10px] px-2 py-0.5 uppercase"
                        style={{
                          border: '1px solid rgba(124,58,237,0.35)',
                          color: 'var(--color-violet-light)',
                          backgroundColor: 'rgba(124,58,237,0.06)',
                        }}
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
                {row.conditional.length > 0 && (
                  <div>
                    <span
                      className="font-mono uppercase block mb-2"
                      style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                    >
                      Conditional
                    </span>
                    <p style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                      {row.conditional.join(' · ')}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: table view */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="hidden lg:block overflow-x-auto border border-border"
          style={{ backgroundColor: 'var(--color-card)' }}
        >
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                {['Service', 'Required', 'Conditional'].map((h) => (
                  <th
                    key={h}
                    className="font-mono text-xs uppercase tracking-widest py-4 px-5"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr
                  key={row.service}
                  className="transition-colors duration-150"
                  style={{ borderBottom: i < matrix.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td className="py-4 px-5 text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    {row.service}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap gap-1.5">
                      {row.required.map((code) => (
                        <span
                          key={code}
                          className="font-mono text-[10px] px-2 py-0.5 uppercase"
                          style={{
                            border: '1px solid rgba(124,58,237,0.35)',
                            color: 'var(--color-violet-light)',
                            backgroundColor: 'rgba(124,58,237,0.06)',
                          }}
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm" style={{ color: 'var(--color-muted)' }}>
                    {row.conditional.join(' · ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* ── Policy Documents ── */}
      <div id="policies">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10"
        >
          <span
            className="font-mono uppercase block mb-3"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            03 — POLICY DOCUMENTS
          </span>
          <h2
            className="font-display font-black leading-none tracking-tighter uppercase"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}
          >
            Policies
          </h2>
        </motion.div>

        {/* Horizontal banner cards */}
        <div className="flex flex-col gap-4">
          {policies.map((policy, i) => (
            <motion.div
              key={policy.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <Link
                href={`/legal/${policy.slug}`}
                data-cursor="link"
                className="group flex items-center gap-5 sm:gap-6 p-5 sm:p-6 border border-border transition-all duration-300 hover:border-violet/40"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-violet/40"
                  style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                >
                  <FileText
                    className="w-5 h-5 transition-colors duration-200 group-hover:text-violet"
                    style={{ color: 'var(--color-muted)' }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <h3
                    className="font-display font-bold transition-colors duration-200 group-hover:text-violet"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'var(--color-foreground)' }}
                  >
                    {policy.title}
                  </h3>
                  <p
                    className="text-sm leading-snug line-clamp-2"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {policy.summary}
                  </p>
                </div>

                {/* Right meta */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className="font-mono text-[10px] whitespace-nowrap"
                    style={{ color: 'var(--color-dead)', letterSpacing: '0.1em' }}
                  >
                    {policy.lastUpdated}
                  </span>
                  <ExternalLink
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'var(--color-muted)' }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
