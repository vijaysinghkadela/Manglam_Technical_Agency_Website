/**
 * JSON-LD structured data schema builders for Manglam Technical Agency.
 * Usage: import the schema you need and render via <JsonLd schema={...} />
 */

const BASE_URL = 'https://manglamtechnicalagency.com'

// ── Organisation / Local Business ─────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${BASE_URL}/#organization`,
    name: 'Manglam Technical Agency',
    alternateName: 'MTA',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/mta-logo-dark.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/opengraph-image.png`,
    description:
      'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, social media, and digital operations. Based in Rajasthan and registered under Udyam in 2025.',
    email: 'manglamtechnicalagency@gmail.com',
    telephone: '+91-8003903572',
    foundingDate: '2025',
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'State', name: 'Rajasthan' },
      { '@type': 'City', name: 'Bikaner' },
      { '@type': 'City', name: 'Nagaur' },
      { '@type': 'City', name: 'Jodhpur' },
      { '@type': 'City', name: 'Jaipur' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rampole Choraha',
      addressLocality: 'Bikaner',
      addressRegion: 'Rajasthan',
      postalCode: '341001',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8003903572',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      },
    ],
    sameAs: [
      'https://wa.me/918003903572',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Technology Services for Indian Businesses',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web & App Development', url: `${BASE_URL}/services/saas-products` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation', url: `${BASE_URL}/services/ai-automation` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersecurity', url: `${BASE_URL}/services/cybersecurity` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing', url: `${BASE_URL}/services/social-media-marketing` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding', url: `${BASE_URL}/services/branding` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Creation', url: `${BASE_URL}/services/content-creation` } },
      ],
    },
    knowsAbout: [
      'Web Development',
      'AI Automation',
      'Cybersecurity',
      'Social Media Marketing',
      'SaaS Development',
      'IT Act Compliance',
      'n8n Automation',
      'Next.js',
      'Rajasthan Technology Services',
      'DPDP-aware contact forms',
      'WhatsApp automation',
      'Local business websites',
    ],
    slogan: 'Empowering Your Digital Future',
  }
}

// ── Website schema ─────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Manglam Technical Agency',
    description: 'End-to-end technology services for Indian businesses.',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-IN',
  }
}

// ── WebPage schema ─────────────────────────────────────────────────────────

export function webPageSchema({
  url,
  title,
  description,
  dateModified,
}: {
  url: string
  title: string
  description: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}${url}#webpage`,
    url: `${BASE_URL}${url}`,
    name: title,
    description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: 'en-IN',
    ...(dateModified ? { dateModified } : {}),
  }
}

// ── BreadcrumbList schema ──────────────────────────────────────────────────

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

// ── Service schema ─────────────────────────────────────────────────────────

export function serviceSchema({
  name,
  description,
  url,
  price,
  category,
}: {
  name: string
  description: string
  url: string
  price?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}${url}#service`,
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: { '@id': `${BASE_URL}/#organization` },
    serviceType: category ?? name,
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'State', name: 'Rajasthan' },
      { '@type': 'City', name: 'Bikaner' },
      { '@type': 'City', name: 'Nagaur' },
      { '@type': 'City', name: 'Jodhpur' },
    ],
    ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'INR' } } : {}),
  }
}

// ── FAQ schema ─────────────────────────────────────────────────────────────

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

// ── Blog Article schema ────────────────────────────────────────────────────

export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}${url}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    publisher: { '@id': `${BASE_URL}/#organization` },
    author: {
      '@type': 'Organization',
      name: author ?? 'Manglam Technical Agency',
      url: BASE_URL,
    },
    image: `${BASE_URL}/og-image.png`,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${BASE_URL}/#website` },
  }
}
