'use client';

import { useState, useEffect, useRef } from 'react';

interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
}

/**
 * Performance-optimized scroll position hook
 * Combines state updates and uses RAF throttling
 * Compatible with all browsers: Chrome, Safari, Firefox, Edge, Opera
 */
export function useScrollPosition() {
  const [scrollState, setScrollState] = useState<ScrollState>({ 
    scrollY: 0, 
    isScrolled: false 
  });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous RAF if still pending (throttling)
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        // Combine both state updates into single setState call
        setScrollState({
          scrollY: y,
          isScrolled: y > 50
        });
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Cleanup: cancel pending RAF on unmount
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return scrollState;
}
