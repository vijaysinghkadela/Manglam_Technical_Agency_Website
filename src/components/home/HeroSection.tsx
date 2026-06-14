'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  Bot,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  FileCheck2,
  Globe2,
  PlugZap,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'
import { useRef } from 'react'

import {
  FintechBadge,
  FintechButton,
  FintechFrame,
  FintechPanel,
} from '@/components/ui/FintechPrimitives'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const METRICS = [
  { label: 'Qualified leads', value: '1,248', change: '+18.4%', tone: 'text-emerald-600' },
  { label: 'Auto-routed', value: '82%', change: 'Healthy', tone: 'text-[var(--color-violet-dark)]' },
  { label: 'Risk drift', value: 'Low', change: 'Stable', tone: 'text-slate-500' },
]

const PIPELINE = [
  {
    company: 'Website enquiry',
    detail: 'Captured with consent and routed to CRM',
    value: '2m',
    active: true,
  },
  {
    company: 'AI follow-up',
    detail: 'Lead brief, reply draft, and task assigned',
    value: 'Live',
    active: false,
  },
  {
    company: 'Security review',
    detail: 'Form, storage, and delivery checks logged',
    value: 'DPDP',
    active: false,
  },
]

const SUPPORT_CARDS = [
  {
    title: 'Web systems',
    body: 'Fast pages, conversion paths, technical SEO, and maintenance built as one operating layer.',
    Icon: Globe2,
  },
  {
    title: 'AI automation',
    body: 'Lead triage, content ops, reporting, and workflow agents tied to real business actions.',
    Icon: Bot,
  },
  {
    title: 'Compliance-aware data',
    body: 'Granular consent, audit trails, security posture, and legal docs for sensitive workflows.',
    Icon: ShieldCheck,
  },
]

