'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsentStore } from '@/stores/useConsentStore';
import { useIsClient } from '@/hooks/useIsClient';
import { X, Shield, ChevronDown, ChevronUp, Lock, Eye, CheckCircle2 } from 'lucide-react';

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
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 sm:px-5 sm:pb-5"
          role="region"
          aria-label="Cookie and privacy consent"
        >
            <div 
              className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
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
                className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:bg-white/5 z-10"
                style={{ color: 'var(--color-muted)' }}
                aria-label="Dismiss cookie notice"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-5 sm:p-6 md:p-7">
                {/* Header with icon */}
                <div className="mb-5 flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:mb-0"
                    style={{ 
                      backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                      border: '1px solid rgba(var(--color-accent-rgb), 0.2)' }}
                  >
                    <Shield className="h-7 w-7" style={{ color: 'var(--color-violet)' }} />
                  </motion.div>

                  <div className="min-w-0 pr-8 sm:pr-10">
                    <motion.h3
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="mb-2 font-display text-lg font-black md:text-xl"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      Data Privacy & Consent
                    </motion.h3>

                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="max-w-xl text-sm leading-relaxed"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      We use essential storage for site preferences and optional analytics to understand what visitors need.
                    </motion.p>
                  </div>
                </div>

                {/* Main content */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="mb-5 rounded-xl p-4"
                  style={{ 
                    backgroundColor: 'rgba(var(--color-accent-rgb), 0.04)',
                    border: '1px solid rgba(var(--color-accent-rgb), 0.1)' }}
                >
                  <p className="text-sm leading-relaxed text-center" style={{ color: 'var(--color-muted)' }}>
                    We respect your privacy. We process data under the{' '}
                    <strong style={{ color: 'var(--color-foreground)' }}>Digital Personal Data Protection Act, 2023</strong>{' '}
                    (India). Learn more in our{' '}
                    <a
                      href="/legal/privacy-policy"
                      className="underline hover:no-underline transition-all"
                      style={{ color: 'var(--color-violet-light)' }}
                    >
                      Privacy Policy
                    </a>.
                  </p>
                </motion.div>

                {/* Quick info cards */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mb-5 grid grid-cols-3 gap-3"
                >
                  {[
                    { icon: Eye, label: 'Analytics', desc: 'Usage data' },
                    { icon: Lock, label: 'Secure', desc: 'Encrypted' },
                    { icon: CheckCircle2, label: 'DPDP', desc: 'Aware' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <item.icon className="w-4 h-4 mb-2" style={{ color: 'var(--color-violet-light)' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-foreground)' }}>
                        {item.label}
                      </span>
                      <span className="text-[10px]" style={{ color: 'var(--color-dead)' }}>
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={detailsId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden mb-6"
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
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-foreground"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {isExpanded ? (
                        <><ChevronUp className="w-4 h-4" /> Less details</>
                      ) : (
                        <><ChevronDown className="w-4 h-4" /> More details</>
                      )}
                    </button>

                    <span className="text-[10px] font-mono" style={{ color: 'var(--color-dead)' }}>
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
                      className="flex-1 px-6 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-80"
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
                      className="flex-1 px-6 py-3.5 text-sm font-display font-bold rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                      style={{
                        backgroundColor: 'var(--color-foreground)',
                        color: 'var(--color-canvas)',
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
