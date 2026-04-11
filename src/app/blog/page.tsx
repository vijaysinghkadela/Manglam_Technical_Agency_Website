'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogPosts } from '@/lib/data/blog'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { TextReveal } from '@/components/ui/TextReveal'

export const metadata: Metadata = {
  title: 'Blog & Engineering Insights',
  description:
    'Practical insights on modern web architecture, AI automation, cybersecurity, and digital operations for Indian businesses. Written by the MTA engineering team.',
  keywords: [
    'web development blog India',
    'AI automation insights',
    'cybersecurity Rajasthan blog',
    'digital agency blog',
    'Next.js tutorials India',
    'n8n automation guide',
  ],
  openGraph: {
    title: 'Blog & Engineering Insights | Manglam Technical Agency',
    description: 'Practical insights on web architecture, AI automation, cybersecurity, and digital operations for Indian businesses.',
    type: 'website',
  },
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="w-full bg-canvas pt-[120px] pb-8 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-line-grid pointer-events-none opacity-40" aria-hidden />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-10%',
            top: '20%',
            width: 'clamp(300px, 35vw, 600px)',
            height: 'clamp(300px, 35vw, 600px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,26,26,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 container-site">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 font-mono text-[11px] mb-10"
            style={{ color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover:text-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>BLOG</span>
          </motion.nav>

          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="font-mono text-[11px] tracking-[0.24em] uppercase block mb-5"
            style={{ color: 'var(--color-violet-light)' }}
          >
            ✦ ENGINEERING & GROWTH
          </motion.span>

          {/* Title with animation */}
          <div className="flex flex-col gap-1">
            <TextReveal
              text="Thinking"
              as="h1"
              delay={0.1}
              className="font-display font-black tracking-normal leading-[0.9]"
              style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: 'var(--color-foreground)' }}
            />
            <TextReveal
              text="Aloud."
              as="h1"
              delay={0.2}
              className="font-display font-black tracking-normal leading-[0.9]"
              style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: 'var(--color-violet)' }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="text-[16px] leading-[1.75] mt-8 max-w-xl"
            style={{ color: 'var(--color-muted)' }}
          >
            Insights on modern web architecture, business automation, legal readiness, 
            and delivery systems built for Indian businesses.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-8 mt-10 pt-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-3xl" style={{ color: 'var(--color-foreground)' }}>
                {blogPosts.length}
              </span>
              <span className="font-mono text-[11px] uppercase" style={{ color: 'var(--color-dead)', letterSpacing: '0.14em' }}>
                Articles
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-3xl" style={{ color: 'var(--color-violet)' }}>
                {new Set(blogPosts.map(p => p.category)).size}
              </span>
              <span className="font-mono text-[11px] uppercase" style={{ color: 'var(--color-dead)', letterSpacing: '0.14em' }}>
                Categories
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 ml-auto">
              <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--color-dead)', letterSpacing: '0.18em' }}>
                Scroll to explore
              </span>
              <div className="w-[1px] h-8 bg-border" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BLOG CONTENT ─────────────────────────────────────── */}
      <BlogGrid posts={blogPosts} />
    </main>
  )
}
