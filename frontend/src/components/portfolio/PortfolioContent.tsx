'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/lib/data/projects'

import type { Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const liveProjects   = projects.filter(p => p.status === 'live')
const comingProjects = projects.filter(p => p.status === 'coming-soon')

export function PortfolioContent() {
  return (
    <div style={{ backgroundColor: 'var(--color-canvas)' }}>

      {/* ── Case Studies (Live) ───────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--color-border)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
        <div className="container-site">

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-mono uppercase block mb-16"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            ✦ CASE STUDIES
          </motion.span>

          <div className="flex flex-col" style={{ borderTop: '1px solid var(--color-border)' }}>
            {liveProjects.map((p, i) => (
              <motion.article
                key={p.id}
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 lg:grid-cols-[45%_55%]"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {/* Left — Gradient visual panel */}
                <motion.div
                  variants={fadeUp}
                  className="relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${p.bgFrom} 0%, ${p.bgTo} 100%)`,
                    minHeight: 'clamp(280px, 38vw, 540px)',
                  }}
                >
                  {/* Watermark number */}
                  <span
                    className="absolute top-8 left-8 font-display font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Project identity */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 'clamp(56px, 6vw, 80px)',
                        height: 'clamp(56px, 6vw, 80px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: 'rgba(0,0,0,0.45)',
                      }}
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
                        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}
                      >
                        {p.title}
                      </p>
                      {p.url && (
                        <p
                          className="font-mono mt-1"
                          style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}
                        >
                          {p.url.replace('https://', '')}
                        </p>
                      )}
                    </div>

                    {p.featured && (
                      <span
                        className="font-mono uppercase text-white"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.22em',
                          border: '1px solid rgba(124,58,237,0.5)',
                          padding: '4px 14px',
                          backgroundColor: 'rgba(124,58,237,0.22)',
                        }}
                      >
                        ✦ Signature Project
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Right — Project details */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col p-8 lg:p-12 xl:p-16"
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
                          padding: '3px 10px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2
                    className="font-display font-black leading-none tracking-tighter uppercase mb-6"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', color: 'var(--color-foreground)' }}
                  >
                    {p.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="mb-10"
                    style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '480px' }}
                  >
                    {p.description}
                  </p>

                  {/* Duration + Client */}
                  <div
                    className="grid grid-cols-2 gap-6 mb-8 pb-8"
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

                  {/* Tech Stack */}
                  {p.stack.length > 0 && (
                    <div className="mb-8">
                      <span
                        className="font-mono uppercase block mb-3"
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
                              padding: '3px 10px',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deliverables */}
                  {p.deliverables.length > 0 && (
                    <div className="mb-10">
                      <span
                        className="font-mono uppercase block mb-4"
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
                      className="mt-auto inline-flex items-center gap-2 px-6 py-4 font-display font-black text-sm uppercase tracking-wide transition-all duration-300 hover:bg-violet hover:text-white hover:border-violet w-fit"
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
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: 'clamp(64px, 10vw, 120px) 0',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="container-site">

          <div className="flex items-end justify-between mb-16 gap-4">
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ✦ PIPELINE
              </span>
              <h2
                className="font-display font-black leading-none tracking-tighter uppercase"
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
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative grid grid-cols-1 lg:grid-cols-[72px_1fr_auto] gap-4 lg:gap-8 items-center py-8 group overflow-hidden"
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
                    color: 'rgba(124,58,237,0.15)',
                    lineHeight: 1,
                  }}
                >
                  {String(liveProjects.length + i + 1).padStart(2, '0')}
                </span>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                      color: 'var(--color-foreground)',
                      lineHeight: 1.2,
                    }}
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
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
                WORK WITH US
              </span>
              <p style={{ fontSize: '15px', lineHeight: 1.72, color: 'var(--color-muted)' }}>
                Have a project in mind? Let&apos;s build it together.
              </p>
            </div>
            <Link
              href="/contact"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-6 py-3 font-display font-bold text-sm hover:bg-violet hover:text-white transition-all duration-300 whitespace-nowrap"
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
