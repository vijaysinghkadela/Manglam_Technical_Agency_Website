/**
 * Browser Detection Utility
 * SSR-safe browser and feature detection for Next.js
 */

// Check if running in browser environment
export const isBrowser = typeof window !== 'undefined';

// Browser detection types
export interface BrowserInfo {
  name: 'chrome' | 'safari' | 'firefox' | 'edge' | 'opera' | 'unknown';
  version: string;
  isChrome: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isOpera: boolean;
}

export interface DeviceInfo {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isTouchDevice: boolean;
}

export interface FeatureSupport {
  backdropFilter: boolean;
  webGL: boolean;
  webGL2: boolean;
  webP: boolean;
  avif: boolean;
  intersectionObserver: boolean;
  resizeObserver: boolean;
  mutationObserver: boolean;
  serviceWorker: boolean;
  webWorker: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  webSocket: boolean;
  fetch: boolean;
  promises: boolean;
  cssGrid: boolean;
  cssVariables: boolean;
  cssContainerQueries: boolean;
  viewTransitions: boolean;
  scrollTimeline: boolean;
}

/**
 * Detect browser name and version from user agent
 */
function detectBrowser(): BrowserInfo {
  if (!isBrowser) {
    return {
      name: 'unknown',
      version: '0',
      isChrome: false,
      isSafari: false,
      isFirefox: false,
      isEdge: false,
      isOpera: false,
    };
  }

  const ua = navigator.userAgent;
  let name: BrowserInfo['name'] = 'unknown';
  let version = '0';

  // Order matters: Edge and Opera include Chrome in their UA
  if (/Edg\//.test(ua)) {
    name = 'edge';
    version = ua.match(/Edg\/(\d+(\.\d+)?)/)?.[1] || '0';
  } else if (/OPR\//.test(ua) || /Opera/.test(ua)) {
    name = 'opera';
    version = ua.match(/(?:OPR|Opera)[\/\s](\d+(\.\d+)?)/)?.[1] || '0';
  } else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) {
    name = 'chrome';
    version = ua.match(/Chrome\/(\d+(\.\d+)?)/)?.[1] || '0';
  } else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) {
    name = 'safari';
    version = ua.match(/Version\/(\d+(\.\d+)?)/)?.[1] || '0';
  } else if (/Firefox\//.test(ua)) {
    name = 'firefox';
    version = ua.match(/Firefox\/(\d+(\.\d+)?)/)?.[1] || '0';
  }

  return {
    name,
    version,
    isChrome: name === 'chrome',
    isSafari: name === 'safari',
    isFirefox: name === 'firefox',
    isEdge: name === 'edge',
    isOpera: name === 'opera',
  };
}

/**
 * Detect device type and OS
 */
function detectDevice(): DeviceInfo {
  if (!isBrowser) {
    return {
      isMobile: false,
      isDesktop: true,
      isTablet: false,
      isIOS: false,
      isAndroid: false,
      isTouchDevice: false,
    };
  }

  const ua = navigator.userAgent;
  
  // iOS detection (includes iPad on iOS 13+)
  const isIOS = /iPhone|iPad|iPod/.test(ua) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // Android detection
  const isAndroid = /Android/.test(ua);
  
  // Mobile detection (phones)
  const isMobile = /iPhone|Android.*Mobile|Windows Phone|BlackBerry|Opera Mini|IEMobile/.test(ua);
  
  // Tablet detection
  const isTablet = /iPad|Android(?!.*Mobile)|Tablet/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // Desktop is neither mobile nor tablet
  const isDesktop = !isMobile && !isTablet;
  
  // Touch device detection
  const isTouchDevice = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints is IE-specific
    navigator.msMaxTouchPoints > 0;

  return {
    isMobile,
    isDesktop,
    isTablet,
    isIOS,
    isAndroid,
    isTouchDevice,
  };
}

/**
 * Detect feature support
 */
