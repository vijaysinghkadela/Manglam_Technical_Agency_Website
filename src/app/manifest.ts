import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manglam Technical Agency',
    short_name: 'MTA',
    description:
      'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#7C3AED',
    categories: ['business', 'technology', 'productivity'],
    lang: 'en-IN',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/icon.png',    sizes: '512x512', type: 'image/png' },
    ],
  }
}
