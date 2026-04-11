/**
 * Performance Utilities
 * RAF throttling, debounce, throttle, and performance observation helpers
 */

import { isBrowser } from './browser-detect';

// ============================================================================
// Types
// ============================================================================

export type AnyFunction = (...args: unknown[]) => unknown;

export interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  inp: number | null;
}

export interface PerformanceObserverOptions {
  onFCP?: (value: number) => void;
  onLCP?: (value: number) => void;
  onFID?: (value: number) => void;
  onCLS?: (value: number) => void;
  onTTFB?: (value: number) => void;
  onINP?: (value: number) => void;
}

// ============================================================================
// RAF Throttling
// ============================================================================

/**
 * Throttle a function to run at most once per animation frame
 * Useful for scroll/resize handlers
 */
export function rafThrottle<T extends AnyFunction>(
  fn: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>): void => {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          fn(...lastArgs);
        }
        rafId = null;
      });
    }
  };

  // Add cancel method
  (throttled as { cancel?: () => void }).cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return throttled;
}

/**
 * Create a RAF loop that runs continuously
 */
export function createRAFLoop(
  callback: (deltaTime: number, timestamp: number) => void
): { start: () => void; stop: () => void; isRunning: () => boolean } {
  let rafId: number | null = null;
  let lastTimestamp = 0;
  let running = false;

  const loop = (timestamp: number): void => {
    if (!running) return;

    const deltaTime = lastTimestamp ? timestamp - lastTimestamp : 0;
    lastTimestamp = timestamp;

    callback(deltaTime, timestamp);

    rafId = requestAnimationFrame(loop);
  };

  return {
    start: () => {
      if (running) return;
      running = true;
      lastTimestamp = 0;
      rafId = requestAnimationFrame(loop);
    },
    stop: () => {
      running = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
    isRunning: () => running,
  };
}

// ============================================================================
// Debounce
// ============================================================================

export interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

/**
 * Debounce a function - delays execution until after wait ms have elapsed
 * since the last call
 */
export function debounce<T extends AnyFunction>(
  fn: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean; maxWait?: number } = {}
): DebouncedFunction<T> {
  const { leading = false, trailing = true, maxWait } = options;

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let maxTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime: number | null = null;
  let lastInvokeTime = 0;
  let result: unknown;

  const invokeFunc = (time: number): void => {
    const args = lastArgs;
    lastArgs = null;
    lastInvokeTime = time;
    result = fn(...(args as Parameters<T>));
  };

  const shouldInvoke = (time: number): boolean => {
    if (lastCallTime === null) return true;

    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  };

  const trailingEdge = (time: number): void => {
    timeoutId = null;

    if (trailing && lastArgs) {
      invokeFunc(time);
    }
    lastArgs = null;
  };

  const timerExpired = (): void => {
    const time = Date.now();
    if (shouldInvoke(time)) {
      trailingEdge(time);
    } else {
      const timeSinceLastCall = time - (lastCallTime ?? 0);
      const timeSinceLastInvoke = time - lastInvokeTime;
      const timeWaiting = wait - timeSinceLastCall;
      const maxTimeWaiting = maxWait !== undefined
        ? maxWait - timeSinceLastInvoke
        : timeWaiting;

      timeoutId = setTimeout(
        timerExpired,
        Math.min(timeWaiting, maxTimeWaiting)
      );
    }
  };

  const leadingEdge = (time: number): void => {
    lastInvokeTime = time;
    timeoutId = setTimeout(timerExpired, wait);

    if (leading) {
      invokeFunc(time);
    }
  };

  const debounced = (...args: Parameters<T>): void => {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastCallTime = time;

    if (isInvoking) {
      if (timeoutId === null) {
        leadingEdge(time);
        return;
      }
      if (maxWait !== undefined) {
        timeoutId = setTimeout(timerExpired, wait);
        invokeFunc(time);
        return;
      }
    }

    if (timeoutId === null) {
      timeoutId = setTimeout(timerExpired, wait);
    }
  };

  debounced.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (maxTimeoutId !== null) {
      clearTimeout(maxTimeoutId);
      maxTimeoutId = null;
    }
    lastArgs = null;
    lastCallTime = null;
    lastInvokeTime = 0;
  };

  debounced.flush = (): void => {
    if (timeoutId !== null) {
      trailingEdge(Date.now());
    }
  };

  debounced.pending = (): boolean => {
    return timeoutId !== null;
  };

  return debounced;
}

// ============================================================================
// Throttle
// ============================================================================

export interface ThrottledFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

/**
 * Throttle a function - invokes at most once per wait period
 */
export function throttle<T extends AnyFunction>(
  fn: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): ThrottledFunction<T> {
  const { leading = true, trailing = true } = options;

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime = 0;

  const invoke = (): void => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = null;
      lastCallTime = Date.now();
    }
  };

  const throttled = (...args: Parameters<T>): void => {
    const now = Date.now();
    const remaining = wait - (now - lastCallTime);

    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (leading) {
        invoke();
      }
    } else if (timeoutId === null && trailing) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        invoke();
      }, remaining);
    }
  };

  throttled.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastCallTime = 0;
  };

  throttled.flush = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (lastArgs) {
      invoke();
    }
  };

  return throttled;
}

// ============================================================================
// Performance Observer
// ============================================================================

/**
 * Create a performance observer for Web Vitals
 */
