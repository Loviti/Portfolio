import { getArticleBySlug } from '@/lib/articles'
import ArticleHeader from '@/components/blog/article-header'
import ArticleBody from '@/components/blog/article-body'
import ArticleChat from '@/components/blog/article-chat'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[680px] mx-auto px-6">
        {/* Back link */}
        <div>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All articles
          </Link>
        </div>

        {/* Article header */}
        <ArticleHeader article={article} />

        {/* Divider */}
        <div className="w-12 h-px bg-border mx-auto mb-12" />

        {/* Article body */}
        <ArticleBody content={article.content} />

        {/* Article chat widget */}
        <ArticleChat
          articleContent={article.content}
          articleTitle={article.title}
        />
      </div>
    </div>
  )
}
