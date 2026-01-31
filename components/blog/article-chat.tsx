'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ArticleChatProps {
  articleContent: string
  articleTitle: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ArticleChat({ articleContent, articleTitle }: ArticleChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to let animation complete
      setTimeout(() => inputRef.current?.focus(), 400)
    }
  }, [isOpen])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Prepend article context to the message
      const contextMessage = `[Context: The user is reading an article titled "${articleTitle}". Article content: ${articleContent.slice(0, 2000)}...]\n\nUser question about this article: ${text}`

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: contextMessage }),
      })

      if (!response.ok) throw new Error('Failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error('No reader')

      const assistantId = (Date.now() + 1).toString()
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

      let buffer = ''
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.content || ''
              if (content) {
                fullContent += content
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId ? { ...msg, content: fullContent } : msg
                  )
                )
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Sorry, I'm having trouble right now. Try again in a moment!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center mt-20 mb-8">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Pill Button */
          <motion.button
            key="pill"
            layoutId="chat-container"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-6 py-3 bg-foreground text-background rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ borderRadius: 9999 }}
          >
            <div className="w-6 h-6 relative flex-shrink-0">
              <Image
                src="/images/icons/builder-beaver.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-medium whitespace-nowrap"
            >
              Ask BuilderBeaver about this article
            </motion.span>
          </motion.button>
        ) : (
          /* Expanded Chat */
          <motion.div
            key="chat"
            layoutId="chat-container"
            className="w-full max-w-[680px] bg-foreground text-background rounded-3xl shadow-2xl overflow-hidden"
            initial={{ borderRadius: 9999 }}
            animate={{ borderRadius: 24 }}
            exit={{ borderRadius: 9999 }}
            transition={{
              layout: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
              },
              borderRadius: { duration: 0.3 },
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              className="flex items-center justify-between px-5 py-4 border-b border-background/10"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 relative">
                  <Image
                    src="/images/icons/builder-beaver.png"
                    alt="Builder Beaver"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Builder Beaver</p>
                  <p className="text-xs text-background/50">Ask about this article</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background/10 transition-colors"
                aria-label="Close chat"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>

            {/* Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
              className="h-64 overflow-y-auto px-5 py-4 space-y-3"
            >
              {messages.length === 0 && (
                <div className="text-center text-background/40 text-sm py-8">
                  <p>Ask me anything about this article!</p>
                  <p className="text-xs mt-1">e.g. &ldquo;Summarize the key points&rdquo; or &ldquo;Explain the tech stack&rdquo;</p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-background/10 text-background rounded-bl-md'
                    }`}
                  >
                    {msg.content || (
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-background/40 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-background/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="w-1.5 h-1.5 bg-background/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-background/10 text-background px-3.5 py-2.5 rounded-2xl rounded-bl-md">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-background/40 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-background/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1.5 h-1.5 bg-background/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </motion.div>

            {/* Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
              className="px-5 pb-4 pt-2"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Ask about this article..."
                  disabled={isLoading}
                  className="flex-1 bg-background/10 text-background placeholder:text-background/30 px-4 py-2.5 rounded-xl text-sm border-0 outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  maxLength={500}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-3.5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-primary/90 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
