'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BRAND, ANIMATION } from '@/lib/design-system'

const AUTO_ADVANCE_MS = 5000
const SWIPE_THRESHOLD = 50

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const isHovered = useRef(false)
  const current = testimonials[index]
  const isMobile = useMediaQuery('(max-width: 767px)')
  const containerRef = useRef<HTMLDivElement>(null)

  // Swipe gesture support for mobile
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5])
  const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5])

  const prev = useCallback(() => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1)), [])
  const next = useCallback(() => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1)), [])

  // Handle swipe end
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      prev()
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      next()
    }
  }, [prev, next])

  // Keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [prev, next])

  // Auto-advance (pauses on hover/touch)
  useEffect(() => {
    const id = setInterval(() => {
      if (!isHovered.current) next()
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [next])

  return (
    <section
      style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(64px, 10vw, 112px) 0' }}
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
    >
      <div className="container-site flex flex-col items-center">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: ANIMATION.ease }}
        className="text-center mb-10 sm:mb-12 lg:mb-20 px-4"
      >
        <span
          className="font-mono uppercase block mb-2 sm:mb-3"
          style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: BRAND.primary, letterSpacing: '0.22em' }}
        >
          TESTIMONIALS
        </span>
        <h2
          className="font-display font-black tracking-normal leading-[0.92]"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', color: 'var(--color-foreground)' }}
        >
          Client Voices
        </h2>
      </motion.div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="w-full max-w-4xl mx-auto flex flex-col items-center px-0 sm:px-0"
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false }}
        onTouchStart={() => { isHovered.current = true }}
        onTouchEnd={() => { setTimeout(() => { isHovered.current = false }, 1000) }}
      >

        {/* Decorative quote — animated spring scale */}
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
          className="font-display font-black leading-none select-none mb-4 sm:mb-6 lg:mb-8"
          style={{ fontSize: 'clamp(48px, 10vw, 120px)', color: 'rgba(107,26,26,0.16)', lineHeight: 1 }}
          aria-hidden
        >
          &ldquo;
        </motion.span>

        {/* Animated testimonial with swipe */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x, opacity, rotate, touchAction: 'pan-y' }}
            className="flex flex-col items-center text-center cursor-grab active:cursor-grabbing touch-manipulation rounded-[28px] border border-border bg-card px-5 sm:px-8 py-9 sm:py-12 shadow-[0_18px_70px_rgba(0,0,0,0.12)] w-full"
          >
            <blockquote
              className="font-display font-bold leading-snug italic mb-8 sm:mb-10 select-text"
              style={{
                fontSize: 'clamp(1rem, 4vw, 1.75rem)',
                color: 'var(--color-foreground)',
                maxWidth: '640px',
                lineHeight: 1.6,
              }}
            >
              {current.quote}
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="w-10 sm:w-12 h-10 sm:h-12 shrink-0 flex items-center justify-center text-xs sm:text-sm font-display font-bold"
                style={{
                  backgroundColor: 'rgba(107,26,26,0.08)',
                  border: '1px solid rgba(107,26,26,0.24)',
                  color: BRAND.primary,
                }}
              >
                {current.initials}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  {current.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {current.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 grid grid-cols-[auto_auto_auto] items-center gap-4">
            <button
              onClick={prev}
              className="h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-200 hover:border-[#6B1A1A]/50 hover:bg-[rgba(107,26,26,0.08)]"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              aria-label="Previous testimonial"
              data-cursor="pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? '24px' : '6px',
                    backgroundColor: i === index ? BRAND.primary : 'var(--color-border)',
                  }}
                  data-cursor="pointer"
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-200 hover:border-[#6B1A1A]/50 hover:bg-[rgba(107,26,26,0.08)]"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              aria-label="Next testimonial"
              data-cursor="pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        {/* Counter */}
        <span className="mt-4 text-xs font-mono" style={{ color: 'var(--color-dead)' }}>
          {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </span>

        {/* Swipe hint - mobile only */}
        {isMobile && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-xs font-mono flex items-center gap-2"
            style={{ color: 'var(--color-dead)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 5l-7 7 7 7" />
            </svg>
            Swipe to navigate
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 19l7-7-7-7" />
            </svg>
          </motion.span>
        )}

      </div>
    </div>
  </section>
)
}

