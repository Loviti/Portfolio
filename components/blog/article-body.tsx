'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

interface ArticleBodyProps {
  content: string
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground/85 prose-p:leading-[1.8] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:bg-foreground prose-pre:text-background/90 prose-pre:rounded-xl prose-pre:shadow-sm prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-hr:border-border/50 prose-li:text-foreground/85 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-ul:my-4 prose-ol:my-4 prose-li:my-1">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </motion.div>
  )
}
