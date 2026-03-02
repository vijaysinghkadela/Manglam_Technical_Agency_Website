const ITEMS = [
  'WEB DEVELOPMENT','SOCIAL MEDIA','CYBERSECURITY',
  'AI AUTOMATION','SAAS LICENSING','DATA PROCESSING','CONTRACTOR MANAGEMENT',
]

export function MarqueeTicker() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="w-full h-11 bg-card border-y border-border flex items-center overflow-hidden">
      <div className="flex whitespace-nowrap marquee-l">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-5 font-mono text-[11px] text-muted tracking-[0.18em] uppercase mr-8">
            {item}
            <span className="text-violet text-base leading-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
