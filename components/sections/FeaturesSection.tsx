'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, Zap } from "lucide-react"
// import { motion } from "framer-motion"

const featureCards = [
  {
    title: "Dual-Track Growth Engine",
    icon: Users,
    description: "We identify Israel's top technologists, channeling them into focused tracks."
  },
  {
    title: "Economic Impact",
    icon: Zap,
    description: "Fueling 150+ startups and creating 60,000  jobs in 5 years-while reinforcing the ecosystem through open access and raw merit."
  },
  {
    title: "Self-Sustaining Model",
    icon: Globe,
    description: "Corporate partnerships create a flywheel that funds future cohorts."
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted scroll-mt-16">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        > */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Building the Tech Spearhead</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed mx-auto">
              In a time of war and rapid technological change, Israel must leap forward. APEX builds a tech spearhead of elite AI talent to spark a nationwide transformation, driven by open access and pure merit.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {featureCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              // <motion.div 
              //   key={index}
              //   initial={{ opacity: 0, y: 20 }}
              //   whileInView={{ opacity: 1, y: 0 }}
              //   transition={{ duration: 0.5, delay: index * 0.1 }}
              //   viewport={{ once: true }}
              // >
              <div key={index}>
                <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden group">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-semibold text-center">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    {/* <motion.div 
                      className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-6 mx-auto group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    > */}
                    <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-6 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-12 w-12 text-primary" />
                    {/* </motion.div> */} </div>
                    <p className="text-muted-foreground text-center text-base">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              {/* </motion.div> */} </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 
