'use client'

import { Check } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const AnimatedCheckbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function AnimatedCheckbox({ className, ...props }, ref) {
    return (
      <span className="relative inline-flex h-11 w-11 shrink-0 items-start justify-start">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'peer absolute inset-0 h-11 w-11 cursor-pointer appearance-none rounded-md opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card',
            className,
          )}
          {...props}
        />
        <span
          aria-hidden="true"
          className="mt-1 h-6 w-6 rounded-md border border-border bg-card transition-all peer-checked:border-violet peer-checked:bg-violet"
        />
        <Check className="pointer-events-none absolute left-1 top-2 h-4 w-4 text-white opacity-0 transition-all duration-200 [stroke-dasharray:24] [stroke-dashoffset:24] peer-checked:opacity-100 peer-checked:[stroke-dashoffset:0]" />
      </span>
    )
  },
)
