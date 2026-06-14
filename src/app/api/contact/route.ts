import { NextRequest } from 'next/server'
import { z } from 'zod'
import { sendAdminEmail } from '@/lib/email'
import { sanitizeEmail, sanitizeInput } from '@/lib/security'
import {
  checkWriteRateLimit,
  createApiResponse,
  createJsonParseErrorResponse,
  createRateLimitResponse,
  getClientIp,
  parseJsonBody,
} from '@/lib/api-security'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  service: z.string().min(1).max(50),
  budget: z.string().min(1).max(50),
  timeline: z.string().min(1).max(50),
  message: z.string().min(20).max(2000),
  privacy: z.literal(true),
  followUpConsent: z.boolean().optional().default(false),
  sensitiveDataConsent: z.boolean().optional().default(false),
  consentTimestamp: z.string().max(50).optional(),
  consentPurpose: z.string().max(100).optional(),
  consentUserAgent: z.string().max(500).optional(),
})

type ContactData = z.infer<typeof schema> & {
  serverConsentTimestamp: string
  serverConsentIP: string
  serverUserAgent: string
}

function buildHtml(data: ContactData): string {
  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const safeName = sanitizeInput(data.name, 100)
  const safeEmail = sanitizeInput(data.email, 100)
  const safePhone = data.phone ? sanitizeInput(data.phone, 20) : ''
  const safeCompany = data.company ? sanitizeInput(data.company, 100) : ''
  const safeService = sanitizeInput(data.service, 50)
  const safeBudget = sanitizeInput(data.budget, 50)
  const safeTimeline = sanitizeInput(data.timeline, 50)
  const safeMessage = sanitizeInput(data.message, 2000).replace(/\n/g, '<br>')
  const safeConsentTimestamp = data.consentTimestamp ? sanitizeInput(data.consentTimestamp, 50) : 'Not supplied'
  const safeServerConsentTimestamp = sanitizeInput(data.serverConsentTimestamp, 50)
  const safeConsentPurpose = data.consentPurpose ? sanitizeInput(data.consentPurpose, 100) : 'contact-form-submission'
  const safeServerConsentIP = sanitizeInput(data.serverConsentIP, 80)
  const safeUserAgent = sanitizeInput(data.consentUserAgent ?? data.serverUserAgent, 500)

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#0d0d0e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0e;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#16161a;border:1px solid #27272a;max-width:600px;">

<!-- Header -->
<tr>
<td style="padding:32px 40px;border-bottom:1px solid #27272a;">
<span style="font-family:monospace;font-size:10px;color:#6B1A1A;letter-spacing:0.2em;text-transform:uppercase;">
✦ MANGLAM TECHNICAL AGENCY
</span>
<h1 style="margin:12px 0 0;font-size:22px;font-weight:900;color:#fafafa;letter-spacing:-0.02em;">
New Project Enquiry
</h1>
<p style="margin:6px 0 0;font-size:12px;color:#71717a;font-family:monospace;">
Received · ${ts} IST
</p>
</td>
</tr>

<!-- Client info -->
<tr>
<td style="padding:28px 40px;border-bottom:1px solid #27272a;">
<p style="margin:0 0 16px;font-size:10px;color:#71717a;letter-spacing:0.16em;text-transform:uppercase;font-family:monospace;">CLIENT</p>
<table cellpadding="0" cellspacing="0" width="100%">
<tr>
<td style="padding-bottom:10px;">
<span style="font-size:11px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Name</span><br/>
<span style="font-size:16px;font-weight:700;color:#fafafa;">${safeName}</span>
</td>
</tr>
<tr>
<td style="padding-bottom:10px;">
<span style="font-size:11px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Email</span><br/>
<a href="mailto:${encodeURIComponent(data.email)}" style="font-size:15px;color:#6B1A1A;text-decoration:none;">${safeEmail}</a>
</td>
</tr>
${safePhone ? `
<tr>
<td style="padding-bottom:10px;">
<span style="font-size:11px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Phone</span><br/>
<span style="font-size:15px;color:#fafafa;">${safePhone}</span>
</td>
</tr>` : ''}
${safeCompany ? `
<tr>
<td style="padding-bottom:10px;">
<span style="font-size:11px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Company</span><br/>
<span style="font-size:15px;color:#fafafa;">${safeCompany}</span>
</td>
</tr>` : ''}
</table>
</td>
</tr>

<!-- Project details -->
<tr>
<td style="padding:28px 40px;border-bottom:1px solid #27272a;">
<p style="margin:0 0 16px;font-size:10px;color:#71717a;letter-spacing:0.16em;text-transform:uppercase;font-family:monospace;">PROJECT DETAILS</p>
<table cellpadding="0" cellspacing="0" width="100%">
<tr>
<td width="33%" style="padding-bottom:14px;vertical-align:top;">
<span style="font-size:10px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;display:block;">Service</span>
<span style="font-size:14px;font-weight:700;color:#fafafa;display:block;margin-top:4px;">${safeService}</span>
</td>
<td width="33%" style="padding-bottom:14px;vertical-align:top;">
<span style="font-size:10px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;display:block;">Budget</span>
<span style="font-size:14px;font-weight:700;color:#fafafa;display:block;margin-top:4px;">${safeBudget}</span>
</td>
<td width="33%" style="padding-bottom:14px;vertical-align:top;">
<span style="font-size:10px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;display:block;">Timeline</span>
<span style="font-size:14px;font-weight:700;color:#fafafa;display:block;margin-top:4px;">${safeTimeline}</span>
</td>
</tr>
</table>
</td>
</tr>

<!-- Message -->
<tr>
<td style="padding:28px 40px;border-bottom:1px solid #27272a;">
<p style="margin:0 0 12px;font-size:10px;color:#71717a;letter-spacing:0.16em;text-transform:uppercase;font-family:monospace;">MESSAGE</p>
<p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.75;">${safeMessage}</p>
</td>
</tr>

<!-- Consent audit -->
<tr>
<td style="padding:28px 40px;border-bottom:1px solid #27272a;">
<p style="margin:0 0 14px;font-size:10px;color:#71717a;letter-spacing:0.16em;text-transform:uppercase;font-family:monospace;">CONSENT & AUDIT TRAIL</p>
<table cellpadding="0" cellspacing="0" width="100%" style="font-size:12px;color:#a1a1aa;line-height:1.65;">
<tr><td style="padding:3px 0;color:#71717a;">Inquiry processing</td><td style="padding:3px 0;color:#fafafa;">Explicit consent granted</td></tr>
<tr><td style="padding:3px 0;color:#71717a;">Project follow-up</td><td style="padding:3px 0;color:#fafafa;">${data.followUpConsent ? 'Consented' : 'Not consented'}</td></tr>
<tr><td style="padding:3px 0;color:#71717a;">Sensitive FitNexora data</td><td style="padding:3px 0;color:#fafafa;">${data.sensitiveDataConsent ? 'Explicitly consented if included' : 'Not consented'}</td></tr>
<tr><td style="padding:3px 0;color:#71717a;">Client timestamp</td><td style="padding:3px 0;">${safeConsentTimestamp}</td></tr>
<tr><td style="padding:3px 0;color:#71717a;">Server timestamp</td><td style="padding:3px 0;">${safeServerConsentTimestamp}</td></tr>
<tr><td style="padding:3px 0;color:#71717a;">Purpose</td><td style="padding:3px 0;">${safeConsentPurpose}</td></tr>
<tr><td style="padding:3px 0;color:#71717a;">IP</td><td style="padding:3px 0;">${safeServerConsentIP}</td></tr>
<tr><td style="padding:3px 0;color:#71717a;">User agent</td><td style="padding:3px 0;">${safeUserAgent}</td></tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px;text-align:center;">
<a
href="mailto:${sanitizeEmail(data.email)}?subject=Re:%20Your%20enquiry%20at%20Manglam%20Technical%20Agency"
style="display:inline-block;padding:12px 28px;background:#6B1A1A;color:#fff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.05em;"
>
Reply to ${safeName} →
</a>
</td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function buildTextFallback(data: ContactData): string {
  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const safeName = sanitizeInput(data.name, 100)
  const safeEmail = sanitizeInput(data.email, 100)
  const safeConsentTimestamp = data.consentTimestamp ? sanitizeInput(data.consentTimestamp, 50) : 'not supplied'
  const safeServerConsentTimestamp = sanitizeInput(data.serverConsentTimestamp, 50)
  const safeConsentPurpose = data.consentPurpose ? sanitizeInput(data.consentPurpose, 100) : 'contact-form-submission'
  const safeServerConsentIP = sanitizeInput(data.serverConsentIP, 80)
  const safeUserAgent = sanitizeInput(data.consentUserAgent ?? data.serverUserAgent, 500)

  return [
    `NEW ENQUIRY — Manglam Technical Agency`,
    `Received: ${ts} IST`,
    ``,
    `--- CLIENT ---`,
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    ...(data.phone ? [`Phone: ${sanitizeInput(data.phone, 20)}`] : []),
    ...(data.company ? [`Company: ${sanitizeInput(data.company, 100)}`] : []),
    ``,
    `--- PROJECT ---`,
    `Service: ${sanitizeInput(data.service, 50)}`,
    `Budget: ${sanitizeInput(data.budget, 50)}`,
    `Timeline: ${sanitizeInput(data.timeline, 50)}`,
    ``,
    `--- MESSAGE ---`,
    sanitizeInput(data.message, 2000),
    ``,
    `--- CONSENT & AUDIT ---`,
    `Inquiry processing: explicit consent granted`,
    `Project follow-up: ${data.followUpConsent ? 'consented' : 'not consented'}`,
    `Sensitive data: ${data.sensitiveDataConsent ? 'explicitly consented if included' : 'not consented'}`,
    `Client timestamp: ${safeConsentTimestamp}`,
    `Server timestamp: ${safeServerConsentTimestamp}`,
    `Purpose: ${safeConsentPurpose}`,
    `IP: ${safeServerConsentIP}`,
    `User agent: ${safeUserAgent}`,
  ].join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await checkWriteRateLimit(req, 'contact')
    if (!rateLimit.allowed) return createRateLimitResponse(req, rateLimit)

    const parsed = schema.parse(await parseJsonBody(req))

    const data: ContactData = {
      ...parsed,
      serverConsentTimestamp: new Date().toISOString(),
      serverConsentIP: getClientIp(req),
      serverUserAgent: sanitizeInput(req.headers.get('user-agent') || 'unavailable', 500),
    }

    const { error } = await sendAdminEmail({
      subject: `[MTA Enquiry] ${sanitizeInput(data.service, 50)} — ${sanitizeInput(data.name, 50)}`,
      text: buildTextFallback(data),
      html: buildHtml(data),
      replyTo: sanitizeEmail(data.email),
    })

    if (error) {
      return createApiResponse(
        req,
        { success: false, message: 'Failed to send email.' },
        { status: 500 },
      )
    }

    return createApiResponse(req, { success: true }, { status: 200 })
  } catch (e) {
    const parseError = createJsonParseErrorResponse(req, e)
    if (parseError) return parseError

    if (e instanceof z.ZodError) {
      return createApiResponse(req, { success: false, errors: e.flatten().fieldErrors }, { status: 400 })
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('[MTA Contact] Error:', e instanceof Error ? e.message : 'Unknown')
    }
    return createApiResponse(req, { success: false, message: 'Server error. Please try again.' }, { status: 500 })
  }
}
