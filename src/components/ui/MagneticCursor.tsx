'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'pointer' | 'text' | 'link';

export default function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isPointerFine, setIsPointerFine] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mq.matches);
    setMounted(true);

    if (!mq.matches) return;

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Observe data-cursor attributes
    const observer = new MutationObserver(() => {
      const hovered = document.querySelector(':hover[data-cursor]') as HTMLElement | null;
      if (hovered) {
        setCursorState((hovered.dataset.cursor as CursorState) || 'default');
      } else {
        setCursorState('default');
      }
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['data-cursor'] });

    // Also listen for mouseover to catch cursor states
    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (el) {
        setCursorState((el.dataset.cursor as CursorState) || 'default');
      } else {
        setCursorState('default');
      }
    };
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      observer.disconnect();
    };
  }, [onMouseMove]);

  if (!mounted || !isPointerFine) return null;

  const ringSize = cursorState === 'pointer' ? 20 : cursorState === 'link' ? 50 : cursorState === 'text' ? 4 : 40;
  const ringOpacity = cursorState === 'pointer' ? 0.8 : 0.4;
  const dotVisible = cursorState !== 'pointer' && cursorState !== 'text';

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border border-white"
          animate={{
            scale: cursorState === 'pointer' ? 0.5 : 1,
            opacity: ringOpacity,
            backgroundColor: cursorState === 'pointer' ? 'rgba(124,58,237,0.6)' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      </motion.div>

      {/* Inner dot */}
      {dotVisible && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] pointer-events-none"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </motion.div>
      )}
    </>
  );
}
