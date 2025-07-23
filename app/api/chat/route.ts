import { NextRequest, NextResponse } from 'next/server'
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

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message too long' },
        { status: 400 }
      )
    }

    let response: string

    // First, try to find a pre-seeded answer
    const preSeededAnswer = findBestAnswer(message)
    
    if (preSeededAnswer) {
      response = preSeededAnswer
    } else if (process.env.OPENAI_API_KEY) {
      // Fallback to OpenAI if API key is available
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
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
          }),
        })

        if (!openaiResponse.ok) {
          throw new Error('OpenAI API error')
        }

        const openaiData = await openaiResponse.json()
        response = openaiData.choices[0]?.message?.content || 
          "I'm having trouble right now. You can reach Chase directly at chaselawrence06@gmail.com!"

      } catch (openaiError) {
        console.error('OpenAI error:', openaiError)
        response = "I'm having trouble connecting right now. Feel free to reach out to Chase directly via the contact form or email!"
      }
    } else {
      // Default response when no OpenAI key is available
      response = `Thanks for your message! I'm still learning, but you can find detailed information about Chase's work in the sections above, or reach out directly via the contact form. For specific questions about projects or skills, try asking about "AI Cat-Guard", "RFQ Fast-Track", "skills", or "contact info".`
    }

    // Log the conversation to Supabase (if configured)
    try {
      const { error } = await supabase
        .from('chat_logs')
        .insert([
          {
            user_message: message,
            bot_response: response,
          }
        ])
      
      if (error && !error.message.includes('not configured')) {
        console.error('Supabase logging error:', error)
      }
    } catch (supabaseError) {
      console.error('Supabase logging error:', supabaseError)
      // Don't fail the request if logging fails
    }

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 