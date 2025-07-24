import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a fallback client for build time when env vars might not be available
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for build time or when env vars are missing
    return {
      from: () => ({
        insert: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        select: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        delete: () => Promise.resolve({ error: new Error('Supabase not configured') }),
      }),
    } as any // eslint-disable-line @typescript-eslint/no-explicit-any
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

// Database table types
export type ContactMessage = {
  id: string
  name: string
  email: string
  company?: string
  message: string
  created_at: string
}

export type ChatLog = {
  id: string
  user_message: string
  bot_response: string
  created_at: string
}

export type Project = {
  id: string
  title: string
  slug: string
  short_desc: string
  long_desc: string
  outcome: string | null
  tech: string[]
  repo_url: string | null
  demo_url: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
} 