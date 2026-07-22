import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mountain, Linkedin, Twitter, Github, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { Community } from "@/components/community"
import { ApplyDialog } from "@/components/apply-dialog"

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activePage="team" />

      <main className="flex-1">
        {/* Hero Section */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="inline-flex mb-2">World-Class Expertise</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Meet Our Community</h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  Our team brings together leading experts from Israel's defense, tech, and academic sectors to build
                  the next generation of AI talent and innovation.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Team Section */}
        <Community />

        {/* Join Our Team Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center text-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
                  <p className="text-muted-foreground md:text-xl max-w-xl mx-auto">
                    We're always looking for talented individuals who are passionate about AI and Israel's future. Join
                    us in building the next generation of AI leaders.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button asChild variant="outline" size="lg">
                    <Link href="mailto:team@apex.org.il">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learn From the Best in the Field
                </h2>
                <p className="max-w-[800px] md:text-xl">
                  Our team of experts brings decades of experience from Israel's top defense units, leading tech
                  companies, and prestigious academic institutions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <ApplyDialog defaultTrack="Architects">
                  <Button size="lg" variant="secondary">Apply to APEX</Button>
                </ApplyDialog>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/tracks">Explore Our Tracks</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

