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
      <div className="border border-border bg-card p-8 sm:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full border border-violet/40 bg-violet/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-violet-light" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-white">Request Submitted</h3>
            <p className="text-sm text-muted">Our team will review and share applicable templates after verification.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm text-violet-light hover:text-white transition-colors"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form className="border border-border bg-card p-6 sm:p-8 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-violet-light mb-2">Request Templates</p>
        <h3 className="font-display font-black text-2xl text-white mb-2">Restricted Access Workflow</h3>
        <p className="text-sm text-muted leading-relaxed">
          Templates are shared after manual verification to protect confidential and client-sensitive legal structures.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">Name *</span>
          <input
            {...register('name')}
            placeholder="Your full name"
            className="bg-canvas border border-border px-4 py-3 text-sm text-white outline-none focus:border-violet"
          />
          {errors.name && <span className="text-[11px] text-red-400">{errors.name.message}</span>}
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">Email *</span>
          <input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            className="bg-canvas border border-border px-4 py-3 text-sm text-white outline-none focus:border-violet"
          />
          {errors.email && <span className="text-[11px] text-red-400">{errors.email.message}</span>}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">Company</span>
        <input
          {...register('company')}
          placeholder="Optional"
          className="bg-canvas border border-border px-4 py-3 text-sm text-white outline-none focus:border-violet"
        />
      </label>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">Requested Documents *</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {docs.map((doc) => {
            const selected = selectedDocs?.includes(doc.id)
            return (
              <button
                type="button"
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`text-left border px-4 py-3 transition-colors ${
                  selected ? 'border-violet/60 bg-violet/10' : 'border-border bg-canvas hover:border-violet/35'
                }`}
              >
                <p className="text-sm font-semibold text-white">{doc.name}</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">{doc.notes}</p>
              </button>
            )
          })}
        </div>
        {errors.requestedDocuments && <span className="text-[11px] text-red-400">{errors.requestedDocuments.message}</span>}
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">Use Case *</span>
        <textarea
          {...register('useCase')}
          rows={4}
          placeholder="Tell us which engagement this is for and why these templates are needed."
          className="bg-canvas border border-border px-4 py-3 text-sm text-white outline-none focus:border-violet resize-y"
        />
        {errors.useCase && <span className="text-[11px] text-red-400">{errors.useCase.message}</span>}
      </label>

      <label className="flex items-start gap-3 text-sm text-muted leading-relaxed">
        <input
          type="checkbox"
          {...register('privacy')}
          className="mt-0.5 w-4 h-4 accent-violet"
        />
        I confirm this request is for legitimate evaluation or onboarding and I agree to MTA processing this submission.
      </label>
      {errors.privacy && <span className="text-[11px] text-red-400 -mt-4">{errors.privacy.message}</span>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-display font-black text-[15px] hover:bg-violet hover:text-white transition-colors disabled:opacity-60"
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
