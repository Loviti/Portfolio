'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Tech logos array
const TECH_LOGOS = [
  { name: "TypeScript", logo: "/images/Logos/ts-lettermark-white.svg", alt: "TypeScript" },
  { name: "Next.js", logo: "/images/Logos/next-js-seeklogo.svg", alt: "Next.js" },
  { name: "React", logo: "/images/Logos/react-logo-png-react-js-logo-history-design-history-and-evolution-5500x3094.png", alt: "React" },
  { name: "Tailwind CSS", logo: "/images/Logos/tailwindcss-logotype.svg", alt: "Tailwind CSS" },
  { name: "Framer Motion", logo: "/images/Logos/Framer_Logo_Core 1.svg", alt: "Framer Motion" },
  { name: "Python", logo: "/images/Logos/python-logo-generic.svg", alt: "Python" },
  { name: "TensorFlow", logo: "/images/Logos/TF_FullColor_Horizontal.svg", alt: "TensorFlow" },
  { name: "Supabase", logo: "/images/Logos/supabase-logo-wordmark--light.svg", alt: "Supabase" },
  { name: "PostgreSQL", logo: "/images/Logos/PostgreSQL-Logo-SVG_003.svg", alt: "PostgreSQL" },
  { name: "Docker", logo: "/images/Logos/docker-logo-blue.svg", alt: "Docker" },
  { name: "Git", logo: "/images/Logos/Git-Logo-Black.svg", alt: "Git" },
  { name: "Figma", logo: "/images/Logos/Figma Wordmark (Black).svg", alt: "Figma" },
  { name: "OpenAI", logo: "/images/Logos/OpenAI-black-wordmark.svg", alt: "OpenAI" },
] as const;

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section font-heading font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Logo Scroller */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="scroller-container"
        >
          <div className="scroller">
            {/* First set of logos */}
            {TECH_LOGOS.map((tech, index) => (
              <div key={`first-${index}`} className="scroller-item">
                <Image
                  src={tech.logo}
                  alt={tech.alt}
                  width={150}
                  height={60}
                  className="scroller-img"
                />
              </div>
            ))}
            {/* Second set of logos for seamless loop */}
            {TECH_LOGOS.map((tech, index) => (
              <div key={`second-${index}`} className="scroller-item">
                <Image
                  src={tech.logo}
                  alt={tech.alt}
                  width={150}
                  height={60}
                  className="scroller-img"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Builder Beaver */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Image
            src="/images/icons/beaver-arms-up.png"
            alt="Builder Beaver at work"
            width={120}
            height={120}
            className="mx-auto"
          />
        </motion.div>
      </div>
    </section>
  )
} 