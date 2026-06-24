import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Tag({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
}) {
  return (
    <span className={cn('enterprise-tag', className)} {...props}>
      {children}
    </span>
  )
}
