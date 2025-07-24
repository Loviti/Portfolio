'use server'

import { supabase } from '@/lib/supabase'
import { FEATURED_PROJECTS } from '@/lib/constants'

export async function seedProjects() {
  try {
    console.log('Starting project seeding...')

    // Check if projects already exist
    const { data: existingProjects, error: checkError } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    if (checkError) {
      console.error('Error checking existing projects:', checkError)
      throw new Error('Failed to check existing projects')
    }

    if (existingProjects && existingProjects.length > 0) {
      console.log('Projects already exist, skipping seed')
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

    console.log('Inserting projects:', projectsToInsert)

    const { data, error } = await supabase
      .from('projects')
      .insert(projectsToInsert)
      .select()

    if (error) {
      console.error('Error inserting projects:', error)
      throw new Error('Failed to insert projects')
    }

    console.log('Successfully seeded projects:', data)
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