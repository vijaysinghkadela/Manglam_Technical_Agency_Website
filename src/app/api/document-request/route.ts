import { NextRequest } from 'next/server'
import { ZodError } from 'zod'
import { sendAdminEmail } from '@/lib/email'
import { documentRequestSchema } from '@/lib/validations'
import { sanitizeEmail, sanitizeInput } from '@/lib/security'
import {
  checkWriteRateLimit,
  createApiResponse,
  createJsonParseErrorResponse,
  createRateLimitResponse,
  parseJsonBody,
} from '@/lib/api-security'

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await checkWriteRateLimit(request, 'document-request')
    if (!rateLimit.allowed) return createRateLimitResponse(request, rateLimit)

    const data = documentRequestSchema.parse(await parseJsonBody(request))
    const safeName = sanitizeInput(data.name, 100)
    const safeEmail = sanitizeEmail(data.email)
    const safeCompany = data.company ? sanitizeInput(data.company, 120) : 'N/A'
    const safeDocuments = data.requestedDocuments
      .map((document) => sanitizeInput(document, 100))
      .join(', ')
    const safeUseCase = sanitizeInput(data.useCase, 2000)

    const { error } = await sendAdminEmail({
      subject: `[MTA Document Request] ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Company: ${safeCompany}`,
        `Requested Documents: ${safeDocuments}`,
        `Use Case: ${safeUseCase}`,
        `Consent: explicit`,
        `Consent timestamp: ${data.consentTimestamp ? sanitizeInput(data.consentTimestamp, 50) : 'not supplied'}`,
        `Purpose: ${data.consentPurpose ? sanitizeInput(data.consentPurpose, 100) : 'document-request'}`,
      ].join('\n'),
      replyTo: safeEmail,
    })

    if (error) {
      return createApiResponse(
        request,
        { success: false, message: 'Failed to submit request. Please try again.' },
        { status: 500 },
      )
    }

    return createApiResponse(
      request,
      {
        success: true,
        message: 'Request submitted. Templates are shared after review.',
      },
      { status: 200 },
    )
  } catch (error) {
    const parseError = createJsonParseErrorResponse(request, error)
    if (parseError) return parseError

    if (error instanceof ZodError) {
      return createApiResponse(
        request,
        {
          success: false,
          message: 'Invalid request payload',
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    return createApiResponse(
      request,
      { success: false, message: 'Unable to process request right now.' },
      { status: 500 },
    )
  }
}
