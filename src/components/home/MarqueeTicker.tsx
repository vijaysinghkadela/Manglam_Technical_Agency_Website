const ITEMS = [
  'WEB DEVELOPMENT','SOCIAL MEDIA','CYBERSECURITY',
  'AI AUTOMATION','SAAS LICENSING','DATA PROCESSING','CONTRACTOR MANAGEMENT',
]

export function MarqueeTicker() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="w-full h-11 flex items-center overflow-hidden"
      style={{ backgroundColor:'var(--color-card)', borderTop:'1px solid var(--color-border)', borderBottom:'1px solid var(--color-border)' }}
    >
      <div className="flex whitespace-nowrap animate-marquee-left">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-5 font-mono uppercase mr-8"
            style={{ fontSize:'11px', color:'var(--color-muted)', letterSpacing:'0.18em' }}
          >
            {item}
            <span style={{ color:'var(--color-violet)', fontSize:'16px', lineHeight:1 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
