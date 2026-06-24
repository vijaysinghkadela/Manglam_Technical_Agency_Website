import type { MetadataRoute } from 'next'
import { services } from '@/lib/data/services'

const BASE_URL = 'https://manglamtechnicalagency.com'

const DATES = {
  home:     '2025-01-15',
  core:     '2025-01-10',
  services: '2025-01-10',
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                     lastModified: DATES.home,     changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/services`,             lastModified: DATES.services, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contact`,              lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about`,               lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/portfolio`,            lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trust-center`,         lastModified: DATES.core,    changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/cybersecurity-policy`, lastModified: DATES.core,     changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/cybersecurity-training`, lastModified: DATES.core,   changeFrequency: 'monthly', priority: 0.5 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map(s => ({
    url:             `${BASE_URL}/services/${s.slug}`,
    lastModified:    DATES.services,
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))

  return [...staticPages, ...servicePages]
}
