import Link from "next/link"
import type { ReactNode } from "react"
import { isMissing, type Approval, type Missing as MissingValue } from "@/content/_lib"
import { siteStats, israelFacts } from "@/content/stats"
import { Gated, PendingMark } from "./Gated"
import { Missing } from "./Missing"
import { LogoRow } from "./LogoRow"
import { renders, showPlaceholders, unmarked } from "@/lib/placeholders"
import { personMedia } from "@/lib/people-media"
import { cn } from "@/lib/utils"
import type { founders as FoundersT, architects as ArchitectsT } from "@/content/tracks"

type Person = { name: string; role: string; hideWhenPending?: boolean } & Partial<Approval<string>>

/** People as portraits that link to their LinkedIn (photos and links come from data/members.ts). */
export function PeopleGrid({ people, className }: { people: Person[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 md:gap-y-12", className)}>
      {people.map((p) => {
        const pending = p.approved === false
        // In production an unapproved role is left out, and some people are left out entirely.
        if (pending && !showPlaceholders && p.hideWhenPending) return null
        const { photo, href } = personMedia(p.name)
        const body = (
          <>
            <Portrait photo={photo} name={p.name} />
            <p className="mt-3 font-display text-[17px] font-medium leading-tight tracking-[-0.015em] text-ink md:text-[19px]">{p.name}</p>
            {!pending || showPlaceholders ? (
              <p className="mt-1 text-[14px] leading-snug text-body">
                {p.role}
                {pending ? (
                  <>
                    {" "}
                    <PendingMark item={{ approver: p.approver ?? "unassigned", note: p.note }} />
                  </>
                ) : null}
              </p>
            ) : null}
          </>
        )
        return (
          <li key={p.name}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="group block rounded-[2px]">
                {body}
                <span aria-hidden="true" className="label mt-2 inline-flex items-center gap-1.5 transition-colors group-hover:text-ink [&_svg]:h-3.5 [&_svg]:w-3.5">
                  LinkedIn
                  <Arrow />
                </span>
                <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
              </a>
            ) : (
              body
            )}
          </li>
        )
      })}
    </ul>
  )
}

