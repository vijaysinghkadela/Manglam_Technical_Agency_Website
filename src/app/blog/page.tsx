import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/data/blog'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Blog"
        label="ENGINEERING & GROWTH"
        title="Thinking Aloud."
        subheading="Insights on modern web architecture, business automation, legal readiness, and delivery systems built for Indian businesses."
      />

      <section className="py-16 lg:py-24 bg-surface border-t border-border">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-border bg-card p-6 hover:border-violet/35 transition-colors flex flex-col"
              >
                <div className={`h-2 w-full bg-linear-to-r ${post.gradient} mb-5`} />
                <div className="flex items-center gap-3 text-label font-mono text-muted uppercase tracking-[0.14em] mb-3">
                  <time>{post.date}</time>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-display font-bold text-white mb-3 leading-tight">{post.title}</h2>
                <p className="text-sm text-muted leading-relaxed mb-6">{post.excerpt}</p>

                <div className="mt-auto inline-flex items-center gap-2 text-sm text-violet-light group-hover:text-white transition-colors">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
