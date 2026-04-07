'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsentStore } from '@/stores/useConsentStore';
import { useIsClient } from '@/hooks/useIsClient';
import { X, Shield, ChevronDown, ChevronUp } from 'lucide-react';

export function ConsentBanner() {
  const { hasConsent, showBanner, grantConsent, dismissBanner } = useConsentStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const isClient = useIsClient();

  // Don't render until client-side (prevent hydration issues)
  if (!isClient) return null;

  // Don't show if already consented and banner dismissed
  if (!showBanner && hasConsent) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          style={{ backgroundColor: 'var(--color-canvas)' }}
        >
          {/* Border top */}
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Shield 
                    className="w-5 h-5 flex-shrink-0 mt-0.5" 
                    style={{ color: 'var(--color-violet)' }}
                  />
                  <div className="flex-1">
                    <h3 
                      className="font-display font-bold text-sm mb-1"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      Data Privacy & Consent
                    </h3>
                    <p 
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      We respect your privacy. We process data under the Digital Personal Data 
                      Protection Act, 2023 (India). Learn more in our{' '}
                      <a 
                        href="/legal/privacy-policy" 
                        className="underline hover:no-underline transition-all"
                        style={{ color: 'var(--color-violet-light)' }}
                      >
                        Privacy Policy
                      </a>.
                    </p>
                  </div>
                </div>
                
                {/* Close button (dismiss without consent) */}
                <button
                  onClick={dismissBanner}
                  className="p-1 rounded transition-colors hover:opacity-70"
                  style={{ color: 'var(--color-muted)' }}
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="p-4 rounded text-xs space-y-3"
                      style={{ 
                        backgroundColor: 'rgba(124, 58, 237, 0.05)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      <p style={{ color: 'var(--color-muted)' }}>
                        <strong style={{ color: 'var(--color-foreground)' }}>What we collect:</strong>{' '}
                        Contact information, project requirements, and basic analytics to improve our services.
                      </p>
                      <p style={{ color: 'var(--color-muted)' }}>
                        <strong style={{ color: 'var(--color-foreground)' }}>How we use it:</strong>{' '}
                        To respond to your inquiries, deliver services, and improve our website.
                      </p>
                      <p style={{ color: 'var(--color-muted)' }}>
                        <strong style={{ color: 'var(--color-foreground)' }}>Your rights:</strong>{' '}
                        You can access, correct, or delete your data at any time. Withdrawal is as easy as giving consent.
                      </p>
                      <p style={{ color: 'var(--color-muted)' }}>
                        <strong style={{ color: 'var(--color-foreground)' }}>Compliance:</strong>{' '}
                        DPDP Act 2023 (India) | UDYAM-RJ-15-0094091
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {isExpanded ? (
                    <><ChevronUp className="w-3 h-3" /> Less details</>
                  ) : (
                    <><ChevronDown className="w-3 h-3" /> More details</>
                  )}
                </button>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {/* Withdraw/Decline */}
                  <button
                    onClick={dismissBanner}
                    className="px-4 py-2 text-xs font-mono uppercase tracking-wider transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Decline
                  </button>

                  {/* Accept */}
                  <button
                    onClick={() => grantConsent('analytics-and-communications')}
                    className="px-6 py-2 text-xs font-display font-bold uppercase tracking-wider transition-all hover:opacity-90"
                    style={{ 
                      backgroundColor: 'var(--color-foreground)', 
                      color: 'var(--color-canvas)'
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
