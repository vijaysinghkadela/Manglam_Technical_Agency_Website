'use client'
import { memo, useMemo } from 'react'

const ITEMS = [
  'WEB DEVELOPMENT', 'SOCIAL MEDIA MARKETING', 'CYBERSECURITY',
  'AI AUTOMATION', 'SAAS DEVELOPMENT', 'DATA PROCESSING',
  'BRANDING & IDENTITY', 'CONTENT CREATION', 'MSME PROFILE',
]

const ITEM_STYLE: React.CSSProperties = {
  fontSize: '0.625rem',
  letterSpacing: '0.2em',
}

// Memoized item component to prevent re-renders
const MarqueeItem = memo(function MarqueeItem({ item }: { item: string }) {
  return (
    <span
      className="flex items-center gap-3 font-mono uppercase mr-4 rounded-full border px-3.5 py-2.5 transition-all duration-300 hover:scale-105"
      style={{
        ...ITEM_STYLE,
        color: 'var(--color-muted)',
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-card)',
        borderRadius: '9999px' }}
    >
      {item}
      <span style={{
        color: 'var(--color-violet)',
        fontSize: '12px',
        lineHeight: 1,
        opacity: 0.7 }}>✦</span>
    </span>
  )
})

export const MarqueeTicker = memo(function MarqueeTicker() {
  const repeated = useMemo(() => [...ITEMS, ...ITEMS, ...ITEMS], [])

  const containerStyle = useMemo(() => ({
    backgroundColor: 'var(--color-card)',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
    padding: '0.75rem 0',
  }), [])

  return (
    <div
      className="w-full min-h-14 flex items-center overflow-hidden marquee-mask"
      style={containerStyle}
      role="region"
      aria-label="Services marquee"
    >
      <div
        className="flex whitespace-nowrap animate-marquee-left gap-2 py-1"
        style={{
          willChange: 'transform' }}
      >
        {repeated.map((item, i) => (
          <MarqueeItem key={`${item}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
})

export default MarqueeTicker
