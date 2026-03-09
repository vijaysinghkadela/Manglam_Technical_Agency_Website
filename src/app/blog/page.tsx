import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { blogPosts } from '@/lib/data/blog'
import { BlogGrid } from '@/components/blog/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog & Engineering Insights',
  description:
    'Practical insights on modern web architecture, AI automation, cybersecurity, and digital operations for Indian businesses. Written by the MTA engineering team.',
  keywords: [
    'web development blog India',
    'AI automation insights',
    'cybersecurity Rajasthan blog',
    'digital agency blog',
    'Next.js tutorials India',
    'n8n automation guide',
  ],
  openGraph: {
    title:       'Blog & Engineering Insights | Manglam Technical Agency',
    description: 'Practical insights on web architecture, AI automation, cybersecurity, and digital operations for Indian businesses.',
    type:        'website',
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Blog"
        label="ENGINEERING & GROWTH"
        title="Thinking Aloud."
        subheading="Insights on modern web architecture, business automation, legal readiness, and delivery systems built for Indian businesses."
      />

      <BlogGrid posts={blogPosts} />
    </main>
  )
}
