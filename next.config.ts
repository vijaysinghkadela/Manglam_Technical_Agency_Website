import type { NextConfig } from "next";

// Generate nonce for CSP on each request
// Note: For production, implement proper nonce generation in middleware
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
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    // Removed 'unsafe-inline' and 'unsafe-eval' for scripts
    // Added strict-dynamic for scripts that need it
    value: "default-src 'self'; script-src 'self' 'nonce-{nonce}' 'strict-dynamic' *.vercel.app; style-src 'self' 'nonce-{nonce}'; img-src 'self' data: https: blob:; font-src 'self'; connect-src 'self' https://api.resend.dev https://*.vercel.app; frame-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;",
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
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

  // Proxy rewrites for API routes
  async rewrites() {
    return {
      beforeFiles: [
        // Proxy external APIs through Next.js to avoid CORS and hide API keys
        {
          source: '/api/proxy/resend/:path*',
          destination: 'https://api.resend.dev/:path*',
        },
      ],
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
