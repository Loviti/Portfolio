export interface Article {
  slug: string
  title: string
  date: string // ISO date string
  author: string
  excerpt: string
  content: string // Markdown content
  readTimeMinutes: number
  tags?: string[]
  coverImage?: string
}

export { sampleArticles } from './sample-articles'

import { sampleArticles } from './sample-articles'

export function getAllArticles(): Article[] {
  return [...sampleArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getArticleBySlug(slug: string): Article | undefined {
  return sampleArticles.find((article) => article.slug === slug)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
