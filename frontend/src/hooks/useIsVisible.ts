'use client';

import { useState, useEffect, useRef, RefObject, useCallback } from 'react';

/**
 * Options for the Intersection Observer
 */
export interface UseIsVisibleOptions {
  /** Element that is used as the viewport for checking visibility */
  root?: Element | null;
  /** Margin around the root element */
  rootMargin?: string;
  /** Percentage of target visibility to trigger (0-1 or array) */
  threshold?: number | number[];
  /** Only trigger once when element becomes visible */
  triggerOnce?: boolean;
  /** Initial visibility state (useful for SSR) */
  initialIsVisible?: boolean;
  /** Callback when visibility changes */
  onChange?: (isVisible: boolean, entry?: IntersectionObserverEntry) => void;
}

/**
 * Return type for useIsVisible hook
 */
export interface UseIsVisibleReturn<T extends Element> {
  /** Ref to attach to the target element */
  ref: RefObject<T | null>;
  /** Whether the element is currently visible */
  isVisible: boolean;
  /** The latest intersection observer entry */
  entry: IntersectionObserverEntry | null;
}

/**
 * Hook to detect if an element is visible in the viewport
 * Uses Intersection Observer API with SSR safety
 * 
 * @param options - Configuration options
 * @returns Object with ref, isVisible boolean, and entry
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function LazyImage() {
 *   const { ref, isVisible } = useIsVisible<HTMLDivElement>();
 *   
 *   return (
 *     <div ref={ref}>
 *       {isVisible && <img src="/large-image.jpg" alt="Lazy loaded" />}
 *     </div>
 *   );
 * }
 * 
 * // With options
 * function AnimatedSection() {
 *   const { ref, isVisible } = useIsVisible<HTMLElement>({
 *     threshold: 0.5,
 *     triggerOnce: true,
 *     rootMargin: '-100px',
 *   });
 *   
 *   return (
 *     <section 
 *       ref={ref}
 *       className={isVisible ? 'animate-in' : 'opacity-0'}
 *     >
 *       Content
 *     </section>
 *   );
 * }
 * ```
 */
export function useIsVisible<T extends Element = HTMLDivElement>(
  options: UseIsVisibleOptions = {}
): UseIsVisibleReturn<T> {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    triggerOnce = false,
    initialIsVisible = false,
    onChange,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  
  // Track if we've already triggered (for triggerOnce)
  const hasTriggered = useRef(false);

  // Memoize the callback
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [observerEntry] = entries;
      
      if (!observerEntry) return;

      setEntry(observerEntry);

      const isIntersecting = observerEntry.isIntersecting;

      // If triggerOnce and already triggered, don't update
      if (triggerOnce && hasTriggered.current) return;

      if (isIntersecting) {
        hasTriggered.current = true;
      }

      setIsVisible(isIntersecting);
      onChange?.(isIntersecting, observerEntry);
    },
    [triggerOnce, onChange]
  );

  useEffect(() => {
    const element = ref.current;

    // Skip if no element or not in browser
    if (!element || typeof window === 'undefined') return;

    // Skip if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: assume visible
      setIsVisible(true);
      onChange?.(true);
      return;
    }

    // Skip if triggerOnce and already triggered
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce, handleIntersection]);

  return { ref, isVisible, entry };
}

/**
 * Simpler version that takes an existing ref
 * Useful when you already have a ref from another hook
 * 
 * @param targetRef - Existing ref to observe
 * @param options - Configuration options
 * @returns isVisible boolean and entry
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const { isVisible } = useIsVisibleRef(containerRef, { threshold: 0.5 });
 *   
 *   return <div ref={containerRef}>{isVisible ? 'Visible!' : 'Hidden'}</div>;
 * }
 * ```
 */
export function useIsVisibleRef<T extends Element>(
  targetRef: RefObject<T | null>,
  options: Omit<UseIsVisibleOptions, 'ref'> = {}
): { isVisible: boolean; entry: IntersectionObserverEntry | null } {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    triggerOnce = false,
    initialIsVisible = false,
    onChange,
  } = options;

  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [observerEntry] = entries;
      
      if (!observerEntry) return;

      setEntry(observerEntry);

      const isIntersecting = observerEntry.isIntersecting;

      if (triggerOnce && hasTriggered.current) return;

      if (isIntersecting) {
        hasTriggered.current = true;
      }

      setIsVisible(isIntersecting);
      onChange?.(isIntersecting, observerEntry);
    },
    [triggerOnce, onChange]
  );

  useEffect(() => {
    const element = targetRef.current;

    if (!element || typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      onChange?.(true);
      return;
    }

    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, root, rootMargin, threshold, triggerOnce, handleIntersection, onChange]);

  return { isVisible, entry };
}

/**
 * Hook that tracks visibility ratio (how much of the element is visible)
 * Useful for parallax effects or progress indicators
 * 
 * @param options - Configuration options
 * @returns Object with ref and visibility ratio (0-1)
 * 
 * @example
 * ```tsx
 * function ParallaxSection() {
 *   const { ref, ratio } = useVisibilityRatio<HTMLDivElement>();
 *   
 *   return (
 *     <div 
 *       ref={ref}
 *       style={{ 
 *         transform: `translateY(${(1 - ratio) * 50}px)`,
 *         opacity: ratio 
 *       }}
 *     >
 *       Parallax content
 *     </div>
 *   );
 * }
 * ```
 */
export function useVisibilityRatio<T extends Element = HTMLDivElement>(
  options: Omit<UseIsVisibleOptions, 'threshold' | 'triggerOnce'> & {
    steps?: number;
  } = {}
): { ref: RefObject<T | null>; ratio: number } {
  const { steps = 20, ...restOptions } = options;

  const ref = useRef<T | null>(null);
  const [ratio, setRatio] = useState(0);

  // Create threshold array from 0 to 1
  const thresholds = Array.from({ length: steps + 1 }, (_, i) => i / steps);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setRatio(1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          setRatio(entry.intersectionRatio);
        }
      },
      {
        root: restOptions.root,
        rootMargin: restOptions.rootMargin ?? '0px',
        threshold: thresholds,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [restOptions.root, restOptions.rootMargin, thresholds]);

  return { ref, ratio };
}

export default useIsVisible;
