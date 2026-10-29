import { missing, type Approval } from "./_lib"

/*
  People shown on /people and on the home page.
  Names follow data/members.ts (the live site). Roles follow the October 2026 deck (slide 17).
  Where the deck and the live site disagree, the role is approved: false until the person
  and Avishag confirm it.

  The community grid on /people reads data/members.ts directly, so members added through
  /add-member appear there automatically. Do not move or reformat data/members.ts.
*/

type Person = { name: string; role: string; hideWhenPending?: boolean } & Partial<Approval<string>>

export const coreTeam: Person[] = [
  { name: "Avishag Bohbot", role: "Managing Director" },
  { name: "Dvir Maimon", role: "Operations" },
  { name: "Nadav Delgo", role: "Platform" },
  {
    name: "Tal Fialkow",
    role: "AI Curation",
    value: "AI Curation",
    approved: false,
    approver: "Tal Fialkow and Avishag Bohbot",
    note: "The deck says AI Curation; the live site says AI Leader.",
  },
  {
    name: "Roy Nissim",
    role: "Talpiot Champion",
    value: "Talpiot Champion",
    approved: false,
    approver: "Roy Nissim and Avishag Bohbot",
    note: "Confirm Roy is still active as a champion after stepping back from cohort 3.",
    hideWhenPending: true,
  },
  {
    name: "Ofek Censor",
    role: "Aram Champion",
    value: "Aram Champion",
    approved: false,
    approver: "Ofek Censor and Avishag Bohbot",
    note: "The deck names the unit (Aram); the live site says Champion of Elite Cyber Course.",
  },
]

export const coreTeamOpenQuestion = missing(
  "Confirm whether Amit Buchman and Talya Pines are on the core team (listed on the live site, not in the October 2026 deck)",
  "Avishag Bohbot",
)

/** Deck slide 17, matches the live site. */
export const advisoryBoard: Person[] = [
  { name: "Adam Fisher", role: "Bessemer Venture Partners" },
  { name: "Omer Dagan", role: "Ex-Commander, Lotem" },
  { name: "Danny Grander", role: "Snyk" },
  { name: "Michael Cohn", role: "Overline" },
  { name: "Elroei Buchman", role: "Venture Builder" },
]

/** Lecturers who taught APEX cohorts, verified in the syllabus and already public on the live site. */
export const faculty = {
  /** DECK slide 7. */
  heading: "Who is in the room.",
  people: [
    { name: "Gal Chechik", role: "NVIDIA, Bar-Ilan University" },
    { name: "Idan Schwartz", role: "Bar-Ilan University" },
    { name: "Danny Harnik", role: "IBM Research" },
    { name: "Elad Levi", role: "Plurai" },
    { name: "Roy Miara", role: "Tenzai" },
    { name: "Ofer Shacham", role: "Majestic Labs" },
  ] as Person[],
  more: missing(
    "The rest of the faculty list, with each lecturer's OK to be named (the deck slide 7 names are not all verified)",
    "Avishag Bohbot",
  ),
}

export const communityCopy = {
  heading: "Community",
  /** Live site copy. */
  body: "Our valued community members contributing to APEX's mission.",
}

export const alumniCopy = {
  heading: "Alumni",
  /** Live site copy. */
  body: "Meet the talented graduates from our APEX cohorts",
  href: "/community/alumni",
  cta: "Meet the alumni",
}

/** The /community/alumni page. Copy from the live site, em dashes replaced. */
export const alumniPage = {
  eyebrow: "Community",
  heading: "APEX Alumni",
  lede: "Meet the talented graduates from our APEX cohorts",
  tabs: { architects: "Architects", founders: "Founders" },
  captions: {
    architects: "The Architect Track cohort.",
    founders: "The Founders Track cohort: APEX Inception Sprint, Tel Aviv.",
  },
  emptyFounders: "Founders Track alumni coming soon.",
}
