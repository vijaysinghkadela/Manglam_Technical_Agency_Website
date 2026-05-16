'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Debounced resize handler - prevents expensive recalculations
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    const updateDimensions = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (trackRef.current) {
          setTrackWidth(trackRef.current.scrollWidth);
        }
        setViewportWidth(window.innerWidth);
        setIsMobile(window.innerWidth < 1024);
      }, 200); // 200ms debounce
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const scrollDistance = Math.max(0, trackWidth - viewportWidth);
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // On mobile, render as vertical stack
  if (isMobile) {
    return (
      <div ref={sectionRef} className={className} style={{ position: 'relative' }}>
        <div className="flex flex-col gap-6 px-4">
          {children}
        </div>
      </div>
    );
  }

  // Desktop: pinned horizontal scroll
  const scrollHeight = scrollDistance + viewportWidth;

  return (
    <div ref={sectionRef} style={{ height: scrollHeight }} className={className}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={trackRef}
          className="flex gap-0"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
