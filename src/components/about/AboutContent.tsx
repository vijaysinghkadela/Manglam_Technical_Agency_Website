'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Bot,
  Share2,
  ShieldCheck,
  Code2,
  Palette,
  FileText,
  ArrowRight,
} from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const values = [
  {
    num: '01',
    title: 'Technical Depth',
    desc: 'We do not generalise at the expense of quality. Every specialist on our team holds genuine, proven expertise in their domain.',
  },
  {
    num: '02',
    title: 'Honest Communication',
    desc: 'Clients never hear bad news from someone other than us. We disclose problems early and proactively — never after the fact.',
  },
  {
    num: '03',
    title: 'Integrated Delivery',
    desc: 'One team, one strategy. Your AI, security, branding, and content needs are handled as a single coherent programme, not isolated silos.',
  },
  {
    num: '04',
    title: 'Results Over Reports',
    desc: 'We do not produce vanity metrics. Every deliverable is tied to a business outcome, and we report against it with full transparency.',
  },
]

const services = [
  {
    Icon: Bot,
    num: '01',
    name: 'AI & Automation',
    category: 'Engineering',
    desc: 'Custom workflow automation, LLM-powered tools, and intelligent data pipelines that eliminate manual bottlenecks.',
  },
  {
    Icon: Share2,
    num: '02',
    name: 'Social Media Marketing',
    category: 'Growth',
    desc: 'Strategy-first content, community management, and analytics reporting that drives measurable audience growth.',
  },
  {
    Icon: ShieldCheck,
    num: '03',
    name: 'Cybersecurity',
    category: 'Security',
    desc: 'Vulnerability assessments, penetration testing, and security consulting that protect what matters most.',
  },
  {
    Icon: Code2,
    num: '04',
    name: 'SaaS & Web Development',
    category: 'Engineering',
    desc: 'Custom web and mobile applications, API integrations, and ongoing maintenance with defined SLAs.',
  },
  {
    Icon: Palette,
    num: '05',
    name: 'Branding & Identity',
    category: 'Creative',
    desc: 'Logo design, brand systems, style guides, and visual assets that make businesses recognisable.',
  },
  {
    Icon: FileText,
    num: '06',
    name: 'Content Creation',
    category: 'Creative',
    desc: 'Long-form writing, copywriting, video scripts, and AI-assisted content with thorough human review.',
  },
]

const highlights = [
  { value: 'Remote-First', label: 'Operating Model' },
  { value: 'High-Trust', label: 'Team Culture' },
  { value: 'Documented', label: 'All Decisions' },
  { value: '1-Point', label: 'Accountability' },
]

