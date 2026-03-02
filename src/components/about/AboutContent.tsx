'use client'

import { motion } from 'framer-motion'
import { TextReveal } from '@/components/ui/TextReveal'

const values = [
  {
    num: '01',
    title: 'Absolute Transparency',
    desc: 'No hidden fees, no scope creep. We use written agreements for everything and publish our starting prices openly.',
  },
  {
    num: '02',
    title: 'Local Roots, Global Quality',
    desc: "Based in Rajasthan, we build digital infrastructure that meets international standards. We don't outsource; we handcraft.",
  },
  {
    num: '03',
    title: 'Full-Stack Accountability',
    desc: 'From initial design to post-launch cybersecurity, we take ownership of the entire lifecycle. If it breaks, we fix it.',
  },
]

const stack = [
  'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 
  'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'AWS', 
  'Cloudflare', 'Vercel', 'Docker', 'Linux', 'Git'
]

export function AboutContent() {
  return (
    <>
      {/* 2. The Story / Mission (Asymmetric Layout) */}
      <section className="w-full py-24 lg:py-32 bg-canvas border-t border-border">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-8">
            {/* Left: Sticky header */}
            <div className="lg:pr-8">
              <div className="sticky top-32">
                <p className="font-mono text-[11px] text-violet tracking-[0.2em] uppercase font-semibold">
                  Our Story
                </p>
              </div>
            </div>

            {/* Right: Mission paragraphs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 text-lg lg:text-xl leading-relaxed text-muted font-body"
            >
              <p className="text-white font-medium">
                Most agencies sell you an account manager, a 50-page slide deck, and a team of entry-level developers hidden behind a curtain. We do the exact opposite.
              </p>
              <p>
                At MTA, we act as your outsourced technical co-founders. We are a specialized, lean team delivering the output quality of a larger enterprise firm at the responsiveness and accountability of a boutique. 
              </p>
              <p>
                We build SaaS architectures, deploy AI pipelines, secure your data, and handle the messy contractor management — all with a direct line of communication to the engineers actually writing your code. We prioritize printed scopes over vague promises and hard engineering over bloated middleware.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (Brutalist Grid) */}
      <section className="w-full bg-canvas border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative p-10 lg:p-14 bg-canvas hover:bg-surface transition-colors duration-500 overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              {/* Animated Left Border */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              <div className="flex justify-between items-start mb-16 relative z-10">
                <span className="text-6xl font-display font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                  {v.num}
                </span>
                <div className="w-2 h-2 rounded-full bg-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  {v.title}
                </h3>
                <p className="text-[15px] font-mono leading-relaxed text-muted">
                  {v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section className="w-full py-24 bg-surface border-t border-border">
        <div className="container-site">
          <div className="mb-12">
            <p className="font-mono text-[11px] text-violet tracking-[0.2em] uppercase font-semibold text-center">
              Internal Tooling & Capabilities
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center gap-3 lg:gap-4 max-w-4xl mx-auto"
          >
            {stack.map((tech) => (
              <div 
                key={tech}
                className="px-4 py-2 border border-border bg-canvas text-white font-mono text-sm tracking-wide"
              >
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