function OperationsConsole() {
  return (
    <motion.div
      aria-label="Growth operations console showing lead qualification, automation routing, risk status, and delivery health"
      className="relative mx-auto w-full max-w-full overflow-hidden pb-2 lg:max-w-[760px]"
      initial={false}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
      suppressHydrationWarning
    >
      <div className="absolute right-[2%] top-[17%] hidden h-[360px] w-[360px] rounded-full bg-[rgba(var(--color-accent-rgb),0.06)] blur-3xl lg:block" />

      <FintechPanel className="relative w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-violet-dark)]">
              <ScanSearch className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">Growth operations console</p>
              <p className="text-xs font-medium text-[var(--color-dead)]">Lead to delivery pipeline</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            Live
          </span>
        </div>

        <div className="grid min-w-0 lg:grid-cols-[180px_1fr]">
          <aside className="hidden border-r border-[var(--color-border)] bg-[var(--color-surface)]/60 p-4 lg:block">
            <div className="space-y-2 text-xs font-semibold text-[var(--color-muted)]">
              {[
                { label: 'Decisioning', Icon: BrainCircuit, active: true },
                { label: 'Quotes', Icon: Wallet },
                { label: 'Monitoring', Icon: Radar },
                { label: 'Integrations', Icon: PlugZap },
              ].map(({ label, Icon, active }) => (
                <div
                  key={label}
                  className={`flex min-h-10 w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors ${
                    active ? 'border-[rgba(var(--color-accent-rgb),0.24)] bg-[var(--color-card)] text-[var(--color-violet-dark)]' : 'border-transparent hover:bg-[var(--color-card)] hover:text-[var(--color-foreground)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0 p-4 sm:p-7">
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
              {METRICS.map((metric) => (
                <div key={metric.label} className="min-w-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
                  <p className="text-xs font-medium text-[var(--color-dead)]">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">{metric.value}</p>
                  <p className={`mt-1 text-xs font-semibold ${metric.tone}`}>{metric.change}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 min-w-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--color-foreground)]">Automation queue</p>
                <span className="text-xs font-semibold text-[var(--color-violet-dark)]">4 rules active</span>
              </div>
              <div className="space-y-3">
                {PIPELINE.map((item) => (
                  <div
                    key={item.company}
                    className={`flex min-w-0 items-center gap-3 rounded-lg px-3 py-3 ${item.active ? 'bg-[rgba(var(--color-accent-rgb),0.08)]' : 'bg-[var(--color-surface)]'}`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.active ? 'bg-[var(--color-violet-dark)] text-white' : 'bg-[var(--color-card)] text-[var(--color-muted)] shadow-sm'}`}>
                      {item.active ? <Check className="h-4 w-4" /> : <FileCheck2 className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">{item.company}</p>
                      <p className="truncate text-xs font-medium text-[var(--color-muted)]">{item.detail}</p>
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-foreground)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FintechPanel>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_0.92fr]">
        <FintechPanel className="relative w-full max-w-full overflow-hidden border-[rgba(var(--color-accent-rgb),0.24)] bg-[#171512] p-5 text-white shadow-[0_8px_24px_rgba(23,21,18,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="relative flex items-start justify-between gap-6">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/90">Delivery health</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">98.6%</p>
            </div>
            <CheckCircle2 className="h-7 w-7 text-white/85" />
          </div>
          <div className="relative mt-6 grid grid-cols-7 items-end gap-2">
            {[42, 58, 47, 73, 64, 88, 78].map((height, index) => (
              <motion.span
                key={`${height}-${index}`}
                className="rounded-full bg-white/80"
                initial={false}
                whileInView={{ height }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
                style={{ height: 8 }}
                suppressHydrationWarning
              />
            ))}
          </div>
        </FintechPanel>

        <FintechPanel className="relative w-full max-w-full p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-violet-dark)]">
              <CalendarDays className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">Discovery audit</p>
              <p className="text-xs text-[var(--color-muted)]">Scope, automation, and risk map</p>
            </div>
          </div>
        </FintechPanel>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%'])

  return (
    <FintechFrame className="bg-[var(--color-canvas)]">
      <section ref={ref} id="hero-section" className="relative z-10 grid min-w-0 gap-12 overflow-hidden px-0 pb-24 pt-[calc(var(--nav-offset,84px)+48px)] lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:overflow-visible lg:px-16 lg:pb-32 lg:pt-[calc(var(--nav-offset,104px)+64px)]">
        <div className="min-w-0 max-w-3xl">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            suppressHydrationWarning
          >
            <FintechBadge icon={<Sparkles className="h-[18px] w-[18px]" />}>Growth operations studio</FintechBadge>
          </motion.div>

          <motion.h1
            className="mt-7 max-w-[780px] text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-6xl lg:text-[4.55rem] xl:text-[5.05rem]"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            suppressHydrationWarning
          >
            Lead capture, automation, and delivery systems for <span className="font-editorial text-[var(--color-violet-dark)]">accountable growth.</span>
          </motion.h1>

          <motion.p
            className="section-copy mt-7 max-w-[610px] text-[var(--color-muted)]"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
            suppressHydrationWarning
          >
            Manglam Technical Agency builds the operating layer behind serious digital work: fast web
            systems, measurable acquisition flows, AI-assisted follow-up, and compliance-aware delivery.
          </motion.p>

          <motion.div
            className="mt-9 flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-5"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: EASE }}
            suppressHydrationWarning
          >
            <FintechButton href="/#contact" className="w-full sm:w-auto">Start a project</FintechButton>
            <FintechButton href="/#portfolio" variant="secondary" className="w-full sm:w-auto">Review work</FintechButton>
          </motion.div>
        </div>

        <motion.div className="min-w-0" style={{ y: prefersReducedMotion ? '0%' : visualY }}>
          <OperationsConsole />
        </motion.div>
      </section>

      <section className="relative z-10 grid gap-4 border-t border-[var(--color-border)] px-0 py-10 lg:grid-cols-3 lg:px-16">
        {SUPPORT_CARDS.map((card, index) => (
          <motion.article
            key={card.title}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(var(--color-accent-rgb),0.32)] hover:shadow-[0_8px_24px_rgba(23,21,18,0.08)]"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
            suppressHydrationWarning
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-violet-dark)]">
              <card.Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-lg font-semibold leading-snug tracking-normal text-[var(--color-foreground)] sm:text-xl lg:text-[1.35rem]">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{card.body}</p>
          </motion.article>
        ))}
      </section>
    </FintechFrame>
  )
}
