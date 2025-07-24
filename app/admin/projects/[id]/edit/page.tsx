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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold">Edit Project</h1>
          <p className="text-foreground/70">
            Update &quot;{project.title}&quot;
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <ProjectForm
          initialData={project}
          onSubmit={handleUpdate}
          submitLabel="Update Project"
        />
      </div>
    </div>
  )
} 