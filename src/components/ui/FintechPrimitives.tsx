'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type FintechButtonProps = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  icon?: boolean
} & (
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
)

export function FintechButton({
  children,
  className,
  variant = 'primary',
  icon = true,
  ...props
}: FintechButtonProps) {
  const classes = cn(
    'group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full pl-5 pr-2 text-[15px] font-medium tracking-normal transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(var(--color-accent-rgb),0.18)] focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none',
    variant === 'primary'
      ? 'bg-[#171512] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_24px_rgba(23,21,18,0.14)]'
      : 'border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:border-[rgba(var(--color-accent-rgb),0.32)] hover:shadow-[0_8px_24px_rgba(23,21,18,0.08)]',
    className,
  )
  const content = (
    <>
      {variant === 'primary' ? (
        <>
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/12 to-transparent opacity-80" />
          <span className="pointer-events-none absolute -right-12 -top-20 h-36 w-36 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
        </>
      ) : (
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--color-accent-rgb),0.08),transparent_55%)] opacity-80" />
      )}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {icon ? (
        <span
          className={cn(
            'relative z-10 ml-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 motion-reduce:transition-none',
            variant === 'primary'
              ? 'border border-white/15 bg-white/12 text-white backdrop-blur-md group-hover:translate-x-0.5 group-hover:bg-white/20'
              : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] group-hover:scale-[1.03] group-hover:border-[rgba(var(--color-accent-rgb),0.32)]',
          )}
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      ) : null}
    </>
  )

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          data-cursor="pointer"
          {...anchorProps}
          style={variant === 'primary' ? { ...anchorProps.style, color: '#fff' } : anchorProps.style}
          rel={anchorProps.target === '_blank' ? 'noopener noreferrer' : anchorProps.rel}
        >
          {content}
        </a>
      )
    }

    return (
      <Link
        href={href}
        className={classes}
        data-cursor="pointer"
        {...anchorProps}
        style={variant === 'primary' ? { ...anchorProps.style, color: '#fff' } : anchorProps.style}
      >
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} data-cursor="pointer" {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}

export function FintechBadge({
  children,
  className,
  icon,
}: {
  children: ReactNode
  className?: string
  icon?: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-10 items-center gap-3 rounded-full border border-[rgba(var(--color-accent-rgb),0.18)] bg-[rgba(var(--color-accent-rgb),0.08)] px-4 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-violet-dark)]',
        className,
      )}
    >
      {icon ? <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-card)] text-[var(--color-violet-dark)] shadow-sm">{icon}</span> : null}
      {children}
    </span>
  )
}

export function FintechPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'glass-panel rounded-2xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function FintechFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('fintech-frame relative mx-auto w-full max-w-[1600px] px-5 sm:px-9 lg:px-16', className)}>
      <div className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-[var(--color-border)]/80 sm:left-9 md:block lg:left-16" />
      <div className="pointer-events-none absolute right-5 top-0 hidden h-full w-px bg-[var(--color-border)]/80 sm:right-9 md:block lg:right-16" />
      {children}
    </div>
  )
}
