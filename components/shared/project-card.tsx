'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
      <Card className="h-full bg-surface border-2 border-border hover:border-primary transition-all duration-300 overflow-hidden card-hover">
        <div className="relative">
          {/* Project Image */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent-alt/20 flex items-center justify-center border-b border-border">
            {/* Placeholder for project image */}
            <div className="text-center text-foreground/60">
              <div className="text-4xl mb-2">🖥️</div>
              <p className="text-sm font-medium">
                {title}
                <br />
                <span className="text-xs">Screenshot Coming Soon</span>
              </p>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <p className="text-sm mb-4">{longDescription}</p>
              <div className="flex gap-2 justify-center">
                {githubUrl && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    asChild
                  >
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </Button>
                )}
                {liveUrl && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    asChild
                  >
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-foreground/70">
            {shortDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {/* Outcome Badge */}
          <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-md">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">{outcome}</span>
          </div>

          {/* Technology Tags */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground/80">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons - Bottom */}
          <div className="flex gap-2 pt-2">
            {githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 group-hover:border-primary group-hover:text-primary transition-colors"
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
                size="sm"
                className="flex-1 btn-primary"
                asChild
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}
            {!githubUrl && !liveUrl && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                disabled
              >
                Private Project
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 