import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'manglamtechnicalagency@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.services?.length || !body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 },
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      const services = Array.isArray(body.services) ? body.services.join(', ') : body.services
      const { error } = await resend.emails.send({
        from: 'MTA Website <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        replyTo: body.email,
        subject: `[MTA Quote Request] ${body.name} — ${services}`,
        text: [
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          `Phone: ${body.phone || 'N/A'}`,
          `Company: ${body.company || 'N/A'}`,
          `Services: ${services}`,
          `Budget: ${body.budget || 'N/A'}`,
          `Timeline: ${body.timeline || 'N/A'}`,
          `Message: ${body.message || 'N/A'}`,
        ].join('\n'),
      })

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[MTA Quote] Resend error:', error)
        }
      }
    }

    return NextResponse.json(
      { success: true, message: 'Quote request received. We will get back to you within 24 hours.' },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process your request. Please try again.' },
      { status: 500 },
    )
  }
}
