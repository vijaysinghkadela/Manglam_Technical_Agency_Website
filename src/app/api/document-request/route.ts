import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod/v4'
import { documentRequestSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const payload = documentRequestSchema.parse(await request.json())

    console.log('[MTA Document Request]', {
      timestamp: new Date().toISOString(),
      ...payload,
    })

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
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process request right now.',
      },
      { status: 500 }
    )
  }
}
