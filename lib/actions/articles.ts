'use server'

import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { articleSchema, type ArticleFormData } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function checkAuth() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  return userId
}

export async function createArticle(formData: ArticleFormData) {
  try {
    await checkAuth()

    const validatedData = articleSchema.parse(formData)

    const articleData = {
      title: validatedData.title,
      slug: validatedData.slug,
      author: validatedData.author,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      tags: validatedData.tags,
      read_time_minutes: validatedData.read_time_minutes,
      published: validatedData.published,
      published_at: validatedData.published ? new Date().toISOString() : null,
      revision_note: validatedData.revision_note || null,
    }

    const { error } = await supabaseAdmin
      .from('articles')
      .insert([articleData])

    if (error) {
      console.error('Error creating article:', error)
      throw new Error('Failed to create article')
    }

    revalidatePath('/admin')
    revalidatePath('/blog')

  } catch (error) {
    console.error('Create article error:', error)
    throw error
  }

  redirect('/admin')
}

export async function updateArticle(id: string, formData: ArticleFormData) {
  try {
    await checkAuth()

    const validatedData = articleSchema.parse(formData)

    // Fetch existing article to check publish state changes
    const { data: existing } = await supabaseAdmin
      .from('articles')
      .select('published, published_at')
      .eq('id', id)
      .single()

    const articleData: Record<string, unknown> = {
      title: validatedData.title,
      slug: validatedData.slug,
      author: validatedData.author,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      tags: validatedData.tags,
      read_time_minutes: validatedData.read_time_minutes,
      published: validatedData.published,
      revision_note: validatedData.revision_note || null,
      revised_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Set published_at if newly published
    if (validatedData.published && !existing?.published_at) {
      articleData.published_at = new Date().toISOString()
    }

    const { error } = await supabaseAdmin
      .from('articles')
      .update(articleData)
      .eq('id', id)

    if (error) {
      console.error('Error updating article:', error)
      throw new Error('Failed to update article')
    }

    revalidatePath('/admin')
    revalidatePath('/blog')

  } catch (error) {
    console.error('Update article error:', error)
    throw error
  }

  redirect('/admin')
}

export async function deleteArticle(id: string) {
  try {
    await checkAuth()

    const { error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting article:', error)
      throw new Error('Failed to delete article')
    }

    revalidatePath('/admin')
    revalidatePath('/blog')

    return { success: true }
  } catch (error) {
    console.error('Delete article error:', error)
    throw error
  }
}

export async function getArticle(id: string) {
  try {
    await checkAuth()

    const { data: article, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching article:', error)
      throw new Error('Article not found')
    }

    return article
  } catch (error) {
    console.error('Get article error:', error)
    throw error
  }
}

export async function getAllArticles() {
  try {
    await checkAuth()

    const { data: articles, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching articles:', error)
      throw new Error('Failed to fetch articles')
    }

    return articles
  } catch (error) {
    console.error('Get all articles error:', error)
    throw error
  }
}

export async function getPublishedArticles() {
  const { data: articles, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching published articles:', error)
    return []
  }

  return articles ?? []
}

export async function getArticleBySlug(slug: string) {
  const { data: article, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    return null
  }

  return article
}
