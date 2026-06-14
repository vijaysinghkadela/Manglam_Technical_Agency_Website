import { NextRequest } from 'next/server'
import { z } from 'zod'
import { sendAdminEmail } from '@/lib/email'
import { sanitizeEmail } from '@/lib/security'
import {
  checkWriteRateLimit,
  createApiResponse,
  createJsonParseErrorResponse,
  createRateLimitResponse,
  parseJsonBody,
} from '@/lib/api-security'

const schema = z.object({
  email: z.string().email().max(120),
  consent: z.literal(true),
  consentTimestamp: z.string().max(50).optional(),
  consentPurpose: z.string().max(100).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await checkWriteRateLimit(request, 'newsletter')
    if (!rateLimit.allowed) return createRateLimitResponse(request, rateLimit)

    const body = schema.parse(await parseJsonBody(request))
    const email = sanitizeEmail(body.email)

    const { error } = await sendAdminEmail({
      subject: '[MTA Newsletter] New subscriber',
      text: [
        `New newsletter subscriber: ${email}`,
        `Consent: ${body.consent ? 'explicit' : 'not supplied'}`,
        `Consent timestamp: ${body.consentTimestamp ?? 'not supplied'}`,
        `Purpose: ${body.consentPurpose ?? 'newsletter-subscription'}`,
      ].join('\n'),
      replyTo: email,
    })

    if (error) {
      return createApiResponse(
        request,
        { success: false, message: 'Subscription failed. Please try again.' },
        { status: 500 },
      )
    }

    return createApiResponse(
      request,
      { success: true, message: 'Thanks for subscribing!' },
      { status: 200 },
    )
  } catch (error) {
    const parseError = createJsonParseErrorResponse(request, error)
    if (parseError) return parseError

    if (error instanceof z.ZodError) {
      return createApiResponse(
        request,
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }
    return createApiResponse(
      request,
      { success: false, message: 'Subscription failed. Please try again.' },
      { status: 500 },
    )
  }
}
