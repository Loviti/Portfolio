import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectForm from '@/components/admin/project-form'
import { createProject } from '@/lib/actions/projects'
import Link from 'next/link'

export default function NewProjectPage() {
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
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3">Create New Project</h1>
          <p className="text-foreground/70 text-lg">
            Add a new project to your portfolio and showcase your amazing work to the world 🚀
          </p>
        </div>
      </div>

      {/* Form */}
      <ProjectForm
        onSubmit={createProject}
        submitLabel="Create Project"
      />
    </div>
  )
} 