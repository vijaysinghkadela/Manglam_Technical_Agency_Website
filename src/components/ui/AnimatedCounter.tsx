'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, className }: AnimatedCounterProps) {
  const reducedMotion = useReducedMotion();
  // Initialize to end value if reduced motion is preferred
  const [count, setCount] = useState(() => reducedMotion ? end : 0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  // Intersection observer for animation trigger - runs once
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Trigger animation when visible (only if not reduced motion)
  useEffect(() => {
    if (!isVisible || reducedMotion) return;

    let rafId: number;

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      startTimeRef.current = null;
    };
  }, [isVisible, end, duration, reducedMotion]);

  // Update count when end changes in reduced motion mode
  // Using flushSync pattern to avoid cascading renders
  useEffect(() => {
    if (reducedMotion) {
      // Schedule update in next tick to avoid sync setState in effect
      const timeoutId = setTimeout(() => {
        setCount(end);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [reducedMotion, end]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
