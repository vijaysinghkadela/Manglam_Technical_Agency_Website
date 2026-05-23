import nodemailer from 'nodemailer'

const ADMIN_EMAIL = 'manglamtechnicalagency@gmail.com'

function getTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT) || 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (host && user && pass) {
    return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
  }

  return null
}

type SendEmailParams = {
  subject: string
  text: string
  html?: string
  replyTo?: string
}

export async function sendAdminEmail({ subject, text, html, replyTo }: SendEmailParams) {
  const transport = getTransport()

  if (!transport) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MTA Email] SMTP not configured — email not sent')
      console.warn('[MTA Email] Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local')
    }
    return { error: new Error('SMTP not configured') }
  }

  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM || `"MTA Website" <${process.env.SMTP_USER || 'noreply@manglamtechnicalagency.com'}>`,
      to: ADMIN_EMAIL,
      replyTo,
      subject,
      text,
      ...(html ? { html } : {}),
    })
    return { error: null }
  } catch (err) {
    console.error('[MTA Email] Send error:', err)
    return { error: err instanceof Error ? err : new Error(String(err)) }
  }
}
