'use client';

import Link from 'next/link';
import { Home, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-error/10 border border-error/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-heading font-bold text-text-primary mb-3">Something Went Wrong</h1>
        <p className="text-sm text-text-muted mb-8">An unexpected error occurred. Please try again.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button icon={<RefreshCw className="w-4 h-4" />} onClick={reset}>Try Again</Button>
          <Link href="/"><Button variant="ghost" icon={<Home className="w-4 h-4" />}>Back to Home</Button></Link>
        </div>
      </div>
    </div>
  );
}
