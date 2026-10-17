/*
  Helpers used by every file in content/. You do not need to edit this file.

  HOW TO EDIT CONTENT (GitHub web editor):
  - Change only the text between the quotes. Keep the commas and brackets.
  - missing("what is needed", "who owns it") marks something we do not have yet.
    On preview links it shows as a loud yellow MISSING block. Replace the whole
    missing(...) call with the real text in quotes once you have it.
  - approved: false marks content that exists but is not signed off. Switch it
    to approved: true only after the named approver has said yes.
  - While anything is missing or unapproved, the production build refuses to
    deploy (see content/release.ts), so nothing unfinished can go live by accident.
*/

export type Missing = {
  readonly __missing: true
  /** What is needed, in plain words. */
  what: string
  /** Who owns getting it. */
  owner: string
}

export function missing(what: string, owner: string): Missing {
  return { __missing: true, what, owner }
}

export function isMissing(value: unknown): value is Missing {
  return typeof value === "object" && value !== null && (value as Missing).__missing === true
}

/** A value that exists but still needs sign-off before it may go live. */
export type Approval<T = string> = {
  value: T
  approved: boolean
  /** Who signs this off. */
  approver: string
  /** Why it is not approved yet (conflicting sources, etc.). Shown in the build report. */
  note?: string
  /** Where the value comes from. */
  source?: string
}

export type Text = string | Missing
