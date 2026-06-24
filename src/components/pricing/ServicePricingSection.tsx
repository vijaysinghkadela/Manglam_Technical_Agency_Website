'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { servicePricingData } from '@/lib/data/pricing';
import { DurationToggle } from './DurationToggle';
import { buildPlanContactHref } from '@/lib/pricing-contact';
import type { DurationPrice } from '@/types';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const RETAINER_DURATIONS: DurationPrice[] = [
  { label: 'Monthly', price: '1mo', type: 'per-month' },
  { label: '6 Months', price: '6mo', type: 'per-month' },
  { label: '12 Months', price: '12mo', type: 'per-month' },
];

const PROJECT_DURATIONS: DurationPrice[] = [
  { label: 'Project', price: 'project', type: 'one-time' },
];

interface ServicePricingSectionProps {
  departmentSlug: string;
}

export function ServicePricingSection({
  departmentSlug,
}: ServicePricingSectionProps) {
  const [durationIndex, setDurationIndex] = useState(0);

  const dept = servicePricingData[departmentSlug];
  if (!dept) return null;
  const durations = dept.isRetainer ? RETAINER_DURATIONS : PROJECT_DURATIONS;

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
          {durations.length > 1 && (
            <div className="flex flex-col items-end gap-3">
              <DurationToggle
                durations={durations}
                activeIndex={durationIndex}
                onChange={setDurationIndex}
              />
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dept.plans.map((plan, i) => {
            const dur = durations[Math.min(durationIndex, durations.length - 1)];
            const price =
              dur.price === '6mo' && plan.price6mo
                ? plan.price6mo
                : dur.price === '12mo' && plan.price12mo
                  ? plan.price12mo
                  : plan.price;
            const savings =
              dur.price === '6mo'
                ? plan.savings6mo
                : dur.price === '12mo'
                  ? plan.savings12mo
                  : undefined;
            const totalPrice =
              dur.price === '6mo'
                ? plan.totalBilled6mo
                : dur.price === '12mo'
                  ? plan.totalBilled12mo
                  : undefined;
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
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p
                          className="font-display font-bold"
                          style={{
                            fontSize: '17px',
                            color: 'var(--color-foreground)' }}
                        >
                          {plan.name}
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: '11px',
                          color: 'var(--color-dead)' }}
                      >
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-end gap-2">
                      <p
                        className="font-display font-black leading-none"
                        style={{
                          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                          color: plan.highlight
                            ? 'var(--color-violet-light)'
                            : 'var(--color-foreground)' }}
                      >
                        {price}
                      </p>
                      <span
                        className="mb-1 font-mono text-xs"
                        style={{ color: 'var(--color-dead)' }}
                      >
                        {plan.period}
                      </span>
                    </div>
                    {savings && (
                      <span
                        className="font-mono inline-flex mt-3 rounded-full"
                        style={{
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-muted)',
                          fontSize: '10px',
                          padding: '4px 9px' }}
                      >
                        {savings}
                      </span>
                    )}
                    {totalPrice && (
                      <p
                        className="font-mono text-sm mt-1"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        Total: {totalPrice}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'var(--color-border)' }}
                  />

                  <ul className="flex flex-col gap-2.5 flex-1">
                    {plan.deliverables.map((f) => (
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
                    href={buildPlanContactHref(departmentSlug, plan.name, dept.service, price, dur.label, plan.retainerNote)}
                    data-cursor="pointer"
                    className="mt-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 font-display font-bold text-sm transition-all duration-300 hover:bg-violet-light hover:border-violet rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    style={{
                      border: plan.highlight
                        ? '1px solid var(--color-violet)'
                        : '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-violet)',
                      color: '#fff' }}
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
          All prices in INR. Platform subscriptions, ad spend, hosting, tools, and third-party costs stay separate unless scoped in writing.
        </p>
      </div>
    </section>
  );
}
