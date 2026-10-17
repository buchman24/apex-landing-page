import { isMissing } from "@/content/_lib"

/**
 * Which deployment this build is for. Fails closed: on Vercel without VERCEL_ENV
 * (system variables not exposed) the build is treated as production.
 */
export const deployEnv: "production" | "preview" | "development" =
  process.env.VERCEL_ENV === "preview"
    ? "preview"
    : process.env.VERCEL_ENV === "production" || process.env.VERCEL
      ? "production"
      : "development"

/** Placeholders (MISSING blocks, "Pending approval" marks) only ever render on previews and local builds. */
export const showPlaceholders = deployEnv !== "production"

/**
 * Items that wait on Avishag Bohbot carry no marker on previews (decided 14.10.2026):
 * pending content renders plainly and missing items are left out. They still appear in
 * the release report and still block production (lib/release-gate.ts).
 */
export const unmarked = (who: string) => /avishag/i.test(who)

/** True when a value renders anything: real content, or a MISSING block that previews show. */
export function renders(value: unknown) {
  if (!isMissing(value)) return true
  return showPlaceholders && !unmarked(value.owner)
}
