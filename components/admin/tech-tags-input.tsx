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
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a technology and press Enter"
          className="flex-1 h-12 bg-background border-0 rounded-xl text-base px-4"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => addTag(inputValue)}
          disabled={!inputValue.trim()}
          className="bg-accent-alt/10 hover:bg-accent-alt/20 text-accent-alt border-0 rounded-xl w-12 h-12 p-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Tags Display */}
      <div className="flex flex-wrap gap-3">
        {value.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            className="text-sm px-4 py-2 bg-accent-alt/10 text-accent-alt border-0 rounded-full font-medium hover:bg-accent-alt/20 transition-colors group"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 hover:text-red-500 transition-colors group-hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Suggestions */}
      <div className="bg-background rounded-xl p-4">
        <p className="text-sm font-medium text-foreground/80 mb-3">Quick add popular technologies:</p>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'Tailwind CSS', 'Supabase', 'TensorFlow', 'Docker', 'PostgreSQL'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="text-sm px-3 py-2 bg-surface hover:bg-accent-alt/10 hover:text-accent-alt rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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