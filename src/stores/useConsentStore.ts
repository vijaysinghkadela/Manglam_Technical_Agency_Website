'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const CONSENT_VERSION = '2026-05-24';
const CONSENT_PERIOD_DAYS = 180;
const CONSENT_PERIOD_MS = CONSENT_PERIOD_DAYS * 24 * 60 * 60 * 1000;

type ConsentStatus = 'accepted' | 'declined' | null;

const getExpiry = () => new Date(Date.now() + CONSENT_PERIOD_MS).toISOString();

interface ConsentState {
  // Consent status
  hasConsent: boolean;
  consentStatus: ConsentStatus;
  consentTimestamp: string | null;
  consentExpiresAt: string | null;
  consentVersion: string | null;
  consentPurpose: string | null;
  hasHydrated: boolean;
  
  // Banner visibility
  showBanner: boolean;
  
  // Actions
  grantConsent: (purpose?: string) => void;
  withdrawConsent: () => void;
  dismissBanner: () => void;
  showBannerAgain: () => void;
  hydrateConsent: () => void;
  
  // Getters
  getConsentData: () => {
    hasConsent: boolean;
    status: ConsentStatus;
    timestamp: string | null;
    expiresAt: string | null;
    version: string | null;
    purpose: string | null;
  };
}

const isDecisionCurrent = (state: Pick<ConsentState, 'consentStatus' | 'consentExpiresAt' | 'consentVersion'>) => {
  if (!state.consentStatus || !state.consentExpiresAt) return false;
  if (state.consentVersion !== CONSENT_VERSION) return false;

  const expiresAt = new Date(state.consentExpiresAt).getTime();
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
};

const normalizeVisibility = (state: ConsentState) => ({
  hasConsent: state.consentStatus === 'accepted' && isDecisionCurrent(state),
  showBanner: !isDecisionCurrent(state),
});

export const useConsentStore = create<ConsentState>()(
  persist(
    (set, get) => ({
      // Initial state
      hasConsent: false,
      consentStatus: null,
      consentTimestamp: null,
      consentExpiresAt: null,
      consentVersion: null,
      consentPurpose: null,
      hasHydrated: false,
      showBanner: true,

      // Grant consent
      grantConsent: (purpose = 'analytics-and-marketing') => {
        set({
          hasConsent: true,
          consentStatus: 'accepted',
          consentTimestamp: new Date().toISOString(),
          consentExpiresAt: getExpiry(),
          consentVersion: CONSENT_VERSION,
          consentPurpose: purpose,
          showBanner: false,
        });
      },

      // Withdraw consent (as easy as giving)
      withdrawConsent: () => {
        set({
          hasConsent: false,
          consentStatus: null,
          consentTimestamp: null,
          consentExpiresAt: null,
          consentVersion: null,
          consentPurpose: null,
          showBanner: true,
        });
        
        // Clear analytics cookies if any
        if (typeof window !== 'undefined') {
          // Disable analytics
          window.localStorage.removeItem('va-consent');
        }
      },

      // Dismiss banner without consent
      dismissBanner: () => {
        set({
          hasConsent: false,
          consentStatus: 'declined',
          consentTimestamp: new Date().toISOString(),
          consentExpiresAt: getExpiry(),
          consentVersion: CONSENT_VERSION,
          consentPurpose: 'declined',
          showBanner: false,
        });
      },

      // Show banner again
      showBannerAgain: () => {
        set({ showBanner: true });
      },

      hydrateConsent: () => {
        const normalized = normalizeVisibility(get());
        set({ ...normalized, hasHydrated: true });
      },

      // Get consent data for logging
      getConsentData: () => ({
        hasConsent: get().hasConsent,
        status: get().consentStatus,
        timestamp: get().consentTimestamp,
        expiresAt: get().consentExpiresAt,
        version: get().consentVersion,
        purpose: get().consentPurpose,
      }),
    }),
    {
      name: 'mta-consent-storage',
      skipHydration: true, // For Next.js SSR
      partialize: (state) => ({
        hasConsent: state.hasConsent,
        consentStatus: state.consentStatus,
        consentTimestamp: state.consentTimestamp,
        consentExpiresAt: state.consentExpiresAt,
        consentVersion: state.consentVersion,
        consentPurpose: state.consentPurpose,
        showBanner: state.showBanner,
      }),
      onRehydrateStorage: () => (state) => {
        state?.hydrateConsent();
      },
    }
  )
);
