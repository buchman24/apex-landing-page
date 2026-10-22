import type { ReactNode } from "react"
import type { Approval } from "@/content/_lib"
import { showPlaceholders, unmarked } from "@/lib/placeholders"
import { cn } from "@/lib/utils"

/** Small marker that sits next to unapproved content on previews. */
export function PendingMark({ item, className }: { item: Pick<Approval<unknown>, "approver" | "note">; className?: string }) {
  if (!showPlaceholders || unmarked(item.approver)) return null
  return (
    <span
      data-pending=""
      className={cn(
        "inline-flex items-center gap-1 rounded-[2px] border border-dashed border-[#9a6a00] bg-[#fff4b8] px-1.5 py-0.5 align-middle font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#5c3f00]",
        className,
      )}
    >
      Pending approval · {item.approver}
    </span>
  )
}

/**
 * Wraps content that needs sign-off.
 * approved: true  -> rendered normally.
 * approved: false -> on previews, rendered with a dashed outline and a "Pending approval" marker
 *                    (plainly when the approver is unmarked, see lib/placeholders.ts);
 *                    in production it is left out (and the build fails unless the release switch is on).
 */
export function Gated({ item, children, className, inline }: { item: Approval<unknown>; children: ReactNode; className?: string; inline?: boolean }) {
  if (item.approved) return <>{children}</>
  if (!showPlaceholders) return null
  if (unmarked(item.approver)) return <>{children}</>
  if (inline) {
    return (
      <span className={cn("rounded-sm outline outline-1 outline-dashed outline-[#9a6a00] outline-offset-2", className)}>
        {children} <PendingMark item={item} />
      </span>
    )
  }
  return (
    <div className={cn("relative rounded-sm outline outline-1 outline-dashed outline-[#9a6a00] outline-offset-4", className)}>
      <div className="mb-2">
        <PendingMark item={item} />
      </div>
      {children}
    </div>
  )
}
