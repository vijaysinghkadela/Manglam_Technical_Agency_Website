'use client'

import PageHero from '@/components/ui/PageHero'
import { motion } from 'framer-motion'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const values = [
  {
    num: '01',
    title: 'Absolute Transparency',
    desc: 'No hidden fees, no scope creep. We use written agreements for everything and publish our starting prices openly.',
  },
  {
    num: '02',
    title: 'Local Roots, Global Quality',
    desc: 'Based in Rajasthan, we build digital infrastructure that meets international standards. We don\'t outsource; we handcraft.',
  },
  {
    num: '03',
    title: 'Full-Stack Accountability',
    desc: 'From initial design to post-launch cybersecurity, we take ownership of the entire lifecycle. If it breaks, we fix it.',
  },
]

const timeline = [
  {
    year: '2021',
    title: 'The Beginning',
    desc: 'Founded as a small web development studio in Rajasthan, focusing on local businesses and NGOs.',
  },
  {
    year: '2023',
    title: 'Service Expansion',
    desc: 'Added cybersecurity and social media automation to our core offerings, scaling our team and client base.',
  },
  {
    year: '2025',
    title: 'AI & Enterprise',
    desc: 'Pioneered AI automation and SaaS licensing services, transitioning into a full-stack digital infrastructure agency.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="About"
        label="OUR STORY"
        title="We are engineers, not salespeople."
        subheading="Manglam Technical Agency (MTA) is a Rajasthan-based IT agency delivering end-to-end digital infrastructure for Indian businesses that are ready to scale."
      />

      <section className="py-28 bg-canvas">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">

          {/* Mission + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-surface p-10 lg:p-14 border border-border flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 mb-6 w-fit px-3 py-1.5 border border-violet/30">
                <div className="w-1.5 h-1.5 rounded-full bg-violet" />
                <p className="text-[11px] font-mono text-violet-light uppercase tracking-[0.18em]">THE MISSION</p>
              </div>
              <h2 className="font-display font-black text-white mb-8 leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
                No Corporate Soup.<br />Just Shipping.
              </h2>
              <div className="flex flex-col gap-6 text-[15px] text-muted leading-[1.7]">
                <p>
                  Most agencies sell you an account manager, a 50-page slide deck, and a team of entry-level developers hidden behind a curtain. We do the exact opposite.
                </p>
                <p>
                  At MTA, we act as your outsourced technical co-founders. We build custom websites, deploy automation pipelines, secure your data, and handle the messy contractor management — all with a direct line of communication to the engineers actually writing your code.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '50+', label: 'Projects Shipped', accent: false },
                { val: '100%', label: 'In-House Team', accent: false },
                { val: '24/7', label: 'System Uptime', accent: false },
                { val: '3', label: 'Years Active', accent: true },
              ].map((stat, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  key={stat.label}
                  className={`p-8 flex flex-col justify-center items-center text-center gap-3 border border-border ${stat.accent ? 'bg-violet text-white' : 'bg-surface text-white'}`}
                >
                  <span className="text-5xl lg:text-6xl font-display font-black tracking-tighter">{stat.val}</span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-muted">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="py-28 bg-surface border-t border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-16 flex items-center gap-4">
            <div className="w-12 h-px bg-white/20" />
            <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase">OUR VALUES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                key={v.num}
              >
                <SpotlightCard className="p-10 border border-border bg-card h-full flex flex-col">
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-6xl font-display font-black text-white/5">{v.num}</span>
                    <div className="w-3 h-3 rounded-full bg-violet" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">{v.title}</h3>
                  <p className="text-[15px] text-muted leading-relaxed">{v.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-canvas">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-violet/50" />
              <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase">THE JOURNEY</span>
              <div className="w-8 h-px bg-violet/50" />
            </div>
            <h2 className="font-display font-black text-white tracking-tight leading-[0.92]"
              style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}>
              How We Got Here
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-surface p-8 lg:p-12 border border-border flex flex-col md:flex-row gap-8 items-start md:items-center group hover:bg-card transition-colors duration-500"
              >
                <div className="md:w-48 shrink-0">
                  <span className="text-4xl font-display font-black text-white/20 group-hover:text-violet transition-colors duration-300">
                    {item.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-[15px] text-muted leading-[1.7]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
