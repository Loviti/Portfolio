import { Suspense } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProjectList from '@/components/admin/project-list'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Projects</h1>
          <p className="text-foreground/70">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild className="btn-primary">
          <Link href="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Projects List */}
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </div>
  )
}

function ProjectListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-6 bg-surface border border-border rounded-lg">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-foreground/10 rounded w-1/4"></div>
            <div className="h-3 bg-foreground/10 rounded w-3/4"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-foreground/10 rounded w-16"></div>
              <div className="h-6 bg-foreground/10 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 