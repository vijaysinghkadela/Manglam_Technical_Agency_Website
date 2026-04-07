import { useState, useCallback, useEffect, useRef, RefObject } from 'react';

interface MagnetReturn {
  x: number;
  y: number;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

/**
 * Performance-optimized magnetic effect hook
 * Caches getBoundingClientRect() and updates only on resize
 * Compatible with all browsers: Chrome, Safari, Firefox, Edge, Opera
 */
export function useMagnet(
  ref: RefObject<HTMLElement | null>,
  maxPull: number = 12
): MagnetReturn {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rectCacheRef = useRef<{ rect: DOMRect | null; cx: number; cy: number }>({ 
    rect: null, 
    cx: 0, 
    cy: 0 
  });

  // Update cached rect on mount and resize
  useEffect(() => {
    const updateRect = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      rectCacheRef.current = {
        rect,
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    };

    updateRect();
    
    // Debounced resize handler
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(updateRect, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [ref]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !rectCacheRef.current.rect) return;
      
      const { cx, cy } = rectCacheRef.current;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        setPosition({
          x: Math.max(-maxPull, Math.min(maxPull, dx * strength * 0.3)),
          y: Math.max(-maxPull, Math.min(maxPull, dy * strength * 0.3)),
        });
      }
    },
    [ref, maxPull]
  );

  const onMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return { ...position, onMouseMove, onMouseLeave };
}
