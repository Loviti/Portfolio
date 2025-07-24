import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Project } from '@/lib/supabase'
import ProjectCard from '@/components/shared/project-card'
import { AnimatedHeader, AnimatedBeaver } from './projects-section-client'
import Image from 'next/image'

async function getProjects() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4) // Show top 4 projects

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsSection() {
  const projects = await getProjects()
  return (
    <section id="projects" className="section">
      <div className="container">
        <AnimatedHeader>
          <h2 className="text-section font-heading font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore some of my recent work and the impact they&apos;ve made
          </p>
        </AnimatedHeader>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.length > 0 ? (
            projects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                shortDescription={project.short_desc}
                longDescription={project.long_desc}
                technologies={project.tech}
                outcome={project.outcome || ''}
                githubUrl={project.repo_url}
                liveUrl={project.demo_url}
                imageUrl={project.image_url}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <Image
                src="/images/icons/beaver-waving.png"
                alt="Builder Beaver waving"
                width={120}
                height={120}
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-heading font-semibold mb-2">No projects yet</h3>
              <p className="text-foreground/70">
                Projects you create in the admin panel will appear here
              </p>
            </div>
          )}
        </div>

        {/* Builder Beaver */}
        <AnimatedBeaver>
          <Image
            src="/images/icons/beaver-blueprint-desk.png"
            alt="Builder Beaver at his workshop"
            width={120}
            height={120}
            className="mx-auto"
          />
        </AnimatedBeaver>
      </div>
    </section>
  )
} 