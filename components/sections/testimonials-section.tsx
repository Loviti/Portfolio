'use client'

import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section font-heading font-bold mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            What others say about working with me
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-surface border-2 border-border hover:border-primary transition-all duration-300 card-hover">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-lg italic text-foreground/90 mb-6 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {testimonial.title}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Testimonials Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-foreground/60 italic">
            More testimonials available upon request
          </p>
        </motion.div>

        {/* Mascot with recommendation - placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent-alt/20 border-2 border-primary/30">
            <div className="text-3xl">🦫⭐</div>
          </div>
          <p className="text-sm text-foreground/60 mt-2">
            Builder Beaver&apos;s seal of approval!
          </p>
        </motion.div>
      </div>
    </section>
  )
} 