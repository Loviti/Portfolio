import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/blog/article-card'
import Link from 'next/link'

export default async function BlogPage() {
  const articles = await getAllArticles()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[680px] mx-auto px-6">
        {/* Page header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to portfolio
          </Link>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Blog
          </h1>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
            Thoughts on AI, software engineering, and building things that matter.
          </p>
        </div>

        {/* Articles list */}
        <div>
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles published yet. Check back soon!
              </p>
            </div>
          ) : (
            articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
