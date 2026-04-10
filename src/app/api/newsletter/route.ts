import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  const { ok } = rateLimit(getClientIp(request), 3, 60_000)
  if (!ok) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    )
  }

  try {
    const { email } = schema.parse(await request.json())

    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_APP_PASSWORD
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL ?? 'manglamtechnicalagency@gmail.com'

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        host:   'smtp.gmail.com',
        port:   465,
        secure: true,
        auth: { user: gmailUser, pass: gmailPass.replace(/\s/g, '') },
      })

      await transporter.sendMail({
        from:    `"MTA Website" <${gmailUser}>`,
        to:      recipient,
        subject: `[MTA Newsletter] New subscriber: ${email}`,
        text:    `New newsletter subscriber: ${email}\nReceived: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
      })
    }

    return NextResponse.json(
      { success: true, message: 'Thanks for subscribing!' },
      { status: 200 }
    )
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('[MTA Newsletter] Error:', e instanceof Error ? e.message : 'Unknown')
    }
    return NextResponse.json(
      { success: false, message: 'Subscription failed. Please try again.' },
      { status: 500 }
    )
  }
}
