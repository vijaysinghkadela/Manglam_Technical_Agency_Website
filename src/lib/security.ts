// Security utilities for sanitization and validation

/**
 * Escape HTML entities for safe rendering
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m] ?? m)
}

/**
 * Sanitize email address to prevent header injection
 */
export function sanitizeEmail(email: string): string {
  // Remove any newlines or control characters
  return email.replace(/[\r\n\x00-\x1F\x7F]/g, '').trim().toLowerCase()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitize user input for display
 * NOTE: For email templates, consider using DOMPurify or stripHTML instead
 * as HTML entities may display literally in some email clients
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  const trimmed = input.trim().slice(0, maxLength)
  return escapeHtml(trimmed)
}

/**
 * Strip HTML tags from input (better for email templates)
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '').replace(/&/g, '&amp;')
}

/**
 * Generate nonce for CSP
 */
export function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Enhanced input validation to detect malicious patterns
 * Uses more specific patterns to reduce false positives
 */
export function hasMaliciousInput(input: string): boolean {
  if (!input) return false;

  // More specific malicious patterns (with context)
  const maliciousPatterns = [
    // Script tags
    '<script[^>]*>',
    '</script>',
    // Event handlers with = sign (more specific)
    'on\\w+\\s*=',
    // JavaScript protocol
    'javascript:',
    // Dangerous properties
    'document\\.cookie',
    'window\\.location',
    // Code injection attempts
    'eval\\s*\\(',
    'document\\.write',
    'document\\.writeln',
    'Function\\s*\\(',
    // Dangerous HTML
    'innerHTML\\s*=',
    'outerHTML\\s*=',
    'insertAdjacentHTML',
    // iframe/object injection
    '<iframe',
    '<object',
    '<embed',
    // SQL injection (basic)
    'union\\s+select',
    'drop\\s+table',
    'insert\\s+into',
    'delete\\s+from',
    '--\\s',
    "'\\s*or\\s*'",
    "'\\s*and\\s*'",
    // Path traversal
    '\\.\\./',
    '\\.\\.\\\\',
    // Null bytes
    '\\x00',
    '\\u0000',
  ];

  const lowerInput = input.toLowerCase();
  return maliciousPatterns.some(pattern => {
    const regex = new RegExp(pattern, 'i');
    return regex.test(lowerInput);
  });
}

/**
 * Enhanced sanitization for rich text content
 */
export function sanitizeRichText(input: string): string {
  if (!input) return '';

  // Remove potentially dangerous HTML elements and attributes
  const dangerousTags = /<(script|iframe|object|embed|form|input|button|meta|link|base|xml|svg).*?>/gi;
  const dangerousAttributes = /(on\\w+|on\\w+="[^"]*"|javascript:|vbscript:)/gi;

  return input
    .replace(dangerousTags, '')
    .replace(dangerousAttributes, '')
    .substring(0, 5000); // Limit length
}

/**
 * Validate and sanitize phone numbers
 */
export function validatePhoneNumber(phone: string): string | null {
  if (!phone) return null;

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\\d+]/g, '');

  // Validate basic phone number format (India specific)
  const indiaPhoneRegex = /^(\\+91|91|0)?[6-9]\\d{9}$/;
  if (!indiaPhoneRegex.test(cleaned)) {
    return null;
  }

  return cleaned;
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  if (typeof crypto !== 'undefined') {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for environments without crypto
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

/**
 * Validate and sanitize URLs
 */
export function sanitizeUrl(url: string): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const allowedProtocols = ['https:', 'http:'];

    if (!allowedProtocols.includes(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Validate CSRF token
 */
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  
  // Use timing-safe comparison to prevent timing attacks
  const tokenBuffer = new TextEncoder().encode(token);
  const storedBuffer = new TextEncoder().encode(storedToken);
  
  if (tokenBuffer.length !== storedBuffer.length) return false;
  
  let result = 0;
  for (let i = 0; i < tokenBuffer.length; i++) {
    result |= tokenBuffer[i] ^ storedBuffer[i];
  }
  
  return result === 0;
}
