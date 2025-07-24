import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { CHATBOT_QA } from '@/lib/constants'

export const runtime = 'edge'

// Simple Q&A matching function
function findBestAnswer(userMessage: string): string | null {
  const lowerMessage = userMessage.toLowerCase()
  
  for (const qa of CHATBOT_QA) {
    const lowerQuestion = qa.question.toLowerCase()
    
    // Check for exact matches or key phrases
    if (lowerMessage.includes(lowerQuestion.toLowerCase()) ||
        lowerQuestion.includes(lowerMessage) ||
        // Check for keywords
        (lowerMessage.includes('who') && lowerQuestion.includes('who')) ||
        (lowerMessage.includes('skills') && lowerQuestion.includes('skills')) ||
        (lowerMessage.includes('cat') && lowerQuestion.includes('cat')) ||
        (lowerMessage.includes('rfq') && lowerQuestion.includes('rfq')) ||
        (lowerMessage.includes('minecraft') && lowerQuestion.includes('gaming')) ||
        (lowerMessage.includes('contact') && lowerQuestion.includes('contact'))
    ) {
      return qa.answer
    }
  }
  
  return null
}

// Helper function to create a streaming response from a static string
function createStaticStream(text: string): ReadableStream {
  const encoder = new TextEncoder()
  let index = 0
  
  return new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        if (index < text.length) {
          // Stream character by character for smooth effect
          const chunk = text.slice(index, index + 1)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
          index++
        } else {
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
          controller.close()
          clearInterval(interval)
        }
      }, 30) // 30ms delay between characters for smooth typing effect
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate message length
    if (message.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Message too long' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // First, try to find a pre-seeded answer
    const preSeededAnswer = findBestAnswer(message)
    
    if (preSeededAnswer) {
      // Log to Supabase (non-blocking)
      supabase
        .from('chat_logs')
        .insert([{ user_message: message, bot_response: preSeededAnswer }])
        .then(() => {})
        .catch(console.error)
      
      return new Response(createStaticStream(preSeededAnswer), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }
    
    // Use OpenAI streaming if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4.1-nano',
            messages: [
              {
                role: 'system',
                content: `You are Builder Beaver, Chase Pelky's friendly portfolio assistant. 
                You help visitors learn about Chase's work, skills, and projects. 
                Keep responses concise, friendly, and professional. 
                If asked about something not related to Chase or his work, politely redirect to his portfolio content.
                
                Key info about Chase:
                - AI-focused software developer
                - Skills: TypeScript, Next.js, React, Python, TensorFlow/PyTorch, Supabase
                - Notable projects: AI Cat-Guard, RFQ Fast-Track, CardCrafter Mod, TaskSpark Web
                - Location: Michigan, USA
                - Email: chaselawrence06@gmail.com`
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 150,
            temperature: 0.7,
            stream: true,
          }),
        })

        if (!openaiResponse.ok) {
          throw new Error('OpenAI API error')
        }

        // Create a transform stream to process OpenAI's streaming response
        const encoder = new TextEncoder()
        let fullResponse = ''
        
        const transformStream = new TransformStream({
          transform(chunk, controller) {
            const decoder = new TextDecoder()
            const text = decoder.decode(chunk)
            const lines = text.split('\n')
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  // Log complete response to Supabase (non-blocking)
                  supabase
                    .from('chat_logs')
                    .insert([{ user_message: message, bot_response: fullResponse }])
                    .then(() => {})
                    .catch(console.error)
                  
                  controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
                  return
                }
                
                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content || ''
                  if (content) {
                    fullResponse += content
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        })

        return new Response(
          openaiResponse.body?.pipeThrough(transformStream),
          {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          }
        )

      } catch (openaiError) {
        console.error('OpenAI error:', openaiError)
        const errorResponse = "I'm having trouble connecting right now. Feel free to reach out to Chase directly via the contact form or email!"
        
        return new Response(createStaticStream(errorResponse), {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        })
      }
    } else {
      // Default response when no OpenAI key is available
      const defaultResponse = `Thanks for your message! I'm still learning, but you can find detailed information about Chase's work in the sections above, or reach out directly via the contact form. For specific questions about projects or skills, try asking about "AI Cat-Guard", "RFQ Fast-Track", "skills", or "contact info".`
      
      return new Response(createStaticStream(defaultResponse), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
} 