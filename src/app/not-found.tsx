import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center text-center px-6">
      <span className="font-display font-black text-[120px] text-[#111] leading-none select-none">404</span>
      <h1 className="font-display font-black text-3xl text-white -mt-4">Page Not Found</h1>
      <p className="text-muted text-base mt-3 max-w-sm leading-relaxed">
        This page doesn&apos;t exist. It may have been moved or the URL might be wrong.
      </p>
      <Link href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-border text-sm text-white font-mono hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        data-cursor="pointer"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
