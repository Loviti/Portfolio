'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatWindow from './chat-window'

export default function ChatToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // One-time entrance animation after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, 3000) // Show hint after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Hint Bubble - appears once */}
        {!hasAnimated && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 3 }}
            className="absolute -top-14 -left-32 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span>💡</span>
              <span>Ask me anything!</span>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary" />
          </motion.div>
        )}

        {/* Chat Button */}
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={
            !hasAnimated && !isOpen
              ? {
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 2,
                    repeat: 2,
                    delay: 3.5,
                  },
                }
              : {}
          }
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group relative ${
            isOpen
              ? 'bg-destructive hover:bg-destructive/90'
              : 'bg-primary hover:bg-primary/90'
          }`}
          aria-label={isOpen ? 'Close chat with Builder Beaver' : 'Open chat with Builder Beaver'}
        >
          {/* Chat Icon / Close Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-2xl text-primary-foreground"
          >
            {isOpen ? '✕' : '🦫'}
          </motion.div>

          {/* Notification Badge - for demonstration */}
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-accent-alt text-white text-xs rounded-full flex items-center justify-center font-bold"
            >
              ?
            </motion.div>
          )}

          {/* Pulse Effect */}
          {!isOpen && !hasAnimated && (
            <motion.div
              animate={{
                scale: [1, 1.5],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute inset-0 rounded-full bg-primary"
            />
          )}
        </motion.button>

        {/* Status Indicator */}
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
      </motion.div>

      {/* Chat Window */}
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
} 