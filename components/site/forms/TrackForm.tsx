"use client"

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react"
import { useUtmSource } from "./useUtmSource"

type Track = "Architects" | "Founders"

/**
 * Track application / waiting list. Posts to the existing /api/apply endpoint
 * (Google Sheet "APEX Track Applications (Website)"), the same contract the live site uses.
 */
export function TrackForm({ track, submitLabel, notice }: { track: Track; submitLabel: string; notice?: ReactNode }) {
  const uid = useId()
  const source = useUtmSource()
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")
  const [message, setMessage] = useState("")
  const done = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (status === "ok") done.current?.focus()
  }, [status])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setStatus("sending")
    setMessage("")
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          linkedin: data.get("linkedin"),
          militaryTrack: data.get("militaryTrack"),
          why: data.get("why"),
          track,
          source,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus("error")
        setMessage(body.error || "Something went wrong. Please try again.")
        return
      }
      setStatus("ok")
      setMessage("Thank you. Your details are in. We will be in touch.")
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  if (status === "ok") {
    return (
      <div role="status">
        <p ref={done} tabIndex={-1} className="h-card outline-none">
          Received.
        </p>
        <p className="mt-2 text-body">{message}</p>
      </div>
    )
  }

  const f = (name: string) => `${uid}-${name}`
  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
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
          <label className="field-label" htmlFor={f("linkedin")}>LinkedIn profile</label>
          <input className="field" id={f("linkedin")} name="linkedin" type="url" inputMode="url" placeholder="https://www.linkedin.com/in/..." required />
        </div>
        <div>
          <label className="field-label" htmlFor={f("unit")}>
            Unit or track <span className="font-normal text-slate">(optional)</span>
          </label>
          <input className="field" id={f("unit")} name="militaryTrack" placeholder="e.g. 8200, Talpiot, Mamram" />
        </div>
        <div className="md:col-span-2">
          <label className="field-label" htmlFor={f("why")}>
            Why this track? <span className="font-normal text-slate">(optional)</span>
          </label>
          <textarea className="field min-h-[110px]" id={f("why")} name="why" rows={4} />
        </div>
      </div>
      <input type="hidden" name="source" value={source} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : submitLabel}
        </button>
        <p role="status" aria-live="polite" className={status === "error" ? "min-w-0 text-[15px] font-medium text-[rgb(var(--danger))]" : "sr-only"}>
          {message}
        </p>
      </div>
      {notice}
    </form>
  )
}
