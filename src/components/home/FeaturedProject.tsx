'use client'
import { motion } from 'framer-motion'
import { ExternalLink, Check } from 'lucide-react'
import Link from 'next/link'
import { BRAND, ANIMATION, SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '@/lib/design-system'
import { cn } from '@/lib/utils'

export function FeaturedProject() {
  return (
    <section 
      style={{ 
        backgroundColor: 'var(--color-surface)', 
        padding: `${SPACING.section.md} 0`,
      }}
    >
      <div className="container-site">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ 
            duration: ANIMATION.duration.slow, 
            ease: ANIMATION.ease 
          }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-4 mb-10 lg:mb-14"
        >
          <div className="max-w-2xl">
            <span 
              className="font-mono uppercase block mb-3" 
              style={{ 
                fontSize: TYPOGRAPHY.label, 
                color: 'var(--color-violet-light)', 
                letterSpacing: '0.22em',
              }}
            >
              SELECTED WORK
            </span>
            <h2 
              className="font-display font-black leading-[0.92] tracking-normal" 
              style={{ 
                fontSize: TYPOGRAPHY.section, 
                color: 'var(--color-foreground)',
                lineHeight: TYPOGRAPHY.leading.tight,
              }}
            >
              Projects That Feel<br />Considered, Not Cramped.
            </h2>
            <p 
              className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed" 
              style={{ 
                color: 'var(--color-muted)',
                lineHeight: TYPOGRAPHY.leading.relaxed,
              }}
            >
              One project is enough to show the standard: clear product thinking, strong visual
              hierarchy, and a build that works as well on a phone as it does on a wide screen.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['NGO Website', 'Multilingual', 'Razorpay'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1.5 font-mono uppercase transition-all duration-200 hover:border-[#6B1A1A]/30"
                style={{ 
                  fontSize: TYPOGRAPHY.micro, 
                  color: 'var(--color-dead)', 
                  letterSpacing: '0.18em',
                  borderRadius: RADIUS.full,
                }}
              >
                {tag}
              </span>
            ))}
            <Link
              href="/portfolio"
              data-cursor="pointer"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-mono transition-all duration-300 group rounded-full border border-border px-5 py-3 hover:shadow-sm"
              style={{ 
                color: 'var(--color-muted)',
                borderRadius: RADIUS.full,
                transition: `all ${ANIMATION.duration.fast}s ease`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-foreground)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
              }}
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">

          {/* RIGHT — Project Details Card (MNSS) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: ANIMATION.duration.slow, 
              delay: 0.15, 
              ease: ANIMATION.ease 
            }}
            className="order-1 lg:order-2 flex flex-col gap-6 lg:pt-2 rounded-3xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-lg"
            style={{ 
              borderRadius: RADIUS['2xl'],
              boxShadow: SHADOW.sm,
              transition: `box-shadow ${ANIMATION.duration.fast}s ease`,
            }}
          >
            <div className="flex flex-wrap gap-2">
              <span 
                className="font-mono px-3 py-1" 
                style={{ 
                  fontSize: TYPOGRAPHY.label,
                  border: '1px solid var(--color-border)', 
                  color: 'var(--color-muted)',
                  borderRadius: RADIUS.md,
                }}
              >
                Healthcare NGO
              </span>
              <span 
                className="font-mono px-3 py-1" 
                style={{ 
                  fontSize: TYPOGRAPHY.label,
                  border: `1px solid ${BRAND.primaryMedium}`, 
                  color: BRAND.primary, 
                  backgroundColor: BRAND.primarySoft,
                  borderRadius: RADIUS.md,
                }}
              >
                Work in Progress
              </span>
            </div>

            <h3 
              className="font-display font-black leading-[0.90] tracking-normal" 
              style={{ 
                fontSize: TYPOGRAPHY.hero, 
                color: 'var(--color-foreground)',
                lineHeight: TYPOGRAPHY.leading.tight,
              }}
            >
              MNSS Website
            </h3>

            <p 
              style={{ 
                fontSize: TYPOGRAPHY.bodySm, 
                lineHeight: TYPOGRAPHY.leading.relaxed, 
                color: 'var(--color-muted)',
              }}
            >
              Multilingual website for Marut Narayan Sewa Sansthan — a Bikaner-based healthcare and
              rehabilitation NGO. Features Hindi/English dual-language experience, Razorpay donation
              workflow, programs showcase, and admin dashboard for managing content and reports.
            </p>

            <div 
              className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden border border-border" 
              style={{ 
                border: '1px solid var(--color-border)',
                borderRadius: RADIUS.lg,
              }}
            >
              {[['STATUS','Work in Progress'],['TYPE','NGO Website'],['DONATIONS','Razorpay'],['LOCATION','Bikaner, RJ']].map(([lbl,val],i) => (
                <div
                  key={lbl}
                  className={cn(
                    'p-[12px_14px]',
                    // Mobile 2-col: only left-column items (even index) get right border
                    i % 2 === 0 && 'border-r border-border',
                    // Mobile 2-col: first row items get bottom border, removed at sm+
                    i < 2 && 'border-b border-border sm:border-b-0',
                    // sm+ 4-col: item 1 needs right border (not present on mobile)
                    i === 1 && 'sm:border-r',
                    // sm+ 4-col: item 3 has no right border (already has none on mobile)
                  )}
                >
                  <p 
                    className="font-mono uppercase" 
                    style={{ 
                      fontSize: TYPOGRAPHY.micro, 
                      color: 'var(--color-dead)', 
                      letterSpacing: '0.15em', 
                      marginBottom: '4px',
                    }}
                  >{lbl}</p>
                  <p 
                    className="font-mono font-semibold" 
                    style={{ 
                      fontSize: TYPOGRAPHY.bodySm, 
                      color: 'var(--color-foreground)',
                    }}
                  >{val}</p>
                </div>
              ))}
            </div>

            <div>
              <p 
                className="font-mono uppercase mb-2" 
                style={{ 
                  fontSize: TYPOGRAPHY.micro, 
                  color: 'var(--color-dead)', 
                  letterSpacing: '0.15em',
                }}
              >TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {['Next.js 15','React 19','TypeScript','Tailwind CSS 4','MongoDB','Razorpay'].map(t => (
                  <span 
                    key={t} 
                    className="font-mono transition-all duration-200 cursor-default rounded-full hover:shadow-sm" 
                    style={{ 
                      fontSize: TYPOGRAPHY.label,
                      border: '1px solid var(--color-border)', 
                      color: 'var(--color-muted)',
                      padding: '4px 12px',
                      borderRadius: RADIUS.full,
                      transition: `all ${ANIMATION.duration.fast}s ease`,
                    }}
                    onMouseEnter={e => { 
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'; 
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-muted)' 
                    }}
                    onMouseLeave={e => { 
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; 
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)' 
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p 
                className="font-mono uppercase mb-3" 
                style={{ 
                  fontSize: TYPOGRAPHY.micro, 
                  color: 'var(--color-dead)', 
                  letterSpacing: '0.15em',
                }}
              >DELIVERABLES</p>
              <ul className="flex flex-col gap-2">
                {[
                  'Hindi/English multilingual experience via LanguageContext',
                  'Programs showcase and progress report publishing',
                  'Razorpay donation workflow with verification routes',
                  'Admin dashboard for content and report management',
                ].map((d, i) => (
                  <motion.li
                    key={d}
                    className="flex items-start gap-3 text-sm"
                    style={{ 
                      color: 'var(--color-muted)',
                      lineHeight: TYPOGRAPHY.leading.normal,
                    }}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: ANIMATION.duration.fast, 
                      delay: 0.3 + i * 0.07, 
                      ease: ANIMATION.ease 
                    }}
                  >
                    <Check 
                      className="w-3.5 h-3.5 shrink-0 mt-1" 
                      style={{ color: 'var(--color-violet-light)' }} 
                    />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>

            <a 
              href="/portfolio"
              data-cursor="pointer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-fit text-sm font-mono transition-all duration-300 group rounded-full hover:shadow-md"
              style={{ 
                border: '1px solid var(--color-border)', 
                padding: '12px 20px', 
                color: 'var(--color-foreground)',
                borderRadius: RADIUS.full,
                transition: `all ${ANIMATION.duration.fast}s ease`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-foreground)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--color-canvas)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'
              }}
            >
              View Portfolio
              <ExternalLink 
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
              />
            </a>
          </motion.div>

          {/* LEFT — Browser mockup (MNSS) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: ANIMATION.duration.reveal, 
              ease: ANIMATION.ease 
            }}
            className="order-2 lg:order-1 w-full overflow-hidden rounded-[28px] transition-all duration-300 hover:shadow-xl"
            style={{ 
              border: '1px solid var(--color-border)', 
              boxShadow: SHADOW.xl,
              borderRadius: RADIUS['2xl'],
              transition: `box-shadow ${ANIMATION.duration.fast}s ease`,
            }}
          >
            {/* Browser chrome */}
            <div 
              className="flex items-center gap-3 px-4 py-3" 
              style={{ 
                backgroundColor: 'var(--color-card)', 
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div className="flex gap-2">
                {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                  <div 
                    key={i} 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: c, 
                      boxShadow: `0 0 6px ${c}55`,
                      borderRadius: RADIUS.full,
                    }} 
                  />
                ))}
              </div>
              <div 
                className="flex-1 flex items-center gap-2 px-3 py-1 rounded" 
                style={{ 
                  backgroundColor: 'var(--color-canvas)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: RADIUS.sm,
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: '#28C840' }} 
                />
                <span 
                  className="font-mono truncate" 
                  style={{ 
                    fontSize: TYPOGRAPHY.micro, 
                    color: 'var(--color-muted)',
                  }}
                >
                  marutnarayansewasansthan.org
                </span>
              </div>
            </div>

            {/* MNSS Website preview - Enhanced with realistic NGO content */}
            <div 
              className="relative overflow-hidden" 
              style={{ 
                backgroundColor: '#0C4A0C', 
                aspectRatio: '4/3',
              }}
            >
              {/* Background gradient overlay */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ 
                  background: 'radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
                }} 
              />

              {/* NGO Hero Section */}
              <div className="flex flex-col h-full">
                {/* Header/Nav */}
                <div 
                  className="flex items-center justify-between px-5 py-4" 
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center" 
                      style={{ 
                        backgroundColor: '#FBBF24',
                        borderRadius: RADIUS.sm,
                      }}
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="#166534" 
                        strokeWidth="2"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                    </div>
                    <span className="font-bold text-white text-sm hidden sm:block">MNSS</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    {['Home', 'Programs', 'Donate', 'Contact'].map((item) => (
                      <span 
                        key={item} 
                        className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div 
                    className="px-3 py-1.5 rounded-full text-xs font-medium" 
                    style={{ 
                      backgroundColor: '#FBBF24', 
                      color: '#166534',
                      borderRadius: RADIUS.full,
                    }}
                  >
                    Donate
                  </div>
                </div>

                {/* Language Toggle - Hindi/English */}
                <div 
                  className="flex items-center justify-end gap-2 px-5 py-2" 
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Language:</span>
                  <div 
                    className="flex rounded-md overflow-hidden" 
                    style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <span 
                      className="px-2 py-0.5 text-[10px] text-white/80" 
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >EN</span>
                    <span className="px-2 py-0.5 text-[10px] text-white/40">HI</span>
                  </div>
                </div>

                {/* Hero Content */}
                <div className="flex-1 px-5 py-6 flex flex-col">
                  {/* Tagline */}
                  <div className="inline-flex items-center gap-1.5 mb-4">
                    <div 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: '#FBBF24' }} 
                    />
                    <span 
                      className="text-[10px] uppercase tracking-wider" 
                      style={{ color: '#FBBF24' }}
                    >
                      Serving Since 2009
                    </span>
                  </div>

                  {/* Main Heading */}
                  <h1 
                    className="text-white font-bold leading-tight mb-3" 
                    style={{ fontSize: 'clamp(18px, 3vw, 28px)' }}
                  >
                    Healthcare & Rehabilitation
                    <br />
                    <span style={{ color: '#FBBF24' }}>For Those In Need</span>
                  </h1>

                  {/* Subtitle */}
                  <p 
                    className="text-xs leading-relaxed mb-5 max-w-md" 
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    Marut Narayan Sewa Sansthan provides free medical care, rehabilitation services,
                    and healthcare programs for the underprivileged in Bikaner, Rajasthan.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div 
                      className="px-4 py-2 rounded-lg flex items-center gap-2" 
                      style={{ 
                        backgroundColor: '#FBBF24',
                        borderRadius: RADIUS.md,
                      }}
                    >
                      <svg 
                        className="w-3.5 h-3.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="#166534" 
                        strokeWidth="2"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M12 8v13m0-13V6a4 4 0 00-4-4H5.52a2 2 0 00-1.98 1.73l-.43 3.02a2 2 0 001.66 2.26l2.28.38v6.84a2 2 0 002 2h8a2 2 0 002-2v-6.84l2.28-.38a2 2 0 001.66-2.26l-.43-3.02a2 2 0 00-1.98-1.73H16a4 4 0 00-4 4v2z" 
                        />
                      </svg>
                      <span className="text-xs font-semibold" style={{ color: '#166534' }}>Donate Now</span>
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg border flex items-center gap-2" 
                      style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <span className="text-xs text-white/80">Our Programs</span>
                    </div>
                  </div>

                  {/* Quick Programs Preview */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {[
                      { icon: '👁️', name: 'Eye Care', count: '1200+' },
                      { icon: '♿', name: 'Rehabilitation', count: '500+' },
                      { icon: '🩺', name: 'Health Camps', count: '50+' },
                    ].map((program) => (
                      <div 
                        key={program.name} 
                        className="p-2.5 rounded-lg" 
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.05)', 
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: RADIUS.sm,
                        }}
                      >
                        <div className="text-lg mb-1">{program.icon}</div>
                        <div className="text-[10px] text-white/70 leading-tight">{program.name}</div>
                        <div className="text-xs font-bold" style={{ color: '#FBBF24' }}>{program.count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Bar - Razorpay Integration Badge */}
                <div 
                  className="flex items-center justify-between px-5 py-3" 
                  style={{ 
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    {[['15+','Years'],['5000+','Patients'],['24/7','Care']].map(([n,l]) => (
                      <div key={l} className="flex flex-col">
                        <span className="text-sm font-bold" style={{ color: '#FBBF24' }}>{n}</span>
                        <span className="text-[9px] text-white/40">{l}</span>
                      </div>
                    ))}
                  </div>
                  {/* Razorpay badge */}
                  <div 
                    className="flex items-center gap-1.5 px-2 py-1 rounded" 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: RADIUS.sm,
                    }}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#3395FF">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                    <span className="text-[9px] text-white/50">Secure Payments</span>
                  </div>
                </div>
              </div>

              {/* Work in Progress Badge */}
              <div 
                className="absolute top-16 right-4 px-3 py-1.5 rounded-full backdrop-blur-sm" 
                style={{ 
                  backgroundColor: 'rgba(107, 26, 26, 0.9)',
                  border: '1px solid rgba(107, 26, 26, 0.5)',
                  boxShadow: SHADOW.lg,
                  borderRadius: RADIUS.full,
                }}
              >
                <span className="text-[10px] font-semibold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  Work in Progress
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
