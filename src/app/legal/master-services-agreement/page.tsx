import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Master Services Agreement',
  description: 'Master Services Agreement for Manglam Technical Agency.',
}

export default function MasterServicesAgreement() {
  return (
    <div className="min-h-screen bg-canvas pt-[140px] pb-24">
      <div className="container-site max-w-3xl">
        <h1 className="font-display font-black text-white text-4xl sm:text-5xl mb-12 tracking-tight">
          Master Services Agreement
        </h1>
        <div className="prose prose-invert prose-p:text-muted prose-p:text-[15px] prose-p:leading-[1.7] prose-headings:font-display prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-a:text-violet-light prose-li:text-muted prose-li:text-[15px] max-w-none font-body">
          <p className="font-mono text-xs uppercase tracking-widest text-dead mb-8">
            Last Updated: March 2026
          </p>
          <p>
            Please provide the exact Markdown text for the Master Services Agreement below.
          </p>
        </div>
      </div>
    </div>
  )
}
