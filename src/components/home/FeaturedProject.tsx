'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FeaturedProject() {
  return (
    <section className="w-full py-28 bg-surface">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase block mb-3">
              OUR WORK
            </span>
            <h2 className="font-display font-black text-white tracking-tight leading-[0.92]"
              style={{ fontSize:'clamp(28px, 4vw, 60px)' }}>
              Projects That<br />Made an Impact
            </h2>
          </div>
          <Link href="/portfolio" data-cursor="pointer"
            className="hidden lg:inline-flex items-center gap-2 text-sm text-muted border border-border px-5 py-2.5 hover:text-white hover:border-[#333] transition-all"
          >
            View All →
          </Link>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — browser mockup */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.2 }}
            transition={{ duration:0.75, ease:[0.16,1,0.3,1] }}
            className="w-full overflow-hidden border border-border shadow-[0_40px_120px_rgba(0,0,0,0.85)]"
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1A1A1A] border-b border-dead">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.4)]"  />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-[#111] border border-dead rounded px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <span className="text-[11px] text-muted font-mono truncate">
                  marutnarayansewasansthan.org
                </span>
              </div>
            </div>

            {/* MNSS website preview */}
            <div className="bg-[#060F06] relative overflow-hidden" style={{ aspectRatio:'16/10' }}>
              {/* Mock nav */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center">
                    <span className="text-white text-[8px] font-black">M</span>
                  </div>
                  <div className="h-1.5 w-14 bg-white/20 rounded-full" />
                </div>
                <div className="hidden sm:flex gap-3">
                  {['Home','About','Services','Contact'].map(n => (
                    <div key={n} className="h-1.5 w-8 bg-white/12 rounded-full" />
                  ))}
                </div>
                <div className="h-6 w-14 bg-orange-600/70 rounded" />
              </div>

              {/* Hero content */}
              <div className="px-5 py-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <div className="h-1.5 w-20 bg-orange-400/40 rounded-full" />
                </div>
                <div className="h-4 w-[72%] bg-white/28 rounded mb-2" />
                <div className="h-4 w-[56%] bg-white/22 rounded mb-1.5" />
                <div className="h-4 w-[44%] bg-white/16 rounded mb-4" />
                <div className="h-1.5 w-full  bg-white/10 rounded mb-1.5" />
                <div className="h-1.5 w-[86%] bg-white/10 rounded mb-1.5" />
                <div className="h-1.5 w-[66%] bg-white/10 rounded mb-5" />
                <div className="flex gap-2.5">
                  <div className="h-8 w-24 bg-orange-600 rounded" />
                  <div className="h-8 w-20 bg-white/8 border border-white/15 rounded" />
                </div>
              </div>

              {/* Stat bar */}
              <div className="absolute bottom-0 left-0 right-0 flex divide-x divide-white/6 border-t border-white/6">
                {[['500+','Lives Impacted'],['15+','Years'],['5+','Districts']].map(([n,l]) => (
                  <div key={l} className="flex-1 flex flex-col items-center py-3 bg-black/25">
                    <span className="text-orange-400 text-sm font-bold">{n}</span>
                    <span className="text-white/25 text-[9px] mt-0.5">{l}</span>
                  </div>
                ))}
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-green-900/15 rounded-full blur-3xl" />
              </div>
            </div>
          </motion.div>

          {/* Right — project info */}
          <motion.div
            initial={{ opacity:0, x:20 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.2 }}
            transition={{ duration:0.75, delay:0.15, ease:[0.16,1,0.3,1] }}
            className="flex flex-col gap-6 lg:pt-4"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['NGO','Web Development'].map(t => (
                <span key={t} className="text-[11px] font-mono px-3 py-1 border border-border text-muted">{t}</span>
              ))}
              <span className="text-[11px] font-mono px-3 py-1 border border-violet/40 text-violet-light">
                ✦ Signature Project
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-black text-white tracking-tight leading-[0.9]"
              style={{ fontSize:'clamp(32px, 4vw, 58px)' }}>
              MNSS Website
            </h3>

            {/* Description */}
            <p className="text-muted text-[15px] leading-[1.7]">
              Marut Narayan Sewa Sansthan — built from scratch for a Rajasthan-based NGO
              running rehabilitation, women&apos;s safety, and skill development across 5+
              districts since 2009. Delivered in exactly 3 weeks as scoped.
            </p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 border border-border">
              {[
                ['DURATION',      '3 Weeks'             ],
                ['PROJECT VALUE', '₹ 50,000'             ],
                ['DELIVERED',     'Feb 2026'             ],
                ['CLIENT TYPE',   'NGO'                  ],
              ].map(([label, val], i) => (
                <div key={label}
                  className={cn('px-4 py-4',
                    i % 2 === 0 && 'border-r border-border',
                    i < 2       && 'border-b border-border',
                  )}
                >
                  <p className="text-[10px] text-dead font-mono tracking-[0.15em] uppercase mb-1">{label}</p>
                  <p className="text-white font-mono text-sm font-semibold">{val}</p>
                </div>
              ))}
            </div>

            {/* Stack chips */}
            <div>
              <p className="text-[10px] text-dead font-mono tracking-[0.15em] uppercase mb-2">TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {['Next.js','TypeScript','Tailwind CSS','Cloudinary','Vercel'].map(t => (
                  <span key={t} className="text-[11px] font-mono text-muted border border-border px-2.5 py-1 hover:text-white hover:border-[#333] transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <p className="text-[10px] text-dead font-mono tracking-[0.15em] uppercase mb-3">DELIVERABLES</p>
              <ul className="flex flex-col gap-2">
                {[
                  'Responsive website design & development',
                  'Content integration & image optimisation',
                  'QA, testing & production deployment',
                  '1-year free domain + maintenance',
                ].map(d => (
                  <li key={d} className="flex items-center gap-2.5 text-sm text-muted">
                    <Check className="w-3.5 h-3.5 text-violet-light shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a href="https://www.marutnarayansewasansthan.org" target="_blank" rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2.5 border border-border px-5 py-3 text-sm font-mono text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit group"
            >
              View Live Site
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
