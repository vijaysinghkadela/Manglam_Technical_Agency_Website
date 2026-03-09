'use client'
import { motion } from 'framer-motion'
import { ExternalLink, Check } from 'lucide-react'
import Link from 'next/link'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

export function FeaturedProject() {
  return (
    <section style={{ backgroundColor:'var(--color-surface)', padding:'clamp(56px, 9vw, 96px) 0' }}>
      <div className="container-site">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-50px' }}
          transition={{ duration:0.7, ease: EASE }}
          className="flex items-end justify-between flex-wrap gap-4 mb-12 lg:mb-16"
        >
          <div>
            <span className="font-mono uppercase block mb-3" style={{ fontSize:'11px', color:'var(--color-violet-light)', letterSpacing:'0.22em' }}>
              OUR WORK
            </span>
            <h2 className="font-display font-black leading-[0.92] tracking-tight" style={{ fontSize:'clamp(1.5rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}>
              Projects That<br />Made an Impact
            </h2>
          </div>
          <Link href="/portfolio" data-cursor="pointer"
            className="hidden lg:inline-flex items-center gap-2 text-sm font-mono transition-all group"
            style={{ color:'var(--color-muted)', border:'1px solid var(--color-border)', padding:'10px 20px' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-foreground)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
            }}
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </motion.div>

        {/* 2-col project card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* LEFT — Browser mockup */}
          <motion.div
            initial={{ opacity:0, y:50 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-50px' }}
            transition={{ duration:0.9, ease: EASE }}
            className="w-full overflow-hidden"
            style={{ border:'1px solid var(--color-border)', boxShadow:'0 40px 120px rgba(0,0,0,0.7)' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor:'var(--color-card)', borderBottom:'1px solid var(--color-border)' }}>
              <div className="flex gap-2">
                {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-full"
                    style={{ backgroundColor:c, boxShadow:`0 0 6px ${c}55` }}
                  />
                ))}
              </div>
              <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded"
                style={{ backgroundColor:'var(--color-canvas)', border:'1px solid var(--color-border)' }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor:'#28C840' }} />
                <span className="font-mono truncate" style={{ fontSize:'11px', color:'var(--color-muted)' }}>
                  marutnarayansewasansthan.org
                </span>
              </div>
            </div>

            {/* MNSS website preview */}
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

              {/* Mock hero content */}
              <div className="px-5 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor:'#F97316' }} />
                  <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor:'rgba(249,115,22,0.35)' }} />
                </div>
                <div className="h-4 w-[70%] rounded mb-2" style={{ backgroundColor:'rgba(255,255,255,0.26)' }} />
                <div className="h-4 w-[54%] rounded mb-2" style={{ backgroundColor:'rgba(255,255,255,0.2)' }} />
                <div className="h-4 w-[42%] rounded mb-4" style={{ backgroundColor:'rgba(255,255,255,0.14)' }} />
                {[100,85,68].map((w, i) => (
                  <div key={i} className="h-1.5 rounded mb-2" style={{ width:`${w}%`, backgroundColor:'rgba(255,255,255,0.08)' }} />
                ))}
                <div className="flex gap-3 mt-4">
                  <div className="h-8 w-24 rounded" style={{ backgroundColor:'#C2410C' }} />
                  <div className="h-8 w-20 rounded" style={{ backgroundColor:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)' }} />
                </div>
              </div>

              {/* Stats bar */}
              <div className="absolute bottom-0 left-0 right-0 flex divide-x"
                style={{ borderTop:'1px solid rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)' }}
              >
                {[['500+','Lives Impacted'],['15+','Years'],['5+','Districts']].map(([n,l]) => (
                  <div key={l} className="flex-1 flex flex-col items-center py-3" style={{ backgroundColor:'rgba(0,0,0,0.25)' }}>
                    <span className="font-bold text-sm" style={{ color:'#FB923C' }}>{n}</span>
                    <span className="mt-1" style={{ fontSize:'9px', color:'rgba(255,255,255,0.22)' }}>{l}</span>
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
            initial={{ opacity:0, x:30 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-50px' }}
            transition={{ duration:0.8, delay:0.15, ease: EASE }}
            className="flex flex-col gap-6 lg:pt-2"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['NGO','Web Development'].map(t => (
                <span key={t} className="font-mono text-label px-3 py-1" style={{ border:'1px solid var(--color-border)', color:'var(--color-muted)' }}>
                  {t}
                </span>
              ))}
              <span className="font-mono text-label px-3 py-1" style={{ border:'1px solid rgba(124,58,237,0.4)', color:'var(--color-violet-light)' }}>
                ✦ Signature Project
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-black leading-[0.90] tracking-tight" style={{ fontSize:'clamp(34px, 4vw, 58px)', color: 'var(--color-foreground)' }}>
              MNSS Website
            </h3>

            {/* Description */}
            <p style={{ fontSize:'15px', lineHeight:1.72, color:'var(--color-muted)' }}>
              Marut Narayan Sewa Sansthan — built from scratch for a Rajasthan-based NGO
              running rehabilitation, women&apos;s safety, and skill development across 5+ districts
              since 2009. Delivered in exactly 3 weeks as scoped and agreed.
            </p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2" style={{ border:'1px solid var(--color-border)' }}>
              {[['DURATION','3 Weeks'],['PROJECT VALUE','₹ 50,000'],['DELIVERED','Feb 2026'],['CLIENT TYPE','NGO']].map(([lbl,val],i) => (
                <div key={lbl}
                  style={{
                    padding:'16px',
                    borderRight: i % 2 === 0 ? '1px solid var(--color-border)' : 'none',
                    borderBottom: i < 2       ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <p className="font-mono uppercase" style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.15em', marginBottom:'4px' }}>{lbl}</p>
                  <p className="font-mono font-semibold" style={{ fontSize:'14px', color: 'var(--color-foreground)' }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div>
              <p className="font-mono uppercase mb-2" style={{ fontSize:'10px', color:'var(--color-dead)', letterSpacing:'0.15em' }}>TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {['Next.js','TypeScript','Tailwind CSS','Cloudinary','Vercel'].map(t => (
                  <span key={t} className="font-mono text-label px-3 py-1 transition-colors cursor-default"
                    style={{ border:'1px solid var(--color-border)', color:'var(--color-muted)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-muted)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)' }}
                  >
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
                ].map((d, i) => (
                  <motion.li
                    key={d}
                    className="flex items-center gap-3 text-sm"
                    style={{ color:'var(--color-muted)' }}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: EASE }}
                  >
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color:'var(--color-violet-light)' }} />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a href="https://www.marutnarayansewasansthan.org"
              target="_blank" rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-3 w-fit text-sm font-mono transition-all duration-300 group"
              style={{ border:'1px solid var(--color-border)', padding:'12px 20px', color: 'var(--color-foreground)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-foreground)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--color-canvas)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'
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
