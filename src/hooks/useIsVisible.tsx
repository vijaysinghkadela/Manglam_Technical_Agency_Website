/**
 * useIsVisible Hook
 * Intersection Observer-based visibility detection for lazy loading and animations.
 * 
 * Features:
 * - Lazy loads content only when in viewport
 * - Configurable root margin for pre-loading
 * - Once mode (stops observing after first intersection)
 * - Threshold support for partial visibility
 * - SSR-safe
 */

import React, { useEffect, useRef, useState, useCallback, RefObject } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface UseIsVisibleOptions {
  /**
   * Root margin for triggering intersection earlier/later.
   * Use positive values to pre-load content before it enters viewport.
   * @default "100px 0px"
   */
  rootMargin?: string

  /**
   * Visibility threshold (0-1). 0 = any pixel visible, 1 = fully visible.
   * @default 0
   */
  threshold?: number | number[]

  /**
   * Stop observing after first intersection.
   * Set to true for one-time animations.
   * @default false
   */
  once?: boolean

  /**
   * Initial visibility state (for SSR).
   * @default false
   */
  initialVisible?: boolean

  /**
   * Disable observation entirely.
   * @default false
   */
  disabled?: boolean
}

export interface UseIsVisibleReturn {
  ref: RefObject<HTMLElement | null>
  isVisible: boolean
  hasBeenVisible: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook to detect when an element is visible in the viewport.
 * 
 * @param options - Configuration options
 * @returns Object with ref to attach, visibility state, and has-been-visible flag
 * 
 * @example
 * // Basic usage
 * const { ref, isVisible } = useIsVisible()
 * 
 * return (
 *   <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>
 *     Content
 *   </div>
 * )
 * 
 * @example
 * // One-time animation
 * const { ref, hasBeenVisible } = useIsVisible({ once: true })
 * 
 * return (
 *   <motion.div
 *     ref={ref}
 *     animate={hasBeenVisible ? { opacity: 1 } : { opacity: 0 }}
 *   />
 * )
 * 
 * @example
 * // Pre-load images
 * const { ref, isVisible } = useIsVisible({ rootMargin: '200px' })
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible && <img src={imageSrc} />}
 *   </div>
 * )
 */
