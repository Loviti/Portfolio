import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectForm from '@/components/admin/project-form'
import { createProject } from '@/lib/actions/projects'
import Link from 'next/link'

export default function NewProjectPage() {
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
          <h1 className="text-2xl font-heading font-bold">Create New Project</h1>
          <p className="text-foreground/70">
            Add a new project to your portfolio
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <ProjectForm
          onSubmit={createProject}
          submitLabel="Create Project"
        />
      </div>
    </div>
  )
} 