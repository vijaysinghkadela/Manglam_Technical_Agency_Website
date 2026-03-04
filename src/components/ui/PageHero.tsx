'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TextReveal } from '@/components/ui/TextReveal'

interface PageHeroProps {
  breadcrumbBase?: string
  breadcrumbBaseHref?: string
  breadcrumbCurrent: string
  label?: string
  title: string
  subheading?: string
}

export default function PageHero({
  breadcrumbBase = 'Home',
  breadcrumbBaseHref = '/',
  breadcrumbCurrent,
  label,
  title,
  subheading,
}: PageHeroProps) {
  return (
    <section className="w-full bg-canvas pt-[100px] lg:pt-[140px] pb-10 lg:pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[12px] font-mono text-dead">
              <Link href={breadcrumbBaseHref} className="hover:text-muted transition-colors" data-cursor="pointer">
                {breadcrumbBase}
              </Link>
              <span>/</span>
              <span className="text-muted">{breadcrumbCurrent}</span>
            </div>

            {label && (
              <span className="font-mono text-label text-violet-light tracking-[0.22em] uppercase block">
                {label}
              </span>
            )}
          </div>

          <TextReveal
            text={title}
            as="h1"
            className="font-display font-black text-white tracking-tight leading-[0.92]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          />

          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[15px] text-muted max-w-2xl leading-[1.65]"
            >
              {subheading}
            </motion.p>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mt-10 lg:mt-16">
        <div className="w-full h-px bg-border" />
      </div>
    </section>
  )
}
