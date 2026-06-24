import Image from 'next/image'
import Link from 'next/link'

const audiences = [
  {
    title: 'Clinics & gyms',
    need: 'Bookings, WhatsApp enquiries, member data, consent-aware forms.',
    route: '/services/ai-automation',
  },
  {
    title: 'NGOs & education teams',
    need: 'Credible public sites, program proof, reports, donation-ready pages.',
    route: '/portfolio',
  },
  {
    title: 'Local service businesses',
    need: 'Lead capture, follow-up loops, CRM updates, safer customer handling.',
    route: '/services/ai-automation',
  },
  {
    title: 'Founders & startups',
    need: 'MVPs, SaaS builds, automation, launch support, security baseline.',
    route: '/services',
  },
]

const proofSignals = [
  { label: 'Live public builds', value: '3' },
  { label: 'Internal SaaS products', value: '2' },
  { label: 'Reply feedback loop', value: '2-4 hr' },
  { label: 'Compliance posture', value: 'DPDP-aware' },
]

const proofImages = [
  {
    title: 'MNSS NGO Website',
    caption: 'Program proof, donation trust, and public reporting.',
    src: '/images/MNSS-website-screenshot.webp',
  },
  {
    title: 'ClinicFlow Dashboard',
    caption: 'WhatsApp-first clinic ops with structured staff workflow.',
    src: '/images/ClinicFlow Dashboard Screenshot.webp',
  },
]

export function AudienceProofBand() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container-site py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet-light">
              Conversion signal loop
            </p>
            <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(2rem,4vw,3.35rem)] font-black leading-[0.95] tracking-normal text-foreground">
              Who MTA is built for.
            </h2>
            <p className="mt-5 max-w-[50ch] text-sm leading-relaxed text-muted sm:text-[15px]">
              The site now routes buyers by need first, then service. This reduces decision friction
              and makes the commercial loop clearer before the contact form.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {proofSignals.map((item) => (
                <div key={item.label} className="border border-border bg-card px-5 py-5">
                  <p className="font-display text-xl font-black leading-none text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {audiences.map((item) => (
                <Link
                  key={item.title}
                  href={item.route}
                  className="group border border-border bg-card p-5 transition-colors hover:border-violet/35 hover:bg-accent-soft"
                >
                  <h3 className="font-display text-lg font-black leading-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.need}</p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-violet-light">
                    View fit →
                  </p>
                </Link>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {proofImages.map((item) => (
                <figure key={item.title} className="overflow-hidden border border-border bg-card">
                  <div className="relative aspect-[16/10] bg-surface">
                    <Image
                      src={item.src}
                      alt={`${item.title} screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="border-t border-border px-5 py-4">
                    <p className="font-display text-sm font-black text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{item.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
