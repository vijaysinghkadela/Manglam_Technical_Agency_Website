import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { allMarketResearch, getMarketResearchBySlug, categoryLabels } from '@/lib/data/ai-market-research-index'
import { MarketResearchArticleContent } from '@/components/research/MarketResearchArticleContent'

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getMarketResearchBySlug(slug)
  if (!article) return { title: 'Research Not Found' }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      authors: [article.author],
      publishedTime: article.date,
    },
  }
}

export function generateStaticParams() {
  return allMarketResearch.map((article) => ({ slug: article.slug }))
}

export default async function MarketResearchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getMarketResearchBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[60vh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-8%',
            top: '10%',
            width: 'clamp(300px, 38vw, 660px)',
            height: 'clamp(300px, 38vw, 660px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,26,26,0.07) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-28 lg:pt-36 pb-12 lg:pb-16">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono mb-8 lg:mb-12"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/research" className="hover-foreground transition-colors">RESEARCH</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>{categoryLabels[article.category].toUpperCase()}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-6">
            <span
              className="font-mono uppercase px-3 py-1.5"
              style={{
                fontSize: '10px',
                color: 'var(--color-violet-light)',
                letterSpacing: '0.22em',
                border: '1px solid rgba(107,26,26,0.35)',
              }}
            >
              {categoryLabels[article.category]}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-black leading-tight tracking-normal mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', color: 'var(--color-foreground)' }}
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          <p
            className="mb-8 max-w-3xl"
            style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--color-muted)', fontStyle: 'italic' }}
          >
            {article.subtitle}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-6 text-[12px] font-mono uppercase tracking-[0.14em]" style={{ color: 'var(--color-muted)' }}>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-violet-light)' }}>Author</span>
              <span className="text-white">{article.author}</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-violet-light)' }}>Published</span>
              <span className="text-white">{article.date}</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-violet-light)' }}>Reading Time</span>
              <span className="text-white">{article.readTime}</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-violet-light)' }}>Version</span>
              <span className="text-white">{article.meta.version}</span>
            </div>
          </div>

          {/* Stats Grid (if available) */}
          {article.stats && article.stats.length > 0 && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {article.stats.slice(0, 4).map((stat, index) => (
                <div
                  key={index}
                  className="p-4"
                  style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-card)' }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)' }}>
                    {stat.label}
                  </p>
                  <p className="font-display font-black text-xl" style={{ color: 'var(--color-foreground)' }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <MarketResearchArticleContent article={article} />

      {/* Related Articles */}
      <RelatedArticles currentSlug={article.slug} category={article.category} />

      {/* CTA Section */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(48px, 8vw, 96px) 0' }}
      >
        <div className="container-site">
          <div className="flex flex-col items-center text-center gap-6">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.24em' }}
            >
              NEXT STEPS
            </span>
            <h2
              className="font-display font-black tracking-normal leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--color-foreground)' }}
            >
              Ready to Implement AI Automation?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-muted)', maxWidth: '480px', lineHeight: 1.72 }}>
              Book a free 30-minute AI readiness audit. We will assess your current workflows, identify automation opportunities, and provide a clear ROI calculation.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-display font-black text-[15px] transition-all duration-300 hover:bg-violet hover:text-white"
                style={{ backgroundColor: 'var(--color-foreground)', color: 'var(--color-canvas)' }}
              >
                Book Free Audit →
              </Link>
              <Link
                href="/services/ai-automation"
                className="inline-flex items-center gap-2 px-6 py-4 font-display font-bold text-[15px] transition-all duration-300"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
              >
                View AI Services →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Related Articles Component
function RelatedArticles({ currentSlug, category }: { currentSlug: string; category: 'market-analysis' | 'technical' | 'case-study' | 'pricing' | 'compliance' }) {
  const related = allMarketResearch
    .filter((article) => article.slug !== currentSlug)
    .filter((article) => article.category === category)
    .slice(0, 2)

  if (related.length === 0) {
    // If no related in same category, get any other articles
    const anyRelated = allMarketResearch
      .filter((article) => article.slug !== currentSlug)
      .slice(0, 2)
    
    if (anyRelated.length === 0) return null
    
    return (
      <section className="border-t border-border" style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(48px, 8vw, 80px) 0' }}>
        <div className="container-site">
          <span
            className="font-mono uppercase block mb-4"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            RELATED RESEARCH
          </span>
          <h2
            className="font-display font-black mb-10"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'var(--color-foreground)' }}
          >
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anyRelated.map((article) => (
              <Link
                key={article.slug}
                href={`/research/${article.slug}`}
                className="group flex flex-col gap-4 p-6 transition-all duration-300 border border-border hover:border-violet/35"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'var(--color-violet-light)' }}
                >
                  {categoryLabels[article.category]}
                </span>
                <h3
                  className="font-display font-bold"
                  style={{ fontSize: '18px', color: 'var(--color-foreground)' }}
                >
                  {article.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  {article.excerpt.slice(0, 120)}...
                </p>
                <span
                  className="font-mono text-xs mt-2 transition-colors group-hover:text-violet"
                  style={{ color: 'var(--color-dead)' }}
                >
                  Read Article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="border-t border-border" style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(48px, 8vw, 80px) 0' }}>
      <div className="container-site">
        <span
          className="font-mono uppercase block mb-4"
          style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
        >
          MORE IN {categoryLabels[category].toUpperCase()}
        </span>
        <h2
          className="font-display font-black mb-10"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'var(--color-foreground)' }}
        >
          Continue Reading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {related.map((article) => (
            <Link
              key={article.slug}
              href={`/research/${article.slug}`}
              className="group flex flex-col gap-4 p-6 transition-all duration-300 border border-border hover:border-violet/35"
              style={{ backgroundColor: 'var(--color-card)' }}
            >
              <h3
                className="font-display font-bold"
                style={{ fontSize: '18px', color: 'var(--color-foreground)' }}
              >
                {article.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                {article.excerpt.slice(0, 120)}...
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <span className="font-mono text-xs" style={{ color: 'var(--color-dead)' }}>
                  {article.readTime}
                </span>
                <span
                  className="font-mono text-xs transition-colors group-hover:text-violet"
                  style={{ color: 'var(--color-violet-light)' }}
                >
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}



