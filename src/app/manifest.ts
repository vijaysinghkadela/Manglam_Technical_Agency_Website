import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manglam Technical Agency',
    short_name: 'MTA',
    description:
      'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080808',
    theme_color: '#6B1A1A',
    categories: ['business', 'technology', 'productivity'],
    lang: 'en-IN',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/images/mta-logo-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/images/mta-logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
