import { advisoryBoardMembers, communityMembers, foundingTeamMembers, type Member } from "@/data/members"
import { PORTRAITS } from "./portraits"
import { linkedinHref } from "./links"

/*
  Photos and LinkedIn links for the people named in content/people.ts, taken from
  data/members.ts (the same records the current site shows; /add-member writes there).
  Names in data/members.ts sometimes carry a role ("Tal Fialkow - AI Leader"), so the
  match uses the part before " - ".
*/

const key = (name: string) => name.split(" - ")[0].trim().toLowerCase()
const PORTRAIT_DIR = "/portraits/"

const byName = new Map<string, Member>()
for (const m of [...foundingTeamMembers, ...advisoryBoardMembers, ...communityMembers]) if (!byName.has(key(m.name))) byName.set(key(m.name), m)

/** The small web portrait when there is one (scripts/make-portraits.mjs), else the original photo. */
export function memberPhoto(m: Pick<Member, "id" | "imageSrc">): string | null {
  if (PORTRAITS.has(m.id)) return `${PORTRAIT_DIR}${m.id}.jpg`
  return m.imageSrc || null
}

export function personMedia(name: string): { photo: string | null; href: string | null } {
  const m = byName.get(key(name))
  if (!m) return { photo: null, href: null }
  return { photo: memberPhoto(m), href: linkedinHref(m.linkedinUrl) }
}
