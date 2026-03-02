'use client';

import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Blog"
        label="ENGINEERING & GROWTH"
        title="Thinking Aloud."
        subheading="Insights on modern web architecture, business automation, and scaling digital infrastructure. No fluff, just signal."
      />

      <section className="py-24 bg-canvas">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group border-b border-[#1F1F1F] py-12 first:pt-0 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4" data-cursor="link">
                  <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-muted">
                    <span className="text-violet">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white group-hover:text-violet transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-base text-muted leading-relaxed max-w-3xl mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4 text-sm font-medium text-white group-hover:text-violet transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
