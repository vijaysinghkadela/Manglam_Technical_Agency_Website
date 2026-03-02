'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles = {
  primary:
    'bg-violet-600 text-white hover:bg-violet-500 active:scale-[0.98] shadow-[0_4px_20px_rgba(108,43,217,0.4)] hover:shadow-[0_8px_30px_rgba(108,43,217,0.5)] before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500',
  secondary:
    'bg-white/4 text-white border border-white/[0.1] hover:bg-white/8 hover:border-violet-500/30',
  ghost:
    'bg-transparent text-white border border-white/[0.12] hover:border-violet-500/40 hover:bg-violet-500/10',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500/20',
  gradient:
    'bg-linear-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_8px_30px_rgba(108,43,217,0.5)] active:scale-[0.98] before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs gap-2',
  md: 'px-5 py-3 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-3',
  xl: 'px-9 py-4 text-lg gap-3',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 relative overflow-hidden cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
}
