'use client'

import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const baseClass =
  'peer w-full rounded-xl border border-border bg-surface px-4 pb-3 pt-6 text-base text-foreground outline-none transition-all duration-200 placeholder:text-transparent focus:border-violet focus:shadow-[0_0_0_4px_rgba(var(--color-accent-rgb),0.08)] disabled:cursor-not-allowed disabled:opacity-60'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={cn(baseClass, className)} {...props} />
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...props },
  ref,
) {
  return <textarea ref={ref} className={cn(baseClass, 'min-h-36 resize-y', className)} {...props} />
})

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        baseClass,
        'mta-select cursor-pointer appearance-none pr-11',
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(45deg, transparent 50%, var(--color-dead) 50%), linear-gradient(135deg, var(--color-dead) 50%, transparent 50%)',
        backgroundPosition: 'calc(100% - 18px) calc(50% + 2px), calc(100% - 13px) calc(50% + 2px)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '5px 5px, 5px 5px',
      }}
      {...props}
    >
      {children}
    </select>
  )
})

export function FloatingField({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dead transition-all duration-200 peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-xs peer-placeholder-shown:tracking-[0.12em] peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.16em] peer-focus:text-violet"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 font-mono text-[11px] text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
