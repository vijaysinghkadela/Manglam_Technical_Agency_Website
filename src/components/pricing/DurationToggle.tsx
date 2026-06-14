'use client';
import { motion } from 'framer-motion';
import type { DurationPrice } from '@/types';

interface DurationToggleProps {
  durations: DurationPrice[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const durationEmojis = ['🌱', '📈', '🏆'];

export function DurationToggle({
  durations,
  activeIndex,
  onChange,
}: DurationToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-full"
      style={{
        gap: '4px',
        padding: '6px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)' }}
    >
      {durations.map((d, i) => (
        <button
          key={d.label}
          type="button"
          onClick={() => onChange(i)}
          className="relative min-h-[44px] touch-manipulation rounded-full font-mono uppercase tracking-widest transition-colors duration-200"
          style={{
            padding: '12px 22px',
            fontSize: 'var(--pricing-micro)',
            letterSpacing: '0.12em',
            color:
              i === activeIndex
                ? '#fff'
                : 'var(--color-muted)',
            cursor: 'pointer' }}
        >
          {i === activeIndex && (
            <motion.span
              layoutId="durationBg"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--color-violet)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 whitespace-nowrap flex items-center gap-1.5">
            <span style={{ fontSize: 'var(--pricing-small)', lineHeight: 1 }}>
              {durationEmojis[i] || ''}
            </span>
            {d.label}
          </span>
        </button>
      ))}
    </div>
  );
}
