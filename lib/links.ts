/** data/members.ts is written by /add-member and the Dex sync; tidy LinkedIn URLs for display only. */
export function linkedinHref(url: string | undefined) {
  const u = (url ?? "").trim()
  if (!u || /^https?:\/\/(www\.)?linkedin\.com\/?$/.test(u)) return null
  return u.startsWith("http") ? u : `https://${u}`
}
