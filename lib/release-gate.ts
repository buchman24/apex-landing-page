import * as home from "@/content/home"
import * as tracks from "@/content/tracks"
import * as stats from "@/content/stats"
import * as people from "@/content/people"
import * as partner from "@/content/partner"
import * as events from "@/content/events"
import * as forms from "@/content/forms"
import * as site from "@/content/site"
import { release } from "@/content/release"
import { isMissing } from "@/content/_lib"
import { deployEnv } from "@/lib/placeholders"

export type Blocker = { kind: "missing" | "approval"; path: string; detail: string; owner: string }

const MODULES: Record<string, unknown> = { home, tracks, stats, people, partner, events, forms, site }

function walk(value: unknown, path: string, out: Blocker[], seen: Set<unknown>) {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  if (isMissing(value)) {
    out.push({ kind: "missing", path, detail: value.what, owner: value.owner })
    return
  }
  const rec = value as Record<string, unknown>
  if (rec.approved === false) {
    const value = typeof rec.value === "string" ? rec.value : path
    const label = typeof rec.name === "string" ? `${rec.name}: ${value}` : value
    const note = typeof rec.note === "string" ? ` (${rec.note})` : ""
    out.push({ kind: "approval", path, detail: `${label}${note}`, owner: String(rec.approver ?? "unassigned") })
  }
  for (const [key, child] of Object.entries(rec)) walk(child, `${path}.${key}`, out, seen)
}

let cached: Blocker[] | null = null

/** Every missing(...) and approved: false item across content/. */
export function collectBlockers(): Blocker[] {
  if (cached) return cached
  const out: Blocker[] = []
  const seen = new Set<unknown>()
  for (const [name, mod] of Object.entries(MODULES)) walk(mod, name, out, seen)
  cached = out
  return out
}

export const isProduction = deployEnv === "production"

let reported = false

/**
 * Called from the root layout during the build.
 * Production + unresolved items + release switch off  =>  the build fails, Vercel keeps the old site.
 * Anywhere else  =>  prints the list once, so it can be copied into the PR.
 */
export function enforceReleaseGate() {
  const blockers = collectBlockers()
  if (blockers.length === 0) return
  const lines = blockers.map((b, i) => `${i + 1}. [${b.kind}] ${b.detail}  | owner: ${b.owner}  | ${b.path}`)
  if (isProduction && !release.allowUnresolvedInProduction) {
    throw new Error(
      `APEX release gate: ${blockers.length} unresolved content items. Resolve them in content/ or see content/release.ts.\n` +
        lines.join("\n"),
    )
  }
  if (!reported) {
    reported = true
    console.warn(`\n[APEX release gate] ${blockers.length} unresolved items (shown as placeholders outside production):\n${lines.join("\n")}\n`)
  }
}
