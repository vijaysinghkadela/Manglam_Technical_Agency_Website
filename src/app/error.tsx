'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error('[MTA Error]', error) }, [error])
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center text-center px-6">
      <h2 className="font-display font-black text-2xl text-white">Something went wrong</h2>
      <p className="text-muted text-sm mt-3 max-w-xs">{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} data-cursor="pointer"
        className="mt-8 px-6 py-3 border border-border text-sm font-mono text-white hover:bg-white hover:text-black transition-all"
      >
        Try Again
      </button>
    </div>
  )
}
