'use client'

import { SKILLS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section font-heading font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-4xl mx-auto"
        >
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Badge
                variant="secondary"
                className="w-full p-3 text-center bg-surface border-2 border-border hover:border-primary transition-colors cursor-default"
              >
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {skill}
                </span>
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Mascot with hard hat - placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent-alt/20 border-2 border-primary/30">
            <div className="text-3xl">🦫⛑️</div>
          </div>
          <p className="text-sm text-foreground/60 mt-2">
            Builder Beaver at work!
          </p>
        </motion.div>
      </div>
    </section>
  )
} 