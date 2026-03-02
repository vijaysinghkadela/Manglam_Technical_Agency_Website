import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://manglamtechnicalagency.com';

  const staticPages = [
    '', '/about', '/services', '/portfolio', '/pricing', '/blog', '/contact',
    '/legal/privacy-policy', '/legal/terms-of-service', '/legal/nda',
  ];

  const serviceSlugs = [
    'web-development', 'social-media-marketing', 'cybersecurity',
    'ai-automation', 'saas-licensing', 'data-processing', 'contractor-management',
  ];

  const blogSlugs = [
    'why-every-indian-business-needs-a-website-in-2026',
    'social-media-automation-save-10-hours-a-week',
    'top-5-cybersecurity-mistakes-indian-smes-make',
    'how-ai-automation-cut-manual-work-by-70-percent',
    'understanding-indian-it-act-what-your-business-must-know',
    'from-brief-to-launch-how-mta-builds-websites-in-3-weeks',
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
