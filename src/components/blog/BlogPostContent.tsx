'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react'
import { TextReveal } from '@/components/ui/TextReveal'
import { CATEGORY_COLORS } from './BlogGrid'
import { blogPosts } from '@/lib/data/blog'

interface BlogPostContentProps {
  post: (typeof blogPosts)[0]
  categoryColors: (typeof CATEGORY_COLORS)['Web Development']
  relatedPosts: typeof blogPosts
  ease: [number, number, number, number]
}

function renderBody(content: string, ease: [number, number, number, number]) {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      // Bullet points
      if (line.startsWith('- ')) {
        return (
          <motion.li
            key={`${line}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05, ease }}
            className="flex items-start gap-3 text-[15px] leading-[1.75]"
            style={{ color: 'var(--color-muted)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet mt-2 shrink-0" />
            <span>{line.slice(2)}</span>
          </motion.li>
        )
      }

      // Numbered lists
      if (/^\d+\./.test(line)) {
        const match = line.match(/^(\d+)\.\s*/)
        const num = match ? match[1] : ''
        const text = line.replace(/^\d+\.\s*/, '')
        return (
          <motion.li
            key={`${line}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05, ease }}
            className="flex items-start gap-4 text-[15px] leading-[1.75]"
            style={{ color: 'var(--color-muted)' }}
          >
            <span
              className="font-display font-bold text-lg shrink-0 w-6"
              style={{ color: 'var(--color-violet)' }}
            >
              {num}
            </span>
            <span>{text}</span>
          </motion.li>
        )
      }

      // Regular paragraphs
      return (
        <motion.p
          key={`${line}-${index}`}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.03, ease }}
          className="text-[16px] leading-[1.85]"
          style={{ color: 'var(--color-muted)' }}
        >
          {line}
        </motion.p>
      )
    })
}

export function BlogPostContent({
  post,
  categoryColors,
  relatedPosts,
  ease,
}: BlogPostContentProps) {
  const bodyNodes = renderBody(post.content, ease)
  const listNodes = bodyNodes.filter((node) => node.type === 'li')
  const paragraphNodes = bodyNodes.filter((node) => node.type !== 'li')

  return (
    <>
      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative w-full pt-[100px] pb-16 lg:pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-line-grid pointer-events-none opacity-30" aria-hidden />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-5%',
            top: '30%',
            width: 'clamp(250px, 30vw, 450px)',
            height: 'clamp(250px, 30vw, 450px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,26,26,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 container-site max-w-4xl">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-2 font-mono text-[11px] mb-10"
            style={{ color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              BLOG
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="max-w-[200px] truncate" style={{ color: 'var(--color-muted)' }}>
              {post.title}
            </span>
          </motion.nav>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="mb-6"
          >
            <span
              className="font-mono uppercase text-[11px] tracking-[0.14em] px-4 py-2 rounded-full inline-flex items-center gap-2"
              style={{
                color: categoryColors.text,
                backgroundColor: categoryColors.bg,
                border: `1px solid ${categoryColors.border}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: categoryColors.text }}
              />
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <div className="mb-8">
            <TextReveal
              text={post.title}
              as="h1"
              delay={0.15}
              className="font-display font-black leading-[0.95] tracking-normal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-foreground)' }}
            />
          </div>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="text-[17px] leading-[1.7] max-w-2xl mb-10"
            style={{ color: 'var(--color-muted)' }}
          >
            {post.excerpt}
          </motion.p>

          {/* Meta bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="flex flex-wrap items-center gap-6 py-6"
            style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(107,26,26,0.1)',
                  border: '1px solid rgba(107,26,26,0.2)',
                }}
              >
                <User className="w-4 h-4 text-violet" />
              </div>
              <div>
                <span
                  className="font-mono text-[10px] uppercase block"
                  style={{ color: 'var(--color-dead)', letterSpacing: '0.1em' }}
                >
                  Author
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  {post.author}
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8" style={{ backgroundColor: 'var(--color-border)' }} />

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-violet" />
              <span
                className="font-mono text-[11px]"
                style={{ color: 'var(--color-muted)', letterSpacing: '0.08em' }}
              >
                {post.date}
              </span>
            </div>

            <div className="hidden sm:block w-px h-8" style={{ backgroundColor: 'var(--color-border)' }} />

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-violet" />
              <span
                className="font-mono text-[11px]"
                style={{ color: 'var(--color-muted)', letterSpacing: '0.08em' }}
              >
                {post.readTime}
              </span>
            </div>

            <div className="ml-auto">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:gap-3"
                style={{
                  backgroundColor: 'rgba(107,26,26,0.08)',
                  border: '1px solid rgba(107,26,26,0.15)',
                  color: 'var(--color-violet)',
                }}
              >
                <Share2 className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE CONTENT ──────────────────────────────────── */}
      <section className="w-full pb-16 lg:pb-24">
        <div className="container-site max-w-3xl">
          {/* Article card */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 60px rgba(0,0,0,0.04)',
            }}
          >
            {/* Top gradient accent */}
            <div className={`h-1 w-full bg-linear-to-r ${post.gradient}`} />

            <div className="p-8 sm:p-10 lg:p-12">
              {/* Paragraphs */}
              <div className="space-y-5">{paragraphNodes}</div>

              {/* Lists */}
              {listNodes.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 space-y-4 p-6 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(107,26,26,0.03)',
                    border: '1px solid rgba(107,26,26,0.08)',
                  }}
                >
                  {listNodes}
                </motion.ul>
              )}

              {/* Article footer */}
              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: 'var(--color-dead)', letterSpacing: '0.1em' }}
                  >
                    Thanks for reading
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Published by MTA Team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="mt-10"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:gap-4"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-foreground)',
              }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-mono text-[12px] uppercase tracking-wider">Back to Blog</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── RELATED POSTS ───────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section
          className="w-full py-16 lg:py-20 border-t border-border"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <div className="container-site max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-10"
            >
              <span
                className="font-mono uppercase text-[11px] tracking-[0.22em] mb-3 block"
                style={{ color: 'var(--color-violet-light)' }}
              >
                ✦ RELATED READING
              </span>
              <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--color-foreground)' }}>
                More in {post.category}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedPosts.map((relatedPost, i) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex flex-col h-full rounded-xl border overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(107,26,26,0.3)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(107,26,26,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div className={`h-[3px] w-full bg-linear-to-r ${relatedPost.gradient}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <span
                        className="font-mono uppercase text-[9px] tracking-[0.14em] px-2.5 py-1 rounded-full w-fit mb-4"
                        style={{
                          color:
                            CATEGORY_COLORS[relatedPost.category]?.text || 'var(--color-violet)',
                          backgroundColor:
                            CATEGORY_COLORS[relatedPost.category]?.bg || 'rgba(107,26,26,0.08)',
                          border: `1px solid ${CATEGORY_COLORS[relatedPost.category]?.border || 'rgba(107,26,26,0.15)'}`,
                        }}
                      >
                        {relatedPost.category}
                      </span>
                      <h3
                        className="font-display font-bold mb-3 leading-tight transition-colors duration-200 group-hover:text-violet flex-1"
                        style={{
                          fontSize: '1.15rem',
                          color: 'var(--color-foreground)',
                          lineHeight: 1.3,
                        }}
                      >
                        {relatedPost.title}
                      </h3>
                      <div
                        className="flex items-center justify-between mt-auto pt-4"
                        style={{ borderTop: '1px solid var(--color-border)' }}
                      >
                        <span className="font-mono text-[10px]" style={{ color: 'var(--color-dead)' }}>
                          {relatedPost.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-violet-light">
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
