'use client'

import { motion } from 'framer-motion'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/blog/article-card'
import Link from 'next/link'

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[680px] mx-auto px-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
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
        </motion.div>

        {/* Articles list */}
        <div>
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
