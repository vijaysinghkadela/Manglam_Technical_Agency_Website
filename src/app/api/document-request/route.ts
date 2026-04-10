import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod/v4'
import nodemailer from 'nodemailer'
import { documentRequestSchema } from '@/lib/validations'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const { ok } = rateLimit(getClientIp(request), 5, 60_000)
  if (!ok) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    )
  }

  try {
    const data = documentRequestSchema.parse(await request.json())

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

      const text = [
        `DOCUMENT REQUEST — Manglam Technical Agency`,
        `Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
        ``,
        `--- CONTACT ---`,
        `Name:      ${data.name}`,
        `Email:     ${data.email}`,
        ...(data.company ? [`Company:   ${data.company}`] : []),
        ``,
        `--- DOCUMENTS REQUESTED ---`,
        data.requestedDocuments.join(', '),
        ``,
        `--- USE CASE ---`,
        data.useCase,
      ].join('\n')

      await transporter.sendMail({
        from:    `"MTA Website" <${gmailUser}>`,
        to:      recipient,
        replyTo: data.email,
        subject: `[MTA Docs] ${data.name} — ${data.requestedDocuments.join(', ')}`,
        text,
      })
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
        { status: 400 }
      )
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('[MTA DocRequest] Error:', error instanceof Error ? error.message : 'Unknown')
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
