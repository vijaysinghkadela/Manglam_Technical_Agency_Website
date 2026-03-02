'use client'
import { motion } from 'framer-motion'
import { ExternalLink, Check } from 'lucide-react'
import Link from 'next/link'

export function FeaturedProject() {
  return (
    <section style={{ backgroundColor:'var(--color-surface)', padding:'112px 0' }}>
      <div className="container-site">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="font-mono uppercase block mb-3" style={{ fontSize:'11px', color:'var(--color-violet-light)', letterSpacing:'0.22em' }}>
              OUR WORK
            </span>
            <h2 className="font-display font-black text-white leading-[0.92] tracking-tight" style={{ fontSize:'clamp(28px, 4vw, 58px)' }}>
              Projects That<br />Made an Impact
            </h2>
          </div>
          <Link href="/portfolio" data-cursor="pointer"
            className="hidden lg:inline-flex items-center gap-2 text-sm transition-all"
            style={{ color:'var(--color-muted)', border:'1px solid var(--color-border)', padding:'10px 20px' }}
          >
            View All →
          </Link>
        </div>

        {/* 2-col project card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Realistic browser mockup */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.15 }}
            transition={{ duration:0.75, ease:[0.16,1,0.3,1] }}
            className="w-full overflow-hidden"
            style={{ border:'1px solid var(--color-border)', boxShadow:'0 40px 120px rgba(0,0,0,0.85)' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor:'#1A1A1A', borderBottom:'1px solid #2A2A2A' }}>
              <div className="flex gap-1.5">
                {/* Traffic lights */}
                {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-full"
                    style={{ backgroundColor:c, boxShadow:`0 0 6px ${c}66` }}
                  />
                ))}
              </div>
              <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded"
                style={{ backgroundColor:'#111', border:'1px solid #2A2A2A' }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor:'#28C840' }} />
                <span className="font-mono truncate" style={{ fontSize:'11px', color:'var(--color-muted)' }}>
                  marutnarayansewasansthan.org
                </span>
              </div>
            </div>

            {/* MNSS website preview — simulated */}
            <div className="relative overflow-hidden" style={{ backgroundColor:'#060F06', aspectRatio:'16/10' }}>
              {/* Mock navbar */}
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor:'#C2410C' }}>
                    <span className="text-white font-black" style={{ fontSize:'8px' }}>M</span>
                  </div>
                  <div className="h-1.5 w-14 rounded-full" style={{ backgroundColor:'rgba(255,255,255,0.18)' }} />
                </div>
                <div className="hidden sm:flex gap-3">
                  {[8,8,10,9].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full" style={{ width:`${w*4}px`, backgroundColor:'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
                <div className="h-6 w-16 rounded" style={{ backgroundColor:'rgba(194,65,12,0.7)' }} />
              </div>

              {/* Mock hero */}
              <div className="px-5 py-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor:'#F97316' }} />
                  <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor:'rgba(249,115,22,0.35)' }} />
                </div>
                <div className="h-4 w-[70%] rounded mb-2" style={{ backgroundColor:'rgba(255,255,255,0.26)' }} />
                <div className="h-4 w-[54%] rounded mb-1.5" style={{ backgroundColor:'rgba(255,255,255,0.2)' }} />
                <div className="h-4 w-[42%] rounded mb-4" style={{ backgroundColor:'rgba(255,255,255,0.14)' }} />
                {[100,85,68].map((w, i) => (
                  <div key={i} className="h-1.5 rounded mb-1.5" style={{ width:`${w}%`, backgroundColor:'rgba(255,255,255,0.08)' }} />
                ))}
                <div className="flex gap-2.5 mt-4">
                  <div className="h-8 w-24 rounded" style={{ backgroundColor:'#C2410C' }} />
                  <div className="h-8 w-20 rounded" style={{ backgroundColor:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)' }} />
                </div>
              </div>

              {/* Stats bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex divide-x"
                style={{ borderTop:'1px solid rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)' }}
              >
                {[['500+','Lives Impacted'],['15+','Years'],['5+','Districts']].map(([n,l]) => (
                  <div key={l} className="flex-1 flex flex-col items-center py-3" style={{ backgroundColor:'rgba(0,0,0,0.25)' }}>
                    <span className="font-bold text-sm" style={{ color:'#FB923C' }}>{n}</span>
                    <span className="mt-0.5" style={{ fontSize:'9px', color:'rgba(255,255,255,0.22)' }}>{l}</span>
                  </div>
                ))}
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="rounded-full" style={{ width:'280px', height:'280px', backgroundColor:'rgba(20,83,20,0.12)', filter:'blur(60px)' }} />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — project details */}
          <motion.div
            initial={{ opacity:0, x:20 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.15 }}
            transition={{ duration:0.75, delay:0.15, ease:[0.16,1,0.3,1] }}
            className="flex flex-col gap-6 lg:pt-2"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['NGO','Web Development'].map(t => (
                <span key={t} className="font-mono text-[11px] px-3 py-1" style={{ border:'1px solid var(--color-border)', color:'var(--color-muted)' }}>
                  {t}
                </span>
              ))}
              <span className="font-mono text-[11px] px-3 py-1" style={{ border:'1px solid rgba(124,58,237,0.4)', color:'var(--color-violet-light)' }}>
                ✦ Signature Project
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-black text-white leading-[0.90] tracking-tight" style={{ fontSize:'clamp(34px, 4vw, 58px)' }}>
              MNSS Website
            </h3>

            {/* Description */}
            <p style={{ fontSize:'15px', lineHeight:1.72, color:'var(--color-muted)' }}>
              Marut Narayan Sewa Sansthan — built from scratch for a Rajasthan-based NGO
              running rehabilitation, women&apos;s safety, and skill development across 5+ districts
              since 2009. Delivered in exactly 3 weeks as scoped and agreed.
            </p>

            {/* Metadata — 2×2 bordered grid */}
            <div className="grid grid-cols-2" style={{ border:'1px solid var(--color-border)' }}>
              {[['DURATION','3 Weeks'],['PROJECT VALUE','₹ 50,000'],['DELIVERED','Feb 2026'],['CLIENT TYPE','NGO']].map(([lbl,val],i) => (
                <div key={lbl}
                  style={{
                    padding:      '16px',
                    borderRight:  i % 2 === 0 ? '1px solid var(--color-border)' : 'none',
                    borderBottom: i < 2       ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <p className="font-mono uppercase" style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.15em', marginBottom:'4px' }}>{lbl}</p>
                  <p className="font-mono font-semibold text-white" style={{ fontSize:'14px' }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Tech stack chips */}
            <div>
              <p className="font-mono uppercase mb-2" style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.15em' }}>TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {['Next.js','TypeScript','Tailwind CSS','Cloudinary','Vercel'].map(t => (
                  <span key={t} className="font-mono text-[11px] px-2.5 py-1 transition-colors hover:text-white"
                    style={{ border:'1px solid var(--color-border)', color:'var(--color-muted)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <p className="font-mono uppercase mb-3" style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.15em' }}>DELIVERABLES</p>
              <ul className="flex flex-col gap-2">
                {[
                  'Responsive website design & development',
                  'Content integration & image optimisation',
                  'QA, testing & production deployment',
                  '1-year free domain + maintenance',
                ].map(d => (
                  <li key={d} className="flex items-center gap-2.5 text-sm" style={{ color:'var(--color-muted)' }}>
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color:'var(--color-violet-light)' }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a href="https://www.marutnarayansewasansthan.org"
              target="_blank" rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2.5 w-fit text-sm font-mono text-white transition-all duration-300 group"
              style={{ border:'1px solid var(--color-border)', padding:'12px 20px' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#FAFAFA'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--color-canvas)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = '#FAFAFA'
              }}
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
