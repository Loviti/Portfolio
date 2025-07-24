import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const projectId = formData.get('projectId') as string
    const existingImageUrl = formData.get('existingImageUrl') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File must be less than 5MB' }, { status: 400 })
    }

    // Generate file path
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png'
    const projectFolder = projectId || 'temp'
    const fileName = `projects/${projectFolder}/hero.${fileExt}`

    // Delete existing image if it exists (cleanup old uploads)
    if (existingImageUrl && projectId) {
      try {
        // Extract the path from the existing URL if it's a Supabase URL
        const urlParts = existingImageUrl.split('/storage/v1/object/public/project-images/')
        if (urlParts.length > 1) {
          const existingPath = urlParts[1]
          await supabaseAdmin.storage.from('project-images').remove([existingPath])
        }
        
        // Also try common extensions as fallback
        const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif']
        const filesToRemove = extensions.map(ext => `projects/${projectId}/hero.${ext}`)
        await supabaseAdmin.storage.from('project-images').remove(filesToRemove)
      } catch (cleanupError) {
        console.warn('Could not cleanup existing image:', cleanupError)
        // Continue with upload even if cleanup fails
      }
    }

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('project-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('project-images')
      .getPublicUrl(fileName)

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      path: fileName 
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' }, 
      { status: 500 }
    )
  }
} 