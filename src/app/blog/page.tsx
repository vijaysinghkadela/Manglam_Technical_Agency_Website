'use client';

import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';
import { motion } from 'framer-motion';

const categoryColors: Record<string, string> = {
  'Web Development': 'bg-lime/15 text-lime',
  'Marketing': 'bg-pink/15 text-pink',
  'Cybersecurity': 'bg-royal/15 text-royal',
  'AI': 'bg-violet/15 text-violet',
};

const categoryGradients: Record<string, string> = {
  'Web Development': 'from-lime/30 via-lime/10 to-transparent',
  'Marketing': 'from-pink/30 via-pink/10 to-transparent',
  'Cybersecurity': 'from-royal/30 via-royal/10 to-transparent',
  'AI': 'from-violet/30 via-violet/10 to-transparent',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Blog"
        label="ENGINEERING & GROWTH"
        title="Thinking Aloud."
        subheading="Insights on modern web architecture, business automation, and scaling digital infrastructure. No fluff, just signal."
      />

      <section className="py-24 bg-surface rounded-t-[60px] border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => {
              const colorCls = categoryColors[post.category] || 'bg-violet/15 text-violet';
              const gradientCls = categoryGradients[post.category] || 'from-violet/30 via-violet/10 to-transparent';

              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full" data-cursor="link">
                    <div className="bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:border-violet/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] hover:-translate-y-2 flex flex-col h-full">

                      {/* Abstract gradient thumbnail */}
                      <div className={`h-40 bg-linear-to-br ${gradientCls} relative overflow-hidden`}>
                        <div className="absolute inset-0 dot-grid opacity-40" />
                        <div className="absolute bottom-4 left-6">
                          <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider ${colorCls}`}>
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col gap-4 flex-1">
                        <div className="flex items-center gap-3 text-[11px] font-mono text-muted uppercase tracking-widest">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{post.readTime}</span>
                        </div>

                        <h2 className="text-xl font-display font-bold text-white group-hover:text-lime transition-colors duration-300 leading-tight line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-sm text-muted leading-relaxed line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border text-sm font-semibold text-white group-hover:text-lime transition-colors duration-300">
                          Read Article
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
