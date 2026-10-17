import type { Metadata } from "next"
import Link from "next/link"
import { partnerPage as p } from "@/content/partner"
import { vision2030 } from "@/content/stats"
import { site } from "@/content/site"
import { isMissing } from "@/content/_lib"
import { PageIntro, Section } from "@/components/site/Section"
import { Gated } from "@/components/site/Gated"
import { Missing } from "@/components/site/Missing"
import { KeepHyphens } from "@/components/site/blocks"

export const metadata: Metadata = {
  title: "Partner with APEX",
  description: p.statement,
  alternates: { canonical: "/partner" },
}

/** The hairline that opens a section, for sections without a label. */
function SectionRule() {
  return <div aria-hidden="true" className="section-head mb-10 md:mb-14" />
}

/** One node splitting into the two tracks, or the two tracks joining into one node. */
function Branch({ join }: { join?: boolean }) {
  return (
    <div className="relative h-12 w-full md:h-14">
      {join ? (
        <>
          <span className="absolute inset-x-1/4 top-0 h-1/2 border-x border-b border-ink/30" />
          <span className="absolute bottom-0 left-1/2 h-1/2 w-px bg-ink/30" />
        </>
      ) : (
        <>
          <span className="absolute left-1/2 top-0 h-1/2 w-px bg-ink/30" />
          <span className="absolute inset-x-1/4 bottom-0 h-1/2 border-x border-t border-ink/30" />
        </>
      )}
    </div>
  )
}

/* The Commons as a quiet vertical figure. The drawing is decorative; the caption carries it for screen readers. */
function CommonsDiagram({ className }: { className?: string }) {
  const d = p.commons.diagram
  return (
    <figure aria-labelledby="commons-caption" className={className}>
      <div className="border-y border-rule/15 py-12 md:py-16">
        <div aria-hidden="true" className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center">
          <p className="label !text-ink">{d.top}</p>
          <span className="h-10 w-px bg-ink/30 md:h-12" />
          <p className="font-wordmark text-[clamp(2.25rem,1.9rem+1.4vw,3rem)] font-bold leading-none tracking-[0.04em] text-ink">{d.middle}</p>
          <p className="label mt-4">{d.resources.join(" · ")}</p>
          <Branch />
          <div className="grid w-full grid-cols-2">
            {d.tracks.map((t) => (
              <div key={t} className="flex justify-center">
                <span className="rounded-[2px] border border-ink/25 px-4 py-2.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-ink sm:text-[12px]">
                  {t}
                </span>
              </div>
            ))}
          </div>
          <Branch join />
          <p className="rounded-[2px] bg-ink px-5 py-3.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-[rgb(var(--on-ink))] sm:text-[12px]">
            {d.bottom}
          </p>
        </div>
      </div>
      <figcaption id="commons-caption" className="sr-only">
        {d.top} to {d.middle}. {d.middle} provides {d.resources.join(", ")} to {d.tracks.join(" and ")}, building {d.bottom}.
      </figcaption>
    </figure>
  )
}

export default function PartnerPage() {
  return (
    <>
      <PageIntro scene="aerial" label={p.eyebrow} titleId="partner-title" title={<KeepHyphens text={p.statement} />} />

      {/* The Commons */}
      <Section scene="beacon" labelledBy="commons-title">
        <SectionRule />
        <h2 id="commons-title" className="h-section reveal max-w-[14ch]">
          {p.commons.heading}
        </h2>
        <p className="lede reveal mt-6 max-w-[40ch]">{p.commons.body}</p>
        <CommonsDiagram className="reveal mt-14 md:mt-20" />
      </Section>

      {/* Why now, in one line (internal deck summary, in English). */}
      <Gated item={p.inOneLine.approval}>
        <Section scene="gap" labelledBy="one-line-title">
          <SectionRule />
          <h2 id="one-line-title" className="h-section reveal max-w-[14ch]">
            {p.inOneLine.heading}
          </h2>
          <ol className="hairlines reveal mt-12 border-y border-rule/15 md:mt-16">
            {p.inOneLine.links.map((l) => (
              <li key={l.label} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <p className="label pt-1.5">{l.label}</p>
                <p className="font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] font-medium leading-snug tracking-[-0.02em] text-ink">{l.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      </Gated>

      {/* Precedent */}
      <Section scene="route" labelledBy="precedent-title">
        <SectionRule />
        <h2 id="precedent-title" className="h-section reveal max-w-[14ch]">
          {p.precedent.heading}
        </h2>
        <p className="lede reveal mt-6 max-w-[40ch]">{p.precedent.lede}</p>
        <ol className="reveal mt-14 grid grid-cols-2 border-t border-rule/15 md:mt-20 md:grid-cols-5 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1">
          {p.precedent.timeline.map((t) => (
            <li key={t.label} className="min-w-0 border-b border-rule/15 py-6 pr-3 sm:py-8">
              <span className="num block text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)]">{t.year}</span>
              <span className="mt-3 block text-[15px] leading-snug text-body">{t.label}</span>
            </li>
          ))}
        </ol>
        <p className="h-card reveal mt-12 max-w-[34ch] md:mt-16">{p.precedent.closing}</p>
      </Section>

      {/* Method */}
      <Section scene="ridge" labelledBy="method-title">
        <SectionRule />
        <h2 id="method-title" className="h-section reveal max-w-[17ch]">
          {p.method.heading}
        </h2>
        <p className="lede reveal mt-6 max-w-[40ch]">{p.method.body}</p>
        <p className="t-statement reveal mt-14 max-w-[20ch] md:mt-20">
          <KeepHyphens text={p.method.closing} />
        </p>
      </Section>

      {/* Vision 2030. Left out entirely until the goals are approved. */}
      <Gated item={vision2030.approval}>
        <Section scene="summit" label={vision2030.eyebrow} labelledBy="vision-title">
          <h2 id="vision-title" className="h-section reveal max-w-[16ch]">
            {vision2030.heading}
          </h2>
          <dl className="reveal mt-14 grid border-t border-rule/15 sm:grid-cols-3 md:mt-20">
            {vision2030.goals.map((g) => (
              <div key={g.label} className="flex min-w-0 flex-col border-b border-rule/15 py-6 sm:py-8 sm:pr-6">
                <dt className="order-2 mt-3 max-w-[18ch] text-[15px] leading-snug text-body">{g.label}</dt>
                <dd className="order-1">
                  <span className="num block text-[clamp(2.25rem,1.4rem+2.4vw,3.75rem)]">{g.value}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="h-card reveal mt-12 md:mt-16">{vision2030.closing}</p>
        </Section>
      </Gated>

      {/* The ask */}
      <Section id="ask" scene="aerial" labelledBy="ask-title">
        <SectionRule />
        <h2 id="ask-title" className="h-section reveal max-w-[14ch]">
          {p.ask.heading}
        </h2>
        {isMissing(p.ask.body) ? <Missing item={p.ask.body} className="mt-6" /> : <p className="lede reveal mt-6 max-w-[40ch]">{p.ask.body}</p>}
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(p.ask.cta.subject)}`} className="btn btn-primary">
            {p.ask.cta.label}
          </a>
          <Link href={p.ask.leadership.href} className="btn btn-ghost">
            {p.ask.leadership.label}
          </Link>
        </div>
      </Section>
    </>
  )
}
