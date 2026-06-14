'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Instagram, Lock, PlayCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type KeyboardEvent, useRef, useState } from 'react'

import { projects, type Project } from '@/lib/data/projects'
import {
  FintechBadge,
  FintechButton,
  FintechFrame,
  FintechPanel,
} from '@/components/ui/FintechPrimitives'

import type { Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

type FilterType = 'all' | 'client' | 'product' | 'social-media-handle-manager'

const comingProjects = projects.filter((project) => project.status === 'coming-soon')

const getReelPreviews = (project: Project) => {
  if (project.previewVideos?.length) return project.previewVideos
  if (project.previewVideo) {
    return [
      {
        src: project.previewVideo,
        label: project.previewVideoLabel ?? 'Reel preview',
      },
    ]
  }
  return []
}

export function PortfolioContent() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const filterButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const reducedMotion = useReducedMotion()

  const filteredProjects = projects.filter((project) => {
    if (project.status !== 'live') return false
    if (filter === 'all') return true
    return project.type === filter
  })

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Work' },
    { key: 'client', label: 'Client Projects' },
    { key: 'social-media-handle-manager', label: 'Social Media Handle Manager' },
    { key: 'product', label: 'MTA Products' },
  ]

  const getProjectTypeLabel = (type: FilterType) => {
    if (type === 'product') return 'MTA product'
    if (type === 'social-media-handle-manager') return 'Social handle'
    return 'Client project'
  }

  const handleFilterKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = filters.length - 1
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = index === lastIndex ? 0 : index + 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = index === 0 ? lastIndex : index - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex

    if (nextIndex === null) return
    event.preventDefault()
    setFilter(filters[nextIndex].key)
    filterButtonRefs.current[nextIndex]?.focus()
  }

  return (
    <FintechFrame className="bg-white">
      <section className="relative z-10 px-0 py-20 lg:px-16 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              suppressHydrationWarning
            >
              <FintechBadge icon={<Sparkles className="h-[18px] w-[18px]" />}>Case studies</FintechBadge>
            </motion.div>
            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="marketing-heading mt-6 max-w-[760px] text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-slate-950"
              suppressHydrationWarning
            >
              Proof of systems that move from launch to measurable work.
            </motion.h2>
          </div>

          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-lg leading-8 text-slate-500"
            suppressHydrationWarning
          >
            This section provides proof of systems that transition from launch to measurable results, including
            websites, SaaS products, dashboards, automation-ready interfaces, and managed social handles.
          </motion.p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Portfolio filters">
          {filters.map((filterOption, index) => {
            const selected = filter === filterOption.key
            return (
              <button
                key={filterOption.key}
                ref={(el) => {
                  filterButtonRefs.current[index] = el
                }}
                type="button"
                role="tab"
                onClick={() => setFilter(filterOption.key)}
                onKeyDown={(event) => handleFilterKeyDown(event, index)}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className={`min-h-11 rounded-full border px-4 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)] focus-visible:ring-offset-2 lg:!min-h-9 lg:px-3 lg:text-[10px] lg:tracking-[0.08em] ${
                  selected
                    ? 'border-[rgba(var(--color-accent-rgb),0.28)] bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-violet-dark)] shadow-[0_8px_22px_rgba(31,122,122,0.10)]'
                    : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-muted)] hover:border-[rgba(var(--color-accent-rgb),0.28)] hover:text-[var(--color-violet-dark)]'
                }`}
              >
                {filterOption.label}
              </button>
            )
          })}
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const reelPreviews = getReelPreviews(project)
            const hasReelPreviews = reelPreviews.length > 0

            return (
            <motion.article
              key={project.id}
              variants={fadeUp}
              initial={false}
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={hasReelPreviews ? 'xl:col-span-2' : undefined}
              suppressHydrationWarning
            >
              <FintechPanel className="group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[rgba(var(--color-accent-rgb),0.28)] hover:shadow-[0_8px_24px_rgba(23,21,18,0.08)]">
                <div
                  className={`relative overflow-hidden border-b border-slate-200 bg-slate-50 ${
                    hasReelPreviews ? 'p-4 sm:p-5 lg:p-6' : 'min-h-[280px] sm:min-h-[360px]'
                  }`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.75)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.75)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
                  {hasReelPreviews && project.image && !imageErrors[project.id] ? (
                    <div className="relative z-10 grid gap-4 pt-11 sm:gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:pt-0">
                      <div className="relative aspect-[16/10] min-h-[190px] overflow-hidden rounded-[22px] border border-slate-200 bg-[#080b10] shadow-[0_16px_44px_rgba(15,23,42,0.10)] sm:min-h-[300px] lg:h-full lg:min-h-0 lg:aspect-auto">
                        <Image
                          src={project.image}
                          alt={`${project.client} Instagram profile and feed preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-2 transition duration-500 group-hover:scale-[1.01] sm:p-4"
                          loading="eager"
                          unoptimized
                          onError={() => setImageErrors((current) => ({ ...current, [project.id]: true }))}
                        />
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/50 glass-overlay px-3 py-1 text-xs font-semibold text-white">
                          <Instagram className="h-3.5 w-3.5" />
                          Live handle
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                        {reelPreviews.map((preview) => (
                          <div
                            key={preview.src}
                            className="relative mx-auto aspect-[9/16] w-full max-w-[132px] overflow-hidden rounded-[18px] border-[4px] border-slate-950 bg-slate-950 shadow-[0_20px_50px_rgba(15,23,42,0.22)] sm:max-w-[150px] lg:max-w-[160px] xl:max-w-[170px]"
                          >
                            <video
                              className="h-full w-full object-cover"
                              src={preview.src}
                              muted
                              loop
                              playsInline
                              autoPlay
                              preload="metadata"
                              aria-label={`${project.client} ${preview.label}`}
                            />
                            <div className="absolute inset-x-2 bottom-2 rounded-2xl glass-overlay px-2.5 py-2 text-white">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="h-3.5 w-3.5 shrink-0" />
                                <span className="text-[11px] font-semibold leading-4">
                                  {preview.label}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : project.image && !imageErrors[project.id] ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} interface screenshot for ${project.client}`}
                      fill
                      sizes="(max-width: 1280px) 100vw, 50vw"
                      className="object-contain p-6 transition duration-500 group-hover:scale-[1.025]"
                      loading="lazy"
                      unoptimized
                      onError={() => setImageErrors((current) => ({ ...current, [project.id]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid h-28 w-28 grid-cols-3 gap-2 rounded-[24px] border border-[rgba(var(--color-accent-rgb),0.18)] bg-white p-5 shadow-[0_8px_24px_rgba(23,21,18,0.08)]">
                        {[0, 2, 4, 6, 8].map((dot) => (
                          <span key={dot} className="rounded bg-[var(--color-violet-dark)]" style={{ gridColumnStart: (dot % 3) + 1, gridRowStart: Math.floor(dot / 3) + 1 }} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {project.featured ? (
                      <span className="rounded-full border border-[rgba(var(--color-accent-rgb),0.18)] glass-strong px-3 py-1 text-xs font-medium text-[var(--color-violet-dark)]">
                        Signature
                      </span>
                    ) : null}
                    <span className="rounded-full border border-slate-200 glass-strong px-3 py-1 text-xs font-semibold text-slate-600">
                      {getProjectTypeLabel(project.type)}
                    </span>
                  </div>
                </div>

                <div className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.045em] text-slate-950 sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                    {project.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Duration</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">{project.duration}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Client</p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-slate-950">{project.client}</p>
                    </div>
                  </div>

                  {project.deliverables.length > 0 ? (
                    <ul className="mt-5 grid gap-2">
                      {project.deliverables.slice(0, hasReelPreviews ? 5 : 4).map((deliverable) => (
                        <li key={deliverable} className="flex gap-2 text-sm leading-6 text-slate-500">
                          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-violet-dark)]" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {project.url ? (
                    <div className="mt-7">
                      <FintechButton href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary">
                        {project.type === 'social-media-handle-manager' ? 'View Instagram handle' : 'View live site'}
                      </FintechButton>
                    </div>
                  ) : null}
                </div>
              </FintechPanel>
            </motion.article>
            )
          })}
        </div>
      </section>

      <section className="relative z-10 border-t border-slate-200/80 px-0 py-20 lg:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <FintechBadge>Pipeline</FintechBadge>
            <h2 className="marketing-heading mt-6 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-slate-950">
              Upcoming product work
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-500">
            These builds are in progress and will be published as full case studies after launch.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_16px_44px_rgba(15,23,42,0.06)]">
          {comingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reducedMotion ? 0 : 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-4 border-b border-slate-200 px-5 py-5 last:border-b-0 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:px-6"
              suppressHydrationWarning
            >
              <span className="font-mono text-sm font-semibold text-[var(--color-violet-dark)]">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.035em] text-slate-950">{project.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">{project.tags.join(' / ')} · {project.client}</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                <Lock className="h-3 w-3" />
                Coming soon
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-[22px] border border-[rgba(var(--color-accent-rgb),0.18)] bg-[rgba(var(--color-accent-rgb),0.08)] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-violet-dark)]">Work with us</p>
            <p className="mt-2 text-base leading-7 text-slate-600">Have a project in mind? Let&apos;s map the system, scope, and launch path.</p>
          </div>
          <Link
            href="/#contact"
            className="mt-5 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#171512] px-5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(23,21,18,0.16)] sm:mt-0"
            style={{ color: '#fff' }}
          >
            Start a project
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </FintechFrame>
  )
}
