import { MARKETING_CONSENT } from "@/content/forms"
import { PendingMark } from "../Gated"
import { showPlaceholders } from "@/lib/placeholders"

/**
 * Marketing consent (Israeli anti-spam law). Unchecked by default, with its own label.
 * Wording lives in content/forms.ts and is PENDING LEGAL REVIEW.
 */
export function ConsentCheckbox({ id, required }: { id: string; required?: boolean }) {
  if (!MARKETING_CONSENT.approved && !showPlaceholders) return null
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name="consent"
          type="checkbox"
          value="yes"
          required={required}
          defaultChecked={false}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[rgb(var(--ink))]"
        />
        <label htmlFor={id} className="min-w-0 cursor-pointer text-[15px] leading-normal text-body">
          {MARKETING_CONSENT.value}
        </label>
      </div>
      {!MARKETING_CONSENT.approved ? <PendingMark item={MARKETING_CONSENT} className="ml-8 mt-2" /> : null}
    </div>
  )
}
