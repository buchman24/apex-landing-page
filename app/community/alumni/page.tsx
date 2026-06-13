import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { alumniMembers, Alumni } from "@/data/members"
import { Linkedin } from "lucide-react"

function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-square relative">
        <Image src={alumni.imageSrc} alt={alumni.name} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{alumni.name}</CardTitle>
        {alumni.description && <CardDescription>{alumni.description}</CardDescription>}
      </CardHeader>
      <CardFooter className="p-4 flex justify-start gap-3 pt-0 mt-auto">
        <Link href={alumni.linkedinUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function AlumniGrid({ members }: { members: Alumni[] }) {
  if (members.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        Founder Track alumni coming soon.
      </p>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {members.map((alumni) => (
        <AlumniCard key={alumni.id} alumni={alumni} />
      ))}
    </div>
  )
}

export default function AlumniPage() {
  // Every current alum is Architect-track unless explicitly tagged as a Founder.
  const architects = alumniMembers.filter((a) => a.track !== "founder")
  const founders = alumniMembers.filter((a) => a.track === "founder")

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activePage="team" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  APEX Alumni
                </h1>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  Meet the talented graduates from our APEX cohorts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alumni — split by track */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="architects" className="w-full">
              <TabsList className="mx-auto mb-10 grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="architects">Architects</TabsTrigger>
                <TabsTrigger value="founders">Founders</TabsTrigger>
              </TabsList>
              <TabsContent value="architects">
                <AlumniGrid members={architects} />
              </TabsContent>
              <TabsContent value="founders">
                <AlumniGrid members={founders} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
