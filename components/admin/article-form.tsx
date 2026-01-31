'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { articleSchema, type ArticleFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import TechTagsInput from './tech-tags-input'
import MarkdownEditor from './markdown-editor'

interface ArticleFormProps {
  initialData?: {
    id?: string
    title?: string
    slug?: string
    author?: string
    excerpt?: string
    content?: string
    tags?: string[]
    read_time_minutes?: number
    published?: boolean
    published_at?: string | null
    revised_at?: string | null
    revision_note?: string | null
  }
  onSubmit: (data: ArticleFormData) => Promise<void>
  isLoading?: boolean
  submitLabel?: string
}

export default function ArticleForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = 'Create Article'
}: ArticleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!initialData?.id

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      author: initialData?.author || 'Chase Pelky',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      tags: initialData?.tags || [],
      read_time_minutes: initialData?.read_time_minutes || 5,
      published: initialData?.published || false,
      revision_note: initialData?.revision_note || '',
    },
  })

  const watchTitle = watch('title')

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)

    const currentSlug = watch('slug')
    if (!currentSlug || currentSlug === generateSlug(watchTitle)) {
      setValue('slug', generateSlug(title))
    }
  }

  const handleFormSubmit = async (data: ArticleFormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      toast.success(`Article ${submitLabel.toLowerCase().includes('create') ? 'created' : 'updated'} successfully!`)
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-surface rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Basic Information</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-medium text-foreground mb-3 block">Article Title</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="My Awesome Article"
                className="h-12 bg-background border-0 rounded-xl text-base px-4"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug" className="text-base font-medium text-foreground mb-3 block">URL Slug</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="my-awesome-article"
                className="h-12 bg-background border-0 rounded-xl text-base px-4 font-mono"
              />
              {errors.slug && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.slug.message}</p>
              )}
              <p className="text-sm text-foreground/60 mt-2 bg-background px-3 py-2 rounded-lg">
                URL: /blog/<span className="font-mono text-accent-alt">{watch('slug') || 'slug'}</span>
              </p>
            </div>

            <div>
              <Label htmlFor="author" className="text-base font-medium text-foreground mb-3 block">Author</Label>
              <Input
                id="author"
                {...register('author')}
                placeholder="Chase Pelky"
                className="h-12 bg-background border-0 rounded-xl text-base px-4"
              />
              {errors.author && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.author.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt" className="text-base font-medium text-foreground mb-3 block">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...register('excerpt')}
                placeholder="A brief summary of the article that appears in the blog listing"
                rows={4}
                className="bg-background border-0 rounded-xl text-base px-4 py-3 resize-none"
              />
              {errors.excerpt && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.excerpt.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Publishing & Meta */}
        <div className="bg-surface rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Publishing</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="read_time_minutes" className="text-base font-medium text-foreground mb-3 block">Read Time (minutes)</Label>
              <Input
                id="read_time_minutes"
                type="number"
                {...register('read_time_minutes', { valueAsNumber: true })}
                placeholder="5"
                min={1}
                max={120}
                className="h-12 bg-background border-0 rounded-xl text-base px-4"
              />
              {errors.read_time_minutes && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.read_time_minutes.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="published"
                {...register('published')}
                className="w-5 h-5 rounded border-foreground/20 text-accent-alt focus:ring-accent-alt"
              />
              <Label htmlFor="published" className="text-base font-medium text-foreground cursor-pointer">
                Published
              </Label>
            </div>

            {isEditing && initialData?.published_at && (
              <div className="bg-background rounded-xl p-4">
                <p className="text-sm text-foreground/70">
                  <span className="font-medium">Published:</span>{' '}
                  {new Date(initialData.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {initialData.revised_at && (
                  <p className="text-sm text-foreground/60 mt-1">
                    <span className="font-medium">Last revised:</span>{' '}
                    {new Date(initialData.revised_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            )}

            {isEditing && (
              <div>
                <Label htmlFor="revision_note" className="text-base font-medium text-foreground mb-3 block">
                  Revision Note <span className="text-foreground/50 font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="revision_note"
                  {...register('revision_note')}
                  placeholder="e.g. Updated code examples for Next.js 15"
                  rows={3}
                  className="bg-background border-0 rounded-xl text-base px-4 py-3 resize-none"
                />
                {errors.revision_note && (
                  <p className="text-sm text-red-600 mt-2 font-medium">{errors.revision_note.message}</p>
                )}
                <p className="text-sm text-foreground/60 mt-2">
                  This note will be shown publicly below the article date
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Tags</h3>
        <TechTagsInput
          value={watch('tags')}
          onChange={(tags) => setValue('tags', tags)}
        />
        {errors.tags && (
          <p className="text-sm text-red-600 mt-4 font-medium">{errors.tags.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Article Content</h3>
        <MarkdownEditor
          value={watch('content')}
          onChange={(value) => setValue('content', value)}
        />
        {errors.content && (
          <p className="text-sm text-red-600 mt-4 font-medium">{errors.content.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-end space-x-4">
          <Button
            type="button"
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="px-8 py-3 bg-accent-alt hover:bg-accent-alt/90 text-white border-0 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}