/** A square portrait, or the person's initials when there is no photo. */
export function Portrait({ photo, name, className }: { photo: string | null; name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
  return (
    <div className={cn("aspect-square overflow-hidden rounded-[2px] bg-ink/[0.06]", className)}>
      {photo ? (
        <img
          src={photo}
          alt=""
          width={480}
          height={480}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <span aria-hidden="true" className="flex h-full w-full items-center justify-center font-display text-[clamp(1.25rem,4vw,2rem)] font-medium text-slate">
          {initials}
        </span>
      )}
    </div>
  )
}

/** Keeps hyphenated words such as "long-term" on one line without changing the characters. */
export function KeepHyphens({ text }: { text: string }) {
  const parts = text.split(/(\S+-\S+)/)
  return (
    <>
      {parts.map((p, i) =>
        /\S+-\S+/.test(p) ? (
          <span key={i} className="nowrap">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

export function StatGrid({ className }: { className?: string }) {
  const visible = siteStats.filter((s) => s.approved || showPlaceholders)
  if (!visible.length) return null
  return (
    <dl className={cn("grid grid-cols-2 border-t border-rule/15 sm:grid-cols-3", className)}>
      {visible.map((s) => (
        <div key={s.label} className="flex flex-col border-b border-rule/15 py-6 pr-4 sm:py-8">
          {/* Label first for screen readers, number first on screen. */}
          <dt className="order-2 mt-3 max-w-[18ch] text-[15px] leading-snug text-body">{s.label}</dt>
          <dd className="num order-1 text-[clamp(2.5rem,1.6rem+3vw,4.25rem)]">{s.value}</dd>
          {!s.approved && showPlaceholders && !unmarked(s.approver) ? (
            <dd className="order-3">
              <PendingMark item={s} className="mt-2" />
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  )
}

export function IsraelFacts({ heading, className }: { heading: string; className?: string }) {
  const visible = israelFacts.filter((f) => f.approved || showPlaceholders)
  if (!visible.length) return null
  return (
    <div className={className}>
      <h3 className="h-card max-w-[24ch]">{heading}</h3>
      <dl className="mt-8 grid border-t border-rule/15 sm:grid-cols-2">
        {visible.map((f) => (
          <div key={f.label} className="flex flex-col border-b border-rule/15 py-6 sm:pr-6">
            <dt className="order-2 mt-3 text-[16px] text-ink">{f.label}</dt>
            <dd className="num order-1 text-[clamp(2.75rem,1.8rem+3.4vw,4.5rem)]">{f.value}</dd>
            <dd className="order-3 mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-slate">
              Source: {f.source}
              {!f.approved ? <PendingMark item={f} className="ml-2" /> : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function QuoteSlot({ quote }: { quote: string | MissingValue }) {
  if (isMissing(quote)) return <Missing item={quote} />
  return <blockquote className="border-l border-ink pl-5 font-display text-[22px] font-medium leading-snug tracking-[-0.02em] text-ink">{quote}</blockquote>
}

/** A plain hairline list. */
export function ItemList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("hairlines border-y border-rule/15", className)}>
      {items.map((item) => (
        <li key={item} className="py-3 text-[16px] leading-snug text-ink">
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Hairline rows of links with an arrow. */
export function LinkRows({ links, className }: { links: { label: string; href: string }[]; className?: string }) {
  return (
    <ul className={cn("hairlines border-y border-rule/15", className)}>
      {links.map((d) => (
        <li key={d.href}>
          <Link href={d.href} className="row-link font-display text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] font-medium tracking-[-0.02em]">
            {d.label}
            <Arrow />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

type TrackContent = typeof FoundersT | typeof ArchitectsT

/** Track summary used on the home page and /tracks. */
export function TrackSummary({
  track,
  headingId,
  headingLevel = "h3",
  children,
}: {
  track: TrackContent
  headingId: string
  headingLevel?: "h2" | "h3"
  children?: ReactNode
}) {
  const isFounders = track.id === "founders"
  const H = headingLevel
  return (
    <article className="border-t border-ink pt-6">
      <p className="label !text-ink">{track.name}</p>
      <H id={headingId} className="h-section mt-6 max-w-[18ch]">
        {track.promise}
      </H>
      {"promiseBody" in track ? <p className="lede mt-5 max-w-[44ch]">{track.promiseBody}</p> : null}
      {"tagline" in track ? <p className="mt-5 font-display text-[clamp(1.2rem,1rem+0.7vw,1.5rem)] font-medium tracking-[-0.02em] text-ink">{track.tagline}</p> : null}
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
        <div>
          <p className="label">Who it is for</p>
          <div className="mt-4 space-y-3 text-[16px] leading-snug text-ink">
            {track.whoFor.map((w) => (
              <p key={w}>{w}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="label">{"whatYouGetLabel" in track ? `What you get · ${track.whatYouGetLabel}` : "What you get"}</p>
          <ItemList items={track.whatYouGet} className="mt-3" />
        </div>
      </div>
      <LogoRow className="mt-10" companies={track.lecturerCompanies} label={isFounders ? "Sessions with leaders from" : "Lecturers from"} />
      {children}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Link href={track.cta.href} className="btn btn-primary self-start">
          {track.cta.label}
        </Link>
        <Gated item={track.nextCohort} inline>
          <span className="text-[15px] text-body">{track.nextCohort.value}</span>
        </Gated>
      </div>
    </article>
  )
}

/** Renders a quote slot with spacing only when it has something to show. */
export function QuoteBlock({ quote, className }: { quote: string | MissingValue; className?: string }) {
  if (!renders(quote)) return null
  return (
    <div className={className}>
      <QuoteSlot quote={quote} />
    </div>
  )
}
