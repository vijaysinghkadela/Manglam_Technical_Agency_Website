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

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(56px, 9vw, 96px) 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
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
                  <div
                    className="flex items-center gap-3 font-mono uppercase tracking-[0.14em] mb-4"
                    style={{ fontSize: '10px', color: 'var(--color-muted)' }}
                  >
                    <time>{post.date}</time>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
                    <span>{post.readTime}</span>
                  </div>

                  <h2
                    className="font-display font-bold mb-3 leading-tight transition-colors duration-200 group-hover:text-violet-light"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: 'var(--color-foreground)', lineHeight: 1.25 }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--color-muted)', lineHeight: 1.72 }}>
                    {post.excerpt}
                  </p>

                  <div
                    className="mt-auto inline-flex items-center gap-2 text-sm font-mono transition-colors duration-200"
                    style={{ color: 'var(--color-violet-light)' }}
                  >
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
