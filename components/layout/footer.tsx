import { DEVELOPER_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { Github, Linkedin, Mail, Settings } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  const { userId } = await auth()

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Name/Copyright */}
          <div className="text-center md:text-left">
            <h3 className="font-heading font-bold text-xl mb-2">
              {DEVELOPER_INFO.name}
            </h3>
            <p className="text-sm opacity-80">
              © {currentYear} {DEVELOPER_INFO.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links & Admin */}
          <div className="flex items-center space-x-6">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 transition-colors group"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 transition-colors group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 transition-colors group"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            
            {/* Admin Button - Only show if authenticated */}
            {userId ? (
              <Link
                href="/admin"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-alt/20 hover:bg-accent-alt/30 transition-colors group"
                aria-label="Admin Panel"
              >
                <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 transition-colors group opacity-60">
                  <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
} 