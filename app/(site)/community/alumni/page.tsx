import Image from "next/image"
import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { alumniMembers, type Alumni } from "@/data/members"
import { alumniPage } from "@/content/people"
import { PageIntro } from "@/components/site/Section"
import { linkedinHref } from "@/lib/links"

export const metadata: Metadata = {
  title: "Alumni",
  description: alumniPage.lede,
  alternates: { canonical: "/community/alumni" },
}

/* Tabs keep the shadcn component and are restyled here: a hairline with mono labels, the active one underlined in ink. */
const tabListClass = "flex h-auto w-full items-stretch justify-start gap-8 rounded-none border-b border-rule/15 bg-transparent p-0 text-slate"
const tabTriggerClass =
  "-mb-px min-h-[44px] rounded-none border-b-2 border-transparent px-0 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-slate transition-colors hover:text-ink focus-visible:outline focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-ink data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none"
const tabContentClass = "mt-10 focus-visible:outline focus-visible:ring-0 focus-visible:ring-offset-0 md:mt-14"

function AlumniCard({ alumni }: { alumni: Alumni }) {
  const href = linkedinHref(alumni.linkedinUrl)
  const name = alumni.name.trim()
  return (
    <li className="flex min-w-0 flex-col">
      <div className="relative aspect-square overflow-hidden rounded-[2px] bg-surface-2">
        <Image
          src={alumni.imageSrc}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <p className="mt-4 break-words font-display text-[17px] font-medium leading-snug tracking-[-0.015em] text-ink">{name}</p>
      {alumni.description ? <p className="mt-1 break-words text-[14px] leading-snug text-body">{alumni.description}</p> : null}
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="link mt-1 self-start py-3 text-[14px]">
          LinkedIn<span className="sr-only"> profile of {name} (opens in a new tab)</span>
        </a>
      ) : null}
    </li>
  )
}

function AlumniGrid({ members }: { members: Alumni[] }) {
  if (members.length === 0) return <p className="border-y border-rule/15 py-6 text-body">{alumniPage.emptyFounders}</p>
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-14 lg:grid-cols-4 lg:gap-x-8">
      {members.map((alumni) => (
        <AlumniCard key={alumni.id} alumni={alumni} />
      ))}
    </ul>
  )
}

function CohortFigure({ src, width, height, alt, caption }: { src: string; width: number; height: number; alt: string; caption: string }) {
  return (
    <figure className="mb-12 md:mb-16">
      <Image src={src} width={width} height={height} alt={alt} className="h-auto w-full rounded-[2px] object-cover" sizes="(min-width: 1360px) 1264px, 100vw" />
      <figcaption className="label mt-4">{caption}</figcaption>
    </figure>
  )
}

export default function AlumniPage() {
  // Every current alum is Architect-track unless explicitly tagged as a Founder.
  const architects = alumniMembers.filter((a) => a.track !== "founder")
  const founders = alumniMembers.filter((a) => a.track === "founder")

  return (
    <>
      <PageIntro scene="summit" label={alumniPage.eyebrow} titleId="alumni-title" title={alumniPage.heading}>
        <p className="lede mt-6 max-w-[38ch] md:mt-8">{alumniPage.lede}</p>
      </PageIntro>

      <section data-scene="summit" data-veil-full="" aria-labelledby="alumni-tracks-title" className="relative pb-28 pt-6 md:pb-40 md:pt-10">
        <div className="wrap">
          <h2 id="alumni-tracks-title" className="sr-only">
            Alumni by track
          </h2>
          <Tabs defaultValue="architects" className="w-full">
            <TabsList className={tabListClass}>
              <TabsTrigger value="architects" className={tabTriggerClass}>
                {alumniPage.tabs.architects}
              </TabsTrigger>
              <TabsTrigger value="founders" className={tabTriggerClass}>
                {alumniPage.tabs.founders}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="architects" className={tabContentClass}>
              <CohortFigure
                src="/architects-cohort.jpg"
                width={1800}
                height={893}
                alt="The APEX Architect Track cohort together"
                caption={alumniPage.captions.architects}
              />
              <AlumniGrid members={architects} />
            </TabsContent>
            <TabsContent value="founders" className={tabContentClass}>
              <CohortFigure
                src="/founders-cohort.jpg"
                width={1800}
                height={855}
                alt="The APEX Founders Track cohort together on a Tel Aviv rooftop"
                caption={alumniPage.captions.founders}
              />
              <AlumniGrid members={founders} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
