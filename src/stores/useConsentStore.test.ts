import { beforeEach, describe, expect, it } from 'vitest'
import {
  CONSENT_VERSION,
  isConsentDecisionCurrent,
  useConsentStore,
} from './useConsentStore'

const resetConsentStore = () => {
  useConsentStore.setState({
    hasConsent: false,
    consentStatus: null,
    consentTimestamp: null,
    consentExpiresAt: null,
    consentVersion: null,
    consentPurpose: null,
    hasHydrated: false,
    showBanner: true,
  })
}

describe('useConsentStore', () => {
  beforeEach(() => {
    localStorage.clear()
    resetConsentStore()
  })

  it('persists accepted consent as a current decision', () => {
    useConsentStore.getState().grantConsent('analytics-and-communications')
    const state = useConsentStore.getState()

    expect(state.hasConsent).toBe(true)
    expect(state.consentStatus).toBe('accepted')
    expect(state.showBanner).toBe(false)
    expect(state.consentVersion).toBe(CONSENT_VERSION)
    expect(isConsentDecisionCurrent(state)).toBe(true)
  })

  it('persists declined consent without granting analytics consent', () => {
    useConsentStore.getState().dismissBanner()
    const state = useConsentStore.getState()

    expect(state.hasConsent).toBe(false)
    expect(state.consentStatus).toBe('declined')
    expect(state.showBanner).toBe(false)
    expect(isConsentDecisionCurrent(state)).toBe(true)
  })

  it('shows banner again when consent expires', () => {
    useConsentStore.setState({
      consentStatus: 'accepted',
      consentExpiresAt: new Date(Date.now() - 1000).toISOString(),
      consentVersion: CONSENT_VERSION,
      showBanner: false,
      hasConsent: true,
    })

    useConsentStore.getState().hydrateConsent()

    expect(useConsentStore.getState().hasConsent).toBe(false)
    expect(useConsentStore.getState().showBanner).toBe(true)
  })

  it('shows banner again when consent version changes', () => {
    useConsentStore.setState({
      consentStatus: 'accepted',
      consentExpiresAt: new Date(Date.now() + 1000 * 60).toISOString(),
      consentVersion: 'old-version',
      showBanner: false,
      hasConsent: true,
    })

    useConsentStore.getState().hydrateConsent()

    expect(useConsentStore.getState().hasConsent).toBe(false)
    expect(useConsentStore.getState().showBanner).toBe(true)
  })
})
