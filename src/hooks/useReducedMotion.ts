/**
 * useReducedMotion Hook
 * Respects user's motion preferences for accessibility.
 * 
 * Features:
 * - Detects prefers-reduced-motion media query
 * - Updates in real-time when preference changes
 * - SSR-safe (defaults to false on server)
 * - Performance optimized with useSyncExternalStore
 */

import { useSyncExternalStore } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Reduced Motion Store
// ─────────────────────────────────────────────────────────────────────────────

let mediaQuery: MediaQueryList | null = null
let cachedValue: boolean | null = null

function getMediaQuery(): MediaQueryList | null {
  if (typeof window === 'undefined') return null
  if (!mediaQuery) {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  }
  return mediaQuery
}

function subscribe(callback: () => void): () => void {
  const mq = getMediaQuery()
  if (!mq) return () => {}

  // Modern API
  if (mq.addEventListener) {
    mq.addEventListener('change', callback)
    return () => mq.removeEventListener('change', callback)
  }

  // Legacy API (Safari < 14)
  mq.addListener(callback)
  return () => mq.removeListener(callback)
}

function getSnapshot(): boolean {
  const mq = getMediaQuery()
  if (!mq) return false
  cachedValue = mq.matches
  return cachedValue
}

function getServerSnapshot(): boolean {
  // Default to false on server (assume animations are OK)
  return false
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook to detect if user prefers reduced motion.
 * 
 * @returns boolean - true if user prefers reduced motion
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion()
 * 
 * return (
 *   <motion.div
 *     animate={prefersReducedMotion ? {} : { scale: 1.1 }}
 *   />
 * )
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Non-hook version for use outside components.
 * Checks preference once (does not subscribe to changes).
 */
export function getPrefersReducedMotion(): boolean {
  if (cachedValue !== null) return cachedValue
  const mq = getMediaQuery()
  if (!mq) return false
  cachedValue = mq.matches
  return cachedValue
}

/**
 * Returns animation duration based on reduced motion preference.
 * 
 * @param normalDuration - Duration in seconds for normal mode
 * @param reducedDuration - Duration in seconds for reduced motion (default: 0.01)
 * 
 * @example
 * const duration = getMotionDuration(0.6)
 * // Returns 0.6 normally, 0.01 with reduced motion
 */
export function getMotionDuration(
  normalDuration: number,
  reducedDuration = 0.01
): number {
  return getPrefersReducedMotion() ? reducedDuration : normalDuration
}

/**
 * Returns animation config based on reduced motion preference.
 * Useful for Framer Motion variants.
 * 
 * @example
 * const variants = getMotionVariants(
 *   { opacity: 0, y: 20 }, // initial
 *   { opacity: 1, y: 0 }   // animate
 * )
 */
export function getMotionVariants<T extends { opacity?: number }>(
  initial: T,
  animate: T,
  reducedInitial?: Partial<T>,
  reducedAnimate?: Partial<T>
): { initial: T | Partial<T>; animate: T | Partial<T> } {
  const prefersReduced = getPrefersReducedMotion()

  if (prefersReduced) {
    return {
      initial: reducedInitial ?? ({ opacity: 0 } as Partial<T>),
      animate: reducedAnimate ?? ({ opacity: 1 } as Partial<T>),
    }
  }

  return { initial, animate }
}

// ─────────────────────────────────────────────────────────────────────────────
// Conditional Animation Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns empty object if reduced motion is preferred.
 * Useful for disabling animations entirely.
 * 
 * @example
 * <motion.div animate={skipIfReduced({ rotate: 360 })} />
 */
export function skipIfReduced<T extends object>(animation: T): T | Record<string, never> {
  return getPrefersReducedMotion() ? {} : animation
}

/**
 * Returns transition config optimized for reduced motion.
 * 
 * @example
 * <motion.div transition={getTransition({ duration: 0.6 })} />
 */
export function getTransition(
  normalTransition: { duration?: number; delay?: number; ease?: string | number[] },
  reducedTransition?: { duration?: number; delay?: number }
): { duration: number; delay?: number; ease?: string | number[] } {
  const prefersReduced = getPrefersReducedMotion()

  if (prefersReduced) {
    return {
      duration: reducedTransition?.duration ?? 0.01,
      delay: reducedTransition?.delay ?? 0,
    }
  }

  return {
    duration: normalTransition.duration ?? 0.3,
    delay: normalTransition.delay,
    ease: normalTransition.ease,
  }
}

export default useReducedMotion
