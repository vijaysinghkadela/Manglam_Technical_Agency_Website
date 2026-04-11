'use client';

import { useState, useEffect, useCallback } from 'react';

export function useCountUp(target: number, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);

  useEffect(() => { animate(); }, [animate]);

  return count;
}
