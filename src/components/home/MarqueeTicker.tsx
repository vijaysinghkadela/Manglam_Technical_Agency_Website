'use client'
import { memo } from 'react'

const ITEMS = [
  'WEB DEVELOPMENT', 'Performance Marketing', 'CYBERSECURITY',
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
      className="marquee-pill flex items-center gap-3 rounded-full border px-3.5 py-2.5 font-mono uppercase"
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
  return (
    <div
      className="w-full min-h-14 flex items-center overflow-hidden marquee-mask"
      style={{
        backgroundColor: 'var(--color-card)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 0',
      }}
      role="region"
      aria-label="Services marquee"
    >
      <div
        className="marquee-track flex whitespace-nowrap py-1"
        aria-hidden="true"
      >
        <div className="marquee-group flex">
          {ITEMS.map((item) => (
            <MarqueeItem key={`a-${item}`} item={item} />
          ))}
        </div>
        <div className="marquee-group flex">
          {ITEMS.map((item) => (
            <MarqueeItem key={`b-${item}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
})

export default MarqueeTicker
