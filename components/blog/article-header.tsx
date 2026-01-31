'use client'

import { motion } from 'framer-motion'
import { formatDate, type Article } from '@/lib/articles'
import ListenButton from './listen-button'
import ShareButton from './share-button'

interface ArticleHeaderProps {
  article: Article
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      {/* Date */}
      <time
        dateTime={article.date}
        className="text-sm text-muted-foreground uppercase tracking-wider"
      >
        {formatDate(article.date)}
      </time>

      {/* Title */}
      <h1 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mt-4 mb-4 leading-[1.15] tracking-tight">
        {article.title}
      </h1>

      {/* Author */}
      <p className="text-muted-foreground text-base mb-8">
        By {article.author}
      </p>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3">
        <ListenButton articleTitle={article.title} />
        <ShareButton title={article.title} />
      </div>
    </motion.header>
  )
}
