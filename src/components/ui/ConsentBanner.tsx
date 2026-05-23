'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsentStore } from '@/stores/useConsentStore';
import { useIsClient } from '@/hooks/useIsClient';
import { X, Shield, ChevronDown, ChevronUp, Lock, Eye, CheckCircle2 } from 'lucide-react';

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
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
          />
          
          {/* Centered modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          >
            <div 
              className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
              style={{ 
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(var(--color-accent-rgb), 0.1)' }}
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
                onClick={dismissBanner}
                className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:bg-white/5 z-10"
                style={{ color: 'var(--color-muted)' }}
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                {/* Header with icon */}
                <div className="flex flex-col items-center text-center mb-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="w-16 h-16 flex items-center justify-center rounded-2xl mb-4"
                    style={{ 
                      backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                      border: '1px solid rgba(var(--color-accent-rgb), 0.2)' }}
                  >
                    <Shield className="w-8 h-8" style={{ color: 'var(--color-violet)' }} />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="font-display font-black text-lg md:text-xl mb-2"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    Data Privacy & Consent
                  </motion.h3>
                  
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-sm leading-relaxed max-w-md"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Manglam Technical Agency — Empowering Your Digital Future
                  </motion.p>
                </div>

                {/* Main content */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="p-4 rounded-xl mb-6"
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
                  className="grid grid-cols-3 gap-3 mb-6"
                >
                  {[
                    { icon: Eye, label: 'Analytics', desc: 'Usage data' },
                    { icon: Lock, label: 'Secure', desc: 'Encrypted' },
                    { icon: CheckCircle2, label: 'DPDP', desc: 'Compliant' },
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
                            DPDP Act 2023 (India) | UDYAM-RJ-15-0094091
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
                      onClick={() => setIsExpanded(!isExpanded)}
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
                      onClick={dismissBanner}
                      className="flex-1 px-6 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-80"
                      style={{ 
                        color: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'transparent' }}
                    >
                      Decline
                    </button>

                    {/* Accept */}
                    <button
                      onClick={() => grantConsent('analytics-and-communications')}
                      className="flex-1 px-6 py-3.5 text-sm font-display font-bold rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                      style={{
                        backgroundColor: 'var(--color-foreground)',
                        color: 'var(--color-canvas)',
                        boxShadow: '0 4px 14px rgba(var(--color-accent-rgb), 0.25)' }}
                    >
                      Accept & Continue
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
