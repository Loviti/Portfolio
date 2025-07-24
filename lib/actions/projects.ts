'use server'

import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { projectSchema, type ProjectFormData } from '@/lib/validations'
import { deleteProjectImage } from './storage'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function checkAuth() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  
  // Note: Admin access is controlled by Clerk authentication
  // Additional email verification could be added here if needed
  
  return userId
}

export async function createProject(formData: ProjectFormData) {
  try {
    await checkAuth()
    
    // Validate form data
    const validatedData = projectSchema.parse(formData)
    
    // Clean up empty strings
    const projectData = {
      ...validatedData,
      repo_url: validatedData.repo_url || null,
      demo_url: validatedData.demo_url || null,
      outcome: validatedData.outcome || null,
    }
    
    const { error } = await supabaseAdmin
      .from('projects')
      .insert([projectData])
    
    if (error) {
      console.error('Error creating project:', error)
      throw new Error('Failed to create project')
    }
    
    revalidatePath('/admin')
    revalidatePath('/')
    
  } catch (error) {
    console.error('Create project error:', error)
    throw error
  }
  
  redirect('/admin')
}

export async function updateProject(id: string, formData: ProjectFormData) {
  try {
    await checkAuth()
    
    // Validate form data
    const validatedData = projectSchema.parse(formData)
    
    // Clean up empty strings
    const projectData = {
      ...validatedData,
      repo_url: validatedData.repo_url || null,
      demo_url: validatedData.demo_url || null,
      outcome: validatedData.outcome || null,
      updated_at: new Date().toISOString(),
    }
    
    const { error } = await supabaseAdmin
      .from('projects')
      .update(projectData)
      .eq('id', id)
    
    if (error) {
      console.error('Error updating project:', error)
      throw new Error('Failed to update project')
    }
    
    revalidatePath('/admin')
    revalidatePath('/')
    
  } catch (error) {
    console.error('Update project error:', error)
    throw error
  }
  
  redirect('/admin')
}

export async function deleteProject(id: string) {
  try {
    await checkAuth()
    
    // Delete project from database
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      throw new Error('Failed to delete project')
    }
    
    // Delete associated images from storage (non-blocking)
    deleteProjectImage(id).catch(error => {
      console.error('Failed to delete project images:', error)
      // Don't fail the whole operation if image deletion fails
    })
    
    revalidatePath('/admin')
    revalidatePath('/')
    
    return { success: true }
  } catch (error) {
    console.error('Delete project error:', error)
    throw error
  }
}

export async function getProject(id: string) {
  try {
    await checkAuth()
    
    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching project:', error)
      throw new Error('Project not found')
    }
    
    return project
  } catch (error) {
    console.error('Get project error:', error)
    throw error
  }
} 