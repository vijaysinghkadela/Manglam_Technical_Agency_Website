'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2, CheckCircle2 } from 'lucide-react'

const schema = z.object({
  name:     z.string().min(2,  'Name must be at least 2 characters'),
  email:    z.string().email(  'Enter a valid email address'),
  phone:    z.string().optional(),
  service:  z.string().min(1,  'Please select a service'),
  budget:   z.string().min(1,  'Please select a budget range'),
  timeline: z.string().min(1,  'Please select a timeline'),
  message:  z.string().min(20, 'Message must be at least 20 characters'),
  privacy:  z.boolean().refine(val => val === true, 'You must agree to proceed'),
})
type F = z.infer<typeof schema>

const SERVICES  = ['Web Development','Social Media & Automation','Cybersecurity','AI Automation','SaaS Licensing','Data Processing','Contractor Management','Other']
const BUDGETS   = ['Under ₹25,000','₹25,000–₹50,000','₹50,000–₹1,00,000','₹1,00,000–₹5,00,000','₹5,00,000+','Not Sure']
const TIMELINES = ['ASAP','Within 1 month','Within 3 months','Flexible']

export function ContactForm() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm<F>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: F) => {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type':'application/json' },
      body:    JSON.stringify(data),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      toast.error(body?.message ?? 'Failed to send. Please try again.')
      return
    }
    setDone(true); reset()
  }

  if (done) return (
    <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
      <div
        className="w-16 h-16 flex items-center justify-center"
        style={{ backgroundColor:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.4)' }}
      >
        <CheckCircle2 className="w-8 h-8" style={{ color:'var(--color-violet-light)' }} />
      </div>
      <div>
        <h3 className="font-display font-black text-2xl mb-2" style={{ color: 'var(--color-foreground)' }}>
          Message Sent
        </h3>
        <p style={{ color:'var(--color-muted)' }}>We&apos;ll respond within 2–4 hours.</p>
      </div>
      <button
        onClick={() => setDone(false)}
        className="font-mono text-xs uppercase tracking-widest transition-colors hover-foreground"
        style={{ color:'var(--color-muted)', letterSpacing: '0.15em' }}
      >
        Send another message →
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10" noValidate>

      {/* ── 01 About You ── */}
      <div className="flex flex-col gap-6">
        <SectionLabel index="01" label="About You" />
        <Row>
          <Field label="Full Name *" error={errors.name?.message}>
            <Input {...register('name')} placeholder="Your name" />
          </Field>
          <Field label="Email Address *" error={errors.email?.message}>
            <Input {...register('email')} type="email" placeholder="you@example.com" />
          </Field>
        </Row>
        <Field label="Phone Number">
          <Input {...register('phone')} placeholder="+91 98765 43210" />
        </Field>
      </div>

      {/* ── 02 Your Project ── */}
      <div className="flex flex-col gap-6">
        <SectionLabel index="02" label="Your Project" />
        <Row>
          <Field label="Service Needed *" error={errors.service?.message}>
            <Select {...register('service')}>
              <option value="">Select a service</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
          <Field label="Budget Range *" error={errors.budget?.message}>
            <Select {...register('budget')}>
              <option value="">Select budget</option>
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </Select>
          </Field>
        </Row>
        <Field label="Timeline *" error={errors.timeline?.message}>
          <Select {...register('timeline')}>
            <option value="">Select timeline</option>
            {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Message *" error={errors.message?.message}>
          <Textarea
            {...register('message')}
            rows={5}
            placeholder="Describe your project, goals, and any specific requirements..."
          />
        </Field>
      </div>

      {/* ── Privacy & Submit ── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <input
            {...register('privacy')}
            type="checkbox"
            id="privacy"
            className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
            style={{ accentColor:'var(--color-violet)' }}
          />
          <label htmlFor="privacy" className="text-sm leading-relaxed" style={{ color:'var(--color-muted)' }}>
            I agree to the{' '}
            <a
              href="/legal/privacy-policy"
              className="transition-colors hover-foreground"
              style={{ color:'var(--color-violet-light)' }}
            >
              Privacy Policy
            </a>
            {' '}and consent to MTA contacting me.
          </label>
        </div>
        {errors.privacy && (
          <p className="font-mono" style={{ fontSize: '11px', color: '#f87171', marginTop: '-8px' }}>
            {errors.privacy.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          data-cursor="pointer"
          className="w-full flex items-center justify-center gap-2 py-4 min-h-[52px] font-display font-black text-[15px] uppercase tracking-wide transition-all duration-300 disabled:opacity-60 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          style={{ backgroundColor:'var(--color-foreground)', color:'var(--color-canvas)' }}
        >
          {isSubmitting
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
            : 'Send Message →'
          }
        </button>

        <p className="font-mono text-center" style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.1em' }}>
          Avg. response · 2–4 hours · Mon–Sat 9AM–7PM IST
        </p>
      </div>
    </form>
  )
}

// ── Sub-components ──────────────────────────────────────────

const SectionLabel = ({ index, label }: { index: string; label: string }) => (
  <div
    className="flex items-center gap-4"
    style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}
  >
    <span
      className="font-display font-black leading-none select-none"
      style={{ fontSize: '2rem', color: 'rgba(124,58,237,0.18)' }}
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
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>
)

const toId = (label: string) =>
  `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => {
  const id    = toId(label)
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
        <p id={errId} role="alert" className="font-mono" style={{ fontSize: '11px', color: '#f87171' }}>
          {error}
        </p>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  color: 'var(--color-foreground)',
  backgroundColor: 'var(--color-canvas)',
  border: '1px solid var(--color-border)',
  padding: '11px 14px',
  width: '100%',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="placeholder:text-dead"
    style={inputStyle}
    onFocus={e => (e.target.style.borderColor = 'var(--color-violet)')}
    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
  />
)

const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
  >
    {children}
  </select>
)

const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="resize-y placeholder:text-dead"
    style={{ ...inputStyle, fontFamily: 'var(--font-body)', resize: 'vertical' }}
    onFocus={e => (e.target.style.borderColor = 'var(--color-violet)')}
    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
  />
)
