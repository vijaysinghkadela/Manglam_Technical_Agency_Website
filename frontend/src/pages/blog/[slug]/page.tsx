import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { blogPosts, getPostBySlug } from '@/lib/data/blog'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

function renderBody(content: string) {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      if (line.startsWith('- ')) {
        return (
          <li key={`${line}-${index}`} className="text-[15px] text-muted leading-[1.75]">
            {line.slice(2)}
          </li>
        )
      }

      if (/^\d+\./.test(line)) {
        return (
          <li key={`${line}-${index}`} className="text-[15px] text-muted leading-[1.75]">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        )
      }

      return (
        <p key={`${line}-${index}`} className="text-[16px] text-muted leading-[1.85]">
          {line}
        </p>
      )
    })
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const bodyNodes = renderBody(post.content)
  const listNodes = bodyNodes.filter((node) => node.type === 'li')
  const paragraphNodes = bodyNodes.filter((node) => node.type !== 'li')

  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Blog"
        breadcrumbBaseHref="/blog"
        breadcrumbCurrent={post.title.length > 36 ? `${post.title.slice(0, 36)}...` : post.title}
        label={post.category}
        title={post.title}
        subheading={post.excerpt}
      />

      <section className="bg-canvas border-b border-border">
        <div className="container-site max-w-4xl py-8">
          <div className="flex flex-wrap items-center gap-6 text-[12px] font-mono text-muted uppercase tracking-[0.14em]">
            <div className="flex items-center gap-2">
              <span className="text-violet-light">Author</span>
              <span className="text-white font-body normal-case text-sm">{post.author}</span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2">
              <span className="text-violet-light">Published</span>
              <span className="text-white font-body normal-case text-sm">{post.date}</span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2">
              <span className="text-violet-light">Reading Time</span>
              <span className="text-white font-body normal-case text-sm">{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-surface border-b border-border">
        <article className="container-site max-w-4xl border border-border bg-card p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">{paragraphNodes}</div>
          {listNodes.length > 0 && <ul className="mt-6 space-y-3">{listNodes}</ul>}
        </article>

        <div className="container-site max-w-4xl mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] border border-border text-sm text-white hover:border-violet hover:bg-violet/10 transition-colors"
          >
            ← Back to Insights
          </Link>
        </div>
      </section>
    </main>
  )
}
