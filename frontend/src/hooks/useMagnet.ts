import { useState, useCallback, RefObject } from 'react';

interface MagnetReturn {
  x: number;
  y: number;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

export function useMagnet(
  ref: RefObject<HTMLElement | null>,
  maxPull: number = 12
): MagnetReturn {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
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
