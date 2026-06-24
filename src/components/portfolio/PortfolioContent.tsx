'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { projects } from '@/lib/data/projects'

import type { Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 1, y: 0 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

type FilterType = 'all' | 'client' | 'product'

const comingProjects = projects.filter(p => p.status === 'coming-soon')

export function PortfolioContent() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredProjects = projects.filter(p => {
    if (p.status !== 'live') return false
    if (filter === 'all') return true
    return p.type === filter
  })

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Work' },
    { key: 'client', label: 'Client Projects' },
    { key: 'product', label: 'Our Products' },
  ]
  return (
    <div style={{ backgroundColor: 'var(--color-canvas)' }}>

      {/* ── Case Studies (Live) ───────────────────────────────── */}
      <section className="section" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container-site">

          <motion.span
            initial={false}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-mono uppercase block mb-10"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            ✦ CASE STUDIES
          </motion.span>

          <div className="flex flex-wrap gap-3 mb-14">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className="font-mono uppercase transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: `1px solid ${filter === f.key ? 'var(--color-violet)' : 'var(--color-border)'}`,
                  color: filter === f.key ? 'var(--color-violet-light)' : 'var(--color-muted)',
                  backgroundColor: filter === f.key ? 'rgba(var(--color-accent-rgb),0.1)' : 'transparent' }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col" style={{ borderTop: '1px solid var(--color-border)' }}>
            {filteredProjects.map((p, i) => (
              <motion.article
                key={p.id}
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 lg:grid-cols-[45%_55%]"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {/* Left — Visual panel */}
                <motion.div
                  variants={fadeUp}
                  className="relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${p.bgFrom} 0%, ${p.bgTo} 100%)`,
                    minHeight: 'clamp(280px, 38vw, 540px)' }}
                >
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-contain"
                    />
                  )}

                  {/* Edge gradient overlay for text readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${p.bgFrom}66 0%, ${p.bgFrom}22 40%, transparent 55%, ${p.bgTo}22 80%, ${p.bgTo}66 100%)`,
                    }}
                  />

                  {/* Watermark number */}
                  <span
                    className="absolute top-8 left-8 font-display font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Project identity — bottom-aligned */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-4 p-8 pb-10" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 'clamp(48px, 5vw, 64px)',
                        height: 'clamp(48px, 5vw, 64px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                      <span
                        className="font-display font-black text-white"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                      >
                        {p.title[0]}
                      </span>
                    </div>

                    <div className="text-center">
                      <p
                        className="font-display font-bold text-white"
                        style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
                      >
                        {p.title}
                      </p>
                      {p.url && (
                        <p
                          className="font-mono mt-0.5"
                          style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}
                        >
                          {p.url.replace('https://', '')}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {p.featured && (
                        <span
                          className="font-mono uppercase text-white"
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.22em',
                            border: '1px solid rgba(var(--color-accent-rgb),0.5)',
                            padding: '4px 14px',
                            backgroundColor: 'rgba(var(--color-accent-rgb),0.22)' }}
                        >
                          ✦ Signature Project
                        </span>
                      )}
                      <span
                        className="font-mono uppercase"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.22em',
                          border: p.type === 'client' ? '1px solid rgba(16,185,129,0.5)' : '1px solid rgba(59,130,246,0.5)',
                          padding: '4px 14px',
                          backgroundColor: p.type === 'client' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                          color: p.type === 'client' ? '#10b981' : '#60a5fa' }}
                      >
                        {p.type === 'client' ? '✦ Client Project' : '✦ MTA Product'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right — Project details */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col p-8 sm:p-10 lg:p-14 xl:p-20"
                  style={{ borderLeft: '1px solid var(--color-border)' }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map(t => (
                      <span
                        key={t}
                        className="font-mono uppercase"
                        style={{
                          fontSize: '10px',
                          color: 'var(--color-dead)',
                          letterSpacing: '0.18em',
                          border: '1px solid var(--color-border)',
                          padding: '3px 10px' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2
                    className="font-display font-black leading-none tracking-normal uppercase mb-6"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', color: 'var(--color-foreground)' }}
                  >
                    {p.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="mb-12"
                    style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '480px' }}
                  >
                    {p.description}
                  </p>

                  {/* Duration + Client */}
                  <div
                    className="grid grid-cols-2 gap-6 mb-10 pb-10"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <div>
                      <span
                        className="font-mono uppercase block mb-1"
                        style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                      >
                        Duration
                      </span>
                      <span
                        className="font-display font-bold"
                        style={{ fontSize: '1.1rem', color: 'var(--color-foreground)' }}
                      >
                        {p.duration}
                      </span>
                    </div>
                    <div>
                      <span
                        className="font-mono uppercase block mb-1"
                        style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                      >
                        Client
                      </span>
                      <span
                        className="font-display font-bold"
                        style={{ fontSize: '1.1rem', color: 'var(--color-foreground)', lineHeight: 1.3 }}
                      >
                        {p.client}
                      </span>
                    </div>
                  </div>

                  {p.outcomes && p.outcomes.length > 0 && (
                    <div className="mb-10">
                      <span
                        className="font-mono uppercase block mb-4"
                        style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                      >
                        Outcomes
                      </span>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {p.outcomes.map((outcome) => (
                          <div
                            key={outcome}
                            className="rounded-2xl border border-[rgba(var(--color-accent-rgb),0.18)] bg-[rgba(var(--color-accent-rgb),0.045)] px-4 py-3"
                          >
                            <p
                              className="text-[13px] font-semibold leading-snug"
                              style={{ color: 'var(--color-foreground)' }}
                            >
                              {outcome}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {p.stack.length > 0 && (
                    <div className="mb-10">
                      <span
                        className="font-mono uppercase block mb-4"
                        style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                      >
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map(t => (
                          <span
                            key={t}
                            className="font-mono"
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-muted)',
                              border: '1px solid var(--color-border)',
                              padding: '3px 10px' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deliverables */}
                  {p.deliverables.length > 0 && (
                    <div className="mb-12">
                      <span
                        className="font-mono uppercase block mb-5"
                        style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                      >
                        Deliverables
                      </span>
                      <ul className="flex flex-col gap-3">
                        {p.deliverables.map(d => (
                          <li
                            key={d}
                            className="flex items-start gap-3"
                            style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.65 }}
                          >
                            <span
                              style={{ color: 'var(--color-violet-light)', flexShrink: 0, marginTop: '2px' }}
                            >
                              →
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="pointer"
                      aria-label={`View live site for ${p.title}`}
                      className="mt-auto inline-flex items-center gap-2 px-8 py-5 font-display font-black text-sm uppercase tracking-wide transition-all duration-300 hover:bg-violet hover:text-white hover:border-violet w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                      style={{ border: '1px solid var(--color-foreground)', color: 'var(--color-foreground)' }}
                    >
                      View Live Site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline (Coming Soon) ─────────────────────────────── */}
      <section
        className="section"
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)' }}
      >
        <div className="container-site">

          <div className="flex items-end justify-between mb-20 gap-4">
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ✦ PIPELINE
              </span>
              <h2
                className="font-display font-black leading-none tracking-normal uppercase"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'var(--color-foreground)' }}
              >
                Coming Soon
              </h2>
            </div>
            <span
              className="font-mono hidden sm:block shrink-0"
              style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.14em' }}
            >
              Case studies in progress
            </span>
          </div>

          <div className="flex flex-col" style={{ borderTop: '1px solid var(--color-border)' }}>
            {comingProjects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={false}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative grid grid-cols-1 lg:grid-cols-[72px_1fr_auto] gap-4 lg:gap-8 items-center py-10 group overflow-hidden"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {/* Violet left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"
                  style={{ backgroundColor: 'var(--color-violet)' }}
                />
                {/* Watermark number */}
                <span
                  className="font-display font-black leading-none select-none transition-colors duration-500 group-hover:text-violet"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                    color: 'rgba(var(--color-accent-rgb),0.15)',
                    lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                      color: 'var(--color-foreground)',
                      lineHeight: 1.2 }}
                  >
                    {p.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {p.tags.map((t, ti) => (
                      <span key={t} className="flex items-center gap-3">
                        <span
                          className="font-mono"
                          style={{ fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.06em' }}
                        >
                          {t}
                        </span>
                        {ti < p.tags.length - 1 && (
                          <span style={{ color: 'var(--color-border)' }}>·</span>
                        )}
                      </span>
                    ))}
                    <span style={{ color: 'var(--color-border)' }}>·</span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.06em' }}
                    >
                      {p.client}
                    </span>
                    <span style={{ color: 'var(--color-border)' }}>·</span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.06em' }}
                    >
                      {p.duration}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 shrink-0">
                  <Lock className="w-3 h-3 shrink-0" style={{ color: 'var(--color-dead)' }} />
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                  >
                    Coming Soon
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA callout */}
          <motion.div
            initial={false}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{
              border: '1px solid rgba(var(--color-accent-rgb),0.3)',
              padding: 'clamp(20px, 3vw, 36px)',
              backgroundColor: 'rgba(var(--color-accent-rgb),0.03)' }}
          >
            <div>
              <span
                className="font-mono uppercase block mb-2"
                style={{ fontSize: '10px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}
              >
                WORK WITH US
              </span>
              <p style={{ fontSize: '15px', lineHeight: 1.72, color: 'var(--color-muted)' }}>
                Have a project in mind? Let&apos;s build it together.
              </p>
            </div>
            <Link
              href="/contact"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-7 py-4 min-h-[52px] font-display font-bold text-sm hover:bg-violet hover:text-white transition-all duration-300 whitespace-nowrap"
              style={{ border: '1px solid var(--color-violet)', color: 'var(--color-violet-light)' }}
            >
              Start a Project →
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

