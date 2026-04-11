const ITEMS = [
  'WEB DEVELOPMENT', 'SOCIAL MEDIA MARKETING', 'CYBERSECURITY',
  'AI AUTOMATION', 'SAAS DEVELOPMENT', 'DATA PROCESSING',
  'BRANDING & IDENTITY', 'CONTENT CREATION', 'CONTRACTOR MANAGEMENT',
]

export function MarqueeTicker() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div
      className="w-full h-10 flex items-center overflow-hidden marquee-mask"
      style={{
        backgroundColor: 'var(--color-card)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex whitespace-nowrap animate-marquee-left">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 font-mono uppercase mr-6"
            style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.2em' }}
          >
            {item}
            <span style={{ color: 'var(--color-violet)', fontSize: '12px', lineHeight: 1, opacity: 0.7 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
