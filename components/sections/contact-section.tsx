'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

import { Mail, Send, CheckCircle, AlertCircle, Github, Linkedin } from 'lucide-react'
import { DEVELOPER_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { supabase } from '@/lib/supabase'
import { validateContactForm, type ContactFormData, type ContactFormErrors } from '@/lib/validations'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateContactForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    setErrors({})

    try {
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
        throw error
      }

      setStatus('success')
      setStatusMessage('Thanks for reaching out! I&apos;ll get back to you soon.')
      setFormData({ name: '', email: '', company: '', message: '' })

    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      setStatusMessage('Something went wrong. Please try again or email me directly.')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section font-heading font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Let&apos;s work together to build something amazing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white shadow-lg border-0 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`rounded-lg border-2 ${errors.name ? 'border-destructive' : 'border-gray-200 focus:border-primary'}`}
                      placeholder="Your full name"
                      disabled={status === 'submitting'}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`rounded-lg border-2 ${errors.email ? 'border-destructive' : 'border-gray-200 focus:border-primary'}`}
                      placeholder="your.email@example.com"
                      disabled={status === 'submitting'}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="rounded-lg border-2 border-gray-200 focus:border-primary"
                      placeholder="Your company or organization"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`rounded-lg border-2 ${errors.message ? 'border-destructive' : 'border-gray-200 focus:border-primary'}`}
                      placeholder="Tell me about your project or what you'd like to discuss..."
                      rows={5}
                      disabled={status === 'submitting'}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Status Message */}
                  {status === 'success' && (
                    <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-md">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm text-success">{statusMessage}</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <span className="text-sm text-destructive">{statusMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-accent-alt hover:bg-accent-alt/90 text-white rounded-xl px-6 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div>
              <h3 className="text-subsection font-heading font-semibold mb-6">
                Or reach out directly
              </h3>
              <div className="space-y-4">
                <a
                  href={SOCIAL_LINKS.email}
                  className="flex items-center gap-3 p-4 bg-white shadow-md rounded-xl transition-all duration-200 hover:shadow-lg group"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      Email Me
                    </div>
                    <div className="text-sm text-foreground/70">
                      {DEVELOPER_INFO.email}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-subsection font-heading font-semibold mb-6">
                Connect with me
              </h3>
              <div className="space-y-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white shadow-md rounded-xl transition-all duration-200 hover:shadow-lg group"
                >
                  <Github className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      GitHub
                    </div>
                    <div className="text-sm text-foreground/70">
                      Check out my code and projects
                    </div>
                  </div>
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white shadow-md rounded-xl transition-all duration-200 hover:shadow-lg group"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      LinkedIn
                    </div>
                    <div className="text-sm text-foreground/70">
                      Professional network and experience
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Builder Beaver */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Image
            src="/images/icons/contact-beaver.png"
            alt="Builder Beaver ready to help with contact"
            width={120}
            height={120}
            className="mx-auto"
          />
        </motion.div>
      </div>
    </section>
  )
} 