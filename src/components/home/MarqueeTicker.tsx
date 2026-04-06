'use client'
import { memo, useMemo } from 'react'

const ITEMS = [
  'WEB DEVELOPMENT', 'SOCIAL MEDIA MARKETING', 'CYBERSECURITY',
  'AI AUTOMATION', 'SAAS DEVELOPMENT', 'DATA PROCESSING',
  'BRANDING & IDENTITY', 'CONTENT CREATION', 'MSME REGISTERED (UDYAM)',
]

// Memoized item component to prevent re-renders
const MarqueeItem = memo(function MarqueeItem({ item, index }: { item: string; index: number }) {
  return (
    <span
      className="flex items-center gap-4 font-mono uppercase mr-6"
      style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.2em' }}
    >
      {item}
      <span style={{ color: 'var(--color-violet)', fontSize: '12px', lineHeight: 1, opacity: 0.7 }}>✦</span>
    </span>
  )
})

export const MarqueeTicker = memo(function MarqueeTicker() {
  // Triple the items for seamless loop - memoized to prevent re-creation
  const repeated = useMemo(() => [...ITEMS, ...ITEMS, ...ITEMS], [])

  // Memoized container styles
  const containerStyle = useMemo(() => ({
    backgroundColor: 'var(--color-card)',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
  }), [])

  return (
    <div
      className="w-full h-10 flex items-center overflow-hidden marquee-mask"
      style={containerStyle}
    >
      {/* 
        GPU-optimized animation:
        - Uses CSS animation (compositor-driven)
        - backface-visibility: hidden (promotes to GPU layer)
        - transform: translateZ(0) (ensures GPU acceleration)
        - Pauses on touch devices via CSS media query
      */}
      <div className="flex whitespace-nowrap animate-marquee-left">
        {repeated.map((item, i) => (
          <MarqueeItem key={`${item}-${i}`} item={item} index={i} />
        ))}
      </div>
    </div>
  )
})

// Default export for dynamic imports
export default MarqueeTicker
