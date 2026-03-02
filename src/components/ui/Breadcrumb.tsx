'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const isLast = idx === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-muted">
      <Link href="/" className="hover:text-brand-light transition-colors flex items-center gap-1" aria-label="Home">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5 text-text-muted/40" />
          {crumb.isLast ? (
            <span className="text-text-primary font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-brand-light transition-colors">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