export function AboutContent() {
  return (
    <>
      {/* ── WHO WE ARE — STATEMENT ──────────────────────────── */}
      <section
        className="w-full border-t border-border overflow-hidden relative"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(80px, 14vw, 160px) 0' }}
      >
        <div className="absolute inset-0 grain opacity-25 pointer-events-none" />

        <div className="container-site relative z-10">
          <motion.span
            className="font-mono uppercase block mb-10 lg:mb-14"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.28em' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ✦ WHO WE ARE
          </motion.span>

          <div className="flex flex-col items-start" style={{ gap: '0.02em' }}>
            {[
              { word: 'FULL-SERVICE', color: 'var(--color-foreground)' },
              { word: 'TECHNICAL', color: 'var(--color-violet)' },
              { word: 'AGENCY.', color: 'var(--color-muted)' },
            ].map(({ word, color }, i) => (
              <div key={word} style={{ overflow: 'hidden' }}>
                <motion.span
                  className="font-display font-black leading-none tracking-tighter block"
                  style={{ fontSize: 'clamp(3rem, 11vw, 13rem)', color }}
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.75, delay: i * 0.07, ease: EASE }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Paragraphs */}
          <motion.div
            className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <p style={{ fontSize: '17px', lineHeight: 1.78, color: 'var(--color-muted)' }}>
              Manglam Technical Agency (MTA) is a specialized fractional technical partner
              based in Nagaur, Rajasthan. We bridge the gap for companies scaling internationally:
              supplying the uncompromised engineering depth of Indian technology hubs combined
              with strict adherence to Western compliance and professional parity.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.78, color: 'var(--color-muted)' }}>
              We operate exclusively through rigorous documentation, signed service level agreements,
              and clear liability caps. This eliminates time-zone risk and communication barriers.
              At MTA, every engagement is handled by cross-functional specialists—never outsourced.
            </p>
          </motion.div>

          {/* Mini stat badges */}
          <motion.div
            className="mt-12 lg:mt-16 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            {[
              '3–4 Domain Specialists',
              'Est. Nagaur 2021',
              'Enterprise-grade Quality',
              'Direct Specialist Access',
              'No Hand-offs',
            ].map((tag) => (
              <span
                key={tag}
                className="font-mono uppercase"
                style={{
                  fontSize: '10px',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.14em',
                  border: '1px solid var(--color-border)',
                  padding: '5px 12px',
                  backgroundColor: 'var(--color-card)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ─────────────────────────────────────────── */}
      <section
        className="w-full border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">

            <div className="lg:sticky top-32 flex flex-col gap-4">
              <span
                className="font-mono uppercase"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                OUR MISSION
              </span>
              <div
                className="font-display font-black select-none leading-none"
                style={{
                  fontSize: 'clamp(4rem, 9vw, 8rem)',
                  color: 'var(--color-dead)',
                  letterSpacing: '-0.04em',
                }}
                aria-hidden
              >
                WHY
              </div>
              <div style={{ width: '2px', height: '40px', backgroundColor: 'var(--color-violet)' }} />
            </div>

            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <p
                className="font-display font-bold leading-snug"
                style={{
                  fontSize: 'clamp(1.25rem, 2.4vw, 1.85rem)',
                  color: 'var(--color-foreground)',
                  borderLeft: '2px solid var(--color-violet)',
                  paddingLeft: '1.5rem',
                }}
              >
                To deliver customised technical and innovative engineering solutions that drive
                sustainable growth for our clients — combining the output quality of a larger
                firm with the responsiveness and personal accountability that only a boutique
                agency can offer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO — Editorial numbered list ─────────── */}
      <section
        className="w-full border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          {/* Header */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                SIX PRACTICE AREAS
              </span>
              <h2
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', color: 'var(--color-foreground)' }}
              >
                What We Do
              </h2>
            </div>
            <p
              className="font-mono max-w-xs"
              style={{ fontSize: '12px', lineHeight: 1.65, color: 'var(--color-dead)', letterSpacing: '0.05em' }}
            >
              One team across all six domains — no hand-offs, no silos, no multiple vendors.
            </p>
          </motion.div>

          {/* Editorial numbered rows */}
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {services.map((svc, i) => (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                className="group relative overflow-hidden"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] lg:grid-cols-[80px_1fr_1.6fr] gap-4 lg:gap-8 items-center py-7 sm:py-8">

                  {/* Number */}
                  <span
                    className="font-display font-black leading-none select-none transition-colors duration-400 group-hover:text-violet"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      color: 'rgba(124,58,237,0.12)',
                      transitionDuration: '400ms',
                      lineHeight: 1,
                    }}
                  >
                    {svc.num}
                  </span>

                  {/* Service name + category */}
                  <div className="flex flex-col gap-2 sm:gap-1.5">
                    <div className="flex items-center gap-3">
                      <svc.Icon
                        className="w-4 h-4 shrink-0 transition-colors duration-300 group-hover:text-violet"
                        style={{ color: 'var(--color-muted)' }}
                      />
                      <span
                        className="font-mono uppercase"
                        style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                      >
                        {svc.category}
                      </span>
                    </div>
                    <h3
                      className="font-display font-bold transition-colors duration-300 group-hover:text-violet"
                      style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                        color: 'var(--color-foreground)',
                        lineHeight: 1.15,
                      }}
                    >
                      {svc.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="hidden lg:block"
                    style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)' }}
                  >
                    {svc.desc}
                  </p>

                  {/* Mobile description */}
                  <p
                    className="lg:hidden col-span-full sm:col-start-2"
                    style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)', paddingLeft: '0' }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-12"
          >
            <Link
              href="/services"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-violet hover:text-white hover:border-violet px-6 py-4"
              style={{ border: '1px solid var(--color-foreground)', color: 'var(--color-foreground)' }}
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ───────────────────────────────────────── */}
      <section
        className="w-full border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-24 items-start">

            <div className="lg:sticky top-32 flex flex-col gap-5">
              <span
                className="font-mono uppercase"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                OUR STORY
              </span>

              <div
                className="font-display font-black select-none leading-none"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 9rem)',
                  color: 'var(--color-dead)',
                  letterSpacing: '-0.04em',
                }}
                aria-hidden
              >
                MTA
              </div>

              <div style={{ width: '2px', height: '40px', backgroundColor: 'var(--color-violet)' }} />

              <p
                className="font-mono leading-relaxed"
                style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.1em' }}
              >
                Manglam Technical Agency<br />
                Nagaur, Rajasthan · Est. 2021
              </p>
            </div>

            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <p
                className="font-display font-bold leading-snug"
                style={{
                  fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)',
                  color: 'var(--color-foreground)',
                  borderLeft: '2px solid var(--color-violet)',
                  paddingLeft: '1.5rem',
                }}
              >
                MTA was built on a straightforward observation: the global digital services sector
                has shifted from simple labor-based cost arbitrage to high-value technical integration.
                Founders and executives in high-cost jurisdictions require more than just code; they
                need a fractional CTO acting as a true technical partner who mitigates risk and enforces compliance.
              </p>

              <p style={{ fontSize: '17px', lineHeight: 1.78, color: 'var(--color-muted)' }}>
                Registered under the Companies Act 1956 and compliant with both the Indian DPDP Act
                2023 and the EU GDPR, we have grown our portfolio to serve international clients across
                industries. Our track record is built entirely upon honest communication, transparent IP vesting,
                and technical depth that survives rigorous vendor due diligence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ─────────────────────────────────────── */}
      <section
        className="w-full border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="container-site py-8 border-b border-border">
          <motion.span
            className="font-mono uppercase"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            WHAT WE STAND FOR
          </motion.span>
        </div>

        {values.map((v, i) => (
          <motion.div
            key={v.num}
            className="border-b border-border group relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            />

            <div className="container-site grid grid-cols-1 sm:grid-cols-[80px_1fr] lg:grid-cols-[140px_1fr_1.4fr] gap-6 lg:gap-12 py-10 lg:py-14">
              <span
                className="font-display font-black block leading-none transition-colors duration-400 group-hover:text-violet"
                style={{
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  color: 'rgba(124,58,237,0.15)',
                  transitionDuration: '400ms',
                }}
              >
                {v.num}
              </span>

              <h3
                className="font-display font-bold self-center"
                style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)',
                  color: 'var(--color-foreground)',
                  lineHeight: 1.15,
                }}
              >
                {v.title}
              </h3>

              <p
                className="self-center sm:col-start-2 lg:col-start-auto"
                style={{ fontSize: '15px', lineHeight: 1.78, color: 'var(--color-muted)' }}
              >
                {v.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── HOW WE WORK ─────────────────────────────────────── */}
      <section
        className="w-full border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-24 items-start">

            <div className="lg:sticky top-32 flex flex-col gap-4">
              <span
                className="font-mono uppercase"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                HOW WE WORK
              </span>
              <div
                className="font-display font-black select-none leading-none"
                style={{
                  fontSize: 'clamp(4rem, 9vw, 8rem)',
                  color: 'var(--color-dead)',
                  letterSpacing: '-0.04em',
                }}
                aria-hidden
              >
                OPS
              </div>
              <div style={{ width: '2px', height: '40px', backgroundColor: 'var(--color-violet)' }} />
            </div>

            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <p
                className="font-display font-bold leading-snug"
                style={{
                  fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)',
                  color: 'var(--color-foreground)',
                  borderLeft: '2px solid var(--color-violet)',
                  paddingLeft: '1.5rem',
                }}
              >
                MTA operates as a remote-first team with a culture built on high trust and
                high accountability. Our specialists act as data processors under strict Data
                Processing Agreements (DPAs) and Non-Disclosure Agreements (NDAs), ensuring
                compliance across international borders.
              </p>

              <p style={{ fontSize: '17px', lineHeight: 1.78, color: 'var(--color-muted)' }}>
                We communicate early when problems arise and document architecture decisions
                so nothing depends on memory alone. This operational discipline translates
                directly into reliable, scalable outcomes for clients—because agencies that
                enforce rigorous internal standards produce significantly better external codebases.
              </p>

              {/* Highlight badges */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="p-4"
                    style={{
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-card)',
                    }}
                  >
                    <p
                      className="font-display font-bold mb-1"
                      style={{ fontSize: '1.05rem', color: 'var(--color-foreground)' }}
                    >
                      {h.value}
                    </p>
                    <p
                      className="font-mono uppercase"
                      style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}
                    >
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <section
        className="w-full border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(48px, 8vw, 80px) 0' }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
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
                Ready to work with a team that speaks directly and delivers honestly?
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/contact"
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-6 py-3 font-display font-bold text-sm hover:bg-violet hover:text-white transition-all duration-300 whitespace-nowrap"
                style={{ border: '1px solid var(--color-violet)', color: 'var(--color-violet-light)' }}
              >
                Get in Touch →
              </Link>
              <Link
                href="/portfolio"
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-6 py-3 font-display font-bold text-sm transition-all duration-300 whitespace-nowrap hover:text-violet"
                style={{ color: 'var(--color-muted)' }}
              >
                View Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
