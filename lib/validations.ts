import { z } from 'zod'

// Form validation utilities
export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long"
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long"
  }

  return errors
}

export function isValidContactForm(data: ContactFormData): boolean {
  const errors = validateContactForm(data)
  return Object.keys(errors).length === 0
}

// Chatbot message validation
export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export function validateChatMessage(message: string): boolean {
  return message.trim().length > 0 && message.length <= 500
}

// Project validation schema
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  short_desc: z.string().min(1, 'Short description is required').max(200, 'Short description must be less than 200 characters'),
  long_desc: z.string().min(1, 'Long description is required'),
  outcome: z.string().optional(),
  tech: z.array(z.string()).min(1, 'At least one technology is required'),
  repo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  demo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  image_url: z.string().optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>

// Article validation schema
export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt must be less than 500 characters'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()),
  read_time_minutes: z.number().int().min(1, 'Must be at least 1 minute').max(120, 'Must be less than 120 minutes'),
  published: z.boolean(),
  published_at: z.string().nullable().optional(),
  revision_note: z.string().max(500, 'Revision note must be less than 500 characters').optional().or(z.literal('')),
})

export type ArticleFormData = z.infer<typeof articleSchema> 