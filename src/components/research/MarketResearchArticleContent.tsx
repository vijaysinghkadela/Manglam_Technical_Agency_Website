'use client'

import { motion } from 'framer-motion'
import { MarketResearchArticle } from '@/lib/data/ai-market-research-index'

interface Props {
  article: MarketResearchArticle
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function MarketResearchArticleContent({ article }: Props) {
  return (
    <section
      className="border-t border-border"
      style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(48px, 6vw, 80px) 0' }}
    >
      <div className="container-site max-w-4xl">
        {/* Excerpt Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 p-6"
          style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--color-muted)', fontStyle: 'italic' }}>
            {article.excerpt}
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mb-12"
        >
          <h2
            className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', color: 'var(--color-foreground)' }}
          >
            Contents
          </h2>
          <nav className="flex flex-col gap-2" style={{ borderLeft: '2px solid var(--color-border)', paddingLeft: '16px' }}>
            {article.sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 py-2 text-sm transition-colors hover-foreground"
                style={{ color: 'var(--color-muted)' }}
              >
                <span className="font-mono text-xs" style={{ color: 'var(--color-violet-light)', minWidth: '24px' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{section.heading}</span>
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {article.sections.map((section, index) => (
            <motion.article
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
              className="scroll-mt-28"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="font-display font-black text-2xl"
                  style={{ color: 'rgba(107,26,26,0.25)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2
                  className="font-display font-bold"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'var(--color-foreground)' }}
                >
                  {section.heading}
                </h2>
              </div>

              {/* Content */}
              {section.content && (
                <div className="mb-6">
                  <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                    {section.content}
                  </p>
                </div>
              )}

              {/* Highlight Box */}
              {section.highlight && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                  className="my-8 p-5"
                  style={{
                    border: '1px solid rgba(107,26,26,0.35)',
                    backgroundColor: 'rgba(107,26,26,0.04)',
                    borderLeft: '3px solid var(--color-violet)',
                  }}
                >
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-foreground)', fontStyle: 'italic' }}>
                    {section.highlight}
                  </p>
                </motion.div>
              )}

              {/* Bullets */}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="flex flex-col gap-3 mb-6">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex items-start gap-3"
                      style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.65 }}
                    >
                      <span style={{ color: 'var(--color-violet-light)', flexShrink: 0, marginTop: '2px' }}>
                        →
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tables */}
              {section.tables && section.tables.length > 0 && (
                <div className="my-8 flex flex-col gap-8">
                  {section.tables.map((table, tableIndex) => (
                    <div key={tableIndex} className="overflow-x-auto border border-border" style={{ backgroundColor: 'var(--color-card)' }}>
                      {table.title && (
                        <div className="px-4 py-3 border-b border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
                          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
                            {table.title}
                          </p>
                        </div>
                      )}
                      <table className="w-full min-w-[640px] border-collapse text-left">
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                            {table.headers.map((header, headerIndex) => (
                              <th
                                key={headerIndex}
                                className="font-mono text-xs uppercase tracking-widest py-4 px-4"
                                style={{ color: 'var(--color-muted)' }}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className="transition-colors duration-150"
                              style={{ borderBottom: rowIndex < table.rows.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-surface)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }}
                            >
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className={`py-4 px-4 text-sm ${cellIndex === 0 ? 'font-semibold' : ''}`}
                                  style={{
                                    color: cellIndex === 0 ? 'var(--color-foreground)' : 'var(--color-muted)',
                                  }}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* Document Meta Footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
                Document Information
              </span>
              <span className="font-mono text-sm" style={{ color: 'var(--color-foreground)' }}>
                {article.meta.documentType} • Version {article.meta.version} • Last Updated: {article.meta.updated}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
                Share:
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                }}
                className="px-3 py-2 text-xs font-mono transition-colors hover-foreground"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

