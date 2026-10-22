import type { Missing as MissingValue } from "@/content/_lib"
import { showPlaceholders, unmarked } from "@/lib/placeholders"
import { cn } from "@/lib/utils"

/**
 * Loud placeholder for content we do not have yet. Visible on previews only.
 * Production builds fail while any of these exist (see content/release.ts).
 */
export function Missing({ item, className }: { item: MissingValue; className?: string }) {
  if (!showPlaceholders || unmarked(item.owner)) return null
  return (
    <div
      role="note"
      data-missing=""
      className={cn("rounded-[3px] p-[4px] [background:repeating-linear-gradient(135deg,#ffd60a_0_10px,#0d1b2a_10px_20px)]", className)}
    >
      <div className="rounded-[2px] bg-[#fff4b8] px-4 py-3 text-[15px] leading-snug text-[#0d1b2a]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em]">Missing</p>
        <p className="mt-1 font-medium">{item.what}</p>
        <p className="mt-1 text-[13px]">Owner: {item.owner}</p>
      </div>
    </div>
  )
}
