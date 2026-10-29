import type { Metadata } from "next"
import { founders } from "@/content/tracks"
import { site } from "@/content/site"
import { isMissing } from "@/content/_lib"
import { PageIntro, Section } from "@/components/site/Section"
import { Gated } from "@/components/site/Gated"
import { Missing } from "@/components/site/Missing"
import { ItemList, KeepHyphens, QuoteBlock } from "@/components/site/blocks"
import { LogoRow } from "@/components/site/LogoRow"
import { TrackForm } from "@/components/site/forms/TrackForm"
import { showPlaceholders } from "@/lib/placeholders"

export const metadata: Metadata = {
  title: "Founders Track",
  description: `${founders.promise} ${founders.promiseBody}`,
  alternates: { canonical: "/tracks/founders" },
  openGraph: { title: "APEX Founders Track", description: founders.tagline, url: "/tracks/founders" },
}

export default function FoundersPage() {
  const showNextCohort = founders.nextCohort.approved || showPlaceholders

  return (
    <>
      <PageIntro scene="approach" label={founders.name} titleId="f-title" title={founders.tagline}>
        <p className="t-statement mt-10 max-w-[18ch] md:mt-14">{founders.promise}</p>
        <p className="lede mt-5 max-w-[40ch] md:mt-6">{founders.promiseBody}</p>
      </PageIntro>

      {/* Who it is for, what you get */}
      <Section scene="route" label="Who it is for" labelAsHeading labelledBy="f-who">
        <div className="space-y-5">
          {founders.whoFor.map((w) => (
            <p key={w} className="h-card reveal max-w-[30ch]">
              <KeepHyphens text={w} />
            </p>
          ))}
        </div>
        <div className="reveal mt-16 md:mt-24">
          <h3 className="label">What you get</h3>
          <ItemList items={founders.whatYouGet} className="mt-4" />
        </div>
        <LogoRow className="reveal mt-14 md:mt-20" companies={founders.lecturerCompanies} label="Sessions with leaders from" />
        <QuoteBlock quote={founders.quote} className="reveal mt-14 md:mt-20" />
      </Section>

      {/* Waiting list */}
      <Section id="apply" scene="summit" label={founders.name} labelledBy="f-apply">
        <h2 id="f-apply" className="h-section reveal max-w-[16ch]">
          {founders.formTitle}
        </h2>
        {showNextCohort ? (
          <p className="lede mt-5 max-w-[40ch] md:mt-6">
            <Gated item={founders.nextCohort} inline>
              {founders.nextCohort.value}
            </Gated>
          </p>
        ) : null}
        <p className="mt-6 text-body">
          Questions:{" "}
          <a className="link" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Founders Track")}`}>
            {site.contactEmail}
          </a>
        </p>
        <div className="mt-12 md:mt-16">
          <TrackForm
            track="Founders"
            submitLabel={founders.cta.label}
            notice={isMissing(site.footer.privacyNotice) ? <Missing item={site.footer.privacyNotice} /> : null}
          />
        </div>
      </Section>
    </>
  )
}
