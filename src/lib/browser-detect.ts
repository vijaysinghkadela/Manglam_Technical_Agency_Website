/**
 * Browser Detection & Feature Detection Utilities
 * Cross-browser optimization for MTA Website
 * 
 * Supports: Chrome, Safari, Edge, Firefox, Opera
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type BrowserName = 'chrome' | 'safari' | 'firefox' | 'edge' | 'opera' | 'unknown'
export type DeviceType = 'desktop' | 'tablet' | 'mobile'
export type OSName = 'windows' | 'macos' | 'ios' | 'android' | 'linux' | 'unknown'

export interface BrowserInfo {
  name: BrowserName
  version: number
  os: OSName
  device: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  supportsBackdropFilter: boolean
  supportsScrollBehavior: boolean
  prefersReducedMotion: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Browser Detection (runs client-side only)
// ─────────────────────────────────────────────────────────────────────────────

let cachedBrowserInfo: BrowserInfo | null = null

/**
 * Detects the current browser and its capabilities.
 * Results are cached for performance.
 */
export function getBrowserInfo(): BrowserInfo {
  // Return cached result
  if (cachedBrowserInfo) return cachedBrowserInfo

  // SSR guard
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return getDefaultBrowserInfo()
  }

  const ua = navigator.userAgent.toLowerCase()
  const vendor = navigator.vendor?.toLowerCase() || ''

  // Detect browser
  const name = detectBrowserName(ua, vendor)
  const version = detectBrowserVersion(ua, name)
  const os = detectOS(ua)
  const device = detectDevice(ua)

  // Feature detection
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') || 
                                  CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
  const supportsScrollBehavior = CSS.supports('scroll-behavior', 'smooth')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  cachedBrowserInfo = {
    name,
    version,
    os,
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    isTouchDevice,
    supportsBackdropFilter,
    supportsScrollBehavior,
    prefersReducedMotion,
  }

  return cachedBrowserInfo
}

function detectBrowserName(ua: string, vendor: string): BrowserName {
  // Order matters - check more specific browsers first
  
  // Opera (check first, contains 'chrome' in UA)
  if (ua.includes('opr') || ua.includes('opera')) {
    return 'opera'
  }
  
  // Edge (Chromium-based, contains 'chrome' in UA)
  if (ua.includes('edg/') || ua.includes('edge/')) {
    return 'edge'
  }
  
  // Chrome (check after Opera and Edge)
  if (ua.includes('chrome') && vendor.includes('google')) {
    return 'chrome'
  }
  
  // Safari (check after Chrome, as Chrome on iOS includes 'safari')
  if (ua.includes('safari') && !ua.includes('chrome') && vendor.includes('apple')) {
    return 'safari'
  }
  
  // Firefox
  if (ua.includes('firefox') || ua.includes('fxios')) {
    return 'firefox'
  }
  
  return 'unknown'
}

function detectBrowserVersion(ua: string, browser: BrowserName): number {
  let match: RegExpMatchArray | null = null

  switch (browser) {
    case 'chrome':
      match = ua.match(/chrome\/(\d+)/)
      break
    case 'safari':
      match = ua.match(/version\/(\d+)/)
      break
    case 'firefox':
      match = ua.match(/firefox\/(\d+)/) || ua.match(/fxios\/(\d+)/)
      break
    case 'edge':
      match = ua.match(/edg\/(\d+)/) || ua.match(/edge\/(\d+)/)
      break
    case 'opera':
      match = ua.match(/opr\/(\d+)/) || ua.match(/opera\/(\d+)/)
      break
  }

  return match ? parseInt(match[1], 10) : 0
}

function detectOS(ua: string): OSName {
  if (ua.includes('win')) return 'windows'
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return 'ios'
  if (ua.includes('mac')) return 'macos'
  if (ua.includes('android')) return 'android'
  if (ua.includes('linux')) return 'linux'
  return 'unknown'
}

function detectDevice(ua: string): DeviceType {
  // Check for mobile first
  if (/iphone|ipod|android.*mobile|windows phone|blackberry|opera mini|opera mobi/i.test(ua)) {
    return 'mobile'
  }
  
  // Check for tablet
  if (/ipad|android(?!.*mobile)|tablet|kindle|silk|playbook/i.test(ua)) {
    return 'tablet'
  }
  
  return 'desktop'
}

