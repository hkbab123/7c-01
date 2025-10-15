"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Globe, Shield } from "lucide-react"

const highlights = [
  {
    icon: Brain,
    title: "AI & Innovation",
    description: "Exploring generative AI and emerging technologies for infrastructure optimization",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Leading large-scale digital initiatives across telecom and infrastructure",
  },
  {
    icon: Globe,
    title: "Global Experience",
    description: "30+ years delivering projects across Oil & Gas, Railways, and IT sectors",
  },
  {
    icon: Shield,
    title: "Sustainable Solutions",
    description: "Focusing on blockchain and sustainable technology implementations",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transforming ideas into reality through technology and leadership
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-semibold mb-6 text-primary">
                  Engineering Excellence
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Accomplished engineering and technology leader with 30+ years of experience delivering 
                  large-scale telecom and IT infrastructure programs across Oil & Gas, Railways, and IT sectors.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  My expertise spans from traditional infrastructure management to cutting-edge technologies 
                  including AI, generative AI, blockchain, and sustainability-focused solutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Project Management", "PMP Certified", "Infrastructure", "AI Readiness"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20 hover:border-primary/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full border-border/50 hover:border-primary/30">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-l from-teal-400/20 to-transparent rounded-full blur-xl" />
    </section>
  )
}