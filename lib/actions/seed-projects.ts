'use server'

import { supabaseAdmin } from '@/lib/supabase-admin'
import { FEATURED_PROJECTS } from '@/lib/constants'

export async function seedProjects() {
  try {
    // Check if projects already exist
    const { data: existingProjects, error: checkError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .limit(1)

    if (checkError) {
      console.error('Error checking existing projects:', checkError)
      throw new Error('Failed to check existing projects')
    }

    if (existingProjects && existingProjects.length > 0) {
      return { success: true, message: 'Projects already exist' }
    }

    // Convert FEATURED_PROJECTS to database format
    const projectsToInsert = FEATURED_PROJECTS.map(project => ({
      title: project.title,
      slug: project.id.replace('proj-', ''), // Remove proj- prefix
      short_desc: project.shortDescription,
      long_desc: project.longDescription,
      outcome: project.outcome,
      tech: [...project.technologies], // Convert readonly array to mutable array
      repo_url: project.githubUrl,
      demo_url: project.liveUrl,
      image_url: project.imageUrl,
    }))

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert(projectsToInsert)
      .select()

    if (error) {
      console.error('Error inserting projects:', error)
      throw new Error('Failed to insert projects')
    }

    return { 
      success: true, 
      message: `Successfully seeded ${data?.length || 0} projects`,
      data 
    }

  } catch (error) {
    console.error('Seed error:', error)
    throw error
  }
} 