export function useIsVisible(options: UseIsVisibleOptions = {}): UseIsVisibleReturn {
  const {
    rootMargin = '100px 0px',
    threshold = 0,
    once = false,
    initialVisible = false,
    disabled = false,
  } = options

  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(initialVisible)
  const [hasBeenVisible, setHasBeenVisible] = useState(initialVisible)

  useEffect(() => {
    const element = ref.current

    // Skip if disabled, no element, or SSR
    if (disabled || !element || typeof IntersectionObserver === 'undefined') {
      return
    }

    // Skip if already visible and once mode
    if (once && hasBeenVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting

        setIsVisible(visible)

        if (visible) {
          setHasBeenVisible(true)

          // Disconnect if once mode
          if (once) {
            observer.disconnect()
          }
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold, once, disabled, hasBeenVisible])

  return { ref, isVisible, hasBeenVisible }
}

// ─────────────────────────────────────────────────────────────────────────────
// Alternative: useIsVisible with external ref
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Version that accepts an external ref.
 * Useful when you need to use the same ref for other purposes.
 * 
 * @example
 * const containerRef = useRef<HTMLDivElement>(null)
 * const { isVisible } = useIsVisibleRef(containerRef)
 */
export function useIsVisibleRef<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: Omit<UseIsVisibleOptions, 'ref'> = {}
): { isVisible: boolean; hasBeenVisible: boolean } {
  const {
    rootMargin = '100px 0px',
    threshold = 0,
    once = false,
    initialVisible = false,
    disabled = false,
  } = options

  const [isVisible, setIsVisible] = useState(initialVisible)
  const [hasBeenVisible, setHasBeenVisible] = useState(initialVisible)

  useEffect(() => {
    const element = ref.current

    if (disabled || !element || typeof IntersectionObserver === 'undefined') {
      return
    }

    if (once && hasBeenVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)

        if (visible) {
          setHasBeenVisible(true)
          if (once) {
            observer.disconnect()
          }
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, rootMargin, threshold, once, disabled, hasBeenVisible])

  return { isVisible, hasBeenVisible }
}

// ─────────────────────────────────────────────────────────────────────────────
// Callback version for imperative use
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Version with callback instead of state.
 * Better for performance-critical use cases.
 * 
 * @example
 * const ref = useIsVisibleCallback((isVisible) => {
 *   if (isVisible) {
 *     videoRef.current?.play()
 *   } else {
 *     videoRef.current?.pause()
 *   }
 * })
 */
export function useIsVisibleCallback(
  callback: (isVisible: boolean) => void,
  options: UseIsVisibleOptions = {}
): RefObject<HTMLElement | null> {
  const {
    rootMargin = '100px 0px',
    threshold = 0,
    once = false,
    disabled = false,
  } = options

  const ref = useRef<HTMLElement | null>(null)
  const callbackRef = useRef(callback)

  // Update callback ref in useEffect to avoid ref access during render
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const element = ref.current

    if (disabled || !element || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        callbackRef.current(entry.isIntersecting)

        if (once && entry.isIntersecting) {
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold, once, disabled])

  return ref
}

// ─────────────────────────────────────────────────────────────────────────────
// Lazy Component Wrapper
// ─────────────────────────────────────────────────────────────────────────────

interface LazyVisibleProps {
  /**
   * Children to render when visible.
   */
  children: React.ReactNode

  /**
   * Placeholder to show before content is visible.
   */
  placeholder?: React.ReactNode

  /**
   * Root margin for pre-loading.
   */
  rootMargin?: string

  /**
   * CSS class for the wrapper div.
   */
  className?: string

  /**
   * Minimum height to prevent layout shift.
   */
  minHeight?: number | string

  /**
   * Keep rendered after first visibility (default true).
   */
  keepMounted?: boolean
}

/**
 * Component wrapper that only renders children when visible.
 * Useful for heavy components below the fold.
 * 
 * @example
 * <LazyVisible placeholder={<Skeleton />} minHeight={400}>
 *   <HeavyDataGrid />
 * </LazyVisible>
 */
export function LazyVisible({
  children,
  placeholder = null,
  rootMargin = '200px 0px',
  className = '',
  minHeight,
  keepMounted = true,
}: LazyVisibleProps): React.ReactElement {
  const { ref, isVisible, hasBeenVisible } = useIsVisible({
    rootMargin,
    once: keepMounted,
  })

  const shouldRender = keepMounted ? hasBeenVisible : isVisible

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      style={{ minHeight: shouldRender ? undefined : minHeight }}
    >
      {shouldRender ? children : placeholder}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Stagger Animation Helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook for staggered visibility animations.
 * Each item animates with a delay based on its index.
 * 
 * @example
 * const items = ['a', 'b', 'c']
 * const { containerRef, getItemProps } = useStaggeredVisibility()
 * 
 * return (
 *   <div ref={containerRef}>
 *     {items.map((item, i) => (
 *       <motion.div key={item} {...getItemProps(i)}>
 *         {item}
 *       </motion.div>
 *     ))}
 *   </div>
 * )
 */
export function useStaggeredVisibility(
  options: UseIsVisibleOptions & { staggerDelay?: number } = {}
): {
  containerRef: RefObject<HTMLElement | null>
  isVisible: boolean
  getItemProps: (index: number) => { style: { transitionDelay: string }; 'data-visible': boolean }
} {
  const { staggerDelay = 0.05, ...visibilityOptions } = options
  const { ref, isVisible } = useIsVisible(visibilityOptions)

  const getItemProps = useCallback(
    (index: number) => ({
      style: { transitionDelay: `${index * staggerDelay}s` },
      'data-visible': isVisible,
    }),
    [isVisible, staggerDelay]
  )

  return {
    containerRef: ref,
    isVisible,
    getItemProps,
  }
}

export default useIsVisible
