'use client'
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
    if (!res.ok) { toast.error('Failed to send. Please try again.'); return }
    setDone(true); reset()
  }

  if (done) return (
    <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
      <div className="w-16 h-16 flex items-center justify-center rounded-full"
        style={{ backgroundColor:'rgba(124,58,237,0.12)', border:'1px solid var(--color-violet)' }}
      >
        <CheckCircle2 className="w-8 h-8" style={{ color:'var(--color-violet-light)' }} />
      </div>
      <div>
        <h3 className="font-display font-black text-white text-2xl mb-2">Message Sent</h3>
        <p style={{ color:'var(--color-muted)' }}>We&apos;ll respond within 2–4 hours.</p>
      </div>
      <button onClick={() => setDone(false)}
        className="text-sm transition-colors border-b border-transparent"
        style={{ color:'var(--color-muted)' }}
      >
        Send another message
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Row>
        <Field label="Full Name *" error={errors.name?.message}>
          <Input {...register('name')} placeholder="Your name" />
        </Field>
        <Field label="Email Address *" error={errors.email?.message}>
          <Input {...register('email')} type="email" placeholder="you@example.com" />
        </Field>
      </Row>
      <Row>
        <Field label="Phone Number">
          <Input {...register('phone')} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Service Needed *" error={errors.service?.message}>
          <Select {...register('service')}>
            <option value="">Select a service</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Field>
      </Row>
      <Row>
        <Field label="Budget Range *" error={errors.budget?.message}>
          <Select {...register('budget')}>
            <option value="">Select budget</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </Select>
        </Field>
        <Field label="Timeline *" error={errors.timeline?.message}>
          <Select {...register('timeline')}>
            <option value="">Select timeline</option>
            {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
      </Row>
      <Field label="Message *" error={errors.message?.message}>
        <textarea
          {...register('message')} rows={5}
          placeholder="Describe your project, goals, and any specific requirements..."
          className="w-full text-sm text-white resize-none outline-none transition-colors"
          style={{ backgroundColor:'transparent', borderBottom:'1px solid var(--color-border)', padding:'12px 0', fontFamily:'var(--font-body)' }}
        />
      </Field>
      <div className="flex items-start gap-3">
        <input {...register('privacy')} type="checkbox" id="privacy"
          className="mt-1 w-5 h-5 shrink-0 cursor-pointer"
          style={{ accentColor:'var(--color-violet)' }}
        />
        <label htmlFor="privacy" className="text-sm leading-relaxed" style={{ color:'var(--color-muted)' }}>
          I agree to the{' '}
          <a href="/legal/privacy-policy" className="transition-colors"
            style={{ color:'var(--color-violet-light)' }}>
            Privacy Policy
          </a>
          {' '}and consent to MTA contacting me.
        </label>
      </div>
      {errors.privacy && <p className="text-xs" style={{ color:'#f87171', marginTop:'-16px' }}>{errors.privacy.message}</p>}

      <button type="submit" disabled={isSubmitting} data-cursor="pointer"
        className="w-full flex items-center justify-center gap-2 py-4 min-h-[48px] font-display font-black text-[15px] transition-all duration-300 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-violet"
        style={{ backgroundColor:'#FAFAFA', color:'var(--color-canvas)' }}
      >
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Message →'}
      </button>
    </form>
  )
}

// Sub-components
const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
)
const Field = ({ label, error, children }: { label:string; error?:string; children:React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label className="font-mono uppercase" style={{ fontSize:'10px', color:'var(--color-muted)', letterSpacing:'0.15em' }}>
      {label}
    </label>
    {children}
    {error && <p className="font-mono" style={{ fontSize:'11px', color:'#f87171' }}>{error}</p>}
  </div>
)
const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full text-sm text-white outline-none transition-colors placeholder:text-dead"
    style={{ backgroundColor:'transparent', borderBottom:'1px solid var(--color-border)', padding:'12px 0' }}
    onFocus={e => (e.target.style.borderBottomColor = 'var(--color-violet)')}
    onBlur={e  => (e.target.style.borderBottomColor = 'var(--color-border)')}
  />
)
const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full text-sm text-white outline-none transition-colors"
    style={{ backgroundColor:'var(--color-canvas)', borderBottom:'1px solid var(--color-border)', padding:'12px 0', appearance:'none' }}
  >
    {children}
  </select>
)
