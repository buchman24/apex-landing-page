'use client';

import { Pyramid } from 'lucide-react';
// import { motion } from 'framer-motion';

export function VisionSection() {
  return (
    <section id="vision" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-background scroll-mt-16 overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* <motion.div
          className="flex flex-col items-center justify-center space-y-6 text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        > */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-5xl mx-auto">
          <div className="p-4 rounded-full bg-primary/10 inline-flex">
            <Pyramid className="h-8 w-8 text-primary" style={{ transform: "rotate(180deg)" }} />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Our Vision
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light">
            APEX unites elite minds from the army, academia, and industry to build a sovereign AI ecosystem - fast-tracking founders and builders to lead breakthrough ventures, born in Israel and built for the world.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold mt-8 text-foreground">
            5 Years. 150 Founders. 750 AI Architects. 60 AI Researchers.
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 text-primary">
            1 Nation Building Its Tech Sovereignty.
          </p>
        {/* </motion.div> */} </div>
      </div>
    </section>
  );
} 
