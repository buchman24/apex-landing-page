"use client"

import { useEffect, useState } from "react"

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]

/**
 * Reads utm_* parameters from the page URL so a form can send them along with the submission.
 * No cookies, no storage, no tracking script: the value only travels inside the form the person submits.
 */
export function useUtmSource() {
  const [source, setSource] = useState("")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const parts = KEYS.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`)
    setSource(parts.join("&").slice(0, 500))
  }, [])
  return source
}
