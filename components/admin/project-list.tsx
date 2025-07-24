import { supabase } from '@/lib/supabase'
import { formatDistanceToNow } from 'date-fns'
import { Edit, Trash2, ExternalLink, Github, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProjectList() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return <ErrorState />
  }

  if (!projects || projects.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="p-6 bg-surface border border-border rounded-lg hover:border-primary/50 transition-colors group"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Project Image */}
            <div className="w-full md:w-32 h-20 bg-gradient-to-br from-primary/20 to-accent-alt/20 rounded-md flex items-center justify-center flex-shrink-0">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={128}
                  height={80}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-2xl">🖥️</div>
              )}
            </div>

            {/* Project Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/70 mb-2">
                  {project.short_desc}
                </p>
                <div className="flex items-center text-xs text-foreground/50 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                  </span>
                  <span>slug: /{project.slug}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tech.length - 4} more
                  </Badge>
                )}
              </div>

              {/* Outcome */}
              {project.outcome && (
                <div className="flex items-center gap-2 text-sm text-success">
                  <span className="font-medium">{project.outcome}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2 flex-shrink-0">
              <div className="flex space-x-2">
                {project.demo_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
                {project.repo_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <Image
        src="/images/icons/beaver-waving.png"
        alt="Builder Beaver waving"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />
      <h3 className="text-lg font-heading font-semibold mb-2">No projects yet</h3>
      <p className="text-foreground/70 mb-6">
        Get started by creating your first project
      </p>
      <Button asChild className="btn-primary">
        <Link href="/admin/projects/new">
          Create Project
        </Link>
      </Button>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-heading font-semibold mb-2">Something went wrong</h3>
      <p className="text-foreground/70">
        Unable to load projects. Please try again later.
      </p>
    </div>
  )
} 