'use server'

import { supabaseAdmin } from '@/lib/supabase-admin'

export async function deleteProjectImage(projectId: string) {
  try {
    // Delete all possible image extensions for this project
    const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif']
    const filesToDelete = extensions.map(ext => `projects/${projectId}/hero.${ext}`)
    
    const { data, error } = await supabaseAdmin.storage
      .from('project-images')
      .remove(filesToDelete)
    
    if (error) {
      console.error('Error deleting project images:', error)
      // Don't throw error - image deletion is not critical for project deletion
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Delete project image error:', error)
    return { success: false, error }
  }
} 