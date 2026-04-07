/**
 * Performance Utilities for MTA Website
 * RAF throttling, debounce, throttle, and Web Vitals monitoring
 */

// ─────────────────────────────────────────────────────────────────────────────
// RAF-based Throttling (for smooth 60fps animations)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a throttled function that only executes on animation frames.
 * Perfect for mousemove, scroll, and resize handlers.
 * 
 * @example
 * const handleMouseMove = rafThrottle((e: MouseEvent) => {
 *   updateCursorPosition(e.clientX, e.clientY)
 * })
 * window.addEventListener('mousemove', handleMouseMove)
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(
  callback: T
): T & { cancel: () => void } {
  let rafId: number | null = null
  let lastArgs: unknown[] | null = null

  const throttled = ((...args: unknown[]) => {
    lastArgs = args

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          callback(...lastArgs)
        }
        rafId = null
      })
    }
  }) as T & { cancel: () => void }

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  return throttled
}

// ─────────────────────────────────────────────────────────────────────────────
// Debounce (for input handlers, resize events)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a debounced function that delays execution until after wait ms
 * have elapsed since the last time the debounced function was invoked.
 * 
 * @param callback - Function to debounce
 * @param wait - Milliseconds to wait before executing
 * @param immediate - Execute on the leading edge instead of trailing
 * 
 * @example
 * const handleSearch = debounce((query: string) => {
 *   searchAPI(query)
 * }, 300)
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  wait: number,
  immediate = false
): T & { cancel: () => void; flush: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastThis: ThisParameterType<T> | null = null

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this

    const callNow = immediate && !timeoutId

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      if (!immediate && lastArgs) {
        callback.apply(lastThis, lastArgs)
      }
    }, wait)

    if (callNow) {
      callback.apply(this, args)
    }
  } as T & { cancel: () => void; flush: () => void }

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  debounced.flush = () => {
    if (timeoutId && lastArgs) {
      clearTimeout(timeoutId)
      timeoutId = null
      callback.apply(lastThis, lastArgs)
    }
  }

  return debounced
}

// ─────────────────────────────────────────────────────────────────────────────
// Throttle (for scroll, resize with consistent intervals)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a throttled function that only invokes callback at most once per wait ms.
 * 
 * @param callback - Function to throttle
 * @param wait - Minimum milliseconds between invocations
 * @param options - leading/trailing edge options
 * 
 * @example
 * const handleScroll = throttle(() => {
 *   updateScrollPosition()
 * }, 100)
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  callback: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void } {
  const { leading = true, trailing = true } = options

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastThis: ThisParameterType<T> | null = null
  let lastInvokeTime = 0

  const throttled = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()
    
    if (!lastInvokeTime && !leading) {
      lastInvokeTime = now
    }

    const remaining = wait - (now - lastInvokeTime)
    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastInvokeTime = now
      callback.apply(this, args)
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        lastInvokeTime = leading ? Date.now() : 0
        timeoutId = null
        if (lastArgs) {
          callback.apply(lastThis, lastArgs)
        }
      }, remaining)
    }
  } as T & { cancel: () => void }

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastInvokeTime = 0
    lastArgs = null
    lastThis = null
  }

  return throttled
}

// ─────────────────────────────────────────────────────────────────────────────
// Idle Callback (for non-urgent work)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Schedules a callback to run during browser idle time.
 * Falls back to setTimeout for browsers without requestIdleCallback.
 * 
 * @param callback - Function to execute when idle
 * @param timeout - Maximum wait time in ms (default 100ms)
 */
export function onIdle(
  callback: () => void,
  timeout = 100
): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout })
    return () => window.cancelIdleCallback(id)
  }

  // Fallback for Safari and older browsers
  const id = setTimeout(callback, 1)
  return () => clearTimeout(id)
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation Frame Loop
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates an animation loop that runs at 60fps.
 * Returns a cleanup function to stop the loop.
 * 
 * @example
 * const stop = createAnimationLoop((deltaTime) => {
 *   particle.x += velocity * deltaTime
 * })
 * // Later: stop()
 */
