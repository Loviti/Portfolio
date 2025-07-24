'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, type ProjectFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Eye, EyeOff } from 'lucide-react'
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
    control,
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="My Awesome Project"
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="my-awesome-project"
              />
              {errors.slug && (
                <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
              )}
              <p className="text-xs text-foreground/60 mt-1">
                Used in URLs: /projects/{watch('slug')}
              </p>
            </div>

            <div>
              <Label htmlFor="short_desc">Short Description</Label>
              <Textarea
                id="short_desc"
                {...register('short_desc')}
                placeholder="A brief 1-2 sentence description of your project"
                rows={3}
              />
              {errors.short_desc && (
                <p className="text-sm text-destructive mt-1">{errors.short_desc.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="outcome">Project Outcome</Label>
              <Input
                id="outcome"
                {...register('outcome')}
                placeholder="50% faster processing time"
              />
              {errors.outcome && (
                <p className="text-sm text-destructive mt-1">{errors.outcome.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Links & Media */}
        <Card>
          <CardHeader>
            <CardTitle>Links & Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="repo_url">Repository URL</Label>
              <Input
                id="repo_url"
                {...register('repo_url')}
                placeholder="https://github.com/username/project"
                type="url"
              />
              {errors.repo_url && (
                <p className="text-sm text-destructive mt-1">{errors.repo_url.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="demo_url">Demo URL</Label>
              <Input
                id="demo_url"
                {...register('demo_url')}
                placeholder="https://project-demo.com"
                type="url"
              />
              {errors.demo_url && (
                <p className="text-sm text-destructive mt-1">{errors.demo_url.message}</p>
              )}
            </div>

            <ImageUpload
              value={watch('image_url')}
              onChange={(url) => setValue('image_url', url)}
              projectId={initialData?.id}
            />
          </CardContent>
        </Card>
      </div>

      {/* Technologies */}
      <Card>
        <CardHeader>
          <CardTitle>Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <TechTagsInput
            value={watch('tech')}
            onChange={(tags) => setValue('tech', tags)}
          />
          {errors.tech && (
            <p className="text-sm text-destructive mt-2">{errors.tech.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Long Description */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Description</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownEditor
            value={watch('long_desc')}
            onChange={(value) => setValue('long_desc', value)}
          />
          {errors.long_desc && (
            <p className="text-sm text-destructive mt-2">{errors.long_desc.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="btn-primary"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  )
} 