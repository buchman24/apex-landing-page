import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { alumniMembers } from "@/data/members"
import { Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AlumniPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activePage="team" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                {/* <Badge className="inline-flex mb-2">First Cohort</Badge> */}
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  APEX Architect Beta Cohort - Alumni
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  Meet the talented graduates from our APEX Cohorts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alumni Grid */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {alumniMembers.map((alumni) => (
                <Card key={alumni.id} className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-square relative">
                    <Image
                      src={alumni.imageSrc}
                      alt={alumni.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{alumni.name}</CardTitle>
                    {alumni.description && (
                      <CardDescription>{alumni.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardFooter className="p-4 flex justify-start gap-3 pt-0 mt-auto">
                    <Link href={alumni.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
