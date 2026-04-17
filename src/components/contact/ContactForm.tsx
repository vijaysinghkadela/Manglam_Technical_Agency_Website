'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Loader2, CheckCircle2, Shield } from 'lucide-react'
import { hasMaliciousInput } from '@/lib/security'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Explicit consent required under DPDP Act 2023 and LGPD',
  }),
  followUpConsent: z.boolean().optional(),
  sensitiveDataConsent: z.boolean().optional(),
  consentTimestamp: z.string().optional(),
  consentPurpose: z.string().optional(),
  consentUserAgent: z.string().optional(),
})

type F = z.infer<typeof schema>

const SERVICES = ['AI Automation', 'Social Media Marketing', 'Cybersecurity', 'Web Development', 'Data Processing', 'Contractor Management', 'Other']
const BUDGETS = ['Under ₹25,000', '₹25,000–₹50,000', '₹50,000–₹1,00,000', '₹1,00,000–₹5,00,000', '₹5,00,000+', 'Not Sure']
const TIMELINES = ['ASAP', 'Within 1 month', 'Within 3 months', 'Flexible']

export default function ContactForm() {
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      privacy: false,
      followUpConsent: false,
      sensitiveDataConsent: false,
    },
  })

const onSubmit = async (data: F) => {
    // Enhanced security validation
    if (hasMaliciousInput(data.name) || hasMaliciousInput(data.email) || hasMaliciousInput(data.message)) {
      toast.error('Invalid characters detected in form input')
      return
    }

    const enrichedData = {
      ...data,
      consentTimestamp: new Date().toISOString(),
      consentPurpose: 'contact-form-submission',
      consentUserAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrichedData),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      toast.error(body?.message ?? 'Failed to send. Please try again.')
      return
    }

    setDone(true)
    reset()
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-[24px] border border-[rgba(107,26,26,0.2)] bg-[rgba(107,26,26,0.05)] px-6 py-20 text-center sm:px-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(107,26,26,0.3)] bg-[rgba(107,26,26,0.08)]">
          <CheckCircle2 className="h-8 w-8" style={{ color: '#6B1A1A' }} />
        </div>
        <div>
          <h3 className="mb-2 font-display text-2xl font-black" style={{ color: 'var(--color-foreground)' }}>
            Message Sent
          </h3>
          <p style={{ color: 'var(--color-muted)' }}>We&apos;ll respond within 2–4 hours.</p>
        </div>
        <button
          onClick={() => setDone(false)}
          className="font-mono text-xs uppercase tracking-widest transition-colors hover-foreground"
          style={{ color: 'var(--color-muted)', letterSpacing: '0.15em' }}
        >
          Send another message →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      <div className="flex flex-col gap-5">
        <SectionLabel index="01" label="About You" hint="Use the best details for a fast reply." />
        <Row>
          <Field label="Full Name *" error={errors.name?.message}>
            <Input {...register('name')} autoComplete="name" placeholder="Your name" />
          </Field>
          <Field label="Email Address *" error={errors.email?.message}>
            <Input {...register('email')} autoComplete="email" type="email" placeholder="you@example.com" />
          </Field>
        </Row>
        <Field label="Phone Number">
          <Input {...register('phone')} autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" />
        </Field>
      </div>

      <div className="flex flex-col gap-5">
        <SectionLabel index="02" label="Your Project" hint="Scope, budget, and timing help us quote accurately." />
        <Row>
          <Field label="Service Needed *" error={errors.service?.message}>
            <Select {...register('service')}>
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Budget Range *" error={errors.budget?.message}>
            <Select {...register('budget')}>
              <option value="">Select budget</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          </Field>
        </Row>
        <Field label="Timeline *" error={errors.timeline?.message}>
          <Select {...register('timeline')}>
            <option value="">Select timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Message *" error={errors.message?.message}>
          <Textarea
            {...register('message')}
            rows={6}
            placeholder="Describe your project, goals, and any specific requirements..."
          />
        </Field>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-[24px_1fr] sm:gap-3">
            <input
              {...register('privacy')}
              type="checkbox"
              id="privacy"
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded"
              style={{ accentColor: '#6B1A1A' }}
            />
            <label htmlFor="privacy" className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              I explicitly consent to Manglam Technical Agency processing my personal data for the purpose of
              responding to this inquiry under the{' '}
              <a
                href="/legal/privacy-policy"
                className="transition-colors hover-foreground"
                style={{ color: '#6B1A1A' }}
              >
                Privacy Policy
              </a>
              . This consent is free, specific, informed, and unambiguous. I understand I may withdraw this consent at
              any time by contacting{' '}
              <a
                href="mailto:contact@manglamtechnicalagency.com"
                className="transition-colors hover-foreground"
                style={{ color: '#6B1A1A' }}
              >
                contact@manglamtechnicalagency.com
              </a>
              .
            </label>
          </div>
          {errors.privacy && (
            <p className="mt-3 font-mono" style={{ fontSize: '11px', color: '#ef4444' }}>
              {errors.privacy.message}
            </p>
          )}

          <div className="mt-4 grid gap-3 border-t border-border pt-4">
            <label className="grid gap-3 sm:grid-cols-[24px_1fr]">
              <input
                {...register('followUpConsent')}
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded"
                style={{ accentColor: '#6B1A1A' }}
              />
              <span className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                I agree to receive project follow-up emails related to this inquiry. This does not add me to a newsletter.
              </span>
            </label>

            <label className="grid gap-3 sm:grid-cols-[24px_1fr]">
              <input
                {...register('sensitiveDataConsent')}
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded"
                style={{ accentColor: '#6B1A1A' }}
              />
              <span className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                If I include FitNexora health, biometric, diet, or fitness data, I explicitly consent to MTA reviewing that sensitive data only for this inquiry.
              </span>
            </label>
          </div>

          <p className="mt-4 text-xs font-mono" style={{ color: 'var(--color-dead)' }}>
            <Shield className="mr-1 inline-block h-3 w-3" />
            DPDP Act 2023 (India) & LGPD (Brazil) compliant • UDYAM-RJ-15-0094091
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-cursor="pointer"
          className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full px-5 py-4 font-display text-[15px] font-black uppercase tracking-wide transition-all duration-300 disabled:opacity-60 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          style={{ backgroundColor: '#6B1A1A', color: '#fff', boxShadow: '0 16px 40px rgba(107,26,26,0.24)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#4f1111'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#6B1A1A'
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            'Send Message →'
          )}
        </button>

        <p className="text-center font-mono" style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.1em' }}>
          Avg. response · 2–4 hours · Mon–Sat 9AM–7PM IST
        </p>
      </div>
    </form>
  )
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">{children}</div>
)

