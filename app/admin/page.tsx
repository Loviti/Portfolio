import { Suspense } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProjectList from '@/components/admin/project-list'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Projects</h1>
            <p className="text-foreground/70 text-lg">
              Manage your portfolio projects with ease
            </p>
          </div>
          <Button 
            asChild 
            className="bg-accent-alt hover:bg-accent-alt/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <Link href="/admin/projects/new">
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
            <Input
              placeholder="Search projects..."
              className="pl-12 h-12 bg-background border-0 rounded-xl text-base"
            />
          </div>
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
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-8 bg-surface rounded-2xl shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-foreground/10 rounded-xl w-1/4"></div>
            <div className="h-4 bg-foreground/10 rounded-lg w-3/4"></div>
            <div className="flex space-x-3">
              <div className="h-8 bg-foreground/10 rounded-full w-20"></div>
              <div className="h-8 bg-foreground/10 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 