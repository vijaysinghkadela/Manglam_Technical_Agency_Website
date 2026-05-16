'use client';

import { ReactNode, ButtonHTMLAttributes, memo } from 'react';
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
    'bg-[color:var(--color-accent)] text-[color:var(--color-canvas)] border border-[color:var(--color-accent-border)] shadow-[0_14px_32px_rgba(var(--color-accent-rgb),0.28)] hover:bg-[color:var(--color-violet-dark)] hover:shadow-[0_18px_40px_rgba(var(--color-accent-rgb),0.34)] hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/12 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500',
  secondary:
    'bg-[color:var(--color-surface)] text-[color:var(--color-foreground)] border border-[color:var(--color-border)] hover:bg-[color:var(--color-accent-soft)] hover:border-[color:var(--color-accent-border)] hover:scale-[1.02] active:scale-[0.98]',
  ghost:
    'bg-transparent text-[color:var(--color-foreground)] border border-[color:var(--color-border)] hover:border-[color:var(--color-accent-border)] hover:bg-[color:var(--color-accent-soft)] hover:scale-[1.02] active:scale-[0.98]',
  danger:
    'bg-[rgba(127,29,29,0.12)] text-[#f7d6d3] border border-[color:var(--color-accent-border)] hover:bg-[rgba(127,29,29,0.18)] hover:scale-[1.02] active:scale-[0.98]',
  gradient:
    'bg-[linear-gradient(135deg,var(--color-accent),var(--color-violet-dark))] text-[color:var(--color-canvas)] hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(var(--color-accent-rgb),0.34)] active:scale-[0.98] before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/12 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs gap-2',
  md: 'px-5 py-3 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-3',
  xl: 'px-9 py-4 text-lg gap-3',
};

const Button = memo(function Button({
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
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 relative overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-canvas)]',
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
})

export default Button;