const toId = (label: string) =>
  `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => {
  const id = toId(label)
  const errId = `${id}-error`
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono uppercase"
        style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.15em' }}
      >
        {label}
      </label>
      {React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        id,
        ...(error ? { 'aria-describedby': errId, 'aria-invalid': 'true' } : {}),
      })}
      {error && (
        <p id={errId} role="alert" className="font-mono" style={{ fontSize: '11px', color: '#ef4444' }}>
          {error}
        </p>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  color: 'var(--color-foreground)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  padding: '15px 16px',
  width: '100%',
  fontSize: '16px',
  minHeight: '52px',
  borderRadius: '12px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
}

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="placeholder:text-dead"
    style={inputStyle}
    onFocus={(e) => {
      e.target.style.borderColor = '#6B1A1A'
      e.target.style.boxShadow = '0 0 0 4px rgba(107,26,26,0.08)'
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'var(--color-border)'
      e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.02)'
    }}
  />
)

const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    style={{
      ...inputStyle,
      appearance: 'none',
      backgroundImage:
        'linear-gradient(45deg, transparent 50%, var(--color-dead) 50%), linear-gradient(135deg, var(--color-dead) 50%, transparent 50%), linear-gradient(to right, transparent, transparent)',
      backgroundPosition: 'calc(100% - 18px) calc(50% - 2px), calc(100% - 13px) calc(50% - 2px), 0 0',
      backgroundSize: '5px 5px, 5px 5px, 100% 100%',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
      paddingRight: '46px',
    }}
  >
    {children}
  </select>
)

const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="resize-y placeholder:text-dead"
    style={{ ...inputStyle, fontFamily: 'var(--font-body)', resize: 'vertical', minHeight: '144px' }}
    onFocus={(e) => {
      e.target.style.borderColor = '#6B1A1A'
      e.target.style.boxShadow = '0 0 0 4px rgba(107,26,26,0.08)'
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'var(--color-border)'
      e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.02)'
    }}
  />
)

const SectionLabel = ({ index, label, hint }: { index: string; label: string; hint: string }) => (
  <div className="flex flex-col gap-2 rounded-[18px] border border-border bg-[rgba(255,255,255,0.02)] px-4 py-3.5">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span
          className="font-display text-[1.5rem] font-black leading-none select-none"
          style={{ color: 'rgba(107,26,26,0.22)' }}
        >
          {index}
        </span>
        <span
          className="font-mono uppercase"
          style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.2em' }}
        >
          {label}
        </span>
      </div>
    </div>
    <p className="font-mono text-[11px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
      {hint}
    </p>
  </div>
)
