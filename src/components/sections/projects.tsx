"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitBranch, Zap } from "lucide-react"

const projects = [
  {
    title: "The Eternal Vault",
    description: "A revolutionary digital preservation platform combining blockchain technology with AI-driven metadata management for long-term data storage and retrieval.",
    features: ["Blockchain-based immutability", "AI metadata extraction", "Decentralized storage", "Smart contract automation"],
    status: "In Development",
    icon: GitBranch,
  },
  {
    title: "7C Framework",
    description: "Comprehensive project management framework integrating traditional methodologies with AI-powered insights for infrastructure and telecom projects.",
    features: ["AI-driven risk assessment", "Predictive analytics", "Resource optimization", "Stakeholder automation"],
    status: "Beta Testing",
    icon: Zap,
  },
  {
    title: "AIbit.News",
    description: "Next-generation news aggregation platform leveraging generative AI for personalized content curation and intelligent article summarization.",
    features: ["AI content curation", "Real-time analysis", "Personalized feeds", "Multi-source aggregation"],
    status: "Live",
    icon: ExternalLink,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Live":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "Beta Testing":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "In Development":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Innovative solutions at the intersection of traditional infrastructure and emerging technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/50 hover:border-primary/30 glass relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <project.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-display group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-primary mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors" 
                      disabled={project.status !== "Live"}
                    >
                      {project.status === "Live" ? (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Project
                        </>
                      ) : (
                        <>
                          <GitBranch className="mr-2 h-4 w-4" />
                          Learn More
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Interested in collaborating on innovative infrastructure projects?
          </p>
          <Button size="lg" variant="outline" className="group border-primary/50 hover:border-primary hover:bg-primary/10">
            <ExternalLink className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
            Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-l from-teal-400/10 to-transparent rounded-full blur-2xl" />
    </section>
  )
}