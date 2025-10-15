"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    company: "Systra",
    position: "System Manager—Telecom",
    period: "May 2025 - Present",
    location: "Abu Dhabi, UAE",
    description: "Leading PMC technical and contractual reviews for the High-Speed Rail (Abu Dhabi–Dubai) program. Collaborating with Etihad Rail and multidisciplinary bidders.",
    achievements: ["Directed resolution of 100+ contractor comments", "Managed over 600 bidder queries", "Developed solution-driven clarifications for multi-system tenders"],
  },
  {
    company: "Petrofac International",
    position: "Manager Telecom",
    period: "Nov 2022 - Apr 2025",
    location: "Sharjah, UAE",
    description: "Directed end-to-end telecom solutions for major ADNOC and BP projects. Architected multi-system telecom designs and supported bid proposals.",
    achievements: ["Reduced engineering man-hours by 30%", "Improved bid success rates by 40%", "Spearheaded vendor evaluation and negotiations"],
  },
  {
    company: "Hill International",
    position: "Manager – Telecommunication, Centralized Control & Signaling",
    period: "Oct 2020 - Nov 2022",
    location: "Cairo, Egypt",
    description: "Led telecommunications and system integration for the Cairo Monorail Project as part of PMC role, optimizing centralized control and SCADA systems.",
    achievements: ["Enhanced operational efficiency through system optimization", "Managed cross-functional teams", "Maintained strict adherence to project standards and budgets"],
  },
  {
    company: "NK Consortium",
    position: "Chief Engineer Telecommunication",
    period: "Mar 2018 - Sep 2020",
    location: "Jaipur, India",
    description: "Directed telecom engineering team for WDFC project as part of PMC role, overseeing design and construction of critical systems for Rewari-Vadodara electrified railway.",
    achievements: ["Ensured timely project delivery", "Successfully managed construction schedules and contractor payments", "Achieved on-time and on-budget completion of Phase I"],
  },
  {
    company: "Petrofac Emirates",
    position: "Lead Engineer Telecommunication",
    period: "Mar 2013 - Feb 2018",
    location: "Abu Dhabi, UAE",
    description: "Key role in delivering the $3.7 billion Upper Zakum UZ750 Project, leading 25-30 engineers and overseeing development of 4000+ engineering documents.",
    achievements: ["Delivered $3.7B Upper Zakum UZ750 Project", "Enhanced engineering accuracy through data analytics", "Updated 20+ Petrofac telecommunication standards"],
  },
  {
    company: "Various Organizations",
    position: "Senior Roles in Telecom & Infrastructure",
    period: "1994 - 2013",
    location: "UAE, India",
    description: "Progressive leadership roles across major organizations including RTA Dubai, Mott MacDonald, Siemens, Alcatel, and others in telecom infrastructure.",
    achievements: ["Led Dubai Light Rail telecom systems", "Managed Delhi Metro Rail telecom networks", "Built expertise across oil & gas, railways, and urban transit"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Three decades of engineering excellence and leadership across global projects
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-primary opacity-50 transform md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 z-10 shadow-lg shadow-primary/50" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/50 hover:border-primary/30 glass">
                    <CardHeader>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-primary">
                          <Building className="h-4 w-4" />
                          <span className="font-medium text-sm">{exp.company}</span>
                        </div>
                        <CardTitle className="text-xl font-display group-hover:text-primary transition-colors">
                          {exp.position}
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-primary">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-l from-blue-400/10 to-transparent rounded-full blur-2xl" />
    </section>
  )
}