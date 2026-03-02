const techRow1 = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Python', 'Firebase']
const techRow2 = ['Cloudinary', 'Vercel', 'AWS', 'n8n', 'OpenAI', 'Figma', 'GitHub', 'Meta Ads']

function TechItem({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-6 whitespace-nowrap">
      <span className="text-[13px] font-medium uppercase tracking-widest hover:text-white transition-colors"
        style={{ color:'var(--color-muted)' }}
      >
        {name}
      </span>
      <span className="w-px h-4" style={{ backgroundColor:'var(--color-border)' }} />
    </span>
  )
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-6 ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}>
        {[...items, ...items, ...items].map((item, i) => (
          <TechItem key={`${item}-${i}`} name={item} />
        ))}
      </div>
    </div>
  )
}

export function TechStackMarquee() {
  return (
    <section className="w-full py-14"
      style={{ backgroundColor:'var(--color-surface)', borderTop:'1px solid var(--color-border)', borderBottom:'1px solid var(--color-border)' }}
    >
      <div className="text-center mb-8">
        <p className="font-mono uppercase" style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.25em' }}>
          TECHNOLOGIES WE USE
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <MarqueeRow items={techRow1} />
        <MarqueeRow items={techRow2} reverse />
      </div>
    </section>
  )
}
