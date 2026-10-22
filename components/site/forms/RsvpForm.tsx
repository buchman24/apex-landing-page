"use client"

import { useId, type ReactNode } from "react"
import { requestInvite } from "@/app/actions/forms"
import { useUtmSource } from "./useUtmSource"
import { useServerForm } from "./useServerForm"

/** `bare` is kept for API compatibility: the form never renders inside a box. */
export function RsvpForm({ events, connected, consent, notice }: { events: string[]; connected: boolean; consent: ReactNode; notice?: ReactNode; bare?: boolean }) {
  const uid = useId()
  const source = useUtmSource()
  const { state, run, pending, onSubmit, done } = useServerForm(requestInvite)
  const f = (name: string) => `${uid}-${name}`
  const bad = state.status === "error" || state.status === "not-connected"

  if (state.status === "ok") {
    return (
      <div role="status">
        <h3 ref={done} tabIndex={-1} className="h-card outline-none">
          Request received.
        </h3>
        <p className="mt-3 text-body">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={run} onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      {notice}
      <fieldset disabled={!connected || pending} className="min-w-0 space-y-8 disabled:opacity-80">
        <legend className="sr-only">Request an invitation</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="field-label" htmlFor={f("name")}>Full name</label>
            <input className="field" id={f("name")} name="name" autoComplete="name" required />
          </div>
          <div>
            <label className="field-label" htmlFor={f("email")}>Email</label>
            <input className="field" id={f("email")} name="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <label className="field-label" htmlFor={f("company")}>Company</label>
            <input className="field" id={f("company")} name="company" autoComplete="organization" required />
          </div>
          <div>
            <label className="field-label" htmlFor={f("role")}>Role</label>
            <input className="field" id={f("role")} name="role" autoComplete="organization-title" required />
          </div>
          {events.length > 0 ? (
            <div className="md:col-span-2">
              <label className="field-label" htmlFor={f("event")}>Event</label>
              <select className="field" id={f("event")} name="event" defaultValue={events[0]}>
                {events.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        {consent}
        <input type="hidden" name="source" value={source} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            {pending ? "Sending..." : "Request an invitation"}
          </button>
          <p role="status" aria-live="polite" className={bad ? "min-w-0 text-[15px] font-medium text-[rgb(var(--danger))]" : "sr-only"}>
            {state.message}
          </p>
        </div>
      </fieldset>
    </form>
  )
}
