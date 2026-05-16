type AuditEvent = {
  action: string
  timestamp: string
  ip: string
  userAgent?: string
  details?: Record<string, unknown>
  severity: 'low' | 'medium' | 'high' | 'critical'
}

const eventQueue: AuditEvent[] = []

function flushQueue(): void {
  if (eventQueue.length === 0) return
  const batch = eventQueue.splice(0)
  const webhookUrl = process.env.AUDIT_WEBHOOK_URL
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch, source: 'mta-website' }),
    }).catch(() => { /* fire-and-forget */ })
  }
}

export function logSecurityEvent(event: Omit<AuditEvent, 'timestamp'>): void {
  const auditEvent: AuditEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  }

  if (process.env.NODE_ENV === 'development') {
    eventQueue.push(auditEvent)
    return
  }

  eventQueue.push(auditEvent)
  if (event.severity === 'critical') {
    flushQueue()
  }
}

export function logFailedAuth(ip: string, reason: string, userAgent?: string): void {
  logSecurityEvent({
    action: 'auth_failed',
    ip, userAgent,
    details: { reason },
    severity: 'medium',
  })
}

export function logRateLimit(ip: string, path: string): void {
  logSecurityEvent({
    action: 'rate_limit_exceeded',
    ip,
    details: { path },
    severity: 'low',
  })
}

export function logSuspiciousActivity(ip: string, action: string, details?: Record<string, unknown>): void {
  logSecurityEvent({
    action: 'suspicious_activity',
    ip, details,
    severity: 'high',
  })
}
