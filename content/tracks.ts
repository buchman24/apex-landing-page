import { missing, type Approval } from "./_lib"

/*
  The two tracks. Used on the home page, /tracks, /tracks/founders and /tracks/architects.
  Lecturer and speaker companies are TEXT ONLY. Do not add logo images until each
  company has given written permission (see content/logos.ts).
*/

export const founders = {
  id: "founders",
  name: "Founders Track",
  /** DECK slide 8. */
  tagline: "Find a problem worth a decade. Then solve it.",
  /** EXACT promise (brief). */
  promise: "Move fast, aim right.",
  /** From the brief. */
  promiseBody:
    "In an era where anyone ships a product in weeks, the real risk is choosing the wrong problem.",
  /** From the brief. */
  whoFor: [
    "Early-stage technical founders, from idea to validation.",
    "APEX alumni and alumni of Talpiot, Aram and Psagot.",
  ],
  /** From the brief (the May 2026 Founders sprint). */
  whatYouGet: [
    "A small, high-signal cohort",
    "Sessions with AI leaders and CTOs",
    "The Mom Test",
    "GPU economics",
    "An Office Hours evening with leading builders",
  ],
  /** Example lecturer companies (brief). Verified as real speakers' companies, May 2026. TEXT ONLY. */
  lecturerCompanies: ["NVIDIA", "Nebius", "Team8", "Bessemer", "Majestic Labs", "Dream Security", "AI21"],
  quote: missing(
    "Founders alumni quote: verbatim, full name and cohort, with the alumnus's written OK",
    "Dvir Maimon (collects) and Avishag Bohbot (approves)",
  ),
  cta: { label: "Join the waiting list", href: "/tracks/founders#apply" },
  nextCohort: {
    value: "Next cohort opens 21 December 2026.",
    approved: false,
    approver: "Avishag Bohbot",
    source: "Website 2.0 brief; local Gantt v6 (13.10.2026)",
    note: "The Notion Gantt still shows 15.11 (Needs decision) and recordings mention 20.11 and 1.12.",
  } satisfies Approval,
  formTitle: "Join the waiting list for the next cohort",
}

export const architects = {
  id: "architects",
  name: "Architect Track",
  /** DECK slide 8. Fills the brief's promise slot. */
  promise: "From strong engineer or cyber researcher to AI-native architect.",
  /** From the brief. */
  whoFor: ["Exceptional engineers leading AI change from inside their organisations."],
  /** Verbatim from the Architects #3 home page (the last cohort). */
  whatYouGet: [
    "8 deep-dive sessions (1/week) led by AI operators and researchers",
    "Tactical problem-solving exercises and real-world use cases",
    "A tight cohort of amazing peers from top units",
  ],
  whatYouGetLabel: "From the last cohort",
  /** DECK slide 18, corrected to what cohort 3 actually ran (8 weeks; the deck says 9). */
  curriculumHeading: "The core curriculum.",
  curriculumNote: "As taught in Architects cohort 3: eight weekly evenings plus optional bonus sessions.",
  curriculum: [
    "AI Through the Ages",
    "Transformer Fundamentals & Scaling Laws",
    "Post-Training Fundamentals",
    "Vision Fundamentals & Multi-modal Models",
    "Advanced Inference Techniques",
    "Supercharging LLMs with Knowledge",
    "Evaluation & Agentic Systems",
    "Advanced RL & The Physical Frontier",
  ],
  /** Companies of lecturers who taught Architects cohort 3 (syllabus, verified). TEXT ONLY. */
  lecturerCompanies: ["NVIDIA", "IBM Research", "Decart", "Plurai", "Tenzai", "Bar-Ilan University"],
  quote: missing(
    "Architects alumni quote: verbatim, full name and cohort, with the alumnus's written OK",
    "Dvir Maimon (collects) and Avishag Bohbot (approves)",
  ),
  cta: { label: "Apply", href: "/tracks/architects#apply" },
  nextCohort: {
    value: "Or join the waiting list for the March 2027 cohort.",
    approved: false,
    approver: "Avishag Bohbot and Tal Fialkow",
    source: "Website 2.0 brief; local Gantt v6 (Architects #4, 01.03-26.04.27)",
    note: "The Notion Gantt shows 1.2 and a recording says end of February. Needs decision.",
  } satisfies Approval,
  formTitle: "Apply, or join the waiting list",
}
