'use client'

import { motion } from 'framer-motion'
import { FEATURED_PROJECTS } from '@/lib/constants'
import ProjectCard from '@/components/shared/project-card'
import Image from 'next/image'

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
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

        {/* Builder Beaver */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Image
            src="/images/icons/beaver-blueprint-desk.png"
            alt="Builder Beaver at his workshop"
            width={120}
            height={120}
            className="mx-auto"
          />
        </motion.div>
      </div>
    </section>
  )
} 