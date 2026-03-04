import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/data/blog'
import { agreementSummaries, policyDocuments } from '@/lib/data/legal'
import { services } from '@/lib/data/services'

const baseUrl = 'https://manglamtechnicalagency.com'

const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/pricing',
  '/research',
  '/legal',
  '/blog',
  '/contact',
  '/trust-center',
  '/cybersecurity-policy',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const legalPolicyPages = policyDocuments.map((policy) => ({
    url: `${baseUrl}/legal/${policy.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const agreementPages = agreementSummaries
    .filter((agreement) => agreement.visibility !== 'internal')
    .map((agreement) => ({
      url: `${baseUrl}/legal/agreements/${agreement.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticPages, ...servicePages, ...blogPages, ...legalPolicyPages, ...agreementPages]
}
