import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { architects } from "@/content/tracks"
import { site } from "@/content/site"
import { isMissing } from "@/content/_lib"
import { PageIntro, Section } from "@/components/site/Section"
import { Gated } from "@/components/site/Gated"
import { Missing } from "@/components/site/Missing"
import { ItemList, KeepHyphens, QuoteBlock } from "@/components/site/blocks"
import { LogoRow } from "@/components/site/LogoRow"
import { TrackForm } from "@/components/site/forms/TrackForm"
import { showPlaceholders } from "@/lib/placeholders"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Architect Track",
  description: architects.promise,
  alternates: { canonical: "/tracks/architects" },
  openGraph: { title: "APEX Architect Track", description: architects.promise, url: "/tracks/architects" },
}

export default function ArchitectsPage() {
  const weeks = architects.curriculum
  // On md+ the weeks read down two columns: 1 to 4 on the left, 5 to 8 on the right.
  const rows = Math.ceil(weeks.length / 2)
  const showNextCohort = architects.nextCohort.approved || showPlaceholders

  return (
    <>
      <PageIntro scene="approach" label={architects.name} titleId="arch-title" title={<KeepHyphens text={architects.promise} />}>
        <div className="mt-8 max-w-[40ch] space-y-3 md:mt-10">
          {architects.whoFor.map((w) => (
            <p key={w} className="lede">
              {w}
            </p>
          ))}
        </div>
      </PageIntro>

      {/* What you get */}
      <Section scene="route" label={architects.whatYouGetLabel} labelledBy="arch-get">
        <h2 id="arch-get" className="h-section reveal max-w-[16ch]">
          What you get
        </h2>
        <ItemList items={architects.whatYouGet} className="reveal mt-10 md:mt-14" />
        <LogoRow className="reveal mt-14 md:mt-20" companies={architects.lecturerCompanies} label="Lecturers from" />
        <QuoteBlock quote={architects.quote} className="reveal mt-14 md:mt-20" />
      </Section>

      {/* Curriculum */}
      <Section scene="ridge" label="Curriculum" labelledBy="arch-curriculum">
        <h2 id="arch-curriculum" className="h-section reveal max-w-[16ch]">
          {architects.curriculumHeading}
        </h2>
        <p className="lede reveal mt-5 max-w-[40ch] md:mt-6">{architects.curriculumNote}</p>
        <ol
          style={{ "--rows": rows } as CSSProperties}
          className="reveal mt-12 grid md:mt-16 md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(var(--rows),auto)] md:gap-x-10"
        >
          {weeks.map((week, i) => (
            <li
              key={week}
              className={cn("border-t border-rule/15 py-5 md:py-6", i === weeks.length - 1 && "border-b", i === rows - 1 && "md:border-b")}
            >
              <span className="label block">Week {i + 1}</span>
              <span className="mt-2 block font-display text-[clamp(1.2rem,1.05rem+0.6vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
                <KeepHyphens text={week} />
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Apply */}
      <Section id="apply" scene="summit" label={architects.name} labelledBy="arch-apply">
        <h2 id="arch-apply" className="h-section reveal max-w-[16ch]">
          {architects.formTitle}
        </h2>
        {showNextCohort ? (
          <p className="lede mt-5 max-w-[40ch] md:mt-6">
            <Gated item={architects.nextCohort} inline>
              {architects.nextCohort.value}
            </Gated>
          </p>
        ) : null}
        <p className="mt-6 text-body">
          Questions:{" "}
          <a className="link" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Architect Track")}`}>
            {site.contactEmail}
          </a>
        </p>
        <div className="mt-12 md:mt-16">
          <TrackForm
            track="Architects"
            submitLabel="Submit"
            notice={isMissing(site.footer.privacyNotice) ? <Missing item={site.footer.privacyNotice} /> : null}
          />
        </div>
      </Section>
    </>
  )
}
