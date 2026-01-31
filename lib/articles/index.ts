import { supabaseAdmin } from '@/lib/supabase-admin'

export interface Article {
  slug: string
  title: string
  date: string // ISO date string (published_at)
  author: string
  excerpt: string
  content: string // Markdown content
  readTimeMinutes: number
  tags?: string[]
  coverImage?: string
  revisedAt?: string | null
  revisionNote?: string | null
}

export { sampleArticles } from './sample-articles'

export async function getAllArticles(): Promise<Article[]> {
  try {
    const { data: articles, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching articles:', error)
      return []
    }

    return (articles ?? []).map((a) => ({
      slug: a.slug,
      title: a.title,
      date: a.published_at || a.created_at,
      author: a.author,
      excerpt: a.excerpt,
      content: a.content,
      readTimeMinutes: a.read_time_minutes,
      tags: a.tags ?? [],
      revisedAt: a.revised_at,
      revisionNote: a.revision_note,
    }))
  } catch {
    console.error('Failed to fetch articles from Supabase')
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  try {
    const { data: a, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !a) {
      return undefined
    }

    return {
      slug: a.slug,
      title: a.title,
      date: a.published_at || a.created_at,
      author: a.author,
      excerpt: a.excerpt,
      content: a.content,
      readTimeMinutes: a.read_time_minutes,
      tags: a.tags ?? [],
      revisedAt: a.revised_at,
      revisionNote: a.revision_note,
    }
  } catch {
    return undefined
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
