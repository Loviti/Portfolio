'use client'

import { useState, KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'

interface TechTagsInputProps {
  value: string[]
  onChange: (tags: string[]) => void
}

export default function TechTagsInput({ value = [], onChange }: TechTagsInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag])
    }
    setInputValue('')
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === ',' || e.key === 'Tab') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag when backspacing on empty input
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a technology and press Enter"
          className="flex-1"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => addTag(inputValue)}
          disabled={!inputValue.trim()}
          variant="outline"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Tags Display */}
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            variant="secondary"
            className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 hover:text-destructive transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Suggestions */}
      <div className="text-xs text-foreground/60">
        <p className="mb-2">Common technologies:</p>
        <div className="flex flex-wrap gap-1">
          {['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'Tailwind CSS', 'Supabase', 'TensorFlow', 'Docker', 'PostgreSQL'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="text-xs px-2 py-1 bg-foreground/5 hover:bg-foreground/10 rounded transition-colors"
              disabled={value.includes(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 