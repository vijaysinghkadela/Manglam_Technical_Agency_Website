'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { DepartmentData, DurationPrice } from '@/types';
import { DurationToggle } from './DurationToggle';
import { PlanCard } from './PlanCard';

interface DepartmentAccordionProps {
  department: DepartmentData;
  isOpen: boolean;
  onToggle: () => void;
}

function extractPrice(price: string): number {
  return parseInt(price.replace(/[₹,]/g, '').replace(/\/.*$/, '').trim(), 10);
}

function getSavingsLabel(
  durations: DurationPrice[],
  activeIdx: number,
): string | null {
  if (activeIdx === 0) return null;
  const active = durations[activeIdx];
  const base = durations[0];
  if (!active || !base) return null;
  if (active.type !== base.type || active.type !== 'per-month') return null;

  const aPrice = extractPrice(active.price);
  const bPrice = extractPrice(base.price);
  if (!aPrice || !bPrice || aPrice >= bPrice) return null;

  const pct = Math.round(((bPrice - aPrice) / bPrice) * 100);
  if (pct < 5) return null;

  if (active.totalPrice && base.totalPrice) {
    const aTotal = extractPrice(active.totalPrice);
    const bTotal = extractPrice(base.totalPrice);
    if (aTotal && bTotal) {
      const totalPct = Math.round(((bTotal - aTotal) / bTotal) * 100);
      return `Save ${pct}% per month · ${totalPct}% total over ${base.label}`;
    }
  }

  return `Save ${pct}% vs ${base.label.toLowerCase()}`;
}

export function DepartmentAccordion({
  department,
  isOpen,
  onToggle,
}: DepartmentAccordionProps) {
  const [durationIndex, setDurationIndex] = useState(0);

  return (
    <div
      className="relative"
      style={{
        borderBottom: '1px solid var(--color-border)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group relative touch-manipulation"
        style={{
          padding: '26px 0' }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 rounded-r"
          style={{
            backgroundColor: isOpen
              ? 'var(--color-violet)'
              : 'transparent',
            opacity: isOpen ? 1 : 0 }}
        />

        <div className="flex items-center gap-4 pl-4">
          <div
            className="flex items-center justify-center shrink-0 transition-colors duration-300"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              backgroundColor: isOpen
                ? 'var(--color-violet)'
                : 'var(--color-surface)',
              border: '1px solid var(--color-border)' }}
          >
            <span
              className="font-display font-black transition-colors duration-300"
              style={{
                fontSize: 'var(--pricing-card-title)',
                color: isOpen ? '#fff' : 'var(--color-muted)' }}
            >
              {department.plans[0].icon}
            </span>
          </div>
          <div className="flex flex-col" style={{ gap: '4px' }}>
            <h3
              className="font-display font-bold transition-colors duration-200 group-hover:text-violet"
              style={{
                fontSize: 'var(--pricing-card-title)',
                color: 'var(--color-foreground)' }}
            >
              {department.department}
            </h3>
            <p
              className="font-mono"
              style={{ fontSize: 'var(--pricing-micro)', color: 'var(--color-dead)' }}
            >
              {department.plans.length} plans · from{' '}
              {department.plans[0].durations[0].price}
            </p>
            {!isOpen && (
              <div className="flex items-center gap-2 mt-1">
                {department.plans.slice(0, 3).map((plan) => (
                  <span
                    key={plan.name}
                    className="font-mono rounded"
                    style={{
                      fontSize: 'var(--pricing-micro)',
                      padding: '4px 10px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-dead)',
                      letterSpacing: '0.04em' }}
                  >
                    {plan.name}{' '}
                    <span style={{ color: 'var(--color-muted)' }}>
                      {plan.durations[0].price}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
          style={{
            color: isOpen
              ? 'var(--color-violet-light)'
              : 'var(--color-muted)' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Hover accent line on the left when collapsed */}
      {!isOpen && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-0 group-hover:opacity-40 rounded-r"
          style={{
            backgroundColor: 'var(--color-violet)',
            pointerEvents: 'none' }}
        />
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="flex flex-col"
              style={{ paddingBottom: '32px' }}
            >
              <p
                className="leading-relaxed max-w-2xl"
                style={{
                  fontSize: 'var(--pricing-body)',
                  color: 'var(--color-muted)',
                  marginBottom: '24px' }}
              >
                {department.description}
              </p>

              <div
                className="flex flex-col items-start"
                style={{ gap: '8px', marginBottom: '24px' }}
              >
                <DurationToggle
                  durations={department.plans[0].durations}
                  activeIndex={durationIndex}
                  onChange={setDurationIndex}
                />

                <AnimatePresence mode="wait">
                  {(() => {
                    const label = getSavingsLabel(
                      department.plans[0].durations,
                      durationIndex,
                    );
                    return label ? (
                      <motion.span
                        key={label}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono"
                        style={{
                          fontSize: 'var(--pricing-micro)',
                          color: 'var(--color-violet-light)',
                          letterSpacing: '0.04em' }}
                      >
                        {label}
                      </motion.span>
                    ) : null;
                  })()}
                </AnimatePresence>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                style={{ gap: '16px' }}
              >
                {department.plans.map((plan, i) => (
                  <PlanCard
                    key={plan.name}
                    plan={plan}
                    durationIndex={Math.min(
                      durationIndex,
                      plan.durations.length - 1,
                    )}
                    index={i}
                    departmentSlug={department.slug}
                  />
                ))}
              </div>

              {department.note && (
                <div
                  className="rounded-2xl border"
                  style={{
                    marginTop: '20px',
                    padding: '18px 22px',
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-surface)' }}
                >
                  <p
                    className="font-mono leading-relaxed"
                    style={{ fontSize: 'var(--pricing-small)', color: 'var(--color-dead)' }}
                  >
                    {department.note}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
