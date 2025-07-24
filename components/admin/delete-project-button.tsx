'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { deleteProject } from '@/lib/actions/projects'

interface DeleteProjectButtonProps {
  projectId: string
  projectTitle: string
}

export default function DeleteProjectButton({ projectId, projectTitle }: DeleteProjectButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteProject(projectId)
      toast.success(`"${projectTitle}" deleted successfully!`)
      setIsOpen(false)
      // The page will automatically refresh due to revalidatePath in the server action
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete project')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button 
        size="sm" 
        className="bg-red-50 hover:bg-red-100 text-red-600 border-0 rounded-xl w-10 h-10 p-0"
        onClick={() => setIsOpen(true)}
        disabled={isDeleting}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-surface border-0 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading font-bold">Delete Project</DialogTitle>
            <DialogDescription className="text-base text-foreground/70 leading-relaxed">
              Are you sure you want to delete &quot;<span className="font-semibold text-foreground">{projectTitle}</span>&quot;? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
              className="bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white border-0 rounded-xl px-6"
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isDeleting ? 'Deleting...' : 'Delete Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 