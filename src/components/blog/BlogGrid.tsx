'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'

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

export const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Web Development': { bg: 'rgba(107,26,26,0.12)', border: 'rgba(107,26,26,0.25)', text: 'var(--color-violet)' },
  'Marketing': { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.25)', text: 'rgb(6,182,212)' },
  'Cybersecurity': { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', text: 'rgb(239,68,68)' },
  'AI': { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: 'rgb(245,158,11)' },
  'Business': { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)', text: 'rgb(34,197,94)' },
}

function FilterButton({
  label,
  isActive,
  onClick,
  colors,
}: {
  label: string
  isActive: boolean
  onClick: () => void
  colors?: { bg: string; border: string; text: string }
}) {
  const isAllButton = label === 'All'
  const style = isAllButton
    ? {
        backgroundColor: isActive ? 'var(--color-violet)' : 'transparent',
        border: `1px solid ${isActive ? 'var(--color-violet)' : 'var(--color-border)'}`,
        color: isActive ? '#FFFFFF' : 'var(--color-muted)',
      }
    : {
        backgroundColor: isActive ? colors?.bg : 'transparent',
        border: `1px solid ${isActive ? colors?.border : 'var(--color-border)'}`,
        color: isActive ? colors?.text : 'var(--color-muted)',
      }

  return (
    <button
      onClick={onClick}
      className="relative font-mono uppercase transition-all duration-300 rounded-full overflow-hidden"
      style={{
        fontSize: '11px',
        letterSpacing: '0.12em',
        padding: '10px 22px',
        ...style,
      }}
    >
      {label}
    </button>
  )
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(posts.map(p => p.category).filter((c): c is string => c !== undefined))),
    [posts]
  )

  const filtered = useMemo(
    () => (activeCategory ? posts.filter(p => p.category === activeCategory) : posts),
    [posts, activeCategory]
  )

  const [featured, ...rest] = filtered

  if (!posts.length) return null

  if (filtered.length === 0) {
    return (
      <section className="w-full border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="font-mono text-[14px]" style={{ color: 'var(--color-muted)' }}>
              No articles in this category yet.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container-site">

        {/* ── Category Filter Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <span className="font-mono text-[10px] uppercase mr-2" style={{ color: 'var(--color-dead)', letterSpacing: '0.14em' }}>
            Filter:
          </span>
          <FilterButton
            label="All"
            isActive={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map(cat => (
            <FilterButton
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              colors={CATEGORY_COLORS[cat] || CATEGORY_COLORS['Web Development']}
            />
          ))}
        </motion.div>

        {/* ── Featured Post (Editorial Style) ── */}
        <AnimatePresence mode="wait">
          {featured && (
            <motion.div
              key={`featured-${activeCategory || 'all'}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-20"
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative block overflow-hidden rounded-2xl border transition-all duration-500"
                style={{
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                }}
                data-cursor="link"
                onMouseEnter={(e) => {
                  setHoveredPost(featured.slug)
                  e.currentTarget.style.borderColor = 'rgba(107,26,26,0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 80px rgba(107,26,26,0.12)'
                }}
                onMouseLeave={(e) => {
                  setHoveredPost(null)
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-linear-to-r ${featured.gradient}`} />

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0">
                  {/* Left: Content */}
                  <div className="p-10 lg:p-14 flex flex-col justify-center">
                    {/* Meta row */}
                    <div className="flex items-center gap-4 mb-8">
                      {featured.category && (
                        <span
                          className="font-mono uppercase text-[10px] tracking-[0.14em] px-3 py-1.5 rounded-full"
                          style={{
                            color: CATEGORY_COLORS[featured.category]?.text || 'var(--color-violet)',
                            backgroundColor: CATEGORY_COLORS[featured.category]?.bg || 'rgba(107,26,26,0.1)',
                            border: `1px solid ${CATEGORY_COLORS[featured.category]?.border || 'rgba(107,26,26,0.2)'}`,
                          }}
                        >
                          {featured.category}
                        </span>
                      )}
                      <span
                        className="font-mono uppercase text-[10px] tracking-[0.14em] px-3 py-1.5 rounded-full flex items-center gap-1.5"
                        style={{
                          color: 'var(--color-violet-light)',
                          backgroundColor: 'rgba(107,26,26,0.08)',
                          border: '1px solid rgba(107,26,26,0.15)',
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
                        Featured
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-display font-black leading-[1.05] mb-6 transition-colors duration-300 group-hover:text-violet"
                      style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}
                    >
                      {featured.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="leading-relaxed mb-10"
                      style={{ fontSize: '16px', color: 'var(--color-muted)', lineHeight: 1.75, maxWidth: '540px' }}
                    >
                      {featured.excerpt}
                    </p>

                    {/* Bottom row: date + CTA */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 font-mono text-[11px]" style={{ color: 'var(--color-dead)', letterSpacing: '0.08em' }}>
                          <Calendar className="w-3.5 h-3.5" />
                          {featured.date}
                        </span>
                        <span className="flex items-center gap-2 font-mono text-[11px]" style={{ color: 'var(--color-dead)', letterSpacing: '0.08em' }}>
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readTime}
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                        style={{ color: 'var(--color-violet)' }}
                      >
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>

                  {/* Right: Visual accent */}
                  <div
                    className="relative hidden lg:flex items-center justify-center p-12 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, rgba(107,26,26,0.05) 0%, transparent 50%)`,
                    }}
                  >
                    <motion.div
                      className="relative"
                      animate={{ rotate: hoveredPost === featured.slug ? 5 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <span
                        className="font-display font-black select-none"
                        style={{
                          fontSize: 'clamp(8rem, 15vw, 14rem)',
                          color: 'rgba(107,26,26,0.08)',
                          lineHeight: 1,
                        }}
                      >
                        01
                      </span>
                    </motion.div>
                    {/* Decorative circle */}
                    <div
                      className="absolute w-32 h-32 rounded-full blur-3xl opacity-40"
                      style={{ background: 'radial-gradient(circle, rgba(107,26,26,0.3) 0%, transparent 70%)' }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Section Header ── */}
        {rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-6 mb-12"
          >
            <h3 className="font-display font-bold text-xl" style={{ color: 'var(--color-foreground)' }}>
              More Articles
            </h3>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="font-mono text-[11px]" style={{ color: 'var(--color-dead)', letterSpacing: '0.1em' }}>
              {rest.length} items
            </span>
          </motion.div>
        )}

        {/* ── Articles Grid (Bento Style) ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex flex-col h-full rounded-xl border overflow-hidden transition-all duration-400"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderColor: 'var(--color-border)',
                    minHeight: '240px',
                  }}
                  data-cursor="link"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(107,26,26,0.35)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(107,26,26,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Gradient bar */}
                  <div className={`h-[3px] w-full bg-linear-to-r ${post.gradient}`} />

                  <div className="flex flex-col flex-1 p-8">
                    {/* Top: Category & Read time */}
                    <div className="flex items-center justify-between mb-5">
                      {post.category && (
                        <span
                          className="font-mono uppercase text-[9px] tracking-[0.14em] px-2.5 py-1 rounded-full"
                          style={{
                            color: CATEGORY_COLORS[post.category]?.text || 'var(--color-violet)',
                            backgroundColor: CATEGORY_COLORS[post.category]?.bg || 'rgba(107,26,26,0.08)',
                            border: `1px solid ${CATEGORY_COLORS[post.category]?.border || 'rgba(107,26,26,0.15)'}`,
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: 'var(--color-dead)' }}>
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display font-bold mb-4 leading-tight transition-colors duration-200 group-hover:text-violet flex-1"
                      style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--color-foreground)', lineHeight: 1.3 }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="leading-relaxed mb-6 line-clamp-2"
                      style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.65 }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Bottom: Date & Arrow */}
                    <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--color-dead)', letterSpacing: '0.08em' }}>
                        {post.date}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5"
                        style={{ color: 'var(--color-violet-light)' }}
                      >
                        Read
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Newsletter CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-20"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-10 lg:p-14"
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 70% 30%, rgba(107,26,26,0.15) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <span
                  className="font-mono uppercase text-[10px] tracking-[0.18em] mb-3 block"
                  style={{ color: 'var(--color-violet-light)' }}
                >
                  ✦ STAY UPDATED
                </span>
                <h4
                  className="font-display font-bold text-xl lg:text-2xl"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  Get engineering insights delivered to your inbox.
                </h4>
                <p className="mt-2 text-[14px]" style={{ color: 'var(--color-muted)' }}>
                  No spam. Unsubscribe anytime.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full font-mono text-[12px] uppercase tracking-wider transition-all duration-300 hover:gap-3"
                style={{
                  backgroundColor: 'var(--color-violet)',
                  color: '#FFFFFF',
                }}
                data-cursor="pointer"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
