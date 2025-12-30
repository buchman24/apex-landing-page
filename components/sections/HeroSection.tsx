import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-32 xl:py-40 flex items-center min-h-[80vh]">
      <div className="container px-8 md:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex mb-2">Elite Tech Units to AI Frontiers</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Building Israel&apos;s AI Fortress
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
              APEX is a national launchpad, founded by elite tech units alumni to secure Israel's future in AI.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/Tel-Aviv2.jpg"
              width={650}
              height={650}
              alt="APEX: Future of AI meets Israeli Edge"
              className="rounded-xl object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 
