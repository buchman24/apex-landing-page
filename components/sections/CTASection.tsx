import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="apply" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:gap-12 text-center">
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Build Israel&apos;s AI Future?
              </h2>
              <p className="max-w-[700px] mx-auto md:text-xl">
                Join APEX and be part of a movement that&apos;s securing Israel&apos;s leadership in AI. Whether
                you&apos;re a technical builder or a visionary founder, we have a place for you.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row justify-center flex-wrap">
              <Button asChild size="lg" variant="secondary">
                <Link href="mailto:team@apex.org.il?subject=APEX%20Architect%20Track%20Application">Apply to Architect Track</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="mailto:team@apex.org.il?subject=APEX%20Founder%20Track%20Application">Apply to Founder Track</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 