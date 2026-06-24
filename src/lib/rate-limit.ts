const store = new Map<string, { count: number; resetAt: number }>()

/**
 * Simple in-memory rate limiter. Resets on cold start (acceptable for serverless).
 * @param identifier - typically the client IP
 * @param limit      - max requests allowed per window
 * @param windowMs   - window duration in milliseconds
 */
export function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60_000,
): { ok: boolean } {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }

  entry.count++
  if (entry.count > limit) return { ok: false }
  return { ok: true }
}

export function getClientIp(req: { headers: { get(name: string): string | null } }): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}
