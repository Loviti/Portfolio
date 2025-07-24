import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // TODO: Add email verification from Clerk user object
  // const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-surface">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-heading font-bold">Admin Panel</h1>
            <div className="text-sm text-foreground/60">
              🦫 Builder Beaver&apos;s Workshop
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <a
              href="/admin"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              View Site
            </a>
          </nav>
        </div>
      </div>
      <main className="container py-8">
        {children}
      </main>
    </div>
  )
} 