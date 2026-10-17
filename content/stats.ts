import type { Approval } from "./_lib"

/*
  APEX PROOF NUMBERS: siteStats, the Israel rankings and Vision 2030 live in this file.
  (Cohort facts such as "8 deep-dive sessions" live with the track copy in content/tracks.ts.)

  !!! REQUIRES APPROVAL BEFORE GOING LIVE !!!
  None of the five siteStats numbers below is signed off for publication.
  Approver: Avishag Bohbot (playbook 7.4: she approves every number and description).
  Switch approved to true only after her written OK. While any item is
  approved: false, the production build refuses to deploy.
*/

type Stat = Approval<string> & { label: string }

export const siteStats: Stat[] = [
  {
    value: "600+",
    label: "applicants",
    approved: false,
    approver: "Avishag Bohbot",
    source: "The APEX Canon, Early Proof (12.10.2026)",
    note: "No calculation behind 600+ in Notion. Older blurbs say 500+ and 300+.",
  },
  {
    value: "~10%",
    label: "acceptance",
    approved: false,
    approver: "Avishag Bohbot",
    source: "The APEX Canon, Early Proof (12.10.2026)",
    note: "117 graduates of 600+ applicants is about 19.5%, and the beta cohort was 22%. Needs a definition before publishing.",
  },
  {
    value: "117",
    label: "alumni",
    approved: false,
    approver: "Avishag Bohbot",
    source: "The APEX Canon, Early Proof (12.10.2026)",
    note: "Matches the rows of the merged alumni sheet. Unique count is ~116; the Gantt quotes 120; /community/alumni lists 78 so far.",
  },
  {
    value: "10",
    label: "frontier companies",
    approved: false,
    approver: "Avishag Bohbot",
    source: "The APEX Canon, Early Proof (12.10.2026)",
    note: "Other sources say 2, 3 or 4 companies. Needs a definition (formed at APEX, or alumni-founded).",
  },
  {
    value: "40+",
    label: "lecturers from leading AI companies",
    approved: false,
    approver: "Avishag Bohbot",
    source: "The APEX Canon, Early Proof (12.10.2026)",
    note: "No consolidated faculty list confirms 40+.",
  },
]

/* Rankings shown under "The highest AI talent density on Earth." (deck slide 3). Verified against the sources below. */
type Fact = Approval<string> & { label: string; source: string }

export const israelFacts: Fact[] = [
  {
    value: "#1",
    label: "globally in AI talent concentration",
    source: "Stanford AI Index 2026, LinkedIn data",
    approved: false,
    approver: "Avishag Bohbot",
    note: "Verified in the Stanford AI Index 2026, chapter 4 (Israel 2.1% of LinkedIn members in 2025). Rankings need sign-off before external use.",
  },
  {
    value: "#1",
    label: "in AI citations per paper and AI patents per capita",
    source: "Israel Ministry of Innovation, Science and Technology, 2025",
    approved: false,
    approver: "Avishag Bohbot",
    note: "Verified in the ministry's AI priority report (April 2025). Rankings need sign-off before external use.",
  },
]

/* Vision 2030 (the Canon, and deck slide 13). Shown on /partner. */
export const vision2030 = {
  eyebrow: "Vision 2030",
  /** DECK slide 13. */
  heading: "Institutions outlive companies.",
  goals: [
    { value: "200", label: "exceptional builders per year" },
    { value: "150", label: "frontier startups over five years" },
    { value: "60,000", label: "new jobs" },
  ],
  closing: "A self-sustaining flywheel.",
  approval: {
    value: "Vision 2030 goals",
    approved: false,
    approver: "Avishag Bohbot",
    source: "The APEX Canon, Vision 2030 (12.10.2026)",
    note: "The live site and older blurbs carry different 5-year targets (150 founders + 750 architects, 120 + 500, 150 + 500).",
  } satisfies Approval<string>,
}
