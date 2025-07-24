'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, type ProjectFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import TechTagsInput from './tech-tags-input'
import MarkdownEditor from './markdown-editor'
import ImageUpload from './image-upload'
import type { Project } from '@/lib/supabase'

interface ProjectFormProps {
  initialData?: Partial<Project>
  onSubmit: (data: ProjectFormData) => Promise<void>
  isLoading?: boolean
  submitLabel?: string
}

export default function ProjectForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = 'Create Project'
}: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      short_desc: initialData?.short_desc || '',
      long_desc: initialData?.long_desc || '',
      outcome: initialData?.outcome || '',
      tech: initialData?.tech || [],
      repo_url: initialData?.repo_url || '',
      demo_url: initialData?.demo_url || '',
      image_url: initialData?.image_url || '',
    },
  })

  const watchTitle = watch('title')
  
  // Auto-generate slug from title
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
    
    // Auto-generate slug if it's empty or matches the previous title's slug
    const currentSlug = watch('slug')
    if (!currentSlug || currentSlug === generateSlug(watchTitle)) {
      setValue('slug', generateSlug(title))
    }
  }

  const handleFormSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      toast.success(`Project ${submitLabel.toLowerCase().includes('create') ? 'created' : 'updated'} successfully!`)
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
              <Label htmlFor="title" className="text-base font-medium text-foreground mb-3 block">Project Title</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="My Awesome Project"
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
                placeholder="my-awesome-project"
                className="h-12 bg-background border-0 rounded-xl text-base px-4 font-mono"
              />
              {errors.slug && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.slug.message}</p>
              )}
              <p className="text-sm text-foreground/60 mt-2 bg-background px-3 py-2 rounded-lg">
                URL: /projects/<span className="font-mono text-accent-alt">{watch('slug') || 'slug'}</span>
              </p>
            </div>

            <div>
              <Label htmlFor="short_desc" className="text-base font-medium text-foreground mb-3 block">Short Description</Label>
              <Textarea
                id="short_desc"
                {...register('short_desc')}
                placeholder="A brief 1-2 sentence description of your project that will appear in project cards"
                rows={4}
                className="bg-background border-0 rounded-xl text-base px-4 py-3 resize-none"
              />
              {errors.short_desc && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.short_desc.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="outcome" className="text-base font-medium text-foreground mb-3 block">Project Outcome</Label>
              <Input
                id="outcome"
                {...register('outcome')}
                placeholder="50% faster processing time"
                className="h-12 bg-background border-0 rounded-xl text-base px-4"
              />
              {errors.outcome && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.outcome.message}</p>
              )}
              <p className="text-sm text-foreground/60 mt-2">
                A key achievement or metric that highlights your project&apos;s impact
              </p>
            </div>
          </div>
        </div>

        {/* Links & Media */}
        <div className="bg-surface rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Links & Media</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="repo_url" className="text-base font-medium text-foreground mb-3 block">Repository URL</Label>
              <Input
                id="repo_url"
                {...register('repo_url')}
                placeholder="https://github.com/username/project"
                type="url"
                className="h-12 bg-background border-0 rounded-xl text-base px-4"
              />
              {errors.repo_url && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.repo_url.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="demo_url" className="text-base font-medium text-foreground mb-3 block">Demo URL</Label>
              <Input
                id="demo_url"
                {...register('demo_url')}
                placeholder="https://project-demo.com"
                type="url"
                className="h-12 bg-background border-0 rounded-xl text-base px-4"
              />
              {errors.demo_url && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.demo_url.message}</p>
              )}
            </div>

            <ImageUpload
              value={watch('image_url')}
              onChange={(url) => setValue('image_url', url)}
              projectId={initialData?.id}
            />
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Technologies</h3>
        <TechTagsInput
          value={watch('tech')}
          onChange={(tags) => setValue('tech', tags)}
        />
        {errors.tech && (
          <p className="text-sm text-red-600 mt-4 font-medium">{errors.tech.message}</p>
        )}
      </div>

      {/* Long Description */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Detailed Description</h3>
        <MarkdownEditor
          value={watch('long_desc')}
          onChange={(value) => setValue('long_desc', value)}
        />
        {errors.long_desc && (
          <p className="text-sm text-red-600 mt-4 font-medium">{errors.long_desc.message}</p>
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