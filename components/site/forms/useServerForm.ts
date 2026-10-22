"use client"

import { useActionState, useEffect, useRef, useTransition, type FormEvent } from "react"
import type { FormState } from "@/app/actions/forms"

/**
 * Wraps a server action for a form without React 19's automatic reset after submit,
 * so a validation error never wipes what the person typed. Works without JavaScript too
 * (the form's action attribute still posts to the server action).
 */
export function useServerForm(action: (prev: FormState, data: FormData) => Promise<FormState>) {
  const [state, run, pending] = useActionState<FormState, FormData>(action, { status: "idle" })
  const [, startTransition] = useTransition()
  const done = useRef<HTMLHeadingElement>(null)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(() => run(data))
  }
  useEffect(() => {
    if (state.status === "ok") done.current?.focus()
  }, [state.status])
  return { state, run, pending, onSubmit, done }
}
