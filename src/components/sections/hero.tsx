"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileDown, Linkedin, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 ai-mesh opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #14b8a6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #14b8a6 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * (window?.innerWidth || 1000),
              y: Math.random() * (window?.innerHeight || 1000),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <Sparkles className="h-6 w-6 text-primary/70 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="h-4 w-4 text-primary/50 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold bg-gradient-to-br from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
              Harish Kumar Babry
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Telecom Systems & Infrastructure Leader | PMP | AI Enthusiast
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-teal-600 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300"
              asChild
            >
              <a href="/HarishBabry_CV.pdf" download>
                <FileDown className="mr-2 h-5 w-5" />
                Download CV
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="group border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              asChild
            >
              <a 
                href="https://linkedin.com/in/harishbabry" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                Connect on LinkedIn
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-8"
          >
            <p className="text-sm text-muted-foreground/70 mb-4">
              Scroll to explore
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary/50 rounded-full mx-auto p-1"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mx-auto"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}