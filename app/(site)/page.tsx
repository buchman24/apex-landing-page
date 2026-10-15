import Link from "next/link"
import { hero, moment, missingPiece, how, tracksIntro, proof, peopleTeaser, events, community, partners } from "@/content/home"
import { founders, architects } from "@/content/tracks"
import { coreTeam, coreTeamOpenQuestion, advisoryBoard } from "@/content/people"
import { upcomingEvents, eventsMissing } from "@/content/events"
import { formEndpoints, MARKETING_CONSENT } from "@/content/forms"
import { site } from "@/content/site"
import { isMissing } from "@/content/_lib"
import { Section, SceneBreak } from "@/components/site/Section"
import { Missing } from "@/components/site/Missing"
import { IsraelFacts, KeepHyphens, LinkRows, PeopleGrid, QuoteBlock, StatGrid, TrackSummary } from "@/components/site/blocks"
import { renders, showPlaceholders } from "@/lib/placeholders"
import { LogoRow } from "@/components/site/LogoRow"
import { RsvpForm } from "@/components/site/forms/RsvpForm"
import { NewsletterForm } from "@/components/site/forms/NewsletterForm"
import { ConsentCheckbox } from "@/components/site/forms/ConsentCheckbox"

const allLecturerCompanies = Array.from(new Set([...founders.lecturerCompanies, ...architects.lecturerCompanies]))

