'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useConsentStore } from '@/stores/useConsentStore';
import { useIsClient } from '@/hooks/useIsClient';

export function ConsentBanner() {
  const { showBanner, hasHydrated, grantConsent, dismissBanner, hydrateConsent } = useConsentStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    try {
      Promise.resolve(useConsentStore.persist.rehydrate()).catch(() => {
        hydrateConsent();
      });
    } catch {
      hydrateConsent();
    }
  }, [hydrateConsent]);

  if (!isClient || !hasHydrated || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        role="region"
        aria-label="Privacy choices"
        className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border shadow-[0_18px_54px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-card) 94%, transparent)',
          paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="h-1 w-full bg-violet" aria-hidden="true" />

        <div className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
          <div className="min-w-0 pr-8 sm:pr-0">
            <p className="font-display text-sm font-black leading-tight text-foreground sm:text-base">
              Privacy choices
            </p>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
              Optional analytics stays off unless you accept it. Project forms keep explicit consent separate.
            </p>
          </div>

          <button
            type="button"
            onClick={dismissBanner}
            className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-foreground sm:right-4"
            aria-label="Dismiss privacy choices"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:min-w-[360px] sm:justify-end">
            <button
              type="button"
              onClick={() => setIsExpanded((open) => !open)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Manage <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => grantConsent('analytics-and-communications')}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-violet px-5 text-sm font-black text-white transition-colors hover:bg-violet-dark"
            >
              Accept
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-border"
            >
              <div className="grid gap-3 p-4 text-sm leading-relaxed text-muted sm:grid-cols-3 sm:p-5">
                <div className="rounded-xl border border-border bg-surface/70 p-3">
                  <strong className="block text-foreground">What we collect</strong>
                  Contact details you submit, project requirements, and optional site analytics.
                </div>
                <div className="rounded-xl border border-border bg-surface/70 p-3">
                  <strong className="block text-foreground">How we use it</strong>
                  To reply, quote, improve pages, and maintain a documented service record.
                </div>
                <div className="rounded-xl border border-border bg-surface/70 p-3">
                  <strong className="block text-foreground">Your control</strong>
                  Decline or withdraw anytime. Read the{' '}
                  <a href="/legal/privacy-policy" className="text-violet underline underline-offset-2">
                    Privacy Policy
                  </a>.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </AnimatePresence>
  );
}
