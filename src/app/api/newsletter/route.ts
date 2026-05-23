import { NextRequest, NextResponse } from 'next/server'
import { sendAdminEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.email || !/\S+@\S+\.\S+/.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }

    const { error } = await sendAdminEmail({
      subject: '[MTA Newsletter] New subscriber',
      text: `New newsletter subscriber: ${body.email}`,
      replyTo: body.email,
    })

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Subscription failed. Please try again.' },
        { status: 500 },
      )
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
