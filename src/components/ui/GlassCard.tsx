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
        'glass-card rounded-2xl p-6',
        hover && 'transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1',
        glow && 'shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.2)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

