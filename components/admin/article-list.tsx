import { supabaseAdmin } from '@/lib/supabase-admin'
import { formatDistanceToNow } from 'date-fns'
import { Edit, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import DeleteArticleButton from './delete-article-button'

export default async function ArticleList() {
  const { data: articles, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return <ErrorState />
  }

  if (!articles || articles.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="p-8 bg-surface rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Article Icon */}
            <div className="w-full md:w-36 h-24 bg-gradient-to-br from-accent-alt/20 to-accent-alt/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-10 h-10 text-accent-alt/60" />
            </div>

            {/* Article Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-heading font-bold group-hover:text-accent-alt transition-colors">
                    {article.title}
                  </h3>
                  <Badge
                    className={`text-xs px-3 py-1 border-0 rounded-full font-medium ${
                      article.published
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}
                  >
                    {article.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <p className="text-base text-foreground/80 mb-3 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-foreground/60 space-x-6">
                  <span className="flex items-center bg-background px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Updated {formatDistanceToNow(new Date(article.updated_at), { addSuffix: true })}
                  </span>
                  <span className="font-mono text-xs">/{article.slug}</span>
                  {article.published_at && (
                    <span className="text-xs text-foreground/50">
                      Published {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  )}
                  {article.revised_at && (
                    <span className="text-xs text-foreground/50">
                      Revised {new Date(article.revised_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 4).map((tag: string) => (
                    <Badge
                      key={tag}
                      className="text-sm px-3 py-1 bg-accent-alt/10 text-accent-alt border-0 rounded-full font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 4 && (
                    <Badge className="text-sm px-3 py-1 bg-foreground/5 text-foreground/60 border-0 rounded-full">
                      +{article.tags.length - 4} more
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3 flex-shrink-0">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="bg-accent-alt/10 hover:bg-accent-alt/20 text-accent-alt border-0 rounded-xl px-4 py-2 font-medium"
                  asChild
                >
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <DeleteArticleButton
                  articleId={article.id}
                  articleTitle={article.title}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-surface rounded-2xl p-12 text-center shadow-sm">
      <div className="text-6xl mb-6">📝</div>
      <h3 className="text-2xl font-heading font-bold mb-3">No articles yet</h3>
      <p className="text-foreground/70 text-lg mb-8 max-w-md mx-auto">
        Ready to share your thoughts? Create your first blog article!
      </p>
      <Button
        asChild
        className="bg-accent-alt hover:bg-accent-alt/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
      >
        <Link href="/admin/articles/new">
          Create Your First Article
        </Link>
      </Button>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="bg-surface rounded-2xl p-12 text-center shadow-sm">
      <div className="text-6xl mb-6">⚠️</div>
      <h3 className="text-2xl font-heading font-bold mb-3">Something went wrong</h3>
      <p className="text-foreground/70 text-lg max-w-md mx-auto">
        Unable to load articles. Please check your connection and try again.
      </p>
    </div>
  )
}
