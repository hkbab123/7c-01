"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Project Management",
    skills: ["PMP Certified", "Agile/Scrum", "Risk Management", "Stakeholder Management", "Budget Control", "Quality Assurance"],
  },
  {
    title: "Technology Leadership",
    skills: ["Digital Transformation", "AI Readiness", "System Integration", "Infrastructure Architecture", "Technology Strategy"],
  },
  {
    title: "Telecom & Infrastructure", 
    skills: ["Telecom Systems", "Network Design", "Fiber Optics", "Wireless Systems", "Data Centers", "Cloud Infrastructure"],
  },
  {
    title: "Emerging Technologies",
    skills: ["Artificial Intelligence", "Generative AI", "Blockchain", "IoT Systems", "Sustainability Tech", "Smart Infrastructure"],
  },
  {
    title: "Industry Expertise",
    skills: ["Oil & Gas", "Railways", "IT Sector", "Construction", "Infrastructure Development", "EPC Projects"],
  },
]


export function SkillsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Expertise spanning traditional infrastructure to cutting-edge AI and emerging technologies
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display font-semibold text-primary text-center md:text-left">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                  >
                    <Badge className="bg-secondary/50 text-secondary-foreground border border-border/50 hover:bg-primary/10 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/20 cursor-default transform hover:scale-105">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating skill badges animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {["AI", "Blockchain", "PMP", "5G", "IoT", "Cloud"].map((skill) => (
            <motion.div
              key={skill}
              className="absolute text-primary font-bold text-sm"
              initial={{ 
                x: Math.random() * 1000,
                y: Math.random() * 800,
              }}
              animate={{
                x: Math.random() * 1000,
                y: Math.random() * 800,
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-l from-teal-400/10 to-transparent rounded-full blur-xl" />
    </section>
  )
}