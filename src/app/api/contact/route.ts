import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  phone:    z.string().optional(),
  company:  z.string().optional(),
  service:  z.string().min(1),
  budget:   z.string().min(1),
  timeline: z.string().min(1),
  message:  z.string().min(20),
  privacy:  z.literal(true),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    console.log('[MTA Contact]', new Date().toISOString(), data)

    // TODO production: send via Resend / Nodemailer to info@manglamtechnicalagency.com

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.flatten().fieldErrors }, { status: 400 })
    }
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
