'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, TrendingUp } from 'lucide-react'

interface ProjectCardProps {
  title: string
  shortDescription: string
  longDescription: string
  technologies: readonly string[]
  outcome: string
  githubUrl?: string | null
  liveUrl?: string | null
  imageUrl?: string | null
  index: number
}

export default function ProjectCard({
  title,
  shortDescription,
  longDescription,
  technologies,
  outcome,
  githubUrl,
  liveUrl,
  imageUrl,
  index
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div className="h-full bg-surface rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
        <div className="relative">
          {/* Project Image */}
          <div className="aspect-video bg-gradient-to-br from-accent-alt/20 to-accent-alt/30 flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${title} screenshot`}
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              /* Placeholder for project image */
              <div className="text-center text-foreground/60">
                <div className="text-5xl mb-3">🖥️</div>
                <p className="text-base font-medium">
                  {title}
                  <br />
                  <span className="text-sm text-foreground/50">Screenshot Coming Soon</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-accent-alt/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <p className="text-base mb-6 leading-relaxed">{longDescription}</p>
              <div className="flex gap-3 justify-center">
                {githubUrl && (
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl px-4 py-2"
                    asChild
                  >
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {liveUrl && (
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl px-4 py-2"
                    asChild
                  >
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-heading font-bold group-hover:text-accent-alt transition-colors mb-3">
              {title}
            </h3>
            <p className="text-base text-foreground/80 leading-relaxed">
              {shortDescription}
            </p>
          </div>

          {/* Outcome Badge */}
          {outcome && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">{outcome}</span>
              </div>
            </div>
          )}

          {/* Technology Tags */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground/80">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  className="text-sm px-3 py-1 bg-accent-alt/10 text-accent-alt border-0 rounded-full font-medium hover:bg-accent-alt/20 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons - Bottom */}
          <div className="flex gap-3 pt-2">
            {githubUrl && (
              <Button
                size="sm"
                className="flex-1 bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl px-4 py-3 font-medium"
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
                size="sm"
                className="flex-1 bg-accent-alt hover:bg-accent-alt/90 text-white border-0 rounded-xl px-4 py-3 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                asChild
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {!githubUrl && !liveUrl && (
              <Button
                size="sm"
                className="flex-1 bg-foreground/5 text-foreground/60 border-0 rounded-xl px-4 py-3 font-medium cursor-not-allowed"
                disabled
              >
                Private Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 