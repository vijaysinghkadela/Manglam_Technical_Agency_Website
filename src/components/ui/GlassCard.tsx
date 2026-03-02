'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6',
        'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent before:pointer-events-none',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_rgba(108,43,217,0.15)]',
        glow && 'shadow-[0_0_40px_rgba(108,43,217,0.2)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
