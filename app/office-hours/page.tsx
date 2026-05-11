import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mentors } from "@/data/mentors"
import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"

export default function OfficeHoursPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activePage="office-hours" />
      <main className="flex-1">

        {/* Hero */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 text-center">
            <Badge className="inline-flex mb-4">Office Hours</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
              Learn From APEX Mentors
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              Request a session with one of our mentors. All requests are reviewed by the APEX team before confirmation.
            </p>
          </div>
        </section>

        {/* Mentor Grid */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="flex flex-col">
                  <CardContent className="flex flex-col items-center text-center p-6 gap-4 flex-1">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={mentor.imageSrc}
                        alt={mentor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      <p className="text-muted-foreground text-sm">{mentor.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {mentor.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto pt-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={mentor.linkedinUrl} target="_blank">
                          <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`mailto:team@apex.org.il?subject=Office Hours Request - ${mentor.name}`}>
                          Request Session
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
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
