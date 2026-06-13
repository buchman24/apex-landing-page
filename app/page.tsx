import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Globe, Zap, Users, Shield, Mountain, Clock, Train, Coffee } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import {
  HeroSection,
  AboutSection,
  VisionSection,
  FeaturesSection,
  LocationSection,
  PartnersSection,
  TracksSection,
  PricingSection,
  CTASection,
  QASection,
  HumanInfrastructureSection
} from "@/components/sections"
import { Community, AdvisorsAndCommunity } from "@/components/community"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activePage="home" />

      <main className="flex-1">
        {/*
          Section order per Avishag's June 12 brief (Task 3). Blocks are kept as
          self-contained components so they're easy to reshuffle — confirm visually.
        */}
        <HeroSection />
        {/* Core team first */}
        <Community />
        {/* "Why We're Building APEX" right after the core team */}
        <AboutSection />
        <VisionSection />
        {/* Task 2: human-infrastructure framing + "The Human AI Stack" model (per Mor's June 12 design) */}
        <HumanInfrastructureSection />
        <FeaturesSection />
        <TracksSection />
        <LocationSection />
        {/* <PricingSection /> */}
        <QASection />
        <CTASection />
        {/* At the very end: all the people (Advisory Board + Community) and partner logos */}
        <AdvisorsAndCommunity />
        <PartnersSection />
      </main>

      <Footer />
    </div>
  )
}

