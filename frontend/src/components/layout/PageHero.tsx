'use client'
import { TextReveal } from '@/components/ui/TextReveal'
import type { CSSProperties } from 'react'

interface Props {
  label:    string
  title:    string
  subtitle?: string
  breadcrumb?: { label:string; href:string }[]
}

export function PageHero({ label, title, subtitle, breadcrumb }: Props) {
  return (
    <section className="w-full bg-canvas pt-[140px] pb-16 section-divide">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        {breadcrumb && (
          <div className="flex items-center gap-2 font-mono text-[11px] text-dead mb-8">
            {breadcrumb.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <a href={b.href} className="hover:text-muted transition-colors">{b.label}</a>
              </span>
            ))}
          </div>
        )}
        <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase block mb-4">
          {label}
        </span>
        <TextReveal text={title} as="h1"
          className="font-display font-black text-white tracking-tight leading-[0.92]"
          style={{ fontSize:'clamp(40px, 6vw, 88px)' } as CSSProperties}
        />
        {subtitle && (
          <p className="text-muted text-[17px] leading-[1.65] mt-6 max-w-2xl">{subtitle}</p>
        )}
        <div className="w-full h-px bg-border mt-16" />
      </div>
    </section>
  )
}