export function createAnimationLoop(
  callback: (deltaTime: number) => void
): () => void {
  let rafId: number
  let lastTime = performance.now()
  let running = true

  const loop = (currentTime: number) => {
    if (!running) return

    const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
    lastTime = currentTime

    callback(deltaTime)
    rafId = requestAnimationFrame(loop)
  }

  rafId = requestAnimationFrame(loop)

  return () => {
    running = false
    cancelAnimationFrame(rafId)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Smooth Lerp (for smooth animations)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Linear interpolation between two values.
 * Perfect for smooth cursor following, scroll-based animations.
 * 
 * @param start - Starting value
 * @param end - Ending value
 * @param factor - Interpolation factor (0-1, lower = smoother)
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

/**
 * Smooth damp for physics-based animations.
 * More natural than lerp for following animations.
 */
export function smoothDamp(
  current: number,
  target: number,
  velocity: { value: number },
  smoothTime: number,
  maxSpeed = Infinity,
  deltaTime = 1 / 60
): number {
  smoothTime = Math.max(0.0001, smoothTime)
  const omega = 2 / smoothTime

  const x = omega * deltaTime
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  let change = current - target
  const originalTo = target

  const maxChange = maxSpeed * smoothTime
  change = Math.max(-maxChange, Math.min(maxChange, change))
  const newTarget = current - change

  const temp = (velocity.value + omega * change) * deltaTime
  velocity.value = (velocity.value - omega * temp) * exp
  let output = newTarget + (change + temp) * exp

  if (originalTo - current > 0 === output > originalTo) {
    output = originalTo
    velocity.value = (output - originalTo) / deltaTime
  }

  return output
}

// ─────────────────────────────────────────────────────────────────────────────
// Will-Change Manager (prevent GPU memory leaks)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Manages will-change property to prevent GPU memory issues.
 * Adds will-change before animation, removes after.
 * 
 * @example
 * const manager = createWillChangeManager(element, 'transform')
 * manager.enable()
 * // Animate...
 * manager.disable()
 */
export function createWillChangeManager(
  element: HTMLElement,
  properties: string
): { enable: () => void; disable: () => void; toggle: (active: boolean) => void } {
  let isEnabled = false
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const enable = () => {
    if (timeoutId) clearTimeout(timeoutId)
    if (!isEnabled) {
      element.style.willChange = properties
      isEnabled = true
    }
  }

  const disable = () => {
    // Delay removal slightly to allow final frame to render
    timeoutId = setTimeout(() => {
      element.style.willChange = 'auto'
      isEnabled = false
    }, 100)
  }

  const toggle = (active: boolean) => {
    if (active) enable()
    else disable()
  }

  return { enable, disable, toggle }
}

// ─────────────────────────────────────────────────────────────────────────────
// Web Vitals Observer (LCP, FID, CLS monitoring)
// ─────────────────────────────────────────────────────────────────────────────

type WebVitalCallback = (metric: { name: string; value: number; rating: string }) => void

/**
 * Observes Core Web Vitals and reports them.
 * 
 * @example
 * observeWebVitals((metric) => {
 *   console.log(`${metric.name}: ${metric.value} (${metric.rating})`)
 *   analytics.track('web-vital', metric)
 * })
 */
export function observeWebVitals(callback: WebVitalCallback): () => void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return () => {}
  }

  const observers: PerformanceObserver[] = []

  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number }
      const value = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime
      callback({
        name: 'LCP',
        value,
        rating: value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor',
      })
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
    observers.push(lcpObserver)
  } catch {
    // LCP not supported
  }

  // First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as (PerformanceEntry & { processingStart: number })[]
      for (const entry of entries) {
        const value = entry.processingStart - entry.startTime
        callback({
          name: 'FID',
          value,
          rating: value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor',
        })
      }
    })
    fidObserver.observe({ type: 'first-input', buffered: true })
    observers.push(fidObserver)
  } catch {
    // FID not supported
  }

  // Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      callback({
        name: 'CLS',
        value: clsValue,
        rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
      })
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })
    observers.push(clsObserver)
  } catch {
    // CLS not supported
  }

  // Cleanup function
  return () => {
    observers.forEach((observer) => observer.disconnect())
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Paint Timing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gets First Contentful Paint timing.
 */
export function getFirstContentfulPaint(): number | null {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null
  }

  const paintEntries = performance.getEntriesByType('paint')
  const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint')
  return fcp?.startTime ?? null
}

/**
 * Gets Time to First Byte.
 */
export function getTimeToFirstByte(): number | null {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null
  }

  const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
  if (navEntries.length > 0) {
    return navEntries[0].responseStart - navEntries[0].requestStart
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Memory Monitoring (Chrome only)
// ─────────────────────────────────────────────────────────────────────────────

interface MemoryInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
  usedPercentage: number
}

/**
 * Gets current memory usage (Chrome only).
 * Returns null if not supported.
 */
export function getMemoryUsage(): MemoryInfo | null {
  if (typeof window === 'undefined') return null

  const memory = (performance as Performance & { memory?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  } }).memory

  if (!memory) return null

  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  }
}
