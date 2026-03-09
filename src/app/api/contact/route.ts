import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

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

function buildHtml(data: z.infer<typeof schema>): string {
  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#0d0d0e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0e;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#16161a;border:1px solid #27272a;max-width:600px;">

      <!-- Header -->
      <tr>
        <td style="padding:32px 40px;border-bottom:1px solid #27272a;">
          <span style="font-family:monospace;font-size:10px;color:#7c3aed;letter-spacing:0.2em;text-transform:uppercase;">
            ✦ MANGLAM TECHNICAL AGENCY
          </span>
          <h1 style="margin:12px 0 0;font-size:22px;font-weight:900;color:#fafafa;letter-spacing:-0.02em;">
            New Project Enquiry
          </h1>
          <p style="margin:6px 0 0;font-size:12px;color:#71717a;font-family:monospace;">
            Received · ${ts} IST
          </p>
        </td>
      </tr>

      <!-- Client info -->
      <tr>
        <td style="padding:28px 40px;border-bottom:1px solid #27272a;">
          <p style="margin:0 0 16px;font-size:10px;color:#71717a;letter-spacing:0.16em;text-transform:uppercase;font-family:monospace;">CLIENT</p>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-bottom:10px;">
                <span style="font-size:11px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Name</span><br/>
                <span style="font-size:16px;font-weight:700;color:#fafafa;">${data.name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:10px;">
                <span style="font-size:11px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Email</span><br/>
                <a href="mailto:${data.email}" style="font-size:15px;color:#7c3aed;text-decoration:none;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding-bottom:10px;">
                <span style="font-size:11px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Phone</span><br/>
                <a href="tel:${data.phone}" style="font-size:15px;color:#7c3aed;text-decoration:none;">${data.phone}</a>
              </td>
            </tr>` : ''}
          </table>
        </td>
      </tr>

      <!-- Project details -->
      <tr>
        <td style="padding:28px 40px;border-bottom:1px solid #27272a;">
          <p style="margin:0 0 16px;font-size:10px;color:#71717a;letter-spacing:0.16em;text-transform:uppercase;font-family:monospace;">PROJECT DETAILS</p>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="33%" style="padding-bottom:14px;vertical-align:top;">
                <span style="font-size:10px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;display:block;">Service</span>
                <span style="font-size:14px;font-weight:700;color:#fafafa;display:block;margin-top:4px;">${data.service}</span>
              </td>
              <td width="33%" style="padding-bottom:14px;vertical-align:top;">
                <span style="font-size:10px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;display:block;">Budget</span>
                <span style="font-size:14px;font-weight:700;color:#fafafa;display:block;margin-top:4px;">${data.budget}</span>
              </td>
              <td width="33%" style="padding-bottom:14px;vertical-align:top;">
                <span style="font-size:10px;color:#71717a;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;display:block;">Timeline</span>
                <span style="font-size:14px;font-weight:700;color:#fafafa;display:block;margin-top:4px;">${data.timeline}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Message -->
      <tr>
        <td style="padding:28px 40px;border-bottom:1px solid #27272a;">
          <p style="margin:0 0 12px;font-size:10px;color:#71717a;letter-spacing:0.16em;text-transform:uppercase;font-family:monospace;">MESSAGE</p>
          <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.75;white-space:pre-wrap;">${data.message}</p>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td style="padding:24px 40px;text-align:center;">
          <a
            href="mailto:${data.email}?subject=Re:%20Your%20enquiry%20at%20Manglam%20Technical%20Agency"
            style="display:inline-block;padding:12px 28px;background:#7c3aed;color:#fff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.05em;"
          >
            Reply to ${data.name} →
          </a>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function buildTextFallback(data: z.infer<typeof schema>): string {
  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  return [
    `NEW ENQUIRY — Manglam Technical Agency`,
    `Received: ${ts} IST`,
    ``,
    `--- CLIENT ---`,
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    ...(data.phone ? [`Phone:    ${data.phone}`] : []),
    ``,
    `--- PROJECT ---`,
    `Service:  ${data.service}`,
    `Budget:   ${data.budget}`,
    `Timeline: ${data.timeline}`,
    ``,
    `--- MESSAGE ---`,
    data.message,
  ].join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json())

    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_APP_PASSWORD

    if (!gmailUser || !gmailPass) {
      console.error('[MTA Contact] GMAIL_USER / GMAIL_APP_PASSWORD not set. Restart the dev server after editing .env.local')
      return NextResponse.json(
        { success: false, message: 'Email delivery is not configured on this server. Please contact us directly at manglamtechnicalagency@gmail.com' },
        { status: 503 }
      )
    }

    // Strip spaces — Google displays App Passwords in 4-char groups but SMTP needs them removed
    const transporter = nodemailer.createTransport({
      host:   'smtp.gmail.com',
      port:   465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass.replace(/\s/g, '') },
    })

    await transporter.sendMail({
      from:    `"MTA Website" <${gmailUser}>`,
      to:      'manglamtechnicalagency@gmail.com',
      replyTo: data.email,
      subject: `[MTA Enquiry] ${data.service} — ${data.name}`,
      text:    buildTextFallback(data),
      html:    buildHtml(data),
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: e.flatten().fieldErrors }, { status: 400 })
    }
    console.error('[MTA Contact] Error:', e instanceof Error ? e.message : 'Unknown')
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 })
  }
}