/*
  The home page is one continuous ascent. Each section gives the 3D background a camera key
  (data-scene). The hero is pinned: its first scroll drives talent in and technology out.
  Scene breaks are pauses where the mountain holds the screen; the last one closes the page.
*/
export default function HomePage() {
  const statementLines = moment.lines.slice(0, -1)
  const hasEventList = upcomingEvents.length > 0 || renders(eventsMissing)
  const showRsvp = showPlaceholders || !isMissing(formEndpoints.rsvp)
  const edgeLine = moment.lines[moment.lines.length - 1]
  return (
    <>
      {/* Hero */}
      <section id="top" data-scene-hero="" aria-labelledby="hero-title" className="hero-pin relative">
        {/* The hero's camera key sits at the end of the pin, so the camera holds while the first scroll drives the scene. */}
        <div data-scene="base" aria-hidden="true" className="absolute inset-x-0 bottom-[50svh] h-px" />
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="wrap flex h-full flex-col pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)] lg:pt-[calc(var(--header-h)+5.5rem)] short:min-h-[100svh] short:pt-[calc(var(--header-h)+1.25rem)]">
            <div data-hero-copy="" className="w-fit max-w-full">
              <p className="label">{hero.eyebrow}</p>
              <h1 id="hero-title" className="h-display mt-5 max-w-[13ch] md:mt-7 short:mt-3 short:max-w-[22ch]">
                {hero.headline}
              </h1>
              <div className="mt-7 flex flex-wrap gap-3 md:mt-10 short:mt-5">
                <Link href={hero.ctas[0].href} className="btn btn-primary">
                  {hero.ctas[0].label}
                </Link>
                <Link href={hero.ctas[1].href} className="btn btn-ghost">
                  {hero.ctas[1].label}
                </Link>
              </div>
            </div>
            {/* The sentence also lives in the scene, pinned to where talent enters and where technology leaves. */}
            <p data-hero-sub="" className="mt-auto max-w-[22ch] pb-8 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium leading-tight tracking-[-0.02em] text-ink md:pb-12 short:pb-6 short:pt-8">
              {hero.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* The moment */}
      <Section id="moment" scene="approach" label={moment.eyebrow} labelAsHeading labelledBy="moment-title">
        <div className="space-y-5 md:space-y-7">
          {statementLines.map((line) => (
            <p key={line} className="t-statement reveal">
              {line}
            </p>
          ))}
        </div>
        <p className="h-card reveal mt-12 max-w-[30ch] !text-body md:mt-16">{edgeLine}</p>
        <IsraelFacts heading={moment.factsHeading} className="reveal mt-20 md:mt-28" />
      </Section>

      {/* The missing piece */}
      <Section id="problem" scene="gap" label={missingPiece.eyebrow} labelAsHeading labelledBy="problem-title">
        <div className="space-y-5">
          {missingPiece.lines.map((line) => (
            <p key={line} className="h-card reveal max-w-[34ch] !text-body">
              {line}
            </p>
          ))}
        </div>
        <p className="h-section reveal mt-14 max-w-[16ch] md:mt-20">
          <strong className="font-medium">{missingPiece.emphasis}</strong>
        </p>
      </Section>

      {/* The rails close as the page steps aside. */}
      <SceneBreak scene="route" labels="rails" />

      {/* How we do it */}
      <Section id="how" scene="route" label={how.eyebrow} labelledBy="how-title">
        <h2 id="how-title" className="h-section reveal max-w-[15ch]">
          {how.heading}
        </h2>
        <p className="lede reveal mt-6 max-w-[38ch]">{how.lede}</p>
        <ul className="hairlines mt-14 border-y border-rule/15 md:mt-20">
          {how.pillars.map((p) => (
            <li key={p.title} className="reveal grid gap-3 py-8 md:grid-cols-[10rem_1fr] md:gap-8 md:py-10">
              <h3 className="h-card">{p.title}</h3>
              <p className="text-body">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Two tracks */}
      <section id="tracks" aria-labelledby="tracks-title" className="section">
        <div className="wrap">
          <div className="col">
            <div className="section-head mb-10 md:mb-14">
              <p className="label">{tracksIntro.eyebrow}</p>
            </div>
            <h2 id="tracks-title" className="h-section reveal max-w-[16ch]">
              {tracksIntro.heading}
            </h2>
          </div>
        </div>
        <div data-scene="ridge" className="pt-20 md:pt-28">
          <div className="wrap">
            <div id="founders" className="col reveal">
              <TrackSummary track={founders} headingId="founders-title">
                <QuoteBlock quote={founders.quote} className="mt-10" />
              </TrackSummary>
            </div>
          </div>
        </div>
        <div data-scene="ridge" className="pt-24 md:pt-36">
          <div className="wrap">
            <div id="architects" className="col reveal">
              <TrackSummary track={architects} headingId="architects-title">
                <QuoteBlock quote={architects.quote} className="mt-10" />
              </TrackSummary>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <Section id="proof" scene="summit" label={proof.eyebrow} labelledBy="proof-title">
        <h2 id="proof-title" className="h-section reveal max-w-[16ch]">
          {proof.heading}
        </h2>
        <StatGrid className="reveal mt-14 md:mt-20" />
        <LogoRow className="reveal mt-14 md:mt-20" companies={allLecturerCompanies} label={proof.lecturersLabel} />
        {proof.quotes.some(renders) ? (
          <div className="mt-14 md:mt-20">
            <p className="label">{proof.quotesHeading}</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {proof.quotes.map((q, i) => (
                <QuoteBlock key={i} quote={q} />
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      {/* The people */}
      <Section id="people" scene="summit" label={peopleTeaser.eyebrow} labelledBy="people-title">
        <h2 id="people-title" className="h-section reveal">
          {peopleTeaser.heading}
        </h2>
        <div className="mt-14 grid gap-14 md:mt-20">
          <div className="reveal">
            <h3 className="label">Core team</h3>
            <PeopleGrid people={coreTeam} className="mt-6" />
            <Missing item={coreTeamOpenQuestion} className="mt-5" />
          </div>
          <div className="reveal">
            <h3 className="label">Advisory board</h3>
            <PeopleGrid people={advisoryBoard} className="mt-6" />
          </div>
        </div>
        <p className="mt-10">
          <Link href={peopleTeaser.link.href} className="link">
            {peopleTeaser.link.label}
          </Link>
        </p>
      </Section>

      {/* Events */}
      <Section id="events" scene="beacon" label={events.eyebrow} labelledBy="events-title">
        <h2 id="events-title" className="h-section reveal">
          {!hasEventList && showRsvp ? events.formHeading : events.heading}
        </h2>
        <p className="lede reveal mt-5">{events.note}</p>
        {upcomingEvents.length > 0 ? (
          <ul className="hairlines mt-12 border-y border-rule/15">
            {upcomingEvents.slice(0, 3).map((e) => (
              <li key={e.title + e.date} className="py-6">
                <p className="label">
                  <time dateTime={e.date}>{e.date}</time> · {e.time}
                </p>
                <p className="h-card mt-2">{e.title}</p>
                <p className="mt-1 text-[15px] text-body">{e.venue}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Missing item={eventsMissing} className="mt-10" />
        )}
        {showRsvp ? (
          <div className="mt-12 md:mt-16">
            {hasEventList ? <h3 className="h-card mb-6">{events.formHeading}</h3> : null}
            <div>
              <RsvpForm
                bare
                events={upcomingEvents.slice(0, 3).map((e) => e.title)}
                connected={!isMissing(formEndpoints.rsvp)}
                consent={<ConsentCheckbox id="rsvp-consent" />}
                notice={isMissing(formEndpoints.rsvp) ? <Missing item={formEndpoints.rsvp} /> : null}
              />
            </div>
          </div>
        ) : null}
      </Section>

      {/* Come join */}
      <Section id="community" scene="beacon" label={community.eyebrow} labelledBy="community-title">
        <h2 id="community-title" className="h-section reveal">
          {community.heading}
        </h2>
        <LinkRows links={community.doors} className="reveal mt-12 md:mt-16" />
        {isMissing(community.communityLink) ? <Missing item={community.communityLink} className="mt-6" /> : null}
        {showPlaceholders || (!isMissing(formEndpoints.newsletter) && MARKETING_CONSENT.approved) ? (
          <div className="mt-16 md:mt-20">
            <h3 className="h-card">{community.newsletterHeading}</h3>
            <p className="mt-3 text-body">{community.newsletterBody}</p>
            <div className="mt-6">
              <NewsletterForm
                bare
                connected={!isMissing(formEndpoints.newsletter) && MARKETING_CONSENT.approved}
                consent={<ConsentCheckbox id="newsletter-consent" required />}
                notice={isMissing(formEndpoints.newsletter) ? <Missing item={formEndpoints.newsletter} /> : null}
              />
            </div>
          </div>
        ) : null}
      </Section>

      {/* Partners */}
      <Section id="partners" scene="beacon" label={partners.eyebrow} labelledBy="partners-title">
        <h2 id="partners-title" className="h-section reveal max-w-[17ch]">
          <KeepHyphens text={partners.statement} />
        </h2>
        <h3 className="h-card reveal mt-14 md:mt-20">{partners.commonsHeading}</h3>
        <p className="lede reveal mt-4 max-w-[44ch]">{partners.commonsBody}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={partners.primary.href} className="btn btn-primary">
            {partners.primary.label}
          </Link>
          <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(partners.contact.subject)}`} className="btn btn-ghost">
            {partners.contact.label}
          </a>
        </div>
      </Section>

      {/* Closing: the picture returns. Lines leave the summit and the Commons network spans the range. */}
      <SceneBreak scene="aerial" labels="talent frontier" />
    </>
  )
}
