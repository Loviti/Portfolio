'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Eye, EyeOff, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-foreground/70">
          <FileText className="w-4 h-4 mr-2" />
          Detailed Description (Markdown supported)
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </>
          )}
        </Button>
      </div>

      {showPreview ? (
        <div className="min-h-[200px] p-4 border border-border rounded-md bg-surface prose prose-sm max-w-none dark:prose-invert">
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-foreground/50 italic">Nothing to preview yet...</p>
          )}
        </div>
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a detailed description of your project. You can use **bold**, *italic*, and other markdown formatting.

Example:
This project was built to solve the problem of...

## Key Features
- Feature 1
- Feature 2

## Technical Challenges
I had to overcome several challenges:
1. Challenge 1
2. Challenge 2

The solution involved..."
          rows={12}
          className="font-mono text-sm"
        />
      )}

      {/* Markdown cheat sheet */}
      <div className="text-xs text-foreground/60 bg-foreground/5 p-3 rounded-md">
        <p className="font-medium mb-2">Markdown Quick Reference:</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <code>**bold**</code> → <strong>bold</strong>
          </div>
          <div>
            <code>*italic*</code> → <em>italic</em>
          </div>
          <div>
            <code>## Heading</code> → <span className="font-semibold">Heading</span>
          </div>
          <div>
            <code>[link](url)</code> → <span className="text-primary underline">link</span>
          </div>
          <div>
            <code>- list item</code> → • list item
          </div>
          <div>
            <code>`code`</code> → <code className="bg-foreground/10 px-1 rounded">code</code>
          </div>
        </div>
      </div>
    </div>
  )
} 