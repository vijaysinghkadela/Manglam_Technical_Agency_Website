'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  leadToDeliveryPipeline,
  legalFrameworks,
  researchSections,
  riskMap,
} from '@/lib/data/research'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const toc = [
  { id: 'model',     label: '01 — Agency Model' },
  { id: 'pipeline',  label: '02 — Delivery Pipeline' },
  { id: 'framework', label: '03 — Legal Framework' },
  { id: 'risk-map',  label: '04 — Risk Map' },
]

/* ── shared section header ── */
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <span
        className="font-mono uppercase block mb-4"
        style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
      >
        {label}
      </span>
      <h2
        className="font-display font-black mb-12 leading-tight"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--color-foreground)' }}
      >
        {title}
      </h2>
    </motion.div>
  )
}

export function ResearchPageContent() {
  const [openStage, setOpenStage] = useState<number | null>(null)

  return (
    <div
      className="border-t border-border"
      style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
    >
      <div className="container-site grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16 lg:gap-20 items-start">

        {/* ── TOC Sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:sticky lg:top-32 self-start"
        >
          <span
            className="font-mono uppercase block mb-6"
            style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.22em' }}
          >
            CHAPTERS
          </span>
          <nav className="flex flex-col" style={{ borderTop: '1px solid var(--color-border)' }}>
            {toc.map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className="flex items-center py-4 text-sm font-mono transition-colors hover-foreground"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.05em',
                }}
              >
                {entry.label}
              </a>
            ))}
          </nav>

          {/* Legal hub link */}
          <div className="mt-8">
            <Link
              href="/legal"
              className="inline-flex items-center gap-2 text-xs font-mono transition-colors hover-foreground"
              style={{ color: 'var(--color-violet-light)' }}
            >
              Open Legal Hub →
            </Link>
          </div>
        </motion.aside>

        {/* ── Main content ── */}
        <div className="flex flex-col gap-24">

          {/* ── 01 AGENCY MODEL ── */}
          <section id="model">
            <SectionHeader label="01 — AGENCY MODEL" title="Agency Model & Client Collaboration" />

            <div style={{ borderTop: '1px solid var(--color-border)' }}>
              {researchSections.map((section, i) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1.4fr] gap-6 lg:gap-8 py-10 group"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  {/* Number watermark */}
                  <span
                    className="font-display font-black leading-none select-none transition-colors duration-500 group-hover:text-violet"
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                      color: 'rgba(124,58,237,0.15)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title + summary */}
                  <div className="flex flex-col gap-3">
                    <h3
                      className="font-display font-bold"
                      style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'var(--color-foreground)', lineHeight: 1.2 }}
                    >
                      {section.title}
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)' }}>
                      {section.summary}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2.5">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3"
                        style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}
                      >
                        <span style={{ color: 'var(--color-violet-light)', flexShrink: 0, marginTop: '2px' }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── 02 PIPELINE ── */}
          <section id="pipeline">
            <SectionHeader label="02 — DELIVERY PIPELINE" title="Complete Lead-to-Delivery Pipeline" />

            <div style={{ borderTop: '1px solid var(--color-border)' }}>
              {leadToDeliveryPipeline.map((stage, i) => {
                const isOpen = openStage === i
                return (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
                    className="group"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    {/* Summary row */}
                    <button
                      className="w-full flex items-center gap-6 lg:gap-10 py-8 text-left"
                      style={{ cursor: 'none' }}
                      data-cursor="pointer"
                      onClick={() => setOpenStage(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      {/* Big stage number */}
                      <span
                        className="font-display font-black leading-none shrink-0 transition-colors duration-500"
                        style={{
                          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                          color: isOpen ? 'var(--color-violet)' : 'rgba(124,58,237,0.18)',
                          minWidth: '64px',
                        }}
                      >
                        {String(stage.stage).padStart(2, '0')}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-display font-bold"
                          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.35rem)', color: 'var(--color-foreground)', lineHeight: 1.2 }}
                        >
                          {stage.title}
                        </h3>
                        <p className="mt-1" style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                          {stage.trigger}
                        </p>
                      </div>

                      {/* Expand indicator */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="font-mono text-xl shrink-0"
                        style={{ color: 'var(--color-violet-light)' }}
                      >
                        +
                      </motion.span>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 pl-0 lg:pl-[calc(64px+2.5rem)]"
                            style={{
                              borderTop: '1px solid var(--color-border)',
                              paddingTop: '24px',
                              borderLeft: '2px solid rgba(124,58,237,0.2)',
                              marginLeft: '4px',
                              paddingLeft: 'calc(64px + 2.5rem)',
                            }}
                          >
                            <div>
                              <p
                                className="font-mono uppercase mb-4"
                                style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                              >
                                ACTIONS
                              </p>
                              <ul className="flex flex-col gap-2.5">
                                {stage.actions.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2"
                                    style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}
                                  >
                                    <span style={{ color: 'var(--color-border)', flexShrink: 0 }}>·</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p
                                className="font-mono uppercase mb-4"
                                style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                              >
                                OUTPUTS
                              </p>
                              <ul className="flex flex-col gap-2.5">
                                {stage.outputs.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2"
                                    style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}
                                  >
                                    <span style={{ color: 'var(--color-border)', flexShrink: 0 }}>·</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p
                                className="font-mono uppercase mb-4"
                                style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                              >
                                CONTROLS
                              </p>
                              <p
                                style={{
                                  fontSize: '13px',
                                  color: 'var(--color-muted)',
                                  lineHeight: 1.65,
                                  borderLeft: '2px solid rgba(124,58,237,0.3)',
                                  paddingLeft: '12px',
                                  marginBottom: '12px',
                                }}
                              >
                                {stage.control}
                              </p>
                              {stage.legalInstruments.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {stage.legalInstruments.map((instrument) => (
                                    <span
                                      key={instrument}
                                      className="font-mono text-[10px] px-2 py-1 uppercase tracking-widest"
                                      style={{
                                        border: '1px solid rgba(124,58,237,0.35)',
                                        color: 'var(--color-violet-light)',
                                      }}
                                    >
                                      {instrument}
                                    </span>
                                  ))}
                                </div>
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
          </section>

          {/* ── 03 LEGAL FRAMEWORK ── */}
          <section id="framework">
            <SectionHeader label="03 — LEGAL FRAMEWORK" title="Legal & Regulatory Framework" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="overflow-x-auto border border-border"
              style={{ backgroundColor: 'var(--color-card)' }}
            >
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                    {['Framework', 'Applies To', 'MTA Usage'].map((h) => (
                      <th
                        key={h}
                        className="font-mono text-xs uppercase tracking-widest py-5 px-6"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {legalFrameworks.map((fw, i) => (
                    <tr
                      key={fw.framework}
                      className="transition-colors duration-150"
                      style={{ borderBottom: i < legalFrameworks.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td className="py-5 px-6 text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                        {fw.framework}
                      </td>
                      <td className="py-5 px-6 text-sm" style={{ color: 'var(--color-muted)' }}>
                        {fw.applicability}
                      </td>
                      <td className="py-5 px-6 text-sm" style={{ color: 'var(--color-muted)' }}>
                        {fw.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </section>

          {/* ── 04 RISK MAP ── */}
          <section id="risk-map">
            <SectionHeader label="04 — RISK MAP" title="Delivery Risk Map" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="overflow-x-auto border border-border mb-8"
              style={{ backgroundColor: 'var(--color-card)' }}
            >
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                    {['Stage', 'Risk', 'Legal Exposure', 'Control'].map((h) => (
                      <th
                        key={h}
                        className="font-mono text-xs uppercase tracking-widest py-5 px-6"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {riskMap.map((item, i) => (
                    <tr
                      key={`${item.stage}-${item.risk}`}
                      className="transition-colors duration-150"
                      style={{ borderBottom: i < riskMap.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td className="py-5 px-6 text-sm font-mono font-semibold whitespace-nowrap" style={{ color: 'var(--color-foreground)' }}>
                        {item.stage}
                      </td>
                      <td className="py-5 px-6 text-sm" style={{ color: 'var(--color-muted)' }}>
                        {item.risk}
                      </td>
                      <td className="py-5 px-6 text-sm" style={{ color: 'var(--color-muted)' }}>
                        {item.legalExposure}
                      </td>
                      <td className="py-5 px-6 text-sm" style={{ color: 'var(--color-muted)' }}>
                        {item.control}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Legal hub callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              style={{
                border: '1px solid rgba(124,58,237,0.3)',
                padding: 'clamp(20px, 3vw, 36px)',
                backgroundColor: 'rgba(124,58,237,0.03)',
              }}
            >
              <div>
                <span
                  className="font-mono uppercase block mb-2"
                  style={{ fontSize: '10px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}
                >
                  NEED TEMPLATES?
                </span>
                <p style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)' }}>
                  Need contract templates or implementation guidance? Visit the Legal Hub to request reviewed template packs.
                </p>
              </div>
              <Link
                href="/legal"
                className="inline-flex items-center gap-2 px-6 py-3 font-display font-bold text-sm hover:bg-violet hover:text-white transition-all duration-300 whitespace-nowrap"
                style={{ border: '1px solid var(--color-violet)', color: 'var(--color-violet-light)' }}
                data-cursor="pointer"
              >
                Open Legal Hub →
              </Link>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  )
}
