import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectForm from '@/components/admin/project-form'
import { updateProject, getProject } from '@/lib/actions/projects'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  let project
  
  try {
    project = await getProject(params.id)
  } catch (error) {
    console.error('Error loading project:', error)
    notFound()
  }

  const handleUpdate = async (formData: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    'use server'
    return updateProject(params.id, formData)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <div className="flex items-center space-x-6 mb-6">
          <Button 
            asChild
            className="bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl px-4 py-3"
          >
            <Link href="/admin">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3">Edit Project</h1>
          <p className="text-foreground/70 text-lg">
            Update &quot;<span className="text-accent-alt font-semibold">{project.title}</span>&quot; and keep your portfolio fresh ✨
          </p>
        </div>
      </div>

      {/* Form */}
      <ProjectForm
        initialData={project}
        onSubmit={handleUpdate}
        submitLabel="Update Project"
      />
    </div>
  )
} 