function detectFeatures(): FeatureSupport {
  if (!isBrowser) {
    return {
      backdropFilter: false,
      webGL: false,
      webGL2: false,
      webP: false,
      avif: false,
      intersectionObserver: false,
      resizeObserver: false,
      mutationObserver: false,
      serviceWorker: false,
      webWorker: false,
      localStorage: false,
      sessionStorage: false,
      indexedDB: false,
      webSocket: false,
      fetch: false,
      promises: false,
      cssGrid: false,
      cssVariables: false,
      cssContainerQueries: false,
      viewTransitions: false,
      scrollTimeline: false,
    };
  }

  // CSS backdrop-filter support
  const backdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)');

  // WebGL support
  const checkWebGL = (version: 1 | 2): boolean => {
    try {
      const canvas = document.createElement('canvas');
      const context = version === 2 
        ? canvas.getContext('webgl2')
        : canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!context;
    } catch {
      return false;
    }
  };

  // Storage support with actual write test
  const checkStorage = (storage: Storage | null): boolean => {
    if (!storage) return false;
    try {
      const testKey = '__storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  };

  return {
    backdropFilter,
    webGL: checkWebGL(1),
    webGL2: checkWebGL(2),
    webP: false, // Detected async - use checkWebPSupport()
    avif: false, // Detected async - use checkAvifSupport()
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    mutationObserver: 'MutationObserver' in window,
    serviceWorker: 'serviceWorker' in navigator,
    webWorker: 'Worker' in window,
    localStorage: checkStorage(window.localStorage),
    sessionStorage: checkStorage(window.sessionStorage),
    indexedDB: 'indexedDB' in window,
    webSocket: 'WebSocket' in window,
    fetch: 'fetch' in window,
    promises: 'Promise' in window,
    cssGrid: CSS.supports('display', 'grid'),
    cssVariables: CSS.supports('--test', '0'),
    cssContainerQueries: CSS.supports('container-type', 'inline-size'),
    viewTransitions: 'startViewTransition' in document,
    scrollTimeline: CSS.supports('animation-timeline', 'scroll()'),
  };
}

/**
 * Async check for WebP support
 */
export async function checkWebPSupport(): Promise<boolean> {
  if (!isBrowser) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
}

/**
 * Async check for AVIF support
 */
export async function checkAvifSupport(): Promise<boolean> {
  if (!isBrowser) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA==';
  });
}

/**
 * Get connection info (Network Information API)
 */
export function getConnectionInfo(): {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
} | null {
  if (!isBrowser) return null;
  
  // @ts-expect-error - Network Information API is not in all browsers
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return null;
  
  return {
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink || 0,
    rtt: connection.rtt || 0,
    saveData: connection.saveData || false,
  };
}

/**
 * Check if user prefers reduced data usage
 */
export function prefersReducedData(): boolean {
  if (!isBrowser) return false;
  
  const connection = getConnectionInfo();
  if (connection?.saveData) return true;
  if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') return true;
  
  return false;
}

/**
 * Get device pixel ratio
 */
export function getDevicePixelRatio(): number {
  if (!isBrowser) return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Check if high DPI display
 */
export function isHighDPI(): boolean {
  return getDevicePixelRatio() > 1;
}

/**
 * Check if retina display (2x or higher)
 */
export function isRetina(): boolean {
  return getDevicePixelRatio() >= 2;
}

// Cached instances (computed once on first access in browser)
let cachedBrowser: BrowserInfo | null = null;
let cachedDevice: DeviceInfo | null = null;
let cachedFeatures: FeatureSupport | null = null;

/**
 * Get browser info (cached)
 */
export function getBrowser(): BrowserInfo {
  if (!cachedBrowser) {
    cachedBrowser = detectBrowser();
  }
  return cachedBrowser;
}

/**
 * Get device info (cached)
 */
export function getDevice(): DeviceInfo {
  if (!cachedDevice) {
    cachedDevice = detectDevice();
  }
  return cachedDevice;
}

/**
 * Get feature support info (cached)
 */
export function getFeatures(): FeatureSupport {
  if (!cachedFeatures) {
    cachedFeatures = detectFeatures();
  }
  return cachedFeatures;
}

/**
 * Clear cached detection results (useful for testing)
 */
export function clearDetectionCache(): void {
  cachedBrowser = null;
  cachedDevice = null;
  cachedFeatures = null;
}

// Export individual checks for tree-shaking
export const browser = {
  get info() { return getBrowser(); },
  get isChrome() { return getBrowser().isChrome; },
  get isSafari() { return getBrowser().isSafari; },
  get isFirefox() { return getBrowser().isFirefox; },
  get isEdge() { return getBrowser().isEdge; },
  get isOpera() { return getBrowser().isOpera; },
};

export const device = {
  get info() { return getDevice(); },
  get isMobile() { return getDevice().isMobile; },
  get isDesktop() { return getDevice().isDesktop; },
  get isTablet() { return getDevice().isTablet; },
  get isIOS() { return getDevice().isIOS; },
  get isAndroid() { return getDevice().isAndroid; },
  get isTouchDevice() { return getDevice().isTouchDevice; },
};

export const features = {
  get info() { return getFeatures(); },
  get backdropFilter() { return getFeatures().backdropFilter; },
  get webGL() { return getFeatures().webGL; },
  get webGL2() { return getFeatures().webGL2; },
  get intersectionObserver() { return getFeatures().intersectionObserver; },
  get resizeObserver() { return getFeatures().resizeObserver; },
  get cssGrid() { return getFeatures().cssGrid; },
  get cssVariables() { return getFeatures().cssVariables; },
  get viewTransitions() { return getFeatures().viewTransitions; },
};
