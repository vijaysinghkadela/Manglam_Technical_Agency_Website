'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Enter a valid email address'),
  company: z.string().optional(),
  requestedDocuments: z.array(z.string()).min(1, 'Select at least one document'),
  useCase: z.string().min(20, 'Use case must be at least 20 characters'),
  privacy: z.boolean().refine((value) => value === true, 'You must agree to continue'),
})

type FormData = z.infer<typeof schema>

interface RequestableDoc {
  id: string
  name: string
  notes: string
}

interface DocumentRequestFormProps {
  docs: RequestableDoc[]
}

export function DocumentRequestForm({ docs }: DocumentRequestFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      requestedDocuments: [],
      privacy: false,
    },
  })

  const toggleDoc = (id: string) => {
    const current = selectedDocs
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    setSelectedDocs(next)
    setValue('requestedDocuments', next, { shouldValidate: true })
  }

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/document-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      toast.error('Unable to submit request. Please try again.')
      return
    }

    setSubmitted(true)
    setSelectedDocs([])
    reset()
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col gap-6 p-8"
        style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-card)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 flex items-center justify-center shrink-0"
            style={{ border: '1px solid rgba(124,58,237,0.4)', backgroundColor: 'rgba(124,58,237,0.08)' }}
          >
            <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--color-violet-light)' }} />
          </div>
          <div>
            <h3 className="font-display font-black text-xl" style={{ color: 'var(--color-foreground)' }}>
              Request Submitted
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Our team will review and share applicable templates after verification.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-mono transition-colors hover-foreground"
          style={{ color: 'var(--color-violet-light)', textAlign: 'left' }}
        >
          Submit another request →
        </button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-6 p-6 sm:p-8"
      style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-card)' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Header */}
      <div>
        <span
          className="font-mono uppercase block mb-2"
          style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}
        >
          REQUEST TEMPLATES
        </span>
        <h3
          className="font-display font-black text-2xl mb-2"
          style={{ color: 'var(--color-foreground)' }}
        >
          Restricted Access Workflow
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Templates are shared after manual verification to protect confidential and client-sensitive legal structures.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.15em' }}
          >
            Name *
          </span>
          <input
            {...register('name')}
            placeholder="Your full name"
            className="px-4 py-3 text-sm outline-none transition-colors"
            style={{
              backgroundColor: 'var(--color-canvas)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-violet)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          />
          {errors.name && (
            <span className="text-label text-red-400">{errors.name.message}</span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.15em' }}
          >
            Email *
          </span>
          <input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            className="px-4 py-3 text-sm outline-none transition-colors"
            style={{
              backgroundColor: 'var(--color-canvas)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-violet)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          />
          {errors.email && (
            <span className="text-label text-red-400">{errors.email.message}</span>
          )}
        </label>
      </div>

      {/* Company */}
      <label className="flex flex-col gap-2">
        <span
          className="font-mono uppercase"
          style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.15em' }}
        >
          Company
        </span>
        <input
          {...register('company')}
          placeholder="Optional"
          className="px-4 py-3 text-sm outline-none transition-colors"
          style={{
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-foreground)',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-violet)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
      </label>

      {/* Document selection */}
      <div className="flex flex-col gap-3">
        <span
          className="font-mono uppercase"
          style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.15em' }}
        >
          Requested Documents *
        </span>
        <div className="flex flex-col gap-2">
          {docs.map((doc) => {
            const selected = selectedDocs.includes(doc.id)
            return (
              <button
                type="button"
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className="text-left px-4 py-3 transition-all duration-200"
                style={{
                  border: selected
                    ? '1px solid rgba(124,58,237,0.6)'
                    : '1px solid var(--color-border)',
                  backgroundColor: selected ? 'rgba(124,58,237,0.08)' : 'var(--color-canvas)',
                }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  {doc.name}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {doc.notes}
                </p>
              </button>
            )
          })}
        </div>
        {errors.requestedDocuments && (
          <span className="text-label text-red-400">{errors.requestedDocuments.message}</span>
        )}
      </div>

      {/* Use case */}
      <label className="flex flex-col gap-2">
        <span
          className="font-mono uppercase"
          style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.15em' }}
        >
          Use Case *
        </span>
        <textarea
          {...register('useCase')}
          rows={4}
          placeholder="Tell us which engagement this is for and why these templates are needed."
          className="px-4 py-3 text-sm outline-none resize-y transition-colors"
          style={{
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-foreground)',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-violet)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
        {errors.useCase && (
          <span className="text-label text-red-400">{errors.useCase.message}</span>
        )}
      </label>

      {/* Privacy checkbox */}
      <label className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        <input
          type="checkbox"
          {...register('privacy')}
          className="mt-0.5 w-4 h-4 accent-violet shrink-0"
        />
        I confirm this request is for legitimate evaluation or onboarding and I agree to MTA processing this submission.
      </label>
      {errors.privacy && (
        <span className="text-label text-red-400 -mt-4">{errors.privacy.message}</span>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 px-6 py-4 font-display font-black text-[15px] transition-all duration-300 hover:bg-violet hover:text-white disabled:opacity-60"
        style={{ backgroundColor: 'var(--color-foreground)', color: 'var(--color-canvas)' }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </button>
    </form>
  )
}
