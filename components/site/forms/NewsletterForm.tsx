"use client"

import { useId, type ReactNode } from "react"
import { subscribeNewsletter } from "@/app/actions/forms"
import { useUtmSource } from "./useUtmSource"
import { useServerForm } from "./useServerForm"

/** `bare` is kept for API compatibility: the form never renders inside a box. */
export function NewsletterForm({ connected, consent, notice }: { connected: boolean; consent: ReactNode; notice?: ReactNode; bare?: boolean }) {
  const uid = useId()
  const source = useUtmSource()
  const { state, run, pending, onSubmit, done } = useServerForm(subscribeNewsletter)
  const bad = state.status === "error" || state.status === "not-connected"

  if (state.status === "ok") {
    return (
      <div role="status">
        <h3 ref={done} tabIndex={-1} className="h-card outline-none">
          {state.message}
        </h3>
      </div>
    )
  }

  return (
    <form action={run} onSubmit={onSubmit} className="space-y-6">
      {notice}
      <fieldset disabled={!connected || pending} className="min-w-0 space-y-8 disabled:opacity-80">
        <legend className="sr-only">Quarterly newsletter sign-up</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="field-label" htmlFor={`${uid}-email`}>Email</label>
            <input className="field" id={`${uid}-email`} name="email" type="email" autoComplete="email" required />
          </div>
        </div>
        {consent}
        <input type="hidden" name="source" value={source} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            {pending ? "Sending..." : "Subscribe"}
          </button>
          <p role="status" aria-live="polite" className={bad ? "min-w-0 text-[15px] font-medium text-[rgb(var(--danger))]" : "sr-only"}>
            {state.message}
          </p>
        </div>
      </fieldset>
    </form>
  )
}
