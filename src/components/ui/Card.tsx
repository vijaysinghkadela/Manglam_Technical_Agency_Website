import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({
  children,
  className,
  interactive = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  interactive?: boolean
}) {
  return (
    <div
      className={cn(
        'enterprise-card',
        interactive && 'hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
