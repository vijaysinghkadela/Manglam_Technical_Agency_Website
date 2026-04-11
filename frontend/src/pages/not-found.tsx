'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden grain"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      {/* Ambient violet glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div
          style={{
            width: '500px',
            height: '500px',
            backgroundColor: 'rgba(124,58,237,0.07)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Line grid */}
      <div className="absolute inset-0 bg-line-grid pointer-events-none opacity-40" aria-hidden />

      <div className="relative z-10 flex flex-col items-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-mono uppercase block mb-4"
          style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
        >
          ERROR
        </motion.span>

        {/* 404 display */}
        <motion.span
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="font-display font-black leading-none select-none text-glow-violet"
          style={{ fontSize: 'clamp(80px,18vw,200px)', color: 'var(--color-border)' }}
        >
          404
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
          className="font-display font-black -mt-4 mb-3"
          style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--color-foreground)' }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          style={{ color: 'var(--color-muted)', maxWidth: '320px', lineHeight: 1.65 }}
        >
          This page doesn&apos;t exist or has been moved. Try one of the links below.
        </motion.p>

        {/* Action links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          className="flex items-center gap-4 mt-10 flex-wrap justify-center"
        >
          <Link
            href="/"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 text-sm font-mono transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-foreground)',
              color: 'var(--color-canvas)',
              padding: '12px 24px',
            }}
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 text-sm font-mono hover-foreground transition-all duration-200"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
              padding: '12px 24px',
            }}
          >
            Contact Us →
          </Link>
        </motion.div>

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.48, ease: EASE }}
          className="flex items-center gap-4 mt-8 flex-wrap justify-center"
        >
          {[
            { label: 'Portfolio', href: '/portfolio' },
            { label: 'Services', href: '/services' },
            { label: 'Pricing', href: '/pricing' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor="pointer"
              className="text-xs font-mono hover-foreground transition-colors"
              style={{ color: 'var(--color-dead)', letterSpacing: '0.1em' }}
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
