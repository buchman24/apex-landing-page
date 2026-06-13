import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, BookOpen, Users, Code, Lightbulb, Rocket, Mountain } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { TechnicalCurriculum } from "@/components/technical-curriculum"
import { FounderCurriculum } from "@/components/founder-curriculum"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { CTASection } from "@/components/sections/CTASection"
import { FounderQASection } from "@/components/sections/FounderQASection"
import { ArchitectQASection } from "@/components/sections/ArchitectQASection"

export default function TracksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activePage="tracks" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="inline-flex mb-2">Elite Training Programs</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  APEX Specialized Tracks
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  We bridge technical excellence with business leadership, fueling Israel&apos;s next wave of AI
                  breakthroughs through two specialized tracks.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild  size="lg" className="gap-2">
                  <a href="#architect-track">
                    Architect Track <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="#founder-track">
                    Founder Track <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <Code className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Architect Track</h2>
                </div>
                <p className="text-muted-foreground">
                  For deep-tech leaders shaping AI&apos;s future. The Architect Track provides hands-on technical
                  training covering AI foundations and emerging trends, taught by industry experts and leading
                  practitioners.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Comprehensive technical curriculum with 14 specialized lectures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Taught by industry experts and leading practitioners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Practical, hands-on learning with real-world applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Direct pathway to AI-native roles in top companies</span>
                  </li>
                </ul>
                <div>
                  <Button asChild variant="outline" className="mt-4">
                    <a href="#architect-track">Learn More</a>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Founder Track</h2>
                </div>
                <p className="text-muted-foreground">
                  Designed for visionary entrepreneurs building the next AI-driven companies. The Founder Track equips
                  you with the essential tools, knowledge, and network to navigate the challenges of building a
                  high-impact startup.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Twice weekly sessions for 3 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Mix of lectures, case studies, and founder stories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Office hours with top industry leaders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Ideal for those in inception, validation, or ideation mode</span>
                  </li>
                </ul>
                <div>
                  <Button asChild className="mt-4">
                    <a href="#founder-track">Learn More</a>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

                {/* Architect Track Section */}
                <section id="architect-track" className="w-full py-12 md:py-24 lg:py-32 bg-background scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center space-x-2">
                <Code className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Architect Track</h2>
              </div>
              <p className="max-w-[800px] text-muted-foreground md:text-xl">
                A technical flash-course on AI covering the foundations and emerging trends
              </p>
            </div>

            <div className="grid gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Curriculum</CardTitle>
                  <CardDescription>
                    Comprehensive training covering AI foundations, architectures, and practical applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TechnicalCurriculum />
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/apply">Apply to Architect Track</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Architect Q&A Section */}
        <ArchitectQASection />

        {/* Founder Track Section */}
        <section id="founder-track" className="w-full py-12 md:py-24 lg:py-32 bg-muted scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center space-x-2">
                <Rocket className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Founder Track</h2>
              </div>
              <p className="max-w-[800px] text-muted-foreground md:text-xl">
                Building a Startup in a Fast-Changing World
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Program Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Foundations</h3>
                      <p className="text-sm text-muted-foreground">
                        A mix of lectures, real-world case studies, and inspiring founder stories
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Resources</h3>
                      <p className="text-sm text-muted-foreground">
                        Office hours with top industry leaders offering hands-on guidance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Expert-Led</h3>
                      <p className="text-sm text-muted-foreground">
                        Each module is led by experienced entrepreneurs and experts
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Program Details</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Twice weekly sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>3-month program duration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Solo founders welcome</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Ideal for inception, validation, ideation mode</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="https://forms.gle/5Zi6HRqKRoNuzTEH7" target="_blank" rel="noopener noreferrer">Apply to Founder Track</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>APEX Founders Sprint — 8-Week Curriculum</CardTitle>
                  <CardDescription>
                    Designed to take Israel&apos;s most elite technical talent from idea to AI-first founder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FounderCurriculum />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="w-full p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-medium mb-2">Exclusive Israeli Ecosystem Access</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Direct connections to elite alumni networks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Israeli-American VC office hours and pitch practice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Hands-on workshops with successful Israeli founders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Access to Israel's AI/ML research labs and talent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>Curated introductions to multinational corporate partners</span>
                      </li>
                    </ul>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Founder Q&A Section */}
        <FounderQASection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

