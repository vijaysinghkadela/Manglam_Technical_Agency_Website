import { NextResponse, type NextRequest } from 'next/server'

type RateLimitResult =
  | { allowed: true; limit: number; remaining: number; retryAfter: number }
  | { allowed: false; limit: number; remaining: 0; retryAfter: number; status: 429 | 503; message: string }

const devRateLimit = new Map<string, { count: number; resetAt: number }>()

const DEFAULT_ALLOWED_ORIGINS = [
  'https://manglamtechnicalagency.com',
  'https://www.manglamtechnicalagency.com',
  'http://localhost:3000',
]

const WRITE_METHODS = ['POST', 'OPTIONS']
const DEFAULT_RATE_LIMIT_WINDOW_SECONDS = 60
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 5
const DEFAULT_MAX_JSON_BYTES = 32 * 1024

export const API_SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

export function getAllowedOrigins(): string[] {
  return (process.env.ALLOWED_ORIGINS?.split(',') ?? DEFAULT_ALLOWED_ORIGINS)
    .map((origin) => origin.trim())
    .filter(Boolean)
}

export function isAllowedOrigin(origin: string | null): boolean {
  return !origin || getAllowedOrigins().includes(origin)
}

export function getClientIp(request: NextRequest): string {
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  if (cfConnectingIp) return cfConnectingIp

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim()
    if (firstIp && firstIp !== '127.0.0.1' && firstIp !== '::1') return firstIp
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp && realIp !== '127.0.0.1' && realIp !== '::1') return realIp

  const forwarded = request.headers.get('forwarded')
  if (forwarded) {
    const match = forwarded.match(/for=\[?([^;\]]+)\]?/)
    if (match?.[1]) return match[1]
  }

  return 'unknown'
}

export function getCorsOrigin(request: NextRequest): string {
  const origin = request.headers.get('origin')
  if (origin && getAllowedOrigins().includes(origin)) return origin
  return 'https://manglamtechnicalagency.com'
}

export function setApiCorsHeaders(response: NextResponse, request: NextRequest): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', getCorsOrigin(request))
  response.headers.set('Access-Control-Allow-Methods', WRITE_METHODS.join(', '))
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Vary', 'Origin')
  return response
}

export function setSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(API_SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
}

export function createApiResponse(
  request: NextRequest,
  body: Record<string, unknown>,
  init: ResponseInit = {},
): NextResponse {
  const response = NextResponse.json(body, init)
  setApiCorsHeaders(response, request)
  setSecurityHeaders(response)
  return response
}

export function createApiPreflightResponse(request: NextRequest): NextResponse {
  const response = new NextResponse(null, { status: 204 })
  setApiCorsHeaders(response, request)
  setSecurityHeaders(response)
  response.headers.set('Allow', 'OPTIONS, POST')
  return response
}

export function createRateLimitResponse(request: NextRequest, result: Extract<RateLimitResult, { allowed: false }>) {
  const response = createApiResponse(
    request,
    { success: false, message: result.message },
    { status: result.status },
  )
  response.headers.set('Retry-After', String(result.retryAfter))
  response.headers.set('X-RateLimit-Limit', String(result.limit))
  response.headers.set('X-RateLimit-Remaining', '0')
  return response
}

function getRateLimitConfig() {
  const windowSeconds = Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || DEFAULT_RATE_LIMIT_WINDOW_SECONDS
  const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || DEFAULT_RATE_LIMIT_MAX_REQUESTS

  return {
    windowSeconds: Math.max(1, windowSeconds),
    maxRequests: Math.max(1, maxRequests),
  }
}

function checkDevRateLimit(key: string, limit: number, windowSeconds: number): RateLimitResult {
  const now = Date.now()
  const windowMs = windowSeconds * 1000
  const entry = devRateLimit.get(key)

  if (!entry || now > entry.resetAt) {
    devRateLimit.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, limit, remaining: limit - 1, retryAfter: windowSeconds }
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      status: 429,
      message: 'Too many requests. Please try again later.',
    }
  }

  entry.count += 1
  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - entry.count),
    retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
  }
}

async function checkUpstashRateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      retryAfter: windowSeconds,
      status: 503,
      message: 'Request protection is not configured. Please try again later.',
    }
  }

  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(windowSeconds)],
      ]),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Upstash rate limit failed with ${response.status}`)
    }

    const data = (await response.json()) as Array<{ result?: unknown }>
    const count = Number(data[0]?.result)

    if (!Number.isFinite(count)) {
      throw new Error('Upstash rate limit returned an invalid count')
    }

    if (count > limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        retryAfter: windowSeconds,
        status: 429,
        message: 'Too many requests. Please try again later.',
      }
    }

    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - count),
      retryAfter: windowSeconds,
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Security] Rate limit error:', error)
    }
    return {
      allowed: false,
      limit,
      remaining: 0,
      retryAfter: windowSeconds,
      status: 503,
      message: 'Request protection is temporarily unavailable. Please try again later.',
    }
  }
}

export async function checkWriteRateLimit(request: NextRequest, scope: string): Promise<RateLimitResult> {
  const { maxRequests, windowSeconds } = getRateLimitConfig()
  const ip = getClientIp(request)
  const key = `mta:rate-limit:${scope}:${ip}`

  if (process.env.NODE_ENV !== 'production') {
    return checkDevRateLimit(key, maxRequests, windowSeconds)
  }

  return checkUpstashRateLimit(key, maxRequests, windowSeconds)
}

export async function parseJsonBody<T = unknown>(request: NextRequest, maxBytes = DEFAULT_MAX_JSON_BYTES): Promise<T> {
  const origin = request.headers.get('origin')
  const fetchSite = request.headers.get('sec-fetch-site')
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? ''

  if (!isAllowedOrigin(origin) || fetchSite === 'cross-site') {
    throw new Error('DISALLOWED_ORIGIN')
  }

  if (contentType.split(';')[0]?.trim() !== 'application/json') {
    throw new Error('UNSUPPORTED_MEDIA_TYPE')
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (contentLength > maxBytes) {
    throw new Error('PAYLOAD_TOO_LARGE')
  }

  const raw = await request.text()
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    throw new Error('PAYLOAD_TOO_LARGE')
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    throw new Error('INVALID_JSON')
  }
}

export function createJsonParseErrorResponse(request: NextRequest, error: unknown): NextResponse | null {
  if (!(error instanceof Error)) return null

  if (error.message === 'PAYLOAD_TOO_LARGE') {
    return createApiResponse(
      request,
      { success: false, message: 'Request payload is too large.' },
      { status: 413 },
    )
  }

  if (error.message === 'INVALID_JSON') {
    return createApiResponse(
      request,
      { success: false, message: 'Invalid JSON payload.' },
      { status: 400 },
    )
  }

  if (error.message === 'UNSUPPORTED_MEDIA_TYPE') {
    return createApiResponse(
      request,
      { success: false, message: 'Content-Type must be application/json.' },
      { status: 415 },
    )
  }

  if (error.message === 'DISALLOWED_ORIGIN') {
    return createApiResponse(
      request,
      { success: false, message: 'Request origin is not allowed.' },
      { status: 403 },
    )
  }

  return null
}
