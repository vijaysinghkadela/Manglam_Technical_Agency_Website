import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod/v4'
import { Resend } from 'resend'
import { documentRequestSchema } from '@/lib/validations'

const ADMIN_EMAIL = 'manglamtechnicalagency@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const data = documentRequestSchema.parse(await request.json())

    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      const { error } = await resend.emails.send({
        from: 'MTA Website <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        replyTo: data.email,
        subject: `[MTA Document Request] ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || 'N/A'}`,
          `Requested Documents: ${data.requestedDocuments.join(', ')}`,
          `Use Case: ${data.useCase}`,
        ].join('\n'),
      })

      if (error && process.env.NODE_ENV === 'development') {
        console.error('[MTA Document Request] Resend error:', error)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Request submitted. Templates are shared after review.',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request payload',
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, message: 'Unable to process request right now.' },
      { status: 500 },
    )
  }
}
