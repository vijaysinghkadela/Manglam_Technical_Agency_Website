'use client';

import { useRef, useState, ReactNode, useCallback } from 'react';
import { cn } from '@/lib/cn';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(124,58,237,0.06)',
  spotlightSize = 300,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setSpotlight({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 1,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent)`,
        }}
      />
      {children}
    </div>
  );
}
