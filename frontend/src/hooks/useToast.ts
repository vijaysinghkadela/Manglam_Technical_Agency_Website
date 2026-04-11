'use client';

import toast from 'react-hot-toast';

export function useToast() {
  return {
    success: (message: string) =>
      toast.success(message, {
        style: { background: '#161625', color: '#F4F4F8', border: '1px solid rgba(16,185,129,0.3)' },
        iconTheme: { primary: '#10B981', secondary: '#161625' },
      }),
    error: (message: string) =>
      toast.error(message, {
        style: { background: '#161625', color: '#F4F4F8', border: '1px solid rgba(239,68,68,0.3)' },
        iconTheme: { primary: '#EF4444', secondary: '#161625' },
      }),
    info: (message: string) =>
      toast(message, {
        style: { background: '#161625', color: '#F4F4F8', border: '1px solid rgba(108,43,217,0.3)' },
        icon: '💡',
      }),
  };
}
