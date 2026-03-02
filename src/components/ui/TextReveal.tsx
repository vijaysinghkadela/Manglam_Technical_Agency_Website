'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words = useMemo(() => children.split(' '), [children]);

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'top' }}
        >
          <motion.span
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
