'use client';

import PageHero from '@/components/ui/PageHero';
import { motion } from 'framer-motion';
import TextReveal from '@/components/ui/TextReveal';
import SpotlightCard from '@/components/ui/SpotlightCard';

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
];

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
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="About"
        label="OUR STORY"
        title="We are engineers, not salespeople."
        subheading="Manglam Technical Agency (MTA) is a Rajasthan-based IT agency delivering end-to-end digital infrastructure for Indian businesses that are ready to scale."
      />

      <section className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-micro text-violet mb-4">THE MISSION</p>
              <TextReveal className="text-display-m text-white mb-6">
                No Corporate Soup. Just Shipping.
              </TextReveal>
              <div className="flex flex-col gap-6 text-base text-muted leading-relaxed">
                <p>
                  Most agencies sell you an account manager, a 50-page slide deck, and a team of entry-level developers hidden behind a curtain. We do the exact opposite.
                </p>
                <p>
                  At MTA, we act as your outsourced technical co-founders. We build custom websites, deploy automation pipelines, secure your data, and handle the messy contractor management — all with a direct line of communication to the engineers actually writing your code.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 border border-[#1F1F1F] bg-surface flex flex-col gap-2">
                <span className="text-4xl font-display font-bold text-white">50+</span>
                <span className="text-sm font-mono text-muted uppercase">Projects Shipped</span>
              </div>
              <div className="p-8 border border-[#1F1F1F] bg-surface flex flex-col gap-2">
                <span className="text-4xl font-display font-bold text-white">100%</span>
                <span className="text-sm font-mono text-muted uppercase">In-House Team</span>
              </div>
              <div className="p-8 border border-[#1F1F1F] bg-surface flex flex-col gap-2">
                <span className="text-4xl font-display font-bold text-white">24/7</span>
                <span className="text-sm font-mono text-muted uppercase">System Uptime</span>
              </div>
              <div className="p-8 border border-[#1F1F1F] bg-surface flex flex-col gap-2">
                <span className="text-4xl font-display font-bold text-white">3</span>
                <span className="text-sm font-mono text-muted uppercase">Years Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-micro text-violet mb-4">OUR VALUES</p>
            <TextReveal className="text-display-m text-white">
              What We Stand For
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <SpotlightCard key={v.num} className="p-10 border border-[#1F1F1F] bg-card h-full flex flex-col">
                <span className="text-5xl font-display font-black text-[#1F1F1F] mb-8">{v.num}</span>
                <h3 className="text-xl font-display font-bold text-white mb-4">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-canvas">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <TextReveal className="text-display-m text-white">
              The Journey
            </TextReveal>
          </div>

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 pb-12 border-b border-[#1F1F1F] last:border-0"
              >
                <div className="md:w-32 flex-shrink-0">
                  <span className="text-2xl font-mono text-violet bg-violet/10 px-4 py-2 rounded-sm border border-violet/20">{item.year}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-base text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
