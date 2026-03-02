import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor:'var(--color-canvas)' }}
    >
      <span className="font-display font-black leading-none select-none" style={{ fontSize:'clamp(80px,18vw,200px)', color:'var(--color-border)' }}>
        404
      </span>
      <h1 className="font-display font-black text-white text-3xl -mt-4 mb-3">Page Not Found</h1>
      <p style={{ color:'var(--color-muted)', maxWidth:'320px', lineHeight:1.65 }}>
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" data-cursor="pointer"
        className="mt-8 inline-flex items-center gap-2 text-sm font-mono text-white transition-all"
        style={{ border:'1px solid var(--color-border)', padding:'12px 24px' }}
      >
        ← Back to Home
      </Link>
    </div>
  )
}
