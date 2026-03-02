'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  rounded?: string;
}

export default function GradientBorder({ children, className, rounded = 'rounded-2xl' }: GradientBorderProps) {
  return (
    <div className={cn('p-px bg-linear-to-br from-brand via-accent to-brand', rounded, className)}>
      <div className={cn('bg-dark h-full w-full', rounded)}>
        {children}
      </div>
    </div>
  );
}
