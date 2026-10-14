import { missing } from "./_lib"

/*
  The /partner page: the case for partners and donors.
  DECK = October 2026 deck. Unsourced lines from the deck were left out on purpose
  (the Mellanox "few dozen chip architects" line, the slide 5 and slide 20 figures,
  and "every institution ... before the state could", which is not true for Birthright).
*/

export const partnerPage = {
  eyebrow: "Partner with APEX",
  /** EXACT (brief). */
  statement: "We don't seek sponsors. We build long-term partnerships.",

  commons: {
    /** DECK slide 10. */
    heading: "Israel's AI Commons.",
    body: "Connecting global AI platforms to Israel's frontier builders, turning resources into national capability.",
    /** Diagram labels, top to bottom (deck slide 10, without the undocumented GRANTS and RESEARCHERS nodes). */
    diagram: {
      top: "Global AI partners",
      middle: "APEX",
      resources: ["Compute", "Mentors", "Community"],
      tracks: ["Architects", "Founders"],
      bottom: "National AI capability",
    },
  },

  precedent: {
    /** DECK slide 11. Years verified against each institution's own history. */
    heading: "We have been here before.",
    lede: "The role of diaspora philanthropy in building modern Israel.",
    timeline: [
      { year: "1912", label: "The Technion" },
      { year: "1925", label: "Hebrew University" },
      { year: "1934", label: "Weizmann Institute" },
      { year: "1999", label: "Birthright Israel" },
      { year: "Now", label: "APEX" },
    ],
    /** DECK slide 11, last two sentences. */
    closing:
      "The state cannot build APEX at the speed this moment demands. The constituency that built the Technion can.",
  },

  method: {
    /** DECK slide 19. */
    heading: "Method: move the spearhead. The rest follows.",
    body: "Don't spread capital thin. Produce the architects and founders who pull everything above them upward.",
    /** DECK slide 20. */
    closing: "Out-spending is not available. Out-compounding the humans is.",
  },

  ask: {
    heading: "Partnering with APEX.",
    body: missing(
      "One public sentence: what a partnership funds and how to start (no amounts; the deck figures are internal)",
      "Avishag Bohbot",
    ),
    cta: { label: "Talk to us about partnering", subject: "Partnering with APEX" },
    leadership: { label: "See who leads APEX", href: "/people" },
  },
}
