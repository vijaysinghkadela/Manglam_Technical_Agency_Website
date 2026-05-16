import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'manglamtechnicalagency@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.email || !/\S+@\S+\.\S+/.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      const { error } = await resend.emails.send({
        from: 'MTA Website <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: '[MTA Newsletter] New subscriber',
        text: `New newsletter subscriber: ${body.email}`,
      })

      if (error && process.env.NODE_ENV === 'development') {
        console.error('[MTA Newsletter] Resend error:', error)
      }
    }

    return NextResponse.json(
      { success: true, message: 'Thanks for subscribing!' },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Subscription failed. Please try again.' },
      { status: 500 },
    )
  }
}
