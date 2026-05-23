'use client';

import toast from 'react-hot-toast';

export function toastHelpers() {
  return {
    success: (message: string) =>
      toast.success(message, {
        style: { background: 'var(--color-card)', color: 'var(--color-foreground)', border: '1px solid rgba(16,185,129,0.3)' },
        iconTheme: { primary: '#10B981', secondary: 'var(--color-card)' },
      }),
    error: (message: string) =>
      toast.error(message, {
        style: { background: 'var(--color-card)', color: 'var(--color-foreground)', border: '1px solid rgba(239,68,68,0.3)' },
        iconTheme: { primary: '#EF4444', secondary: 'var(--color-card)' },
      }),
    info: (message: string) =>
      toast(message, {
        style: { background: 'var(--color-card)', color: 'var(--color-foreground)', border: '1px solid rgba(var(--color-accent-rgb),0.3)' },
        icon: '💡',
      }),
  };
}

