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
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-surface rounded-2xl p-8 shadow-sm text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-3">Seed Database</h1>
        <p className="text-foreground/70 text-lg">
          Migrate existing projects from constants to the database
        </p>
      </div>

      <div className="bg-surface rounded-2xl p-8 shadow-sm">
        <div className="flex items-center mb-6">
          <Database className="w-6 h-6 mr-3 text-accent-alt" />
          <h2 className="text-xl font-heading font-bold text-foreground">Project Migration</h2>
        </div>
        <div className="space-y-6">
          <p className="text-base text-foreground/80 leading-relaxed">
            This will migrate the hardcoded FEATURED_PROJECTS from <code className="bg-background px-2 py-1 rounded font-mono text-sm">lib/constants.ts</code> 
            into your Supabase database. This should only be done once during initial setup.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-800 text-base mb-2">Important Notice</p>
                <p className="text-amber-700 leading-relaxed">
                  Only run this if you haven't added any projects through the admin panel yet.
                  This will skip seeding if projects already exist in the database.
                </p>
              </div>
            </div>
          </div>

          {seedResult && (
            <div className={`rounded-xl p-6 ${
              seedResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start space-x-4">
                {seedResult.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-semibold text-base mb-2 ${
                    seedResult.success 
                      ? 'text-green-800' 
                      : 'text-red-800'
                  }`}>
                    {seedResult.success ? 'Success! 🎉' : 'Error ❌'}
                  </p>
                  <p className={`leading-relaxed ${
                    seedResult.success 
                      ? 'text-green-700' 
                      : 'text-red-700'
                  }`}>
                    {seedResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <Button
              onClick={handleSeed}
              disabled={isSeeding}
              className="px-8 py-3 bg-accent-alt hover:bg-accent-alt/90 text-white border-0 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              {isSeeding && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {isSeeding ? 'Seeding Projects...' : '🌱 Seed Projects'}
            </Button>
            
            <Button 
              asChild
              className="px-8 py-3 bg-background hover:bg-foreground/5 text-foreground border-0 rounded-xl font-medium"
            >
              <Link href="/admin">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 