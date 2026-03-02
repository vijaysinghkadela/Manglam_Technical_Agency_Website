'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2, CheckCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+\d\s-]{7,15}$/, 'Enter a valid phone number')
    .optional()
    .or(z.literal('')),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  privacy: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the Privacy Policy',
  }),
})

type FormData = z.infer<typeof schema>

const serviceOptions = [
  'Web Development',
  'Social Media & Automation',
  'Cybersecurity',
  'AI Automation',
  'SaaS Licensing',
  'Data Processing',
  'Contractor Management',
  'Other',
]
const budgetOptions = [
  'Under ₹25,000',
  '₹25,000–₹50,000',
  '₹50,000–₹1,00,000',
  '₹1,00,000–₹5,00,000',
  '₹5,00,000+',
  'Not Sure',
]
const timelineOptions = ['ASAP', 'Within 1 month', 'Within 3 months', 'Flexible']

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
      reset()
    } catch {
      toast.error('Something went wrong. Please try again or WhatsApp us directly.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
        <div className="w-16 h-16 rounded-full bg-violet-600/15 border border-violet-600 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-violet-400" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent</h3>
          <p className="text-muted">We&apos;ll respond within 2–4 hours. Check your inbox.</p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-muted hover:text-white transition-colors border-b border-transparent hover:border-muted"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 bg-card rounded-3xl border border-border p-8 lg:p-10" noValidate>
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Full Name *" error={errors.name?.message}>
          <input {...register('name')} placeholder="Your name" className={inputCls(!!errors.name)} />
        </Field>
        <Field label="Email Address *" error={errors.email?.message}>
          <input {...register('email')} type="email" placeholder="you@example.com" className={inputCls(!!errors.email)} />
        </Field>
      </div>

      {/* Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Phone Number" error={errors.phone?.message}>
          <input {...register('phone')} placeholder="+91 98765 43210" className={inputCls(!!errors.phone)} />
        </Field>
        <Field label="Company / Organisation">
          <input {...register('company')} placeholder="Optional" className={inputCls(false)} />
        </Field>
      </div>

      {/* Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Service Interested In *" error={errors.service?.message}>
          <select {...register('service')} className={inputCls(!!errors.service)}>
            <option value="">Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated Budget *" error={errors.budget?.message}>
          <select {...register('budget')} className={inputCls(!!errors.budget)}>
            <option value="">Select budget range</option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Timeline */}
      <Field label="Project Timeline *" error={errors.timeline?.message}>
        <select {...register('timeline')} className={inputCls(!!errors.timeline)}>
          <option value="">Select timeline</option>
          {timelineOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field label="Your Message *" error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your project, goals, and any specific requirements..."
          className={`${inputCls(!!errors.message)} resize-none`}
        />
      </Field>

      {/* Privacy checkbox */}
      <div className="flex items-start gap-3">
        <input
          {...register('privacy')}
          type="checkbox"
          id="privacy"
          className="mt-1 w-4 h-4 accent-violet-600 shrink-0"
        />
        <label htmlFor="privacy" className="text-sm text-muted leading-relaxed">
          I agree to the{' '}
          <a href="/legal/privacy-policy" className="text-violet-400 hover:text-violet-300 underline">
            Privacy Policy
          </a>{' '}
          and consent to MTA contacting me.
        </label>
      </div>
      {errors.privacy && <p className="text-red-400 text-xs -mt-4">{errors.privacy.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        data-cursor="pointer"
        className="w-full flex items-center justify-center gap-3 py-4 bg-lime text-black font-display font-bold text-base rounded-2xl hover:bg-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(198,249,31,0.15)] hover:shadow-[0_8px_30px_rgba(198,249,31,0.25)] hover:-translate-y-1"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          'Send Message →'
        )}
      </button>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-muted/80 font-mono tracking-[0.12em] uppercase">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `w-full bg-transparent border-b ${hasError ? 'border-red-500' : 'border-border focus:border-violet'} py-3 text-white placeholder:text-muted/50 text-sm outline-none transition-colors duration-200 font-body focus:ring-1 focus:ring-violet/20`
}

export default ContactForm
