'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAVIGATION_ITEMS, DEVELOPER_INFO } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Show header when scrolling up, hide when scrolling down
          if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
            setIsVisible(true)
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false)
            setIsMobileMenuOpen(false) // Close mobile menu when hiding
          }
          
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
        }}
        className="fixed top-4 left-0 right-0 z-50 hidden md:block"
      >
        <div className="flex justify-center">
                <nav className="bg-foreground text-background px-12 py-4 rounded-3xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-16">
            {/* Logo/Name */}
            <a
              href="/"
              className="font-heading font-bold text-lg hover:text-primary transition-colors cursor-pointer"
            >
              {DEVELOPER_INFO.name}
            </a>

            {/* Navigation Items */}
            <div className="flex items-center space-x-10">
              {NAVIGATION_ITEMS.filter(item => item.href !== '#contact').map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium hover:text-primary transition-colors relative group px-2 py-1"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Contact Me Button */}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-accent-alt hover:bg-accent-alt/90 text-white rounded-xl px-6 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              CONTACT ME
            </Button>
                      </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="fixed top-4 left-4 right-4 z-50 md:hidden"
      >
        <div className="bg-foreground text-background px-4 py-3 rounded-3xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <a
              href="/"
              className="font-heading font-bold text-lg hover:text-primary transition-colors cursor-pointer"
            >
              {DEVELOPER_INFO.name}
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-background hover:text-primary hover:bg-background/10 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-foreground text-background rounded-2xl shadow-xl p-6">
                             <nav className="flex flex-col space-y-4">
                 {NAVIGATION_ITEMS.filter(item => item.href !== '#contact').map((item, index) => (
                   <motion.button
                     key={item.href}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                     onClick={() => scrollToSection(item.href)}
                     className="text-left text-lg font-medium hover:text-primary transition-colors py-2 border-b border-background/20 last:border-b-0"
                   >
                     {item.label}
                   </motion.button>
                 ))}
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: (NAVIGATION_ITEMS.length - 1) * 0.1 }}
                   className="pt-2"
                 >
                   <Button
                     onClick={() => scrollToSection('#contact')}
                     className="w-full bg-accent-alt hover:bg-accent-alt/90 text-white rounded-xl py-3 text-base font-semibold shadow-md"
                   >
                     CONTACT ME
                   </Button>
                 </motion.div>
               </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
} 