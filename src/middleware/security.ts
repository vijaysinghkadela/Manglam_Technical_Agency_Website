import { NextResponse, NextRequest } from "next/server";
import { escapeHtml, sanitizeInput } from '@/lib/security';

// Security middleware to enhance protection
export async function securityMiddleware(request: NextRequest) {
  // Enhanced security checks
  const url = new URL(request.url);
  
  // Check for malicious patterns in URL
  const suspiciousPatterns = [
    'onload',
    'onerror',
    'javascript:',
    'vbscript:',
    'data:',
    'script',
    'eval',
    'alert',
    'img src',
    'img onerror'
  ];
  
  // Check for XSS attempts in the URL or parameters
  const urlStr = url.toString();
  const hasXSS = suspiciousPatterns.some(pattern => urlStr.toLowerCase().includes(pattern));
  
  if (hasXSS) {
    return NextResponse.next();
  }
  
  // Add security headers
  const response = NextResponse.next();
  response.headers.set('XSS-Protection-Check', '1');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}