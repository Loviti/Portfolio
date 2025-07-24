'use client'

import { DEVELOPER_INFO } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section font-heading font-bold mb-4">
            About Me
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Learn more about my journey and what drives my passion for AI development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Placeholder for profile image */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/20 to-accent-alt/20 flex items-center justify-center border-2 border-primary/30">
                <div className="text-center text-foreground/60">
                  <div className="text-8xl mb-4">👨‍💻</div>
                  <p className="text-sm font-medium">
                    Profile Photo
                    <br />
                    <span className="text-xs">(Coming Soon)</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div>
              <h3 className="text-subsection font-heading font-semibold mb-4">
                {DEVELOPER_INFO.title}
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed mb-6">
                {DEVELOPER_INFO.bio}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-foreground min-w-24">Location:</span>
                <span className="text-foreground/80">{DEVELOPER_INFO.location}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-foreground min-w-24">Email:</span>
                <a 
                  href={`mailto:${DEVELOPER_INFO.email}`}
                  className="text-primary hover:underline"
                >
                  {DEVELOPER_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-heading font-semibold mb-3">What I&apos;m passionate about:</h4>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Building AI solutions that solve real-world problems
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Creating intuitive user experiences for complex systems
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Bridging the gap between cutting-edge technology and usability
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Continuous learning and staying updated with emerging technologies
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 