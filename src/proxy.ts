import { NextResponse, type NextRequest } from 'next/server'
import { createApiPreflightResponse, setApiCorsHeaders, setSecurityHeaders } from '@/lib/api-security'

function hasMaliciousPatterns(url: string, headers: Headers): boolean {
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
  ]

  const urlStr = url.toLowerCase()
  const hasXss = suspiciousPatterns.some((pattern) => urlStr.includes(pattern))

  const sqlPatterns = ['union select', 'drop table', 'insert into', 'delete from']
  let hasSql = false

  headers.forEach((value) => {
    const lowerValue = value.toLowerCase()
    if (sqlPatterns.some((pattern) => lowerValue.includes(pattern))) {
      hasSql = true
    }
  })

  return hasXss || hasSql
}

/**
 * Proxy handler - replaces deprecated middleware.ts.
 * Rate limiting is intentionally handled inside write API routes so production
 * can use durable Upstash Redis state instead of edge/serverless memory.
 */
export async function proxy(request: NextRequest) {
  if (hasMaliciousPatterns(request.url, request.headers)) {
    const response = NextResponse.json(
      { success: false, message: 'Security violation detected. Request blocked.' },
      { status: 403 },
    )
    setSecurityHeaders(response)
    return response
  }

  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')

  if (isApiRoute && request.method === 'OPTIONS') {
    return createApiPreflightResponse(request)
  }

  const response = NextResponse.next()
  setSecurityHeaders(response)

  if (isApiRoute) {
    setApiCorsHeaders(response, request)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
