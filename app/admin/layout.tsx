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

  // Note: Admin access is controlled by Clerk authentication
  // Additional email verification could be added here if needed

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="section">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  )
} 