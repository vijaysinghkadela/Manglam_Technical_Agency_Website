'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Performance-optimized mouse position hook
 * Uses RAF throttling to prevent 100+ renders/second
 * Compatible with all browsers: Chrome, Safari, Firefox, Edge, Opera
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Cancel previous RAF if still pending (throttling)
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        rafIdRef.current = null;
      });
    };

    window.addEventListener('mousemove', handler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handler);
      // Cleanup: cancel pending RAF on unmount
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return position;
}
