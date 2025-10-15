"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, MapPin, ExternalLink } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your next infrastructure project or explore AI-driven solutions? 
            Let&apos;s connect and build the future together.
          </p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground mb-6">
            Interested in collaborating on innovative infrastructure projects?
          </p>
          <Button size="lg" variant="outline" className="group border-primary/50 hover:border-primary hover:bg-primary/10" asChild>
            <a href="https://harishbabry.com/contact-form/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
              Get In Touch
            </a>
          </Button>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-400/5" />
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-2xl font-display font-semibold mb-8 text-primary">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">Email</p>
                        <a 
                          href="mailto:hkbab123@hotmail.com" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          hkbab123@hotmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Linkedin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">LinkedIn</p>
                        <a 
                          href="https://www.linkedin.com/in/harishbabry/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          linkedin.com/in/harishbabry
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">Location</p>
                        <p className="text-muted-foreground">Available for Global Projects</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">Phone</p>
                        <p className="text-muted-foreground">Available upon request</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground text-center">
                      Preferred contact methods: Email or LinkedIn for professional inquiries
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-display font-semibold mb-4 text-primary">
                  Ready to Connect?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you&apos;re looking to discuss infrastructure projects, explore AI implementations, 
                  or need expertise in project management, I&apos;m here to help turn your vision into reality.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300"
                  asChild
                >
                  <a href="mailto:hkbab123@hotmail.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Send Email
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
                    Connect
                  </a>
                </Button>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-blue-400/10 p-6 rounded-xl border border-primary/20">
                <h4 className="font-display font-semibold mb-2 text-primary">Areas of Expertise</h4>
                <p className="text-sm text-muted-foreground">
                  Infrastructure Project Management • AI & Digital Transformation • 
                  Telecom Systems • EPC Projects • Technology Leadership • 
                  Blockchain Solutions • Sustainable Technology
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-l from-blue-400/10 to-transparent rounded-full blur-3xl" />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  )
}