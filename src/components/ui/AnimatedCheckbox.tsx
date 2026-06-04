'use client'

import { Check } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const AnimatedCheckbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function AnimatedCheckbox({ className, ...props }, ref) {
    return (
      <span className="relative mt-1 inline-flex h-6 w-6 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-border bg-card transition-all checked:border-violet checked:bg-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card',
            className,
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute left-1 top-1 h-4 w-4 text-white opacity-0 transition-all duration-200 [stroke-dasharray:24] [stroke-dashoffset:24] peer-checked:opacity-100 peer-checked:[stroke-dashoffset:0]" />
      </span>
    )
  },
)
