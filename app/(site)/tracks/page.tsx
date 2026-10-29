import type { Metadata } from "next"
import { tracksIntro } from "@/content/home"
import { founders, architects } from "@/content/tracks"
import { PageIntro, Section } from "@/components/site/Section"
import { QuoteBlock, TrackSummary } from "@/components/site/blocks"

export const metadata: Metadata = {
  title: "Tracks",
  description: "The APEX Architect Track and Founders Track.",
  alternates: { canonical: "/tracks" },
}

export default function TracksPage() {
  return (
    <>
      <PageIntro scene="route" label={tracksIntro.eyebrow} titleId="tracks-page-title" title={tracksIntro.heading} />

      {/* Anchors kept from the old /tracks page so existing links still land. */}
      <Section id="architect-track" scene="ridge" labelledBy="tracks-architects">
        <div className="reveal">
          <TrackSummary track={architects} headingId="tracks-architects" headingLevel="h2">
            <QuoteBlock quote={architects.quote} className="mt-10" />
          </TrackSummary>
        </div>
      </Section>

      <Section id="founder-track" scene="summit" labelledBy="tracks-founders">
        <div className="reveal">
          <TrackSummary track={founders} headingId="tracks-founders" headingLevel="h2">
            <QuoteBlock quote={founders.quote} className="mt-10" />
          </TrackSummary>
        </div>
      </Section>
    </>
  )
}
