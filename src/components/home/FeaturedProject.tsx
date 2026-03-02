'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Check } from 'lucide-react';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';

import { cn } from '@/lib/utils';

const techStack = ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudinary', 'Vercel'];
const deliverables = [
  'Responsive website design & development',
  'Content integration & image optimisation',
  'QA, testing & production deployment',
  '1-year free domain + maintenance',
];

function BrowserMockup() {
  return (
    <div className="w-full rounded-sm overflow-hidden border border-[#1F1F1F] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
      
      {/* Browser Chrome */}
      <div className="bg-[#1A1A1A] px-4 py-3 flex items-center gap-3 border-b border-[#2A2A2A]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-[#111111] border border-[#2A2A2A] rounded px-3 py-1 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
          <span className="text-[11px] text-[#525252] font-mono truncate">
            marutnarayansewasansthan.org
          </span>
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded flex items-center justify-center">
            <div className="w-3 h-0.5 bg-[#333] rounded" />
          </div>
        </div>
      </div>

      {/* Website Preview */}
      <div className="bg-[#0A1A0A] relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        
        {/* Simulated MNSS Navbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center">
              <span className="text-white text-[9px] font-black">M</span>
            </div>
            <div className="h-2 w-16 bg-white/20 rounded-sm" />
          </div>
          <div className="hidden sm:flex gap-4">
            {['Home','About','Services','Contact'].map(l => (
              <div key={l} className="h-1.5 w-10 bg-white/15 rounded-sm" />
            ))}
          </div>
          <div className="h-6 w-16 bg-orange-600/70 rounded-sm" />
        </div>

        {/* Hero Area */}
        <div className="px-6 py-5">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <div className="h-1.5 w-24 bg-orange-500/40 rounded-sm" />
          </div>
          {/* Main heading */}
          <div className="h-5 w-3/4 bg-white/30 rounded-sm mb-2" />
          <div className="h-5 w-2/3 bg-white/25 rounded-sm mb-1" />
          <div className="h-5 w-1/2 bg-white/20 rounded-sm mb-4" />
          {/* Sub */}
          <div className="h-2 w-full bg-white/10 rounded-sm mb-1.5" />
          <div className="h-2 w-5/6 bg-white/10 rounded-sm mb-1.5" />
          <div className="h-2 w-4/6 bg-white/10 rounded-sm mb-5" />
          {/* CTAs */}
          <div className="flex gap-3">
            <div className="h-8 w-28 bg-orange-600 rounded-sm" />
            <div className="h-8 w-24 bg-white/8 border border-white/15 rounded-sm" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 flex divide-x divide-white/5 border-t border-white/5">
          {[
            { num: '500+', lbl: 'Lives' },
            { num: '15+', lbl: 'Years' },
            { num: '5+', lbl: 'Districts' },
          ].map(s => (
            <div key={s.lbl} className="flex-1 flex flex-col items-center py-3 bg-black/20">
              <span className="text-orange-400 text-sm font-bold">{s.num}</span>
              <span className="text-white/30 text-[9px] mt-0.5">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-900/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  )
}

export default function FeaturedProject() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
      
      {/* Section header */}
      <div className="flex items-center justify-between mb-16">
        <div>
          <span className="text-[11px] text-violet-400 font-mono tracking-[0.2em] uppercase block mb-3">
            OUR WORK
          </span>
          <h2
            className="font-black text-white tracking-tight leading-[0.92]"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Projects That Made an Impact
          </h2>
        </div>
        
        <Link
          href="/portfolio"
          className="hidden lg:inline-flex items-center gap-2 text-sm text-[#525252] hover:text-white transition-colors border border-[#1F1F1F] px-5 py-2.5 hover:border-[#333]"
        >
          View All <span>→</span>
        </Link>
      </div>

      {/* Featured card — 2-col split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Browser mockup */}
        <div className="w-full">
          <BrowserMockup />
        </div>

        {/* Right: Project info */}
        <div className="flex flex-col gap-6 lg:pt-4">
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono px-3 py-1 border border-[#1F1F1F] text-[#525252]">NGO</span>
            <span className="text-[11px] font-mono px-3 py-1 border border-[#1F1F1F] text-[#525252]">Web Development</span>
            <span className="text-[11px] font-mono px-3 py-1 border border-violet-800 text-violet-400">✦ Signature Project</span>
          </div>

          {/* Title */}
          <h3 className="font-black text-white leading-[0.9]" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>
            MNSS Website
          </h3>

          {/* Description */}
          <p className="text-[#525252] text-base leading-relaxed">
            Marut Narayan Sewa Sansthan — Built from scratch for a Rajasthan-based NGO
            running rehabilitation, women&apos;s safety, and skill development across 5+
            districts since 2009.
          </p>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-0 border border-[#1F1F1F]">
            {[
              { label: 'DURATION', value: '3 Weeks' },
              { label: 'PROJECT VALUE', value: '₹ 50,000' },
              { label: 'DELIVERED', value: 'Feb 2026' },
              { label: 'CLIENT TYPE', value: 'NGO' },
            ].map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "px-5 py-4",
                  i % 2 === 0 && "border-r border-[#1F1F1F]",
                  i < 2 && "border-b border-[#1F1F1F]"
                )}
              >
                <div className="text-[10px] text-[#525252] font-mono tracking-[0.15em] uppercase mb-1">
                  {item.label}
                </div>
                <div className="text-white font-semibold text-sm font-mono">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <div className="text-[10px] text-[#525252] font-mono tracking-[0.15em] uppercase mb-3">
              TECH STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map(t => (
                <span key={t} className="text-[11px] font-mono text-[#525252] border border-[#1F1F1F] px-3 py-1 hover:text-white hover:border-[#333] transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <div className="text-[10px] text-[#525252] font-mono tracking-[0.15em] uppercase mb-3">
              DELIVERABLES
            </div>
            <ul className="flex flex-col gap-2">
              {deliverables.map(d => (
                <li key={d} className="flex items-center gap-3 text-sm text-[#525252]">
                  <span className="text-violet-500 flex-shrink-0">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <a
            href="https://www.marutnarayansewasansthan.org"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="inline-flex items-center gap-3 border border-[#1F1F1F] px-6 py-3.5 text-sm text-white font-mono hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-fit mt-2 group"
          >
            View Live Site
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
        </div>
      </div>
    </div>
  )
}
