'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight, Zap, TrendingUp, Building2 } from 'lucide-react';
import { bundles } from '@/lib/data/pricing';
import { buildBundleContactHref } from '@/lib/pricing-contact';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const bundleMeta = [
  {
    icon: Zap,
    label: 'Best Value',
    labelColor: '#10b981',
    borderColor: 'rgba(16,185,129,0.3)',
    glowColor: 'rgba(16,185,129,0.06)',
  },
  {
    icon: TrendingUp,
    label: 'Most Popular',
    labelColor: 'var(--color-violet-light)',
    borderColor: 'rgba(var(--color-accent-rgb),0.3)',
    glowColor: 'rgba(var(--color-accent-rgb),0.06)',
  },
  {
    icon: Building2,
    label: 'Full Stack',
    labelColor: '#6366f1',
    borderColor: 'rgba(99,102,241,0.3)',
    glowColor: 'rgba(99,102,241,0.06)',
  },
];

function extractTotalValue(total: string): number {
  const num = total.replace(/[₹,]/g, '').replace(/\/.*$/, '').trim();
  return parseInt(num, 10) || 0;
}

export function PricingBundles() {
  return (
    <section
      className="section border-t border-border"
      style={{
        backgroundColor: 'var(--color-canvas)' }}
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col"
          style={{ gap: '12px', marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <span
            className="font-mono uppercase block"
            style={{
              fontSize: '13px',
              color: 'var(--color-violet-light)',
              letterSpacing: '0.22em' }}
          >
            🔗 COMBINED SOLUTIONS
          </span>
          <h2
            className="font-display font-black leading-tight"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.75rem)',
              color: 'var(--color-foreground)' }}
          >
            Cross-Department Bundles
          </h2>
          <p
            className="max-w-lg"
            style={{
              fontSize: '15px',
              lineHeight: 1.72,
              color: 'var(--color-muted)' }}
          >
            Combine services from multiple departments for a unified digital
            strategy at a consolidated monthly investment.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ gap: '20px' }}
        >
          {bundles.map((bundle, i) => {
            const meta = bundleMeta[i];
            const Icon = meta.icon;
            const totalVal = extractTotalValue(bundle.total);

            return (
              <motion.div
                key={bundle.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
                className="flex flex-col rounded-[24px] border transition-shadow duration-300"
                style={{
                  borderColor: meta.borderColor,
                  backgroundColor: 'var(--color-card)',
                  boxShadow: `0 1px 3px rgba(0,0,0,0.04)` }}
              >
                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  {/* Header */}
                  <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
                    <span
                      className="font-mono uppercase tracking-widest rounded-full px-3 py-1 flex items-center gap-1.5"
                      style={{
                        fontSize: '11px',
                        color: meta.labelColor,
                        border: `1px solid ${meta.borderColor}`,
                        backgroundColor: meta.glowColor }}
                    >
                      <Icon className="w-3 h-3" />
                      {meta.label}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', color: 'var(--color-dead)' }}
                    >
                      Bundle {i + 1}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: '17px',
                      color: 'var(--color-foreground)',
                      marginBottom: '6px' }}
                  >
                    {bundle.name}
                  </h3>

                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: 'var(--color-dead)',
                      marginBottom: '20px' }}
                  >
                    {bundle.target}
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'var(--color-border)',
                      marginBottom: '20px' }}
                  />

                  {/* Plan list */}
                  <ul className="flex flex-col" style={{ gap: '12px', flex: 1 }}>
                    {bundle.plans.map((plan) => (
                      <li
                        key={`${plan.department}-${plan.plan}`}
                        className="flex items-start"
                        style={{ gap: '10px' }}
                      >
                        <Check
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: 'var(--color-violet)' }}
                        />
                        <div className="flex flex-col" style={{ gap: '1px' }}>
                          <span
                            className="text-sm"
                            style={{ color: 'var(--color-foreground)' }}
                          >
                            {plan.department}
                          </span>
                          <span
                            className="font-mono"
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-dead)' }}
                          >
                            {plan.plan} — {plan.price}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Price breakdown bar */}
                  <div
                    className="flex rounded-full overflow-hidden"
                    style={{
                      height: '4px',
                      backgroundColor: 'var(--color-surface)',
                      marginTop: '16px',
                      marginBottom: '16px' }}
                  >
                    {bundle.plans.map((plan, idx) => {
                      const pVal =
                        parseInt(
                          plan.price.replace(/[₹,]/g, '').replace(/\/.*$/, ''),
                          10,
                        ) || 1;
                      const pct = Math.round((pVal / totalVal) * 100);
                      const colors = [
                        'var(--color-violet)',
                        '#8b2d2d',
                        '#a04040',
                        '#c06060',
                      ];
                      return (
                        <motion.div
                          key={idx}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.max(pct, 8)}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: idx * 0.1,
                            ease: EASE }}
                          style={{
                            backgroundColor: colors[idx % colors.length],
                            opacity: 0.7 }}
                        />
                      );
                    })}
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col" style={{ gap: '2px' }}>
                      <span
                        className="font-mono uppercase tracking-widest"
                        style={{
                          fontSize: '11px',
                          color: 'var(--color-dead)' }}
                      >
                        Combined
                      </span>
                      <p
                        className="font-display font-black"
                        style={{
                          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                          color: 'var(--color-violet-light)' }}
                      >
                        {bundle.total}
                      </p>
                    </div>
                    <Link
                      href={buildBundleContactHref(bundle.name, bundle.total, bundle.plans)}
                      data-cursor="pointer"
                      className="inline-flex items-center gap-1.5 font-display font-bold transition-all duration-300 hover:bg-violet hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                      style={{
                        padding: '14px 24px',
                        fontSize: '13px',
                        borderRadius: '10px',
                        border: '1px solid var(--color-violet)',
                        color: 'var(--color-violet-light)' }}
                    >
                      Inquire
                      <motion.span
                        style={{ display: 'inline-flex' }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-3 h-3" />
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
