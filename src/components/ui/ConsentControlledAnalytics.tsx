'use client'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { useConsentStore } from '@/stores/useConsentStore'

export function ConsentControlledAnalytics() {
  const hasHydrated = useConsentStore((state) => state.hasHydrated)
  const hasConsent = useConsentStore((state) => state.hasConsent)

  if (!hasHydrated || !hasConsent) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
