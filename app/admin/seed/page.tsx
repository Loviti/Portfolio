'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Database, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { seedProjects } from '@/lib/actions/seed-projects'
import Link from 'next/link'

export default function SeedPage() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSeed = async () => {
    try {
      setIsSeeding(true)
      setSeedResult(null)
      
      const result = await seedProjects()
      setSeedResult(result)
      
      if (result.success) {
        toast.success('Projects seeded successfully!')
      }
    } catch (error) {
      console.error('Seed error:', error)
      const message = error instanceof Error ? error.message : 'Failed to seed projects'
      setSeedResult({ success: false, message })
      toast.error(message)
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold mb-2">Seed Database</h1>
        <p className="text-foreground/70">
          Migrate existing projects from constants to the database
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Project Migration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground/70">
            This will migrate the hardcoded FEATURED_PROJECTS from <code>lib/constants.ts</code> 
            into your Supabase database. This should only be done once during initial setup.
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-700 dark:text-amber-400">Warning</p>
                <p className="text-amber-600 dark:text-amber-300 mt-1">
                  Only run this if you haven't added any projects through the admin panel yet.
                  This will skip seeding if projects already exist in the database.
                </p>
              </div>
            </div>
          </div>

          {seedResult && (
            <div className={`rounded-md p-4 ${
              seedResult.success 
                ? 'bg-green-500/10 border border-green-500/20' 
                : 'bg-red-500/10 border border-red-500/20'
            }`}>
              <div className="flex items-start space-x-2">
                {seedResult.success ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                )}
                <div className="text-sm">
                  <p className={`font-medium ${
                    seedResult.success 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-red-700 dark:text-red-400'
                  }`}>
                    {seedResult.success ? 'Success' : 'Error'}
                  </p>
                  <p className={`mt-1 ${
                    seedResult.success 
                      ? 'text-green-600 dark:text-green-300' 
                      : 'text-red-600 dark:text-red-300'
                  }`}>
                    {seedResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={handleSeed}
              disabled={isSeeding}
              className="btn-primary"
            >
              {isSeeding && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSeeding ? 'Seeding...' : 'Seed Projects'}
            </Button>
            
            <Button variant="outline" asChild>
              <Link href="/admin">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 