import type { Metadata } from 'next'
import { blogPosts } from '@/lib/data/blog'
import { BlogPageContent } from '@/components/blog/BlogPageContent'

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
    title: 'Blog & Engineering Insights | Manglam Technical Agency',
    description: 'Practical insights on web architecture, AI automation, cybersecurity, and digital operations for Indian businesses.',
    type: 'website',
  },
}

export default function BlogPage() {
  return <BlogPageContent posts={blogPosts} />
}
