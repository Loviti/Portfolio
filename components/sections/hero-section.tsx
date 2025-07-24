'use client'

import { DEVELOPER_INFO } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowDown, ChevronDown } from 'lucide-react'
import Image from 'next/image'

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
                onClick={scrollToAbout}
                className="bg-accent-alt hover:bg-accent-alt/90 text-white rounded-xl px-8 py-3 h-auto text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Learn More About Me
              </Button>
              <Button
                onClick={scrollToProjects}
                className="bg-transparent hover:bg-foreground/5 text-foreground text-lg px-8 py-3 h-auto transition-all duration-200"
              >
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Builder Beaver Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <Image
              src="/images/icons/beaver-waving.png"
              alt="Builder Beaver"
              width={400}
              height={400}
              className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain"
              priority
            />
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