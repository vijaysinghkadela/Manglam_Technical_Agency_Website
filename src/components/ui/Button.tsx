'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  className?: string
  variant?: Variant
  size?: Size
  liquid?: boolean
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

const variantClasses: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'border-transparent bg-transparent text-muted hover:text-foreground',
}

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-[44px] px-4 py-2 text-xs',
  md: '',
  lg: 'btn-lg',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkButtonProps>(
  function Button({ children, className, variant = 'primary', size = 'md', liquid = false, href, ...props }, ref) {
    const classes = cn('btn', variantClasses[variant], sizeClasses[size], liquid && 'liquid-hover', className)

    if (href) {
      const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>
      const isExternal = href.startsWith('http')
      if (isExternal) {
        return (
          <a
            ref={ref as Ref<HTMLAnchorElement>}
            href={href}
            data-cursor="pointer"
            rel={anchorProps.target === '_blank' ? 'noopener noreferrer' : anchorProps.rel}
            className={classes}
            {...anchorProps}
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          data-cursor="pointer"
          className={classes}
          {...anchorProps}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        data-cursor="pointer"
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  },
)
