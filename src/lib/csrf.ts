// CSRF Protection utilities

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Store CSRF token in session (using cookie for simplicity)
 * In production, use Redis or database sessions
 */
export function getCSRFTokenCookie(): string {
  // Check if we're in browser
  if (typeof document === 'undefined') return ''
  
  const match = document.cookie.match(/csrf-token=([^;]+)/)
  return match ? match[1] : ''
}

/**
 * Set CSRF token cookie
 */
export function setCSRFTokenCookie(token: string): void {
  if (typeof document === 'undefined') return
  
  // Secure cookie settings
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `csrf-token=${token}; Path=/; SameSite=Strict${secure}; Max-Age=3600`
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false
  
  // Timing-safe comparison
  let result = 0
  for (let i = 0; i < token.length && i < storedToken.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i)
  }
  return result === 0 && token.length === storedToken.length
}
