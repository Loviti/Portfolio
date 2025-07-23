'use client'

import { motion } from 'framer-motion'
import { FEATURED_PROJECTS } from '@/lib/constants'
import ProjectCard from '@/components/shared/project-card'

export default function ProjectsSection() {
  return (
    <section id="projects" className="section bg-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section font-heading font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore some of my recent work and the impact they&apos;ve made
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              shortDescription={project.shortDescription}
              longDescription={project.longDescription}
              technologies={project.technologies}
              outcome={project.outcome}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              index={index}
            />
          ))}
        </div>

        {/* Mascot with tools - placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent-alt/20 border-2 border-primary/30">
            <div className="text-4xl">🦫🔧</div>
          </div>
          <p className="text-sm text-foreground/60 mt-3">
            Builder Beaver&apos;s workshop!
            <br />
            <span className="text-xs italic">More projects in development...</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
} 