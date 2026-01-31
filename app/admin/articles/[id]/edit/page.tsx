import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ArticleForm from '@/components/admin/article-form'
import { updateArticle, getArticle } from '@/lib/actions/articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ArticleFormData } from '@/lib/validations'

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  let article

  try {
    article = await getArticle(params.id)
  } catch (error) {
    console.error('Error loading article:', error)
    notFound()
  }

  const handleUpdate = async (formData: ArticleFormData) => {
    'use server'
    return updateArticle(params.id, formData)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <div className="flex items-center space-x-6 mb-6">
          <Button
            asChild
            className="bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl px-4 py-3"
          >
            <Link href="/admin">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3">Edit Article</h1>
          <p className="text-foreground/70 text-lg">
            Update &quot;<span className="text-accent-alt font-semibold">{article.title}</span>&quot; ✨
          </p>
        </div>
      </div>

      {/* Form */}
      <ArticleForm
        initialData={article}
        onSubmit={handleUpdate}
        submitLabel="Update Article"
      />
    </div>
  )
}
