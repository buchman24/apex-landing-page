import { cn } from "@/lib/utils"

export type WhyNowPoint = { title: string; body: string }
export type WhyNowStep = {
  /** Small mono label naming the link in the chain ("The foundation"). */
  label: string
  statement: string
  points?: WhyNowPoint[]
  closing?: string
  /** Shown under the step, in small type. */
  source?: string
}

/** One link in the "Why now" chain: a statement, up to three supporting points, a closing line and its sources. */
export function WhyNowStep({ step, className }: { step: WhyNowStep; className?: string }) {
  return (
    <div className={cn("reveal", className)}>
      <p className="label">{step.label}</p>
      <h3 className="t-statement mt-5 max-w-[22ch]">{step.statement}</h3>
      {step.points?.length ? (
        <ul className="mt-10 grid border-t border-rule/15 md:mt-12 md:grid-cols-3">
          {step.points.map((p) => (
            <li key={p.title} className="border-b border-rule/15 py-5 md:pr-6 md:[&:not(:first-child)]:pl-6 md:[&:not(:last-child)]:border-r">
              <p className="font-display text-[19px] font-medium leading-snug tracking-[-0.015em] text-ink">{p.title}</p>
              <p className="mt-2 text-[15px] leading-snug text-body">{p.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {step.closing ? <p className="h-card mt-10 max-w-[32ch] md:mt-12">{step.closing}</p> : null}
      {step.source ? <p className="mt-6 max-w-[60ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-slate">{step.source}</p> : null}
    </div>
  )
}