export function observeWebVitals(
  options: PerformanceObserverOptions
): () => void {
  if (!isBrowser || !('PerformanceObserver' in window)) {
    return () => {};
  }

  const observers: PerformanceObserver[] = [];

  // First Contentful Paint
  if (options.onFCP) {
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcp = entries.find((e) => e.name === 'first-contentful-paint');
        if (fcp) {
          options.onFCP?.(fcp.startTime);
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      observers.push(fcpObserver);
    } catch {
      // Observer type not supported
    }
  }

  // Largest Contentful Paint
  if (options.onLCP) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          options.onLCP?.(lastEntry.startTime);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);
    } catch {
      // Observer type not supported
    }
  }

  // First Input Delay
  if (options.onFID) {
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstInput = entries[0] as PerformanceEventTiming | undefined;
        if (firstInput) {
          options.onFID?.(firstInput.processingStart - firstInput.startTime);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      observers.push(fidObserver);
    } catch {
      // Observer type not supported
    }
  }

  // Cumulative Layout Shift
  if (options.onCLS) {
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];

    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();

        for (const entry of entries) {
          // Only count layout shifts without recent input
          if (!(entry as LayoutShift).hadRecentInput) {
            const firstEntry = sessionEntries[0];
            const lastEntry = sessionEntries[sessionEntries.length - 1];

            // Start new session if gap > 1s or session > 5s
            if (
              sessionValue > 0 &&
              (entry.startTime - lastEntry.startTime > 1000 ||
                entry.startTime - firstEntry.startTime > 5000)
            ) {
              clsValue = Math.max(clsValue, sessionValue);
              sessionValue = (entry as LayoutShift).value;
              sessionEntries = [entry];
            } else {
              sessionValue += (entry as LayoutShift).value;
              sessionEntries.push(entry);
            }
          }
        }

        options.onCLS?.(Math.max(clsValue, sessionValue));
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);
    } catch {
      // Observer type not supported
    }
  }

  // Time to First Byte
  if (options.onTTFB) {
    try {
      const ttfbObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const navEntry = entries[0] as PerformanceNavigationTiming | undefined;
        if (navEntry) {
          options.onTTFB?.(navEntry.responseStart - navEntry.requestStart);
        }
      });
      ttfbObserver.observe({ type: 'navigation', buffered: true });
      observers.push(ttfbObserver);
    } catch {
      // Observer type not supported
    }
  }

  // Interaction to Next Paint
  if (options.onINP) {
    let inpValue = 0;

    try {
      const inpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceEventTiming[];

        for (const entry of entries) {
          if (entry.interactionId) {
            const duration = entry.duration;
            inpValue = Math.max(inpValue, duration);
          }
        }

        options.onINP?.(inpValue);
      });
      inpObserver.observe({ type: 'event', buffered: true });
      observers.push(inpObserver);
    } catch {
      // Observer type not supported
    }
  }

  // Return cleanup function
  return () => {
    observers.forEach((observer) => observer.disconnect());
  };
}

// ============================================================================
// Lazy Loading Helper
// ============================================================================

export interface LazyLoadOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Create a lazy loading observer for elements
 */
export function createLazyLoader(
  loadCallback: (element: Element) => void | Promise<void>,
  options: LazyLoadOptions = {}
): {
  observe: (element: Element) => void;
  unobserve: (element: Element) => void;
  disconnect: () => void;
} {
  if (!isBrowser || !('IntersectionObserver' in window)) {
    // Fallback: load immediately
    return {
      observe: (element) => {
        try {
          loadCallback(element);
          options.onLoad?.();
        } catch (error) {
          options.onError?.(error as Error);
        }
      },
      unobserve: () => {},
      disconnect: () => {},
    };
  }

  const loadedElements = new WeakSet<Element>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !loadedElements.has(entry.target)) {
          loadedElements.add(entry.target);
          observer.unobserve(entry.target);

          try {
            await loadCallback(entry.target);
            options.onLoad?.();
          } catch (error) {
            options.onError?.(error as Error);
          }
        }
      });
    },
    {
      root: options.root,
      rootMargin: options.rootMargin ?? '50px',
      threshold: options.threshold ?? 0,
    }
  );

  return {
    observe: (element) => observer.observe(element),
    unobserve: (element) => observer.unobserve(element),
    disconnect: () => observer.disconnect(),
  };
}

/**
 * Lazy load an image
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  srcset?: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

    if (srcset) {
      img.srcset = srcset;
    }
    img.src = src;
  });
}

// ============================================================================
// Idle Callback
// ============================================================================

/**
 * Run a callback when the browser is idle
 */
export function runWhenIdle(
  callback: () => void,
  options: { timeout?: number } = {}
): () => void {
  if (!isBrowser) {
    callback();
    return () => {};
  }

  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(callback, { timeout: options.timeout });
    return () => cancelIdleCallback(id);
  }

  // Fallback using setTimeout
  const id = setTimeout(callback, 1);
  return () => clearTimeout(id);
}

/**
 * Yield to the main thread to prevent long tasks
 */
export function yieldToMain(): Promise<void> {
  if (!isBrowser) return Promise.resolve();

  // Use scheduler.yield if available (Chrome 115+)
  if ('scheduler' in window && 'yield' in (window.scheduler as { yield?: () => Promise<void> })) {
    return (window.scheduler as { yield: () => Promise<void> }).yield();
  }

  // Fallback using setTimeout
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// ============================================================================
// Type Extensions
// ============================================================================

interface LayoutShift extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  interactionId?: number;
  duration: number;
}
