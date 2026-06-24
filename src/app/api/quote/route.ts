import { NextRequest } from 'next/server'
import { z } from 'zod'
import { sendAdminEmail } from '@/lib/email'
import { sanitizeEmail, sanitizeInput } from '@/lib/security'
import {
  checkWriteRateLimit,
  createApiResponse,
  createJsonParseErrorResponse,
  createRateLimitResponse,
  parseJsonBody,
} from '@/lib/api-security'

const schema = z.object({
  services: z.array(z.string().min(1).max(80)).min(1),
  name: z.string().min(2).max(100),
  email: z.string().email().max(120),
  phone: z.string().max(20).optional(),
  company: z.string().max(120).optional(),
  budget: z.string().max(80).optional(),
  timeline: z.string().max(80).optional(),
  message: z.string().max(2000).optional(),
  privacy: z.literal(true),
  consentTimestamp: z.string().max(50).optional(),
  consentPurpose: z.string().max(100).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await checkWriteRateLimit(request, 'quote')
    if (!rateLimit.allowed) return createRateLimitResponse(request, rateLimit)

    const body = schema.parse(await parseJsonBody(request))

    const services = body.services.map((service) => sanitizeInput(service, 80)).join(', ')
    const email = sanitizeEmail(body.email)
    const text = [
      `Name: ${sanitizeInput(body.name, 100)}`,
      `Email: ${email}`,
      `Phone: ${body.phone ? sanitizeInput(body.phone, 20) : 'N/A'}`,
      `Company: ${body.company ? sanitizeInput(body.company, 120) : 'N/A'}`,
      `Services: ${services}`,
      `Budget: ${body.budget ? sanitizeInput(body.budget, 80) : 'N/A'}`,
      `Timeline: ${body.timeline ? sanitizeInput(body.timeline, 80) : 'N/A'}`,
      `Message: ${body.message ? sanitizeInput(body.message, 2000) : 'N/A'}`,
      `Consent: ${body.privacy ? 'explicit' : 'not supplied'}`,
      `Consent timestamp: ${body.consentTimestamp ?? 'not supplied'}`,
      `Purpose: ${body.consentPurpose ?? 'quote-request'}`,
    ].join('\n')

    const { error } = await sendAdminEmail({
      subject: `[MTA Quote Request] ${sanitizeInput(body.name, 50)} — ${services}`,
      text,
      replyTo: email,
    })

    if (error) {
      return createApiResponse(
        request,
        { success: false, message: 'Failed to send quote request. Please try again.' },
        { status: 500 },
      )
    }

    return createApiResponse(
      request,
      { success: true, message: 'Quote request received. We will get back to you within 24 hours.' },
      { status: 200 },
    )
  } catch (error) {
    const parseError = createJsonParseErrorResponse(request, error)
    if (parseError) return parseError

    if (error instanceof z.ZodError) {
      return createApiResponse(
        request,
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 },
      )
    }
    return createApiResponse(
      request,
      { success: false, message: 'Failed to process your request. Please try again.' },
      { status: 500 },
    )
  }
}
