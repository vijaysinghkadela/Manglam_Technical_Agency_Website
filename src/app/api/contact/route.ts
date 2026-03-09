import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  phone:    z.string().optional(),
  service:  z.string().min(1),
  budget:   z.string().min(1),
  timeline: z.string().min(1),
  message:  z.string().min(20),
  privacy:  z.literal(true),
})

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json())
    // Log only non-PII metadata (replace with Resend/Nodemailer in production)
    console.log('[MTA Contact]', new Date().toISOString(), { service: data.service, budget: data.budget, timeline: data.timeline })
    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: e.flatten().fieldErrors }, { status: 400 })
    }
    console.error('[MTA Contact] Unexpected error:', e instanceof Error ? e.message : 'Unknown')
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 })
  }
}
