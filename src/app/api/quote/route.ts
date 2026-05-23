import { NextRequest, NextResponse } from 'next/server'
import { sendAdminEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.services?.length || !body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 },
      )
    }

    const services = Array.isArray(body.services) ? body.services.join(', ') : body.services
    const text = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone || 'N/A'}`,
      `Company: ${body.company || 'N/A'}`,
      `Services: ${services}`,
      `Budget: ${body.budget || 'N/A'}`,
      `Timeline: ${body.timeline || 'N/A'}`,
      `Message: ${body.message || 'N/A'}`,
    ].join('\n')

    const { error } = await sendAdminEmail({
      subject: `[MTA Quote Request] ${body.name} — ${services}`,
      text,
      replyTo: body.email,
    })

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Failed to send quote request. Please try again.' },
        { status: 500 },
      )
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
