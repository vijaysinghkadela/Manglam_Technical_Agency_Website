/**
 * Performance Utilities for MTA Website
 * Browser-optimized throttling, debouncing, and RAF utilities
 */

/**
 * Throttles a function using requestAnimationFrame
 * Perfect for mousemove, scroll, resize handlers
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(
  callback: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function throttled(...args: Parameters<T>) {
    if (rafId !== null) return;
    
    rafId = requestAnimationFrame(() => {
      callback(...args);
      rafId = null;
    });
  };
}

/**
 * Debounces a function with configurable delay
 * Perfect for resize handlers that trigger expensive calculations
 */
export function debounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 200
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Cancels RAF and clears timeout - useful for cleanup
 */
export function cancelAnimations(rafId: number | null, timeoutId: ReturnType<typeof setTimeout> | null) {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
}

/**
 * Safe RAF wrapper that returns cleanup function
 */
export function createRAFLoop(callback: (timestamp: number) => boolean | void): () => void {
  let rafId: number | null = null;
  let isActive = true;

  const loop = (timestamp: number) => {
    if (!isActive) return;
    
    const shouldContinue = callback(timestamp);
    
    if (shouldContinue !== false) {
      rafId = requestAnimationFrame(loop);
    }
  };

  rafId = requestAnimationFrame(loop);

  // Return cleanup function
  return () => {
    isActive = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

/**
 * Batches multiple state updates to reduce renders
 * Uses RAF to batch updates within the same frame
 */
export function batchRAF<T>(callback: (value: T) => void): (value: T) => void {
  let rafId: number | null = null;
  let pendingValue: T | undefined;

  return (value: T) => {
    pendingValue = value;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (pendingValue !== undefined) {
          callback(pendingValue);
        }
        rafId = null;
        pendingValue = undefined;
      });
    }
  };
}
