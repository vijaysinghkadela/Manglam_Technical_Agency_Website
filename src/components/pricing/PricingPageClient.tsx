'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Calendar, Repeat, Clock } from 'lucide-react';
import { FAQSection } from '@/components/ui/FAQSection';
import { pricingFaqs } from '@/lib/data/faq';
import { DepartmentAccordion } from './DepartmentAccordion';
import { PricingBundles } from './PricingBundles';
import { ScrambleCounter } from '@/components/ui/ScrambleCounter';
import {
  departments,
  paymentTerms,
  departmentOrder,
} from '@/lib/data/pricing';
import type { DepartmentData } from '@/types';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const deptEmojis: Record<string, string> = {
  'ai-automation': '🤖',
  branding: '🎨',
  'content-creation': '✍️',
  cybersecurity: '🛡️',
  'social-media-marketing': '📱',
  'saas-products': '💻',
};

const statItems = [
  { label: '🏢 Departments', value: '6' },
  { label: '📋 Plans', value: '18' },
  { label: '💰 Starting From', value: '₹6,500/mo' },
  { label: '🤝 Contract Types', value: '4' },
];

export function PricingPageClient() {
  const [openDept, setOpenDept] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleNavClick = useCallback((slug: string) => {
    setOpenDept(slug);
    setTimeout(() => {
      sectionRefs.current[slug]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }, []);

  const ordered: DepartmentData[] = departmentOrder
    .map((slug) => departments.find((d) => d.slug === slug))
    .filter(Boolean) as DepartmentData[];

  const totalPlans = departments.reduce((acc, d) => acc + d.plans.length, 0);

  return (
    <main
      className="pricing-page"
      style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}
    >
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[92svh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-10%',
            top: '15%',
            width: 'clamp(300px, 40vw, 700px)',
            height: 'clamp(300px, 40vw, 700px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(var(--color-accent-rgb),0.07) 0%, transparent 68%)' }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 page-hero-safe pb-14 sm:pb-16 lg:pb-20">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 font-mono"
            style={{
              fontSize: 'var(--pricing-micro)',
              color: 'var(--color-dead)',
              letterSpacing: '0.18em',
              marginBottom: 'clamp(40px, 8vw, 80px)' }}
          >
            <Link href="/" className="hover-foreground transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>PRICING</span>
          </motion.nav>

          <div className="flex-1 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              className="font-mono uppercase block"
              style={{
                fontSize: 'var(--pricing-micro)',
                color: 'var(--color-violet-light)',
                letterSpacing: '0.22em',
                marginBottom: '24px' }}
            >
              ✦ TIER-2 BOUTIQUE PRICING
            </motion.span>

            <h1
              aria-label="Clear pricing"
              className="flex flex-col font-display font-black leading-none tracking-normal uppercase"
              style={{
                gap: '0.25rem',
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                color: 'var(--color-foreground)' }}
            >
              <span>Clear</span>
              <span style={{ color: 'var(--color-violet)' }}>pricing.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-10 lg:mt-14"
              style={{
                fontSize: 'var(--pricing-body)',
                lineHeight: 1.72,
                color: 'var(--color-muted)',
                maxWidth: '520px' }}
            >
              Compare starting points across {departments.length} departments and {totalPlans} plans.
              Each plan is meant to make scope, payment terms, and next steps easier to discuss.
            </motion.p>
          </div>

          <div className="flex items-end justify-between mt-14 lg:mt-18">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 'var(--pricing-micro)',
                color: 'var(--color-violet-light)',
                letterSpacing: '0.22em' }}
            >
              ✦ ALL PRICES IN INR
            </span>
            <div className="hidden lg:flex flex-col items-center gap-2">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 'var(--pricing-micro)',
                  color: 'var(--color-dead)',
                  letterSpacing: '0.22em',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)' }}
              >
                Scroll
              </span>
              <div
                style={{
                  width: '1px',
                  height: '48px',
                  backgroundColor: 'var(--color-border)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────── */}
      <section
        className="section-sm border-t border-b border-border"
        style={{
          backgroundColor: 'var(--color-surface)' }}
      >
        <div className="container-site">
          <div
            className="flex items-center justify-between"
            style={{ padding: '20px 0' }}
          >
            {statItems.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: EASE }}
                className="flex flex-col items-center sm:items-start"
                style={{ gap: '4px' }}
              >
                <span
                  className="font-display font-black leading-none"
                  style={{
                    fontSize: 'var(--pricing-price)',
                    color: 'var(--color-foreground)' }}
                >
                  {i === 0 ? <><ScrambleCounter target={6} /> Depts</> : i === 1 ? <><ScrambleCounter target={18} /> Plans</> : i === 3 ? <><ScrambleCounter target={4} /> Types</> : stat.value}
                </span>
                <span
                  className="font-mono uppercase tracking-wider"
                  style={{
                    fontSize: 'var(--pricing-micro)',
                    color: 'var(--color-dead)',
                    letterSpacing: '0.1em' }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY NAV ──────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 border-b border-border overflow-x-auto"
        style={{
          backgroundColor: 'var(--color-canvas)' }}
      >
        <div
          className="container-site flex items-center"
          style={{
            gap: '6px',
            paddingTop: '14px',
            paddingBottom: '14px',
            minWidth: 'max-content' }}
        >
          {ordered.map((dept) => (
            <button
              key={dept.slug}
              type="button"
              onClick={() => handleNavClick(dept.slug)}
              className="relative min-h-[44px] touch-manipulation font-mono uppercase tracking-wider rounded-full whitespace-nowrap transition-all duration-200 hover:bg-violet/10 flex items-center gap-1.5"
              style={{
                padding: '8px 18px',
                fontSize: 'var(--pricing-micro)',
                letterSpacing: '0.1em',
                color:
                  openDept === dept.slug
                    ? 'var(--color-violet-light)'
                    : 'var(--color-muted)',
                border:
                  openDept === dept.slug
                    ? '1px solid var(--color-violet)'
                    : '1px solid var(--color-border)' }}
            >
              <span
                className="absolute inset-0 rounded-full transition-opacity duration-300"
                style={{
                  backgroundColor: 'rgba(var(--color-accent-rgb),0.06)',
                  opacity: openDept === dept.slug ? 1 : 0 }}
              />
              <span className="relative z-10 flex items-center gap-1.5">
                <span style={{ fontSize: 'var(--pricing-micro)', lineHeight: 1 }}>
                  {deptEmojis[dept.slug] || ''}
                </span>
                {dept.department}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── DEPARTMENTS ACCORDION ─────────────────────────── */}
      <section
        className="section-sm border-t-0 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--color-canvas)' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            left: '-8%',
            bottom: '10%',
            width: 'clamp(350px, 40vw, 650px)',
            height: 'clamp(350px, 40vw, 650px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(var(--color-accent-rgb),0.05) 0%, transparent 65%)' }}
        />
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col"
            style={{ gap: '12px', marginBottom: '32px' }}
          >
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: 'var(--pricing-micro)',
                color: 'var(--color-violet-light)',
                letterSpacing: '0.22em' }}
            >
              💰 STARTING RATES
            </span>
            <h2
              className="font-display font-black leading-tight"
              style={{
                fontSize: 'var(--pricing-section-title)',
                color: 'var(--color-foreground)' }}
            >
              What You&apos;ll Pay
            </h2>
            <p
              className="max-w-lg"
              style={{
                fontSize: 'var(--pricing-body)',
                color: 'var(--color-muted)',
                lineHeight: 1.72 }}
            >
              Select a department below to see plan options, full deliverables,
              and contract duration pricing.
            </p>
          </motion.div>

          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {ordered.map((dept) => (
              <div
                key={dept.slug}
                ref={(el) => {
                  sectionRefs.current[dept.slug] = el;
                }}
              >
                <DepartmentAccordion
                  department={dept}
                  isOpen={openDept === dept.slug}
                  onToggle={() =>
                    setOpenDept(openDept === dept.slug ? null : dept.slug)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-DEPARTMENT BUNDLES ─────────────────────── */}
      <PricingBundles />

      {/* ── PAYMENT TERMS ────────────────────────────────── */}
      <section
        className="section-sm border-t border-border"
        style={{
          backgroundColor: 'var(--color-surface)' }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start"
              style={{
                border: '1px solid rgba(var(--color-accent-rgb),0.2)',
                padding: 'clamp(28px, 4vw, 48px)',
                backgroundColor: 'rgba(var(--color-accent-rgb),0.02)',
                borderRadius: '24px' }}
            >
              <div className="flex flex-col" style={{ gap: '12px' }}>
                <span
                  className="font-mono uppercase block"
                  style={{
                    fontSize: 'var(--pricing-micro)',
                    color: 'var(--color-violet-light)',
                    letterSpacing: '0.22em' }}
                >
                  💳 PAYMENT TERMS
                </span>
                <h2
                  className="font-display font-black leading-tight"
                  style={{
                    fontSize: 'clamp(1.45rem, 2.2vw, 2.1rem)',
                    color: 'var(--color-foreground)',
                    lineHeight: 1.1 }}
                >
                  Payment structure is fixed before delivery starts.
                </h2>
                <p
                  className="max-w-md"
                  style={{
                    fontSize: 'var(--pricing-small)',
                    lineHeight: 1.72,
                    color: 'var(--color-muted)' }}
                >
                  All contract types follow standard payment schedules. Late
                  payments incur a 2% monthly penalty after the 15-day due date.
                </p>
              </div>

              <div
                className="grid grid-cols-2 w-full lg:min-w-[340px]"
                style={{ gap: '12px' }}
              >
                {[
                  { icon: FileText, label: 'One-time project', value: paymentTerms.oneTime },
                  { icon: Calendar, label: 'Monthly retainer', value: paymentTerms.monthlyRetainer },
                  { icon: Repeat, label: '6-month contract', value: paymentTerms.sixMonth },
                  { icon: Clock, label: '12-month contract', value: paymentTerms.twelveMonth },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
                  >
                    <PaymentTermCard
                      icon={item.icon}
                      label={item.label}
                      value={item.value}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-display font-black transition-all duration-300 hover:bg-violet hover:text-white"
                style={{
                  padding: '16px 32px',
                  fontSize: 'var(--pricing-button)',
                  borderRadius: '14px',
                  border: '1px solid var(--color-violet)',
                  color: 'var(--color-violet-light)' }}
                data-cursor="pointer"
              >
                Book Discovery Call{' '}
                <motion.span
                  style={{ display: 'inline-block' }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        className="section border-t border-border"
        style={{
          backgroundColor: 'var(--color-surface)' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-28 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col"
              style={{ gap: '16px' }}
            >
              <span
                className="font-mono uppercase block"
                style={{
                  fontSize: 'var(--pricing-micro)',
                  color: 'var(--color-violet-light)',
                  letterSpacing: '0.22em' }}
              >
                🚀 GET STARTED
              </span>
              <h2
                className="font-display font-black leading-tight"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                  color: 'var(--color-foreground)' }}
              >
                Start Your
                <br />
                Project
              </h2>
              <p
                className="max-w-sm"
                style={{
                  color: 'var(--color-muted)',
                  lineHeight: 1.72 }}
              >
                Free consultation and honest scope — no sales pitch, no
                lock-in.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="flex flex-col"
              style={{ gap: '16px' }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-display font-black transition-all duration-300 hover:bg-violet hover:text-white rounded-xl"
                style={{
                  padding: '18px 36px',
                  fontSize: 'var(--pricing-button)',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-foreground)',
                  color: 'var(--color-canvas)' }}
                data-cursor="pointer"
              >
                Contact Us{' '}
                <motion.span
                  style={{ display: 'inline-block' }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-300 hover:border-violet rounded-xl"
                style={{
                  padding: '18px 36px',
                  fontSize: 'var(--pricing-button)',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted)' }}
                data-cursor="pointer"
              >
                Explore Services
                <motion.span
                  style={{ display: 'inline-flex' }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <FAQSection items={pricingFaqs} title="Pricing Questions" />
    </main>
  );
}

function PaymentTermCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex flex-col rounded-xl border"
      style={{
        padding: '18px',
        gap: '10px',
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-card)' }}
    >
      <div
        className="flex items-center justify-center rounded-lg shrink-0"
        style={{
          width: '36px',
          height: '36px',
          backgroundColor: 'rgba(var(--color-accent-rgb),0.08)',
          border: '1px solid rgba(var(--color-accent-rgb),0.15)' }}
      >
        <Icon
          className="w-4 h-4"
          style={{ color: 'var(--color-violet-light)' }}
        />
      </div>
      <div className="flex flex-col" style={{ gap: '2px' }}>
        <span
          className="font-display font-bold"
          style={{
            fontSize: 'var(--pricing-small)',
            color: 'var(--color-foreground)' }}
        >
          {label}
        </span>
        <span
          className="font-mono leading-snug"
          style={{
            fontSize: 'var(--pricing-small)',
            color: 'var(--color-muted)' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
