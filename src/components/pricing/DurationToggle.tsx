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
        border: '1px solid var(--color-border)',
      }}
    >
      {durations.map((d, i) => (
        <button
          key={d.label}
          onClick={() => onChange(i)}
          className="relative font-mono uppercase tracking-widest rounded-full transition-colors duration-200"
          style={{
            padding: '12px 22px',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color:
              i === activeIndex
                ? 'var(--color-canvas)'
                : 'var(--color-muted)',
            cursor: 'pointer',
          }}
        >
          {i === activeIndex && (
            <motion.span
              layoutId="durationBg"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--color-foreground)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 whitespace-nowrap flex items-center gap-1.5">
            <span style={{ fontSize: '12px', lineHeight: 1 }}>
              {durationEmojis[i] || ''}
            </span>
            {d.label}
          </span>
        </button>
      ))}
    </div>
  );
}
