import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod/v4'
import { sendAdminEmail } from '@/lib/email'
import { documentRequestSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const data = documentRequestSchema.parse(await request.json())

    const { error } = await sendAdminEmail({
      subject: `[MTA Document Request] ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || 'N/A'}`,
        `Requested Documents: ${data.requestedDocuments.join(', ')}`,
        `Use Case: ${data.useCase}`,
      ].join('\n'),
      replyTo: data.email,
    })

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Failed to submit request. Please try again.' },
        { status: 500 },
      )
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
