'use client'

import { motion } from 'framer-motion'

interface ListenButtonProps {
  articleTitle: string
}

export default function ListenButton({ articleTitle }: ListenButtonProps) {
  const handleClick = () => {
    // Placeholder for AI voice TTS integration
    alert(`AI voice narration for "${articleTitle}" coming soon!`)
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-200"
    >
      {/* Headphone icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
      <span>Listen to article</span>
    </motion.button>
  )
}
