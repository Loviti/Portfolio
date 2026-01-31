export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          author: string
          excerpt: string
          content: string
          tags: string[]
          read_time_minutes: number
          published: boolean
          published_at: string | null
          revised_at: string | null
          revision_note: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          author?: string
          excerpt: string
          content: string
          tags?: string[]
          read_time_minutes?: number
          published?: boolean
          published_at?: string | null
          revised_at?: string | null
          revision_note?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          author?: string
          excerpt?: string
          content?: string
          tags?: string[]
          read_time_minutes?: number
          published?: boolean
          published_at?: string | null
          revised_at?: string | null
          revision_note?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          message?: string
          created_at?: string
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          id: string
          user_message: string
          bot_response: string
          created_at: string
        }
        Insert: {
          id?: string
          user_message: string
          bot_response: string
          created_at?: string
        }
        Update: {
          id?: string
          user_message?: string
          bot_response?: string
          created_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
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
        Insert: {
          id?: string
          title: string
          slug: string
          short_desc: string
          long_desc: string
          outcome?: string | null
          tech?: string[]
          repo_url?: string | null
          demo_url?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          short_desc?: string
          long_desc?: string
          outcome?: string | null
          tech?: string[]
          repo_url?: string | null
          demo_url?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 