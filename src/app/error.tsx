'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error:Error; reset:()=>void }) {
  useEffect(() => { 
    // Only log in development - in production, use error tracking service (Sentry, etc.)
    if (process.env.NODE_ENV === 'development') {
      console.error('[MTA Error]', error)
    }
    // TODO: Send to error tracking service in production
  }, [error])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor:'var(--color-canvas)' }}
    >
      <h2 className="font-display font-black text-white text-2xl mb-3">Something Went Wrong</h2>
      <p className="text-sm mb-8 max-w-xs" style={{ color:'var(--color-muted)' }}>
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button onClick={reset} data-cursor="pointer"
        className="text-sm font-mono text-white transition-all"
        style={{ border:'1px solid var(--color-border)', padding:'12px 24px' }}
      >
        Try Again
      </button>
    </div>
  )
}
