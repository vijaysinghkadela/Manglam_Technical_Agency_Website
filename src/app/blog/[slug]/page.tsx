import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { blogPosts, getPostBySlug } from '@/lib/data/blog'
import { CATEGORY_COLORS } from '@/components/blog/BlogGrid'
import { BlogPostContent } from '@/components/blog/BlogPostContent'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | MTA Blog`,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

function getRelatedPosts(currentSlug: string, category: string) {
  return blogPosts
    .filter(p => p.slug !== currentSlug && p.category === category)
    .slice(0, 2)
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, post.category)
  const categoryColors = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS['Web Development'] ?? {
    bg: 'rgba(107,26,26,0.08)',
    border: 'rgba(107,26,26,0.15)',
    text: '#6B1A1A'
  }

  return (
    <main className="min-h-screen bg-canvas">
      <BlogPostContent
        post={post}
        categoryColors={categoryColors}
        relatedPosts={relatedPosts}
        ease={EASE}
      />
    </main>
  )
}
