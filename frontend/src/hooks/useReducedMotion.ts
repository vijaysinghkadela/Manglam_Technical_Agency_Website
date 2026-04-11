'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect user's reduced motion preference
 * SSR-safe - returns false on server, then updates on client
 * 
 * @returns boolean indicating if reduced motion is preferred
 * 
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *   
 *   return (
 *     <motion.div
 *       animate={{ x: 100 }}
 *       transition={{ 
 *         duration: prefersReducedMotion ? 0 : 0.5 
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  // Default to false for SSR
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Memoized handler for media query changes
  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setPrefersReducedMotion(event.matches);
  }, []);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;

    // Create media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [handleChange]);

  return prefersReducedMotion;
}

/**
 * Alternative hook that returns animation duration based on motion preference
 * Useful for easily adjusting animation timings
 * 
 * @param normalDuration - Duration when motion is allowed
 * @param reducedDuration - Duration when reduced motion is preferred (default: 0)
 * @returns The appropriate duration based on user preference
 * 
 * @example
 * ```tsx
 * function FadeIn({ children }) {
 *   const duration = useMotionDuration(0.5, 0.01);
 *   
 *   return (
 *     <motion.div
 *       initial={{ opacity: 0 }}
 *       animate={{ opacity: 1 }}
 *       transition={{ duration }}
 *     >
 *       {children}
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useMotionDuration(
  normalDuration: number,
  reducedDuration: number = 0
): number {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? reducedDuration : normalDuration;
}

/**
 * Hook that returns motion-safe animation variants
 * Returns simplified variants when reduced motion is preferred
 * 
 * @param variants - Object with normal animation variants
 * @param reducedVariants - Object with reduced motion variants (optional)
 * @returns The appropriate variants based on user preference
 * 
 * @example
 * ```tsx
 * const normalVariants = {
 *   hidden: { opacity: 0, y: 20 },
 *   visible: { opacity: 1, y: 0 }
 * };
 * 
 * const reducedVariants = {
 *   hidden: { opacity: 0 },
 *   visible: { opacity: 1 }
 * };
 * 
 * function AnimatedList() {
 *   const variants = useMotionSafeVariants(normalVariants, reducedVariants);
 *   
 *   return (
 *     <motion.ul variants={variants} initial="hidden" animate="visible">
 *       {items.map(item => <motion.li key={item.id} variants={variants} />)}
 *     </motion.ul>
 *   );
 * }
 * ```
 */
export function useMotionSafeVariants<T extends Record<string, unknown>>(
  variants: T,
  reducedVariants?: Partial<T>
): T {
  const prefersReducedMotion = useReducedMotion();

  if (!prefersReducedMotion) {
    return variants;
  }

  // If reduced variants provided, merge with original
  if (reducedVariants) {
    return { ...variants, ...reducedVariants };
  }

  // Default: strip transform properties but keep opacity
  const safeVariants = {} as T;

  for (const key in variants) {
    const variant = variants[key];
    if (typeof variant === 'object' && variant !== null) {
      const safeVariant: Record<string, unknown> = {};
      for (const prop in variant as Record<string, unknown>) {
        // Keep opacity, remove transform-related properties
        if (prop === 'opacity' || prop === 'visibility') {
          safeVariant[prop] = (variant as Record<string, unknown>)[prop];
        }
      }
      safeVariants[key] = safeVariant as T[typeof key];
    } else {
      safeVariants[key] = variant;
    }
  }

  return safeVariants;
}

/**
 * Hook to check if animations should be disabled entirely
 * Combines reduced motion preference with other factors
 * 
 * @returns boolean indicating if animations should be disabled
 */
export function useShouldDisableAnimations(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for save-data header / data saver mode
    // @ts-expect-error - connection is not in all browsers
    const connection = navigator.connection;
    if (connection) {
      setIsSlowConnection(
        connection.saveData === true ||
        connection.effectiveType === '2g' ||
        connection.effectiveType === 'slow-2g'
      );
    }

    // Check for low battery (if Battery API is available)
    if ('getBattery' in navigator) {
      (navigator.getBattery as () => Promise<{ charging: boolean; level: number }>)()
        .then((battery) => {
          // Consider low power if not charging and below 20%
          setIsLowPowerMode(!battery.charging && battery.level < 0.2);
        })
        .catch(() => {
          // Battery API not available or permission denied
        });
    }
  }, []);

  return prefersReducedMotion || isLowPowerMode || isSlowConnection;
}

export default useReducedMotion;
