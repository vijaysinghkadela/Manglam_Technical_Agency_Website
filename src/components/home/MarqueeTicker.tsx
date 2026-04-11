'use client'
import { memo, useMemo } from 'react'
import { BRAND, ANIMATION, TYPOGRAPHY, RADIUS } from '@/lib/design-system'

const ITEMS = [
  'WEB DEVELOPMENT', 'SOCIAL MEDIA MARKETING', 'CYBERSECURITY',
  'AI AUTOMATION', 'SAAS DEVELOPMENT', 'DATA PROCESSING',
  'BRANDING & IDENTITY', 'CONTENT CREATION', 'MSME REGISTERED (UDYAM)',
]

// Memoized item component to prevent re-renders
const MarqueeItem = memo(function MarqueeItem({ item }: { item: string }) {
  return (
    <span
      className="flex items-center gap-3 font-mono uppercase mr-4 rounded-full border px-3.5 py-2.5 transition-all duration-300 hover:scale-105"
      style={{
        fontSize: TYPOGRAPHY.micro,
        color: 'var(--color-muted)',
        letterSpacing: '0.2em',
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-card)',
        borderRadius: RADIUS.full,
        transition: `all ${ANIMATION.duration.fast}s cubic-bezier(${ANIMATION.ease.join(',')})`,
      }}
    >
      {item}
      <span style={{ 
        color: BRAND.primary, 
        fontSize: '12px', 
        lineHeight: 1, 
        opacity: 0.7,
        transition: `opacity ${ANIMATION.duration.fast}s ease`
      }}>✦</span>
    </span>
  )
})

export const MarqueeTicker = memo(function MarqueeTicker() {
  // Triple the items for seamless loop - memoized to prevent re-creation
  const repeated = useMemo(() => [...ITEMS, ...ITEMS, ...ITEMS], [])

  // Memoized container styles with design system tokens
  const containerStyle = useMemo(() => ({
    backgroundColor: 'var(--color-card)',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
    padding: `${TYPOGRAPHY.bodySm} 0`,
  }), [])

  return (
    <div
      className="w-full min-h-14 flex items-center overflow-hidden marquee-mask"
      style={containerStyle}
      role="region"
      aria-label="Services marquee"
    >
      {/*
        GPU-optimized animation:
        - Uses CSS animation (compositor-driven)
        - backface-visibility: hidden (promotes to GPU layer)
        - transform: translateZ(0) (ensures GPU acceleration)
        - Pauses on touch devices via CSS media query
      */}
      <div 
        className="flex whitespace-nowrap animate-marquee-left gap-2 py-1"
        style={{
          willChange: 'transform',
        }}
      >
        {repeated.map((item, i) => (
          <MarqueeItem key={`${item}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
})

// Default export for dynamic imports
export default MarqueeTicker
