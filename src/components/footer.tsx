"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail, Heart } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image
                  src="/HarishBabry-logo.png"
                  alt="Harish Kumar Babry Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-display font-bold">
                Harish Kumar Babry
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Engineering excellence through AI-driven innovation and sustainable technology solutions. 
              Building the future of infrastructure, one project at a time.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="mailto:hkbab123@hotmail.com"
                className="p-3 rounded-xl bg-secondary/20 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/harishbabry"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary/20 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-display font-semibold mb-6 text-primary">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {[
                { name: "About", href: "#about" },
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1"
                  whileHover={{ x: 4 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Expertise Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-display font-semibold mb-6 text-primary">
              Expertise
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>Project Management (PMP)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>AI & Digital Transformation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>Telecom Infrastructure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>Blockchain Solutions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>Sustainable Technology</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gradient-to-r from-transparent via-border to-transparent"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} Harish Kumar Babry. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>using Next.js and Warp AI</span>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-24 h-24 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-l from-teal-400/5 to-transparent rounded-full blur-3xl" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
    </footer>
  )
}