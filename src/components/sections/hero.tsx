"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileDown, Linkedin, Sparkles } from "lucide-react"
import Image from "next/image"

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
              "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #3b82f6 0%, transparent 50%)",
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
              x: Math.random() * 1000,
              y: Math.random() * 800,
            }}
            animate={{
              x: Math.random() * 1000,
              y: Math.random() * 800,
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
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-blue-400/20 p-2">
                <Image
                  src="/HarishBabry-logo.png"
                  alt="Harish Kumar Babry Logo"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                <Sparkles className="h-6 w-6 text-primary/70 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <Sparkles className="h-4 w-4 text-primary/50 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight relative">
              <span className="bg-gradient-to-r from-blue-400 via-primary to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] inline-block">
                Designing Intelligent Systems That Protect Human Stories
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-6">
              Author of <em className="text-primary font-medium">The Eternal Vault</em> | Building Ethical AI and Human-Centric Systems
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
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300"
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
                href="https://www.linkedin.com/in/harishbabry/" 
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