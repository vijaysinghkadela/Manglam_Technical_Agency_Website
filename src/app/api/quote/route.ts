import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const quoteSchema = z.object({
  services:    z.array(z.string().max(100)).min(1).max(20),
  budget:      z.string().min(1).max(100),
  timeline:    z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  name:        z.string().min(2).max(100),
  email:       z.string().email(),
  phone:       z.string().max(30).optional(),
  company:     z.string().max(200).optional(),
})

export async function POST(request: NextRequest) {
  const { ok } = rateLimit(getClientIp(request), 5, 60_000)
  if (!ok) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    )
  }

  try {
    const data = quoteSchema.parse(await request.json())

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
        `QUOTE REQUEST — Manglam Technical Agency`,
        `Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
        ``,
        `--- CONTACT ---`,
        `Name:    ${data.name}`,
        `Email:   ${data.email}`,
        ...(data.phone   ? [`Phone:   ${data.phone}`]   : []),
        ...(data.company ? [`Company: ${data.company}`] : []),
        ``,
        `--- PROJECT ---`,
        `Services: ${data.services.join(', ')}`,
        `Budget:   ${data.budget}`,
        `Timeline: ${data.timeline}`,
        ``,
        `--- DESCRIPTION ---`,
        data.description,
      ].join('\n')

      await transporter.sendMail({
        from:    `"MTA Website" <${gmailUser}>`,
        to:      recipient,
        replyTo: data.email,
        subject: `[MTA Quote] ${data.name} — ${data.services.join(', ')}`,
        text,
      })
    }

    return NextResponse.json(
      { success: true, message: 'Quote request received. We will get back to you within 24 hours.' },
      { status: 200 }
    )
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid request.', errors: e.flatten().fieldErrors },
        { status: 400 }
      )
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('[MTA Quote] Error:', e instanceof Error ? e.message : 'Unknown')
    }
    return NextResponse.json(
      { success: false, message: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}
