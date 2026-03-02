'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  maxPull?: number;
  onClick?: () => void;
  'data-cursor'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  maxPull = 12,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
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
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={props['data-cursor'] || 'pointer'}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