function getDefaultBrowserInfo(): BrowserInfo {
  return {
    name: 'unknown',
    version: 0,
    os: 'unknown',
    device: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    supportsBackdropFilter: true,
    supportsScrollBehavior: true,
    prefersReducedMotion: false,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Quick Boolean Checks (for conditionals)
// ─────────────────────────────────────────────────────────────────────────────

/** Returns true if running in Safari (including iOS Safari) */
export function isSafari(): boolean {
  return getBrowserInfo().name === 'safari'
}

/** Returns true if running in Firefox */
export function isFirefox(): boolean {
  return getBrowserInfo().name === 'firefox'
}

/** Returns true if running in any Chromium-based browser (Chrome, Edge, Opera) */
export function isChromium(): boolean {
  const browser = getBrowserInfo().name
  return browser === 'chrome' || browser === 'edge' || browser === 'opera'
}

/** Returns true if running on iOS (iPhone, iPad, iPod) */
export function isIOS(): boolean {
  return getBrowserInfo().os === 'ios'
}

/** Returns true if running on any touch device */
export function isTouchDevice(): boolean {
  return getBrowserInfo().isTouchDevice
}

/** Returns true if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  return getBrowserInfo().prefersReducedMotion
}

/** Returns true if running on a mobile device */
export function isMobile(): boolean {
  return getBrowserInfo().isMobile
}

/** Returns true if running on a desktop device */
export function isDesktop(): boolean {
  return getBrowserInfo().isDesktop
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature Detection
// ─────────────────────────────────────────────────────────────────────────────

/** Checks if IntersectionObserver is supported */
export function supportsIntersectionObserver(): boolean {
  if (typeof window === 'undefined') return false
  return 'IntersectionObserver' in window
}

/** Checks if ResizeObserver is supported */
export function supportsResizeObserver(): boolean {
  if (typeof window === 'undefined') return false
  return 'ResizeObserver' in window
}

/** Checks if CSS custom properties are supported */
export function supportsCSSVariables(): boolean {
  if (typeof window === 'undefined') return false
  return window.CSS?.supports?.('--test', '0') ?? false
}

/** Checks if backdrop-filter is supported (with or without prefix) */
export function supportsBackdropFilter(): boolean {
  return getBrowserInfo().supportsBackdropFilter
}

/** Checks if content-visibility is supported (Chrome 85+) */
export function supportsContentVisibility(): boolean {
  if (typeof CSS === 'undefined') return false
  return CSS.supports('content-visibility', 'auto')
}

/** Checks if Web Animations API is supported */
export function supportsWebAnimations(): boolean {
  if (typeof window === 'undefined') return false
  return 'animate' in Element.prototype
}

/** Checks if requestIdleCallback is supported */
export function supportsIdleCallback(): boolean {
  if (typeof window === 'undefined') return false
  return 'requestIdleCallback' in window
}

// ─────────────────────────────────────────────────────────────────────────────
// Performance Detection
// ─────────────────────────────────────────────────────────────────────────────

/** Checks if the device likely has hardware acceleration available */
export function hasHardwareAcceleration(): boolean {
  if (typeof document === 'undefined') return true

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return false

    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) return true // Assume true if we can't detect

    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    // Check for software renderers
    const softwareRenderers = ['swiftshader', 'llvmpipe', 'softpipe', 'software']
    return !softwareRenderers.some(sw => renderer.toLowerCase().includes(sw))
  } catch {
    return true // Assume hardware acceleration is available
  }
}

/** Estimates connection quality based on Network Information API */
export function getConnectionQuality(): 'fast' | 'medium' | 'slow' | 'unknown' {
  if (typeof navigator === 'undefined') return 'unknown'

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection

  if (!connection) return 'unknown'

  // Check effective type
  const effectiveType = connection.effectiveType
  if (effectiveType === '4g') return 'fast'
  if (effectiveType === '3g') return 'medium'
  if (effectiveType === '2g' || effectiveType === 'slow-2g') return 'slow'

  // Fallback to downlink speed
  const downlink = connection.downlink
  if (downlink !== undefined) {
    if (downlink >= 5) return 'fast'
    if (downlink >= 1) return 'medium'
    return 'slow'
  }

  return 'unknown'
}

/** Checks if Save-Data header is enabled */
export function isSaveDataEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  return connection?.saveData ?? false
}

// ─────────────────────────────────────────────────────────────────────────────
// Types for Network Information API
// ─────────────────────────────────────────────────────────────────────────────

interface NetworkInformation {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
  downlink?: number
  saveData?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Reset Cache (for testing or theme changes)
// ─────────────────────────────────────────────────────────────────────────────

export function resetBrowserCache(): void {
  cachedBrowserInfo = null
}
