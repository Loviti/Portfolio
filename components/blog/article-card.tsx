'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatDate, type Article } from '@/lib/articles'

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${article.slug}`}
        className="group block py-8 border-b border-border/50 last:border-b-0"
      >
        <div className="flex flex-col gap-3">
          {/* Date and read time */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>{article.readTimeMinutes} min read</span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
