import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  tags: string;
}

async function getArticles(): Promise<DevToArticle[]> {
  const res = await fetch('https://dev.to/api/articles?tag=webdev&top=1', {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  
  return res.json();
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-[var(--color-canvas)]">
      <PageHero
        breadcrumbCurrent="Blog"
        label="ENGINEERING & GROWTH"
        title="Thinking Aloud."
        subheading="Insights on modern web architecture, business automation, and scaling digital infrastructure. No fluff, just signal."
      />

      <section className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-[var(--color-border)]">
            {articles.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group relative flex flex-col h-full bg-[var(--color-card)] border-r border-b border-[var(--color-border)] p-8 overflow-hidden transition-colors duration-500 hover:bg-[#151515]"
              >
                {/* Left violet accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-violet)] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-10" />

                <div className="aspect-[16/9] relative w-full overflow-hidden mb-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 dot-grid opacity-40 flex items-center justify-center">
                      <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest break-all px-4 text-center">
                        dev.to/{post.id}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--color-muted)] uppercase tracking-widest mb-4">
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                    <span>{post.reading_time_minutes} min read</span>
                  </div>

                  <h2 className="text-xl font-display font-bold text-white group-hover:text-[var(--color-lime)] transition-colors duration-300 leading-tight mb-3">
                    {post.title}
                  </h2>

                  <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-2 mt-auto text-sm font-semibold text-white group-hover:text-[var(--color-lime)] transition-colors duration-300">
                    Read on Dev.to
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
