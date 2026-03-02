'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
}

export default function ScrambleCounter({
  target,
  suffix = '',
  duration = 1.5,
  className = '',
  suffixClassName = '',
}: ScrambleCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState('0');
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const digits = '0123456789';
    const targetStr = String(target);
    const totalFrames = Math.round((duration * 1000) / 50);
    const landingStart = Math.round(totalFrames * 0.7);
    let frame = 0;

    const interval = setInterval(() => {
      frame++;

      if (frame >= totalFrames) {
        setDisplay(targetStr);
        clearInterval(interval);
        return;
      }

      let result = '';
      for (let i = 0; i < targetStr.length; i++) {
        const charLandFrame = landingStart + (i * (totalFrames - landingStart)) / targetStr.length;
        if (frame >= charLandFrame) {
          result += targetStr[i];
        } else {
          result += digits[Math.floor(Math.random() * 10)];
        }
      }
      setDisplay(result);
    }, 50);

    return () => clearInterval(interval);
  }, [target, duration]);

  useEffect(() => {
    if (isInView) {
      const cleanup = scramble();
      return cleanup;
    }
  }, [isInView, scramble]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
}
