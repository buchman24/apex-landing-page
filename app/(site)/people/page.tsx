import type { Metadata } from "next"
import Link from "next/link"
import { coreTeam, coreTeamOpenQuestion, advisoryBoard, faculty, communityCopy, alumniCopy } from "@/content/people"
import { peopleTeaser } from "@/content/home"
import { communityMembers } from "@/data/members"
import { PageIntro, Section } from "@/components/site/Section"
import { Missing } from "@/components/site/Missing"
import { PeopleList } from "@/components/site/blocks"
import { linkedinHref } from "@/lib/links"

export const metadata: Metadata = {
  title: "People",
  description: "The team, advisory board, faculty and community behind APEX.",
  alternates: { canonical: "/people" },
}

export default function PeoplePage() {
  const community = communityMembers.map((m) => ({ ...m, name: m.name.trim(), href: linkedinHref(m.linkedinUrl) }))
  return (
    <>
      <PageIntro scene="summit" label={peopleTeaser.eyebrow} titleId="people-page-title" title={peopleTeaser.heading} />

      {/* Leadership */}
      <Section scene="summit" labelledBy="lead-title" className="!pt-6 md:!pt-10">
        <h2 id="lead-title" className="sr-only">
          Leadership
        </h2>
        <div className="grid gap-14 md:gap-20">
          <div className="reveal">
            <h3 className="label">Core team</h3>
            <PeopleList people={coreTeam} className="mt-4" />
            <Missing item={coreTeamOpenQuestion} className="mt-5" />
          </div>
          <div className="reveal">
            <h3 className="label">Advisory board</h3>
            <PeopleList people={advisoryBoard} className="mt-4" />
          </div>
        </div>
      </Section>

      {/* Faculty */}
      <Section id="faculty" scene="beacon" label="Faculty" labelledBy="faculty-title">
        <h2 id="faculty-title" className="h-section reveal max-w-[16ch]">
          {faculty.heading}
        </h2>
        <PeopleList people={faculty.people} className="reveal mt-12 md:mt-16" />
        <Missing item={faculty.more} className="mt-5" />
      </Section>

      {/* Community: read straight from data/members.ts, so members added through /add-member appear here. */}
      <Section id="community" scene="aerial" label={communityCopy.heading} labelAsHeading labelledBy="community-title">
        <p className="lede reveal max-w-[38ch]">{communityCopy.body}</p>
        <ul className="mt-12 grid border-t border-rule/15 sm:grid-cols-2 md:mt-16">
          {community.map((m) => (
            <li key={m.id} className="relative min-w-0 border-b border-rule/15 py-4 sm:pr-8 sm:even:pl-8 sm:even:pr-0">
              {m.href ? (
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words font-display text-[17px] font-medium leading-snug tracking-[-0.015em] text-ink underline decoration-ink/20 decoration-1 underline-offset-[5px] transition-[text-decoration-color] after:absolute after:inset-0 after:content-[''] hover:decoration-ink"
                >
                  {m.name}
                  <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
                </a>
              ) : (
                <p className="break-words font-display text-[17px] font-medium leading-snug tracking-[-0.015em] text-ink">{m.name}</p>
              )}
              {m.description ? <p className="mt-1 break-words text-[14px] leading-snug text-body">{m.description}</p> : null}
            </li>
          ))}
        </ul>
      </Section>

      {/* Alumni */}
      <Section scene="aerial" labelledBy="alumni-title" className="!pt-0">
        <div className="flex flex-col gap-6 border-t border-rule/15 pt-8 md:flex-row md:items-end md:justify-between md:gap-10 md:pt-10">
          <div>
            <h2 id="alumni-title" className="h-card">
              {alumniCopy.heading}
            </h2>
            <p className="mt-3 max-w-[36ch] text-body">{alumniCopy.body}</p>
          </div>
          <Link href={alumniCopy.href} className="btn btn-primary self-start md:self-auto">
            {alumniCopy.cta}
          </Link>
        </div>
      </Section>
    </>
  )
}
