'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { departments } from '@/lib/data/pricing';
import { DurationToggle } from './DurationToggle';
import { buildPlanContactHref } from '@/lib/pricing-contact';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ServicePricingSectionProps {
  departmentSlug: string;
}

export function ServicePricingSection({
  departmentSlug,
}: ServicePricingSectionProps) {
  const [durationIndex, setDurationIndex] = useState(0);

  const dept = departments.find((d) => d.slug === departmentSlug);
  if (!dept) return null;

  return (
    <section
      className="section border-t border-border"
      style={{
        backgroundColor: 'var(--color-surface)' }}
    >
      <div className="container-site">
        <motion.div
          initial={false}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          <div>
            <span
              className="font-mono uppercase block mb-3"
              style={{
                fontSize: '13px',
                color: 'var(--color-violet-light)',
                letterSpacing: '0.22em' }}
            >
              PRICING
            </span>
            <h2
              className="font-display font-black leading-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.75rem)',
                color: 'var(--color-foreground)' }}
            >
              Plans &<br />
              Investment
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3">
            <DurationToggle
              durations={dept.plans[0].durations}
              activeIndex={durationIndex}
              onChange={setDurationIndex}
            />
            <Link
              href="/pricing"
              className="font-mono text-xs transition-colors hover:text-violet"
              style={{ color: 'var(--color-dead)' }}
            >
              Compare all departments →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dept.plans.map((plan, i) => {
            const dur = plan.durations[Math.min(durationIndex, plan.durations.length - 1)];
            return (
              <motion.div
                key={plan.name}
                initial={false}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
                className="flex flex-col overflow-hidden rounded-[24px]"
                style={{
                  border: plan.highlight
                    ? '1px solid var(--color-violet)'
                    : '1px solid var(--color-border)',
                  backgroundColor: plan.highlight
                    ? 'rgba(var(--color-accent-rgb),0.04)'
                    : 'var(--color-card)' }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      backgroundColor: 'var(--color-violet)',
                      padding: '6px 20px' }}
                  >
                    <span className="font-mono text-xs text-white uppercase tracking-widest">
                      ✦ Recommended
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-8 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="font-display font-bold mb-1"
                        style={{
                          fontSize: '17px',
                          color: 'var(--color-foreground)' }}
                      >
                        {plan.name}
                      </p>
                      <p
                        style={{
                          fontSize: '11px',
                          color: 'var(--color-dead)' }}
                      >
                        {plan.tagline}
                      </p>
                    </div>
                    <span style={{ fontSize: '22px' }}>{plan.icon}</span>
                  </div>

                  <div>
                    <p
                      className="font-display font-black leading-none"
                      style={{
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                        color: plan.highlight
                          ? 'var(--color-violet-light)'
                          : 'var(--color-foreground)' }}
                    >
                      {dur.price}
                    </p>
                    {dur.totalPrice && (
                      <p
                        className="font-mono text-sm mt-1"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        Total: {dur.totalPrice}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'var(--color-border)' }}
                  />

                  <ul className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5"
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-muted)' }}
                      >
                        <span
                          className="shrink-0 rounded-full"
                          style={{
                            marginTop: '6px',
                            width: '5px',
                            height: '5px',
                            backgroundColor: 'var(--color-violet)',
                            opacity: 0.6 }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={buildPlanContactHref(departmentSlug, plan.name, dept.department, dur.price, dur.label, dur.note)}
                    data-cursor="pointer"
                    className="mt-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 font-display font-bold text-sm transition-all duration-300 hover:bg-violet hover:text-white hover:border-violet rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    style={{
                      border: plan.highlight
                        ? '1px solid var(--color-violet)'
                        : '1px solid var(--color-border)',
                      color: plan.highlight
                        ? 'var(--color-violet-light)'
                        : 'var(--color-muted)' }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p
          className="font-mono text-center mt-8"
          style={{
            fontSize: '13px',
            color: 'var(--color-dead)',
            letterSpacing: '0.1em' }}
        >
          All prices in INR. See{' '}
          <Link
            href="/pricing"
            className="underline hover:text-violet transition-colors"
          >
            full pricing page
          </Link>{' '}
          for contract terms and cross-department bundles.
        </p>
      </div>
    </section>
  );
}
