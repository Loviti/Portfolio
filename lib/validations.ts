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