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
    // Log to console (replace with Resend/Nodemailer in production)
    console.log('[MTA Contact]', new Date().toISOString(), data)
    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ success:false, errors: e.errors }, { status:400 })
    }
    return NextResponse.json({ success:false }, { status:500 })
  }
}
