'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConsentState {
  // Consent status
  hasConsent: boolean;
  consentTimestamp: string | null;
  consentPurpose: string | null;
  
  // Banner visibility
  showBanner: boolean;
  
  // Actions
  grantConsent: (purpose?: string) => void;
  withdrawConsent: () => void;
  dismissBanner: () => void;
  showBannerAgain: () => void;
  
  // Getters
  getConsentData: () => {
    hasConsent: boolean;
    timestamp: string | null;
    purpose: string | null;
  };
}

export const useConsentStore = create<ConsentState>()(
  persist(
    (set, get) => ({
      // Initial state
      hasConsent: false,
      consentTimestamp: null,
      consentPurpose: null,
      showBanner: true,

      // Grant consent
      grantConsent: (purpose = 'analytics-and-marketing') => {
        set({
          hasConsent: true,
          consentTimestamp: new Date().toISOString(),
          consentPurpose: purpose,
          showBanner: false,
        });
      },

      // Withdraw consent (as easy as giving)
      withdrawConsent: () => {
        set({
          hasConsent: false,
          consentTimestamp: null,
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
        set({ showBanner: false });
      },

      // Show banner again
      showBannerAgain: () => {
        set({ showBanner: true });
      },

      // Get consent data for logging
      getConsentData: () => ({
        hasConsent: get().hasConsent,
        timestamp: get().consentTimestamp,
        purpose: get().consentPurpose,
      }),
    }),
    {
      name: 'mta-consent-storage',
      skipHydration: true, // For Next.js SSR
    }
  )
);
