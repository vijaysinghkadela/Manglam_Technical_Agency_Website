import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'brand' | 'accent';
}

export default function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-white/4 border-white/8 text-white/60',
    brand: 'bg-violet-500/15 border-violet-500/25 text-violet-400',
    accent: 'bg-cyan-400/10 border-cyan-400/25 text-cyan-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
