import { notFound } from 'next/navigation';
import PageHero from '@/components/ui/PageHero';
import { blogPosts, getPostBySlug } from '@/lib/data/blog';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Blog"
        breadcrumbBaseHref="/blog"
        breadcrumbCurrent={post.title.substring(0, 30) + '...'}
        label={post.category}
        title={post.title}
        subheading={post.excerpt}
      />

      <section className="bg-canvas border-b border-[#1F1F1F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center gap-6 text-[12px] font-mono text-muted uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-violet">Author</span>
              <span className="text-white font-sans normal-case text-sm">{post.author}</span>
            </div>
            <span className="hidden sm:inline text-[#1F1F1F]">|</span>
            <div className="flex items-center gap-2">
              <span className="text-violet">Published</span>
              <span className="text-white font-sans normal-case text-sm">{post.date}</span>
            </div>
            <span className="hidden sm:inline text-[#1F1F1F]">|</span>
            <div className="flex items-center gap-2">
              <span className="text-violet">Reading Time</span>
              <span className="text-white font-sans normal-case text-sm">{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-canvas">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-[#1F1F1F]
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-muted prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-violet prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:text-muted prose-ul:mb-6
              prose-li:mb-2 prose-li:marker:text-violet"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-[#1F1F1F]">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center px-6 py-3 border border-[#1F1F1F] text-sm text-white hover:border-violet hover:bg-violet transition-colors"
            data-cursor="pointer"
          >
            ← Back to Insight
          </Link>
        </div>
      </section>
    </main>
  );
}
