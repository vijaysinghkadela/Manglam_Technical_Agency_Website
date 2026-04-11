// Security audit logging

type AuditEvent = {
  action: string
  timestamp: string
  ip: string
  userAgent?: string
  details?: Record<string, unknown>
  severity: 'low' | 'medium' | 'high' | 'critical'
}

/**
 * Log security events
 * In production, send to logging service (Sentry, LogRocket, etc.)
 */
export function logSecurityEvent(event: Omit<AuditEvent, 'timestamp'>): void {
  const auditEvent: AuditEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  }

  // Development: log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Security Audit]', auditEvent)
    return
  }

  // Production: Send to logging service
  // TODO: Implement webhook to logging service
  // Example: await fetch('https://api.loggingservice.com/security', { ... })

  // Critical events should be alerted immediately
  if (event.severity === 'critical') {
    // TODO: Send alert to ops team
    console.error('[CRITICAL Security Event]', auditEvent)
  }
}

/**
 * Log failed authentication attempts
 */
export function logFailedAuth(ip: string, reason: string, userAgent?: string): void {
  logSecurityEvent({
    action: 'auth_failed',
    ip,
    userAgent,
    details: { reason },
    severity: 'medium',
  })
}

/**
 * Log rate limit violations
 */
export function logRateLimit(ip: string, path: string): void {
  logSecurityEvent({
    action: 'rate_limit_exceeded',
    ip,
    details: { path },
    severity: 'low',
  })
}

/**
 * Log suspicious activity
 */
export function logSuspiciousActivity(ip: string, action: string, details?: Record<string, unknown>): void {
  logSecurityEvent({
    action: 'suspicious_activity',
    ip,
    details,
    severity: 'high',
  })
}
