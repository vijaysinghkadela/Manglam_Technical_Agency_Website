import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development'
const enableStrictTransport =
  process.env.VERCEL === '1' ||
  process.env.ENABLE_STRICT_TRANSPORT_SECURITY === 'true'

// Note: 'unsafe-inline' for scripts/styles needed by Next.js inline bundles. Nonce-based CSP requires server rendering of all JS.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com https://vercel.live *.vercel.app`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.vercel.app https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(enableStrictTransport ? ['upgrade-insecure-requests'] : []),
].join('; ')

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=(), usb=(), midi=(), sync-xhr=()',
  },
  ...(enableStrictTransport
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless',
  },
]



const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: __dirname,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'media.dev.to', pathname: '/**' },
      { protocol: 'https', hostname: 'media2.dev.to', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'dev-to-uploads.s3.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'kommodo.ai', pathname: '/**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        // Handle trailing slashes
        {
          source: '/:path*/',
          destination: '/:path*',
        },
      ],
      fallback: [],
    }
  },

  // Redirects
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.manglamtechnicalagency.com',
          },
        ],
        destination: 'https://manglamtechnicalagency.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
