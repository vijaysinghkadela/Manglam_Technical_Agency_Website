'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  gradient: string
  category?: string
}

const CATEGORY_COLORS: Record<string, string> = {
  'Web Development': 'rgba(124,58,237,0.15)',
  'Marketing':       'rgba(6,182,212,0.15)',
  'Cybersecurity':   'rgba(239,68,68,0.15)',
  'AI':              'rgba(245,158,11,0.15)',
  'Business':        'rgba(34,197,94,0.15)',
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null

  const [featured, ...rest] = posts

  return (
    <section
      className="border-t border-border"
      style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(56px, 9vw, 96px) 0' }}
    >
      <div className="container-site">

        {/* ── Featured post ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-10 lg:mb-14"
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative flex flex-col lg:flex-row overflow-hidden border border-border transition-all duration-300"
            style={{ backgroundColor: 'var(--color-card)' }}
            data-cursor="link"
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 60px rgba(124,58,237,0.10)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            {/* Left accent strip (desktop) */}
            <div
              className={`hidden lg:block w-[4px] shrink-0 bg-linear-to-b ${featured.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Top accent bar (mobile) */}
            <div className={`lg:hidden h-[3px] w-full bg-linear-to-r ${featured.gradient}`} />

            <div className="flex flex-col lg:flex-row flex-1 p-8 lg:p-12 gap-8 lg:gap-12 items-start lg:items-center">

              {/* Left: meta + title */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-5">
                  {featured.category && (
                    <span
                      className="font-mono uppercase text-[10px] tracking-[0.18em] px-2.5 py-1"
                      style={{
                        color: 'var(--color-violet-light)',
                        backgroundColor: CATEGORY_COLORS[featured.category] ?? 'rgba(124,58,237,0.12)',
                        border: '1px solid rgba(124,58,237,0.2)',
                      }}
                    >
                      {featured.category}
                    </span>
                  )}
                  <span
                    className="font-mono uppercase text-[10px] tracking-[0.14em]"
                    style={{ color: 'var(--color-dead)' }}
                  >
                    FEATURED
                  </span>
                </div>

                <h2
                  className="font-display font-black leading-tight mb-4 transition-colors duration-200 group-hover:text-violet"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-foreground)' }}
                >
                  {featured.title}
                </h2>

                <p
                  className="leading-relaxed"
                  style={{ fontSize: '15px', color: 'var(--color-muted)', lineHeight: 1.72, maxWidth: '520px' }}
                >
                  {featured.excerpt}
                </p>
              </div>

              {/* Right: date + CTA */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start w-full lg:w-auto gap-4 shrink-0">
                <div className="lg:text-right">
                  <time
                    className="font-mono block"
                    style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.14em' }}
                  >
                    {featured.date}
                  </time>
                  <span
                    className="font-mono block"
                    style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.14em' }}
                  >
                    {featured.readTime}
                  </span>
                </div>
                <span
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                  style={{ color: 'var(--color-violet-light)' }}
                >
                  Read article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Section divider ── */}
        {rest.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.22em', whiteSpace: 'nowrap' }}
            >
              MORE ARTICLES
            </span>
            <div className="flex-1" style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>
        )}

        {/* ── Rest of posts grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group border border-border flex flex-col overflow-hidden transition-all duration-300 h-full"
                style={{ backgroundColor: 'var(--color-card)' }}
                data-cursor="link"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.35)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(124,58,237,0.08)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {/* Gradient accent bar */}
                <div className={`h-[2px] w-full bg-linear-to-r ${post.gradient} group-hover:h-[3px] transition-all duration-300`} />

                <div className="flex flex-col flex-1 p-6 pt-5">
                  <div className="flex items-center gap-2 mb-4">
                    {post.category && (
                      <span
                        className="font-mono uppercase text-[9px] tracking-[0.16em] px-2 py-0.5"
                        style={{
                          color: 'var(--color-violet-light)',
                          backgroundColor: CATEGORY_COLORS[post.category] ?? 'rgba(124,58,237,0.1)',
                          border: '1px solid rgba(124,58,237,0.18)',
                        }}
                      >
                        {post.category}
                      </span>
                    )}
                    <span
                      className="font-mono"
                      style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.12em' }}
                    >
                      {post.readTime}
                    </span>
                  </div>

                  <h2
                    className="font-display font-bold mb-3 leading-tight transition-colors duration-200 group-hover:text-violet"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', color: 'var(--color-foreground)', lineHeight: 1.25 }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="leading-relaxed mb-6 flex-1"
                    style={{ color: 'var(--color-muted)', lineHeight: 1.72, fontSize: '13px' }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <time
                      className="font-mono"
                      style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.12em' }}
                    >
                      {post.date}
                    </time>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-mono transition-all duration-200 group-hover:gap-2.5"
                      style={{ color: 'var(--color-violet-light)' }}
                    >
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
