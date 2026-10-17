"use server"

import { formEndpoints, MARKETING_CONSENT } from "@/content/forms"
import { isMissing } from "@/content/_lib"

export type FormState = { status: "idle" | "ok" | "error" | "not-connected"; message?: string; attempt?: number }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(v: FormDataEntryValue | null, max = 200) {
  return String(v ?? "").trim().slice(0, max)
}

/** Posts to an Apps Script style endpoint. A 3xx counts as success (Apps Script redirects after writing). */
async function forward(endpoint: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "manual",
    })
    return res.type === "opaqueredirect" || res.status === 0 || (res.status >= 200 && res.status < 400)
  } catch (err) {
    console.error("form forward failed", err)
    return false
  }
}

function consentFields(formData: FormData) {
  const consent = formData.get("consent") === "yes"
  return { marketingConsent: consent ? "yes" : "no", consentText: consent ? MARKETING_CONSENT.value : "" }
}

/** Event invitation request (RSVP). Stub until content/forms.ts has an endpoint. */
export async function requestInvite(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = clean(formData.get("name"))
  const email = clean(formData.get("email"))
  const company = clean(formData.get("company"))
  const role = clean(formData.get("role"))
  const event = clean(formData.get("event"))
  if (!name || !email || !company || !role) return { status: "error", message: "Please fill in your name, email, company and role." }
  if (!EMAIL.test(email)) return { status: "error", message: "Please enter a valid email address." }
  const endpoint = formEndpoints.rsvp
  if (isMissing(endpoint)) return { status: "not-connected", message: "Invitation requests are not connected yet." }
  const ok = await forward(endpoint, { form: "rsvp", name, email, company, role, event, ...consentFields(formData), source: clean(formData.get("source"), 500) })
  return ok
    ? { status: "ok", message: "Thank you. We review every request and will be in touch if there is a place." }
    : { status: "error", message: "Something went wrong. Please try again." }
}

/** Quarterly newsletter sign-up. Stub until content/forms.ts has an endpoint. */
export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = clean(formData.get("email"))
  if (!EMAIL.test(email)) return { status: "error", message: "Please enter a valid email address." }
  const endpoint = formEndpoints.newsletter
  // No sign-ups until the consent wording has passed legal review (anti-spam law).
  if (isMissing(endpoint) || !MARKETING_CONSENT.approved) return { status: "not-connected", message: "Newsletter sign-up is not open yet." }
  if (formData.get("consent") !== "yes") return { status: "error", message: "Please tick the box to agree to receive the newsletter." }
  const ok = await forward(endpoint, { form: "newsletter", email, ...consentFields(formData), source: clean(formData.get("source"), 500) })
  return ok ? { status: "ok", message: "You are on the list." } : { status: "error", message: "Something went wrong. Please try again." }
}
