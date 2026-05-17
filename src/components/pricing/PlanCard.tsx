'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PricingPlanData, DurationPrice } from '@/types';
import { buildPlanContactHref, DEPARTMENT_NAME_MAP } from '@/lib/pricing-contact';

const glowKeyframes = `
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(107,26,26,0.08); }
  50%      { box-shadow: 0 0 32px rgba(107,26,26,0.15); }
}
`;

interface PlanCardProps {
  plan: PricingPlanData;
  durationIndex: number;
  index: number;
  departmentSlug: string;
  showSavings?: boolean;
}

function extractPrice(price: string): number {
  return parseInt(price.replace(/[₹,]/g, '').replace(/\/.*$/, '').trim(), 10);
}

function getSavings(
  durations: DurationPrice[],
  currentIdx: number,
): { percent: string; label: string } | null {
  if (currentIdx === 0) return null;
  const current = durations[currentIdx];
  const base = durations[0];
  if (!current || !base) return null;
  if (current.type !== base.type) return null;

  const currPrice = extractPrice(current.price);
  const basePrice = extractPrice(base.price);
  if (!currPrice || !basePrice || currPrice >= basePrice) return null;

  const savings = Math.round(((basePrice - currPrice) / basePrice) * 100);
  if (savings < 5) return null;

  const label =
    current.type === 'per-month'
      ? `Save ${savings}% vs monthly`
      : `Save ${savings}%`;

  return { percent: `-${savings}%`, label };
}

export function PlanCard({
  plan,
  durationIndex,
  index,
  departmentSlug,
  showSavings = true,
}: PlanCardProps) {
  const duration = plan.durations[durationIndex];
  const [showAllDeliverables, setShowAllDeliverables] = useState(false);

  const savings =
    showSavings ? getSavings(plan.durations, durationIndex) : null;

  const initialDeliverableCount = 4;
  const deliverablesVisible = showAllDeliverables
    ? plan.deliverables
    : plan.deliverables.slice(0, initialDeliverableCount);
  const hasMoreDeliverables =
    plan.deliverables.length > initialDeliverableCount;

  return (
    <>
      <style>{glowKeyframes}</style>
      <motion.div
        initial={{ opacity: 0, y: 14 + index * 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.06 + index * 0.12,
          duration: 0.45,
          ease: 'easeInOut',
        }}
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
        className="flex flex-col overflow-hidden rounded-[24px] transition-shadow duration-300"
        style={{
          border: plan.highlight
            ? '1px solid var(--color-violet)'
            : '1px solid var(--color-border)',
          backgroundColor: plan.highlight
            ? 'rgba(107,26,26,0.04)'
            : 'var(--color-card)',
          boxShadow: plan.highlight
            ? '0 0 24px rgba(107,26,26,0.08)'
            : '0 1px 3px rgba(0,0,0,0.04)',
          animation: plan.highlight ? 'glowPulse 3s ease-in-out infinite' : 'none',
        }}
    >
      {plan.highlight && (
        <div
          style={{
            background:
              'linear-gradient(90deg, var(--color-violet) 0%, #8b2d2d 100%)',
            padding: '8px 24px',
          }}
        >
          <span className="font-mono text-xs text-white uppercase tracking-widest flex items-center gap-2">
            <span className="text-[13px]">✦</span> Recommended
          </span>
        </div>
      )}

      <div
        className="flex flex-col flex-1 p-5 sm:p-6"
        style={{ gap: '16px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col" style={{ gap: '6px' }}>
            <span
              className="font-display font-bold"
              style={{ fontSize: '18px', color: 'var(--color-foreground)' }}
            >
              {plan.name}
            </span>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--color-dead)',
                lineHeight: 1.5,
              }}
            >
              {plan.target}
            </p>
          </div>
          <span
            className="flex items-center justify-center shrink-0"
            style={{
              width: '44px',
              height: '44px',
              fontSize: '22px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            {plan.icon}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{ height: '1px', backgroundColor: 'var(--color-border)' }}
        />

        {/* Price area */}
        <div className="flex flex-col" style={{ gap: '4px' }}>
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={duration.price}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="font-display font-black leading-none"
                style={{
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                  color: plan.highlight
                    ? 'var(--color-violet-light)'
                    : 'var(--color-foreground)',
                }}
              >
                {duration.price}
              </motion.p>
            </AnimatePresence>

            {savings && (
              <span
                className="font-mono font-bold rounded"
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  color: '#fff',
                  backgroundColor: 'var(--color-violet)',
                  borderRadius: '6px',
                  lineHeight: 1.3,
                }}
              >
                {savings.percent}
              </span>
            )}
          </div>

          {duration.totalPrice && (
            <p
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-muted)',
                marginTop: duration.totalPrice ? '2px' : '0',
              }}
            >
              {duration.totalPrice} total
            </p>
          )}

          {duration.note && (
            <p
              className="font-mono uppercase tracking-wider"
              style={{
                fontSize: '11px',
                color: 'var(--color-dead)',
                marginTop: '2px',
              }}
            >
              {duration.note}
            </p>
          )}

          {savings && (
            <p
              className="font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-muted)',
                marginTop: '4px',
                fontStyle: 'italic',
              }}
            >
              {savings.label}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          style={{ height: '1px', backgroundColor: 'var(--color-border)' }}
        />

        {/* Deliverables */}
        <div className="flex flex-col" style={{ gap: '10px' }}>
          <p
            className="font-mono uppercase tracking-widest"
            style={{
              fontSize: '11px',
              color: 'var(--color-dead)',
              letterSpacing: '0.12em',
            }}
          >
            Deliverables
          </p>
          <ul className="flex flex-col" style={{ gap: '8px' }}>
            {deliverablesVisible.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2.5"
                style={{
                  fontSize: '11px',
                  color: 'var(--color-muted)',
                  lineHeight: 1.55,
                }}
              >
                <span
                  className="shrink-0 rounded-full mt-[5px]"
                  style={{
                    width: '3.5px',
                    height: '3.5px',
                    backgroundColor: 'var(--color-violet)',
                    opacity: 0.5,
                  }}
                />
                {d}
              </li>
            ))}
          </ul>

          {hasMoreDeliverables && (
            <button
              onClick={() => setShowAllDeliverables(!showAllDeliverables)}
              className="flex items-center gap-1.5 font-mono transition-colors duration-200 hover:text-violet self-start"
              style={{
                fontSize: '11px',
                color: 'var(--color-dead)',
                letterSpacing: '0.06em',
                marginTop: '4px',
              }}
            >
              {showAllDeliverables
                ? 'Show less'
                : `+ Show all ${plan.deliverables.length}`}
              <motion.span
                animate={{ rotate: showAllDeliverables ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-3 h-3" />
              </motion.span>
            </button>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <Link
          href={buildPlanContactHref(departmentSlug, plan.name, DEPARTMENT_NAME_MAP[departmentSlug] || departmentSlug, duration.price, duration.label, duration.note)}
          data-cursor="pointer"
          className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-300 hover:bg-violet hover:text-white hover:border-violet"
          style={{
            padding: '16px 28px',
            fontSize: '14px',
            borderRadius: '12px',
            border: plan.highlight
              ? '1px solid var(--color-violet)'
              : '1px solid var(--color-border)',
            color: plan.highlight
              ? 'var(--color-violet-light)'
              : 'var(--color-muted)',
          }}
        >
          Get Started
          <motion.span
            style={{ display: 'inline-flex' }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
    </>
  );
}
