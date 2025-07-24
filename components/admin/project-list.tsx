import { supabaseAdmin } from '@/lib/supabase-admin'
import { formatDistanceToNow } from 'date-fns'
import { Edit, ExternalLink, Github, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import DeleteProjectButton from './delete-project-button'

export default async function ProjectList() {
  const { data: projects, error } = await supabaseAdmin
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
    <div className="space-y-6">
      {projects.map((project: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
        <div
          key={project.id}
          className="p-8 bg-surface rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Project Image */}
            <div className="w-full md:w-36 h-24 bg-gradient-to-br from-accent-alt/20 to-accent-alt/30 rounded-xl flex items-center justify-center flex-shrink-0">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={144}
                  height={96}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-3xl">🖥️</div>
              )}
            </div>

            {/* Project Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-heading font-bold group-hover:text-accent-alt transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-base text-foreground/80 mb-3 leading-relaxed">
                  {project.short_desc}
                </p>
                <div className="flex items-center text-sm text-foreground/60 space-x-6">
                  <span className="flex items-center bg-background px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                  </span>
                  <span className="font-mono text-xs">/{project.slug}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech: string) => (
                  <Badge 
                    key={tech} 
                    className="text-sm px-3 py-1 bg-accent-alt/10 text-accent-alt border-0 rounded-full font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 4 && (
                  <Badge className="text-sm px-3 py-1 bg-foreground/5 text-foreground/60 border-0 rounded-full">
                    +{project.tech.length - 4} more
                  </Badge>
                )}
              </div>

              {/* Outcome */}
              {project.outcome && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <span className="text-sm font-semibold text-green-700">{project.outcome}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3 flex-shrink-0">
              <div className="flex space-x-2">
                {project.demo_url && (
                  <Button 
                    size="sm" 
                    className="bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl w-10 h-10 p-0"
                    asChild
                  >
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {project.repo_url && (
                  <Button 
                    size="sm" 
                    className="bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl w-10 h-10 p-0"
                    asChild
                  >
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="bg-accent-alt/10 hover:bg-accent-alt/20 text-accent-alt border-0 rounded-xl px-4 py-2 font-medium"
                  asChild
                >
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <DeleteProjectButton 
                  projectId={project.id}
                  projectTitle={project.title}
                />
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
    <div className="bg-surface rounded-2xl p-12 text-center shadow-sm">
      <Image
        src="/images/icons/beaver-waving.png"
        alt="Builder Beaver waving"
        width={140}
        height={140}
        className="mx-auto mb-8"
      />
      <h3 className="text-2xl font-heading font-bold mb-3">No projects yet</h3>
      <p className="text-foreground/70 text-lg mb-8 max-w-md mx-auto">
        Ready to showcase your work? Create your first project and let Builder Beaver help you build something amazing!
      </p>
      <Button 
        asChild 
        className="bg-accent-alt hover:bg-accent-alt/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
      >
        <Link href="/admin/projects/new">
          Create Your First Project
        </Link>
      </Button>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="bg-surface rounded-2xl p-12 text-center shadow-sm">
      <div className="text-6xl mb-6">⚠️</div>
      <h3 className="text-2xl font-heading font-bold mb-3">Something went wrong</h3>
      <p className="text-foreground/70 text-lg max-w-md mx-auto">
        Unable to load projects. Please check your connection and try again.
      </p>
    </div>
  )
} 