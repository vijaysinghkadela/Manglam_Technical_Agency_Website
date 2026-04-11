'use client'
import { motion } from 'framer-motion'

const techRow1 = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python', 'Firebase']
const techRow2 = ['Cloudinary', 'Vercel', 'AWS', 'n8n', 'OpenAI', 'Figma', 'GitHub', 'Meta Ads']

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]
const ACCENT = '#6B1A1A'

function TechItem({ name }: { name: string }) {
  return (
    <span
      className="flex items-center gap-4 whitespace-nowrap group rounded-full border px-4 py-2.5"
      style={{ borderColor: 'rgba(107,26,26,0.14)', backgroundColor: 'rgba(107,26,26,0.03)' }}
    >
      <span
        className="text-[12px] font-mono uppercase tracking-widest transition-colors duration-200 group-hover:text-foreground"
        style={{ color: 'var(--color-muted)', letterSpacing: '0.18em' }}
      >
        {name}
      </span>
      <span className="w-px h-4" style={{ backgroundColor: ACCENT }} />
    </span>
  )
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden marquee-mask">
      <div className={`flex gap-4 ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}>
        {[...items, ...items, ...items].map((item, i) => (
          <TechItem key={`${item}-${i}`} name={item} />
        ))}
      </div>
    </div>
  )
}

export function TechStackMarquee() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'clamp(40px, 6vw, 64px) 0',
      }}
    >
      <motion.div
        className="container-site text-center mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="font-mono uppercase" style={{ fontSize: '10px', color: ACCENT, letterSpacing: '0.28em' }}>
          TECHNOLOGIES WE USE
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-muted)' }}>
          The stack is opinionated, modern, and intentionally compact.
        </p>
      </motion.div>
      <div className="flex flex-col gap-4 sm:gap-5">
        <MarqueeRow items={techRow1} />
        <MarqueeRow items={techRow2} reverse />
      </div>
    </section>
  )
}
