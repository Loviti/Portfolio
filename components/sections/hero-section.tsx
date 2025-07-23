'use client'

import { DEVELOPER_INFO } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowDown, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight"
            >
              Hi, I&apos;m{' '}
              <span className="text-primary">{DEVELOPER_INFO.name.split(' ')[0]}</span>.
              <br />
              {DEVELOPER_INFO.subtitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl"
            >
              {DEVELOPER_INFO.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={scrollToProjects}
                className="btn-primary text-lg px-8 py-3 h-auto"
              >
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={scrollToAbout}
                className="btn-secondary text-lg px-8 py-3 h-auto"
              >
                Learn More About Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Mascot Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent-alt/20 flex items-center justify-center border-2 border-primary/30">
              {/* Placeholder for Builder Beaver - will be replaced with actual SVG */}
              <div className="text-center">
                <div className="text-6xl mb-4">🦫</div>
                <p className="text-sm text-foreground/60 font-medium">
                  Builder Beaver
                  <br />
                  <span className="text-xs">(SVG Coming Soon)</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-foreground/60 hover:text-primary transition-colors"
          aria-label="Scroll to next section"
        >
          <span className="text-sm mb-2">Scroll</span>
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  )
} 