'use client'

import { useState, useRef, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Send } from 'lucide-react'
import Image from 'next/image'
import { validateChatMessage, type ChatMessage } from '@/lib/validations'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

interface StreamingMessage extends ChatMessage {
  isStreaming?: boolean
  streamedContent?: string
  hasAnimated?: boolean
}

// Memoized component for text that should animate only once
const AnimatedText = memo(({ 
  text, 
  isComplete, 
  messageId 
}: { 
  text: string; 
  isComplete: boolean; 
  messageId: string;
}) => {
  return (
    <span className="relative break-words">
      {text.split('').map((char, index) => (
        <motion.span
          key={`${messageId}-${index}`}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ 
            duration: 0.1,
            delay: index * 0.02,
            ease: 'easeOut'
          }}
          className="inline-block"
          style={{ wordBreak: 'break-word' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-1 w-2 h-4 bg-primary rounded-sm"
        />
      )}
    </span>
  )
})

AnimatedText.displayName = 'AnimatedText'

// Static text component (no animation)
const StaticText = memo(({ 
  text, 
  isComplete 
}: { 
  text: string; 
  isComplete: boolean; 
}) => {
  return (
    <span className="break-words">
      {text}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-1 w-2 h-4 bg-primary rounded-sm"
        />
      )}
    </span>
  )
})

StaticText.displayName = 'StaticText'

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<StreamingMessage[]>([
    {
      id: '1',
      content: "Hi! I'm Builder Beaver, Chase's AI assistant! Ask me anything about his projects, skills, or experience. What would you like to know?",
      role: 'assistant',
      timestamp: new Date(),
      hasAnimated: true, // Initial message should not animate
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleSendMessage = async () => {
    const messageText = inputValue.trim()
    
    if (!messageText || !validateChatMessage(messageText)) {
      return
    }

    // Abort any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const userMessage: StreamingMessage = {
      id: Date.now().toString(),
      content: messageText,
      role: 'user',
      timestamp: new Date(),
      hasAnimated: true, // User messages should not animate
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // Create initial streaming message
      const streamingMessageId = (Date.now() + 1).toString()
      const initialStreamingMessage: StreamingMessage = {
        id: streamingMessageId,
        content: '',
        streamedContent: '',
        role: 'assistant',
        timestamp: new Date(),
        isStreaming: true,
        hasAnimated: false, // This message should animate
      }

      setMessages(prev => [...prev, initialStreamingMessage])
      setIsLoading(false)

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No reader available')
      }

      let buffer = ''
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            
            if (data === '[DONE]') {
              // Mark streaming as complete
              setMessages(prev => prev.map(msg => 
                msg.id === streamingMessageId 
                  ? { ...msg, isStreaming: false, content: fullContent, hasAnimated: true }
                  : msg
              ))
              return
            }

            try {
              const parsed = JSON.parse(data)
              const content = parsed.content || ''
              
              if (content) {
                fullContent += content
                
                // Update the streaming message with new content
                setMessages(prev => prev.map(msg => 
                  msg.id === streamingMessageId 
                    ? { ...msg, streamedContent: fullContent }
                    : msg
                ))
              }
            } catch {
              // Skip invalid JSON
              console.warn('Failed to parse streaming data:', data)
            }
          }
        }
      }

    } catch (error) {
      setIsLoading(false)
      
      if (error instanceof Error && error.name === 'AbortError') {
        return // Request was aborted, don't show error
      }
      
      console.error('Chat error:', error)
      const errorMessage: StreamingMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Feel free to reach out to Chase directly via the contact form below!",
        role: 'assistant',
        timestamp: new Date(),
        hasAnimated: true, // Error messages should not animate
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 h-[70vh] md:h-[500px] max-h-[600px]"
          >
            <Card className="h-full bg-white shadow-xl border-0 flex flex-col rounded-xl">
              {/* Header */}
              <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-xl">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 relative">
                      <Image
                        src="/images/icons/builder-beaver.png"
                        alt="Builder Beaver"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold">Builder Beaver</div>
                      <div className="text-xs opacity-90">Chase&apos;s AI Assistant</div>
                    </div>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-primary-foreground hover:bg-primary-foreground/20 rounded-lg"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 relative">
                            <Image
                              src="/images/icons/builder-beaver.png"
                              alt="Builder Beaver"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-xs text-foreground/60">Builder Beaver</span>
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-xl ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-gray-100 text-foreground'
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap overflow-wrap-anywhere">
                          {message.isStreaming && message.streamedContent ? (
                            <AnimatedText 
                              text={message.streamedContent} 
                              isComplete={false}
                              messageId={message.id}
                            />
                          ) : message.hasAnimated ? (
                            <StaticText 
                              text={message.content} 
                              isComplete={true}
                            />
                          ) : (
                            <AnimatedText 
                              text={message.content} 
                              isComplete={true}
                              messageId={message.id}
                            />
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-foreground/50 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 relative">
                          <Image
                            src="/images/icons/builder-beaver.png"
                            alt="Builder Beaver"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xs text-foreground/60">Builder Beaver</span>
                      </div>
                      <div className="bg-gray-100 text-foreground p-3 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about Chase's work..."
                    disabled={isLoading}
                    className="flex-1 rounded-lg border-2 border-gray-200 focus:border-primary"
                    maxLength={500}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                    className="bg-accent-alt hover:bg-accent-alt/90 text-white rounded-xl px-3 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-foreground/60 mt-2">
                  Try asking: &quot;What are Chase&apos;s skills?&quot; or &quot;Tell me about AI Cat-Guard&quot;
                </p>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 