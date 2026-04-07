/**
 * useMediaQuery Hook
 * Optimized media query hook with SSR safety and zero hydration mismatches.
 * 
 * Features:
 * - Uses useSyncExternalStore for React 18 concurrent rendering
 * - SSR-safe (returns false on server by default)
 * - No hydration warnings
 * - Performance optimized (no unnecessary re-renders)
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 */

'use client'
import { useSyncExternalStore } from 'react'

/**
 * Hook to subscribe to media query changes.
 * 
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean - true if media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Subscribe function: Sets up listener for media query changes
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {}
    
    const mq = window.matchMedia(query)
    
    // Modern API (all current browsers)
    if (mq.addEventListener) {
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    }
    
    // Legacy API fallback (Safari < 14)
    mq.addListener(callback)
    return () => mq.removeListener(callback)
  }

  // Snapshot function: Returns current state
  const getSnapshot = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  // Server snapshot: Always returns false (SSR-safe default)
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
