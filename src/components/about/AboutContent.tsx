'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { teamMembers } from '@/lib/data/team'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const narrativeSections = [
  {
    label: 'How we work',
    title: 'A small team that stays close to the project',
    paragraphs: [
      'Manglam Technical Agency is based in Bikaner, Rajasthan, and works with businesses that need practical technical support without a heavy agency layer. Clients usually come to us when they need a website fixed, a workflow automated, a security concern reviewed, or a product idea shaped into something usable.',
      'We keep the working relationship direct. The people planning the work are also close to the people building it, which makes conversations clearer and decisions faster. When a project needs research, design, engineering, content, or security thinking, we bring those pieces together around the actual business problem instead of treating them as separate hand-offs.',
    ],
  },
  {
    label: 'What we care about',
    title: 'Plain communication, documented scope, and steady delivery',
    paragraphs: [
      'Every engagement starts by understanding what the client needs, what is already in place, and what would make the next stage easier. We prefer clear scope, written assumptions, and simple checkpoints over vague promises. If something is uncertain, we say so early and explain the tradeoff.',
      'Our work spans web development, AI automation, SaaS builds, cybersecurity, branding, content, and social media operations. The common thread is not a slogan; it is the discipline of making digital systems easier to run, easier to understand, and easier to improve over time.',
    ],
  },
  {
    label: 'Verification notes',
    title: 'Claims are kept careful on purpose',
    paragraphs: [
      'MTA references Indian business and compliance contexts such as MSME registration, DPDP, CERT-In, and startup ecosystem programs where they are relevant to a project. Public pages avoid overstating those items unless the supporting document is meant to be shared with a visitor.',
      'For legal, security, and data-protection work, we treat public content as a starting point, not advice. Project-specific obligations are confirmed in the contract, rules of engagement, and the client’s actual operating context.',
    ],
  },
]

const expectations = [
  'Clear starting recommendations before a paid scope begins',
  'Direct contact with the people responsible for delivery',
  'Readable project notes, timelines, and handover material',
  'Consent-aware handling for forms, automation, and data workflows',
]

export function AboutContent() {
  return (
    <>
      <section className="section-sm w-full border-t border-border bg-surface">
        <div className="container-site grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <span className="font-mono text-label tracking-[0.22em] uppercase text-violet-light">
              About MTA
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-foreground lg:text-4xl">
              Built for clients who want the people doing the work in the room.
            </h2>
          </div>

          <div className="space-y-12">
            {narrativeSections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                className="border-b border-border pb-10 last:border-b-0 last:pb-0"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-light">
                  {section.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-black leading-tight text-foreground">
                  {section.title}
                </h3>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-3xl text-[16px] leading-[1.78] text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm w-full border-t border-border bg-canvas">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className="font-mono text-label tracking-[0.22em] uppercase text-violet-light">
              What clients can expect
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-foreground lg:text-4xl">
              Less theatre, more useful decisions.
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-muted">
              Good work usually depends on small habits: asking the right questions, writing down the
              agreement, reviewing the risks, and keeping the client informed before a small issue
              becomes a larger one.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {expectations.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-medium leading-relaxed text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section w-full border-t border-border bg-surface">
        <div className="container-site">
          <div className="mb-12 max-w-3xl">
            <span className="font-mono text-label tracking-[0.22em] uppercase text-violet-light">
              The team
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-foreground lg:text-4xl">
              People behind the work
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-muted">
              MTA is intentionally small. That keeps responsibility visible and makes it easier for
              clients to understand who is handling strategy, technical direction, and delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
                  <div className="relative h-72 bg-accent-soft sm:h-full">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.role} at Manglam Technical Agency`}
                        fill
                        className="object-cover"
                        style={{ objectPosition: member.imagePosition ?? '50% 20%' }}
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-display text-4xl font-black text-violet-light">
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <div className="p-7 sm:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-light">
                      {member.role}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-black text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.7] text-muted">{member.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(member.expertise ?? []).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-canvas px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm w-full border-t border-border bg-canvas">
        <div className="container-site">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-label uppercase tracking-[0.2em] text-violet-light">
                  Start with a conversation
                </p>
                <h2 className="mt-3 font-display text-2xl font-black leading-tight text-foreground lg:text-3xl">
                  Share the problem, not a perfect brief.
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-muted">
                  If the right next step is a small fix, a discovery call, or a larger scope, we will
                  say that plainly.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-violet px-7 py-4 font-display text-sm font-black text-white transition-colors hover:bg-violet-light"
              >
                Contact MTA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
