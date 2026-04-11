import type { MetadataRoute } from 'next'
import { blogPosts }                            from '@/lib/data/blog'
import { agreementSummaries, policyDocuments } from '@/lib/data/legal'
import { services }                             from '@/lib/data/services'

const BASE_URL = 'https://manglamtechnicalagency.com'

const DATES = {
  home:     '2025-01-15',
  core:     '2025-01-10',
  services: '2025-01-10',
  legal:    '2025-01-05',
  blog:     '2025-01-12',
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                     lastModified: DATES.home,     changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/services`,             lastModified: DATES.services, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contact`,              lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about`,               lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/portfolio`,            lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pricing`,              lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`,                 lastModified: DATES.blog,     changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/research`,             lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/legal`,               lastModified: DATES.legal,    changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/trust-center`,         lastModified: DATES.legal,    changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/cybersecurity-policy`, lastModified: DATES.legal,    changeFrequency: 'monthly', priority: 0.5 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map(s => ({
    url:             `${BASE_URL}/services/${s.slug}`,
    lastModified:    DATES.services,
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map(p => ({
    url:             `${BASE_URL}/blog/${p.slug}`,
    lastModified:    DATES.blog,
    changeFrequency: 'weekly' as const,
    priority:        0.7,
  }))

  const legalPolicyPages: MetadataRoute.Sitemap = policyDocuments.map(p => ({
    url:             `${BASE_URL}/legal/${p.slug}`,
    lastModified:    DATES.legal,
    changeFrequency: 'monthly' as const,
    priority:        0.5,
  }))

  const agreementPages: MetadataRoute.Sitemap = agreementSummaries
    .filter(a => a.visibility !== 'internal')
    .map(a => ({
      url:             `${BASE_URL}/legal/agreements/${a.slug}`,
      lastModified:    DATES.legal,
      changeFrequency: 'monthly' as const,
      priority:        0.4,
    }))

  return [...staticPages, ...servicePages, ...blogPages, ...legalPolicyPages, ...agreementPages]
}
