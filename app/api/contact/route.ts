import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateContactForm, type ContactFormData } from '@/lib/validations'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json()
    
    // Validate the form data
    const errors = validateContactForm(formData)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    // Submit to Supabase
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company?.trim() || null,
          message: formData.message.trim(),
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit message' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Message sent successfully!'
    })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 