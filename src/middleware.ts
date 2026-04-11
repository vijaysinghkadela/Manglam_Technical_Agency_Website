import { NextResponse, type NextRequest } from 'next/server'

// Rate limiting with IP-based tracking
// For production with serverless (Vercel), use Redis (Upstash) instead of in-memory Map
// This Map won't persist across serverless function invocations
const rateLimit = new Map<string, { count: number; timestamp: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // Max 5 requests per minute per IP

// Allowed origins for CORS - configured via environment variable or fallback to defaults
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') ?? [
  'https://manglamtechnicalagency.com',
  'https://www.manglamtechnicalagency.com',
  'http://localhost:3000',
]

/**
 * Get client IP from request headers with proxy support
 * Handles various proxy/CDN header formats
 */
function getClientIP(request: NextRequest): string {
  // Check for Cloudflare
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  if (cfConnectingIp) return cfConnectingIp

  // Check for X-Forwarded-For (most common, may contain multiple IPs)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // Take the first IP (closest to client through proxies)
    const firstIp = forwardedFor.split(',')[0]?.trim()
    if (firstIp && firstIp !== '127.0.0.1' && firstIp !== '::1') {
      return firstIp
    }
  }

  // Check for X-Real-IP (used by Nginx, Vercel)
  const realIp = request.headers.get('x-real-ip')
  if (realIp && realIp !== '127.0.0.1' && realIp !== '::1') {
    return realIp
  }

  // Check for forwarded header (RFC 7239)
  const forwarded = request.headers.get('forwarded')
  if (forwarded) {
    const match = forwarded.match(/for=\[?([^;\]]+)\]?/)
    if (match?.[1]) return match[1]
  }

  // Fallback: use socket remote address (NextRequest doesn't have .ip property directly)
  return 'unknown'
}

/**
 * Check for malicious patterns in request
 */
function hasMaliciousPatterns(url: string, headers: Headers): boolean {
  // Check for XSS attempts in the URL - using more specific patterns
  const suspiciousPatterns = [
    'onload=',
    'onerror=',
    'javascript:',
    'vbscript:',
    'data:text/html',
    '<script',
    'eval(',
    'alert(',
    '<img onerror',
    'document.cookie',
  ];

  const urlStr = url.toLowerCase();
  const hasXSS = suspiciousPatterns.some(pattern => urlStr.includes(pattern));

  // Check for SQL injection patterns in headers
  const sqlPatterns = [
    'union select',
    'drop table',
    'insert into',
    'delete from',
  ];

  let hasSQL = false;
  headers.forEach((value) => {
    const lowerValue = value.toLowerCase();
    if (sqlPatterns.some(pattern => lowerValue.includes(pattern))) {
      hasSQL = true;
    }
  });

  return hasXSS || hasSQL;
}

/**
 * Check if request should be rate limited
 * NOTE: For serverless/Vercel, this won't persist across function instances.
 * Use Redis (Upstash) for production rate limiting.
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Reset if window has passed
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Check limit
  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

/**
 * Clean up old rate limit entries periodically (every 5 minutes)
 */
function cleanupRateLimit(): void {
  const now = Date.now()
  for (const [ip, record] of rateLimit.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
      rateLimit.delete(ip)
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimit, 5 * 60 * 1000)

/**
 * Get appropriate CORS origin
 */
function getCorsOrigin(request: NextRequest): string {
  const origin = request.headers.get('origin')
  
  // Check if origin is in allowed list
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return origin
  }
  
  // Default to the main domain
  return 'https://manglamtechnicalagency.com'
}

export function middleware(request: NextRequest) {
  // Enhanced security checks for all requests
  const url = request.url;

  // Check for malicious patterns in all requests
  if (hasMaliciousPatterns(url, request.headers)) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Security violation detected. Request blocked.',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  // Only apply rate limiting to API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    // Add security headers for all responses
    const response = NextResponse.next()
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    return response
  }

  const ip = getClientIP(request)

  // Check rate limit
  if (isRateLimited(ip)) {
    const response = new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Too many requests. Please try again later.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    )
    return response
  }

  // Create response with CORS headers for API routes
  const response = NextResponse.next()

  // Add CORS headers for API routes - restrict to allowed origins
  const corsOrigin = getCorsOrigin(request)
  response.headers.set('Access-Control-Allow-Origin', corsOrigin)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Vary', 'Origin')

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Add proxy-related headers for debugging
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Client-IP', ip)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
