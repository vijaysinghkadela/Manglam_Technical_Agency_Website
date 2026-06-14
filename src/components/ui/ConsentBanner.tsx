'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsentStore } from '@/stores/useConsentStore';
import { useIsClient } from '@/hooks/useIsClient';
import { X, Shield, ChevronDown, ChevronUp } from 'lucide-react';

export function ConsentBanner() {
  const { showBanner, hasHydrated, grantConsent, dismissBanner, hydrateConsent } = useConsentStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isManagingPreferences, setIsManagingPreferences] = useState(false);
  const isClient = useIsClient();
  const detailsId = 'consent-banner-details';

  useEffect(() => {
    let cancelled = false;
    const markHydrated = () => {
      if (!cancelled) hydrateConsent();
    };

    try {
      Promise.resolve(useConsentStore.persist.rehydrate())
        .then(markHydrated)
        .catch(markHydrated);
    } catch {
      markHydrated();
    }

    return () => {
      cancelled = true;
    };
  }, [hydrateConsent]);

  useEffect(() => {
    const handleManagePreferences = () => {
      setIsManagingPreferences(true);
      setIsExpanded(true);
    };

    window.addEventListener('mta:show-consent-banner', handleManagePreferences);
    return () => {
      window.removeEventListener('mta:show-consent-banner', handleManagePreferences);
    };
  }, []);

  // Don't render until client-side (prevent hydration issues)
  if (!isClient || !hasHydrated) return null;

  // Reopen from footer preferences without changing the stored decision first.
  const shouldShow = showBanner || isManagingPreferences;
  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 sm:justify-end sm:pb-5 sm:pl-5 sm:pr-24"
          role="region"
          aria-label="Cookie and privacy consent"
        >
            <div 
              className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl"
              style={{ 
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 18px 50px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(var(--color-accent-rgb), 0.1)' }}
            >
              {/* Top accent bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ 
                  background: 'linear-gradient(90deg, var(--color-violet) 0%, var(--color-violet-light) 50%, var(--color-violet) 100%)' 
                }}
              />

              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  setIsManagingPreferences(false);
                  dismissBanner();
                }}
                className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:bg-white/5 sm:top-4 sm:right-4"
                style={{ color: 'var(--color-muted)' }}
                aria-label="Dismiss cookie notice"
              >
                <X className="w-5 h-5" />
              </button>

              {!isExpanded && (
                <div className="p-4 pr-12">
                  <div className="mb-3 sm:mb-0">
                    <p className="font-display text-sm font-black" style={{ color: 'var(--color-foreground)' }}>
                      Privacy choices
                    </p>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      Optional analytics stays off unless you accept it.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:mt-3">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(true)}
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      className="min-h-[44px] rounded-lg border px-3 text-sm font-medium"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-muted)',
                        backgroundColor: 'transparent' }}
                    >
                      Manage
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsManagingPreferences(false);
                        grantConsent('analytics-and-communications');
                      }}
                      className="min-h-[44px] rounded-lg px-3 font-display text-sm font-bold"
                      style={{
                        backgroundColor: 'var(--color-violet)',
                        color: '#fff' }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              )}

              <div className={isExpanded ? "p-4 sm:p-5" : "hidden p-4 sm:p-5"}>
                {/* Header with icon */}
                <div className="mb-3 flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="mb-3 hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg sm:mb-0 sm:flex"
                    style={{ 
                      backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                      border: '1px solid rgba(var(--color-accent-rgb), 0.2)' }}
                  >
                    <Shield className="h-5 w-5" style={{ color: 'var(--color-violet)' }} />
                  </motion.div>

                  <div className="min-w-0 pr-8 sm:pr-10">
                    <div className="min-w-0">
                    <motion.h3
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="mb-1 font-display text-base font-black"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      Data Privacy & Consent
                    </motion.h3>

                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="max-w-xl text-xs leading-relaxed sm:text-sm"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Essential storage keeps the site working. Optional analytics helps us understand what visitors need, under the DPDP Act, 2023.
                    </motion.p>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={detailsId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-4 overflow-hidden"
                    >
                      <div
                        className="p-4 rounded-xl text-sm space-y-3"
                        style={{
                          backgroundColor: 'rgba(var(--color-accent-rgb), 0.06)',
                          border: '1px solid rgba(var(--color-accent-rgb), 0.15)' }}
                      >
                        <div>
                          <strong style={{ color: 'var(--color-foreground)' }}>What we collect:</strong>{' '}
                          <span style={{ color: 'var(--color-muted)' }}>
                            Contact information, project requirements, and basic analytics to improve our services.
                          </span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--color-foreground)' }}>How we use it:</strong>{' '}
                          <span style={{ color: 'var(--color-muted)' }}>
                            To respond to your inquiries, deliver services, and improve our website.
                          </span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--color-foreground)' }}>Your rights:</strong>{' '}
                          <span style={{ color: 'var(--color-muted)' }}>
                            You can access, correct, or delete your data at any time. Withdrawal is as easy as giving consent.
                          </span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--color-foreground)' }}>Compliance:</strong>{' '}
                          <span style={{ color: 'var(--color-muted)' }}>
                            DPDP Act 2023 (India). Business registration details can be shared where relevant.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      className="flex min-h-[44px] items-center gap-1.5 text-xs font-medium transition-colors hover:text-foreground"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {isExpanded ? (
                        <><ChevronUp className="w-4 h-4" /> Less details</>
                      ) : (
                        <><ChevronDown className="w-4 h-4" /> More details</>
                      )}
                    </button>

                    <span className="hidden text-[10px] font-mono sm:block" style={{ color: 'var(--color-dead)' }}>
                      Secured by MTA
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Decline */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsManagingPreferences(false);
                        dismissBanner();
                      }}
                      className="flex-1 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 hover:opacity-80"
                      style={{ 
                        color: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'transparent' }}
                    >
                      Decline optional analytics
                    </button>

                    {/* Accept */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsManagingPreferences(false);
                        grantConsent('analytics-and-communications');
                      }}
                      className="flex-1 rounded-lg px-5 py-3 text-sm font-display font-bold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                      style={{
                        backgroundColor: 'var(--color-violet)',
                        color: '#fff',
                        boxShadow: '0 4px 14px rgba(var(--color-accent-rgb), 0.25)' }}
                    >
                      Accept optional analytics
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
