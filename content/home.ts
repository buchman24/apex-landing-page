import { missing, type Approval } from "./_lib"

/*
  Home page copy, section by section, in page order.
  Lines marked EXACT come from the Website 2.0 brief and must stay character for character.
  Lines marked DECK come from the APEX October 2026 deck ("Apex Oc 2026.pptx").
*/

export const hero = {
  /** DECK slide 1 title. */
  eyebrow: "The Israeli Human AI Stack",
  /** EXACT (brief). */
  headline: "The institution behind Israel's AI future.",
  /** EXACT (brief). */
  subhead: "Talent goes in. Frontier technology comes out.",
  /** EXACT button labels (brief). They scroll to the track sections. */
  ctas: [
    { label: "I'm a Founder", href: "#founders" },
    { label: "I'm an Architect", href: "#architects" },
  ],
}

export const moment = {
  eyebrow: "The moment",
  /** EXACT (brief). One line per entry. */
  lines: [
    "Our grandparents built the institutions behind the State of Israel.",
    "Our parents built Cyber Nation.",
    "Our generation will build what comes next.",
    "Israel has never competed on size. Its edge has always been people.",
  ],
  /** DECK slide 3 headline. The two facts under it live in content/stats.ts (israelFacts). */
  factsHeading: "The highest AI talent density on Earth.",
}

export const missingPiece = {
  eyebrow: "The missing piece",
  /** EXACT (brief). */
  lines: [
    "Universities educate. Elite units train. Companies hire. Investors finance.",
    "No institution owns the journey from exceptional builder to national capability.",
  ],
  /** EXACT (brief), shown emphasised. */
  emphasis: "The problem is not talent. It's infrastructure.",
}

/*
  WHY NOW. From the internal deck "APEX – למה עכשיו" (17.10.2026), translated to English.
  Every fact was checked against its primary source on 17.10.2026; where the deck went
  further than the source (or the fact has since changed), the line follows the source.
  Left out on purpose: "Israel is second only to the US in cyber" (no current index says so),
  Tortoise 5th to 9th (Israel was back at 7th in the 2025 edition), Oxford 20th to 30th
  (17th in 2024 and 2025), "no national AI strategy" (a national plan was approved in June 2026),
  and "the strongest cyber model is available only to Americans" (inaccurate as worded).
*/
export const whyNow = {
  eyebrow: "Why now",
  /** The whole block is new public copy: Avishag signs it off before it goes live. */
  approval: {
    value: "Why now (home page): the chain from the internal deck, in English",
    approved: false,
    approver: "Avishag Bohbot",
    source: "Internal deck 'APEX – למה עכשיו' (17.10.2026); facts checked against primary sources 17.10.2026",
    note: "New public copy, including the US chip rule and Mythos access lines (politically sensitive).",
  } satisfies Approval,
  steps: [
    {
      label: "Three pillars",
      statement: "Israel stands on three pillars.",
      points: [
        { title: "Security", body: "Defence against enemies larger than us." },
        { title: "Economy", body: "Growth, jobs and state revenue." },
        { title: "Alliances", body: "Diplomatic, security and economic backing." },
      ],
      closing: "But what do all three stand on?",
    },
    {
      label: "One foundation",
      statement: "All three stand on one foundation: a technological edge.",
      points: [
        { title: "Security", body: "A qualitative edge over larger enemies, built on people, technology and intelligence." },
        { title: "Economy", body: "High-tech was about 58% of Israel's exports in 2025 and about half of its economic growth." },
        { title: "Alliances", body: "In December 2025, Israel was one of the first countries to sign Pax Silica, the US-led initiative for the AI supply chain." },
      ],
      closing: "Erode the foundation, and all three pillars weaken at once.",
      source: "Sources: Israel Innovation Authority, The State of High-Tech 2026; US Department of State, Pax Silica, December 2025",
    },
    {
      label: "Erosion",
      statement: "In the age of AI, that foundation is eroding.",
      points: [
        { title: "Code is becoming a commodity", body: "The edge of engineers who ship fast is shrinking against every competitor." },
        { title: "Value is moving to costly layers", body: "Models, chips and energy: a game of capital and scale." },
        { title: "Talent is being pulled abroad", body: "Frontier labs abroad draw the very best. In 2025 Israel saw a net outflow of AI talent, and R&D jobs in Israel fell for the first time in a decade." },
      ],
      closing: "Israel is not weak. It is losing its relative edge.",
      source: "Sources: Stanford AI Index 2026; Israel Innovation Authority, The State of High-Tech 2026",
    },
    {
      label: "The price",
      statement: "And it is already costing us.",
      points: [
        { title: "Chips", body: "In January 2025, a US rule placed Israel, with most countries, under a per-country cap on advanced AI chips: about 50,000 through 2027. It was rescinded that May, before it was enforced." },
        { title: "Frontier models", body: "In June 2026, a US export directive suspended foreign nationals' access to Mythos 5, which Anthropic described as its strongest model for cybersecurity. When access returned, it came back first for a set of US organizations." },
        { title: "Competition", body: "In May 2025, Saudi Arabia and the UAE announced large AI chip deals with US companies and a planned 5-gigawatt AI campus in Abu Dhabi." },
      ],
      closing: "Access to the most powerful technology is a political decision. A country seen as just another country waits in line.",
      source: "Sources: US Federal Register (AI Diffusion Rule, January 2025); US Department of Commerce, May 2025; Anthropic, June and July 2026; company announcements, May 2025",
    },
    {
      label: "The lever",
      statement: "So our one lever is people.",
      points: [
        { title: "Chips and energy", body: "We will not win here. The US and the Gulf are larger than us by orders of magnitude." },
        { title: "Capital", body: "We will not win here. Funds and labs at a scale with no match in Israel." },
        { title: "Talent", body: "Here we lead: Israel has the highest concentration of AI talent among the countries measured." },
      ],
      closing: "The talent is already here. The question is whether we direct it, or lose it.",
      source: "Source: Stanford AI Index 2026 (LinkedIn data, 2025)",
    },
  ],
}

export const how = {
  eyebrow: "How we do it",
  /** DECK slides 1 and 14. */
  heading: "The talent is here. We build the rails.",
  /** DECK slide 2. */
  lede: "Rare talent compounds with a home, knowhow, and compute.",
  /** WHY-NOW DECK slide 6: what APEX does with the lever. */
  lever: {
    heading: "APEX builds exactly that lever.",
    steps: [
      { title: "Find", body: "the best talent from the technology units, academia and industry." },
      { title: "Direct", body: "it to the frontier of AI, on two tracks: Architects and Founders." },
      { title: "Keep", body: "the value in Israel: companies, research and capabilities no one else has." },
    ],
    /** As on the current apex.org.il (VisionSection). Conflicts with vision2030 in content/stats.ts. */
    targets: {
      value: "In five years: 150 founders, 750 architects, 60 researchers.",
      approved: false,
      approver: "Avishag Bohbot",
      source: "Current apex.org.il (Vision section); internal Why-now deck, slide 6",
      note: "Differs from the October deck targets in content/stats.ts (200 builders a year, 150 startups, 60,000 jobs), and no research track is documented yet. Pick one set.",
    } satisfies Approval,
  },
  /** DECK slide 2. "Knowhow" drops the word "researchers": no research track is documented yet. */
  pillars: [
    {
      title: "Home",
      body: "A place to meet, the compute to build, and the right minds to grow with.",
    },
    {
      title: "Knowhow",
      body: "Tracks for architects and founders, taught by the people shaping the frontier.",
    },
    {
      title: "Hevruta",
      body: "Great minds sharpen one another. Hevruta is the ancient Jewish practice of sharpening ideas through a trusted intellectual partner, reimagined by APEX for the people building the future of AI.",
    },
  ],
}

export const tracksIntro = {
  eyebrow: "Two tracks",
  /** DECK slide 8. */
  heading: "The rails, and what they teach.",
}

export const proof = {
  eyebrow: "Proof",
  /** DECK slide 9. The numbers live in content/stats.ts (siteStats). */
  heading: "The best builders are already finding us.",
  lecturersLabel: "Lecturers and speakers from",
  quotesHeading: "In their words",
  /** Two short quotes. No approved quote exists yet: never write one here without written approval. */
  quotes: [
    missing(
      "Short quote #1 (alumnus or faculty), verbatim, with full name, track and cohort, plus the person's written OK to publish",
      "Dvir Maimon (collects) and Avishag Bohbot (approves)",
    ),
    missing(
      "Short quote #2 (alumnus or faculty), verbatim, with full name, track and cohort, plus the person's written OK to publish",
      "Dvir Maimon (collects) and Avishag Bohbot (approves)",
    ),
  ],
}

export const peopleTeaser = {
  eyebrow: "The people behind it",
  /** DECK slide 17. */
  heading: "The team behind APEX.",
  link: { label: "Faculty, community and alumni", href: "/people" },
}

export const events = {
  eyebrow: "Events",
  heading: "Upcoming events",
  /** From the brief. */
  note: "Registration is closed and by approval.",
  formHeading: "Request an invitation",
}

export const community = {
  eyebrow: "Come join",
  heading: "Join the community.",
  doors: [
    { label: "Apply to the Architect Track", href: "/tracks/architects#apply" },
    { label: "Join the Founders waiting list", href: "/tracks/founders#apply" },
    { label: "Partner with APEX", href: "/partner" },
  ],
  communityLink: missing(
    'Where "Join the community" should go: WhatsApp community, LinkedIn page or a form, with the link',
    "Dvir Maimon",
  ),
  newsletterHeading: "Quarterly newsletter",
  newsletterBody: "A quarterly email from APEX.",
}

export const partners = {
  eyebrow: "Partners",
  /** EXACT (brief). */
  statement: "We don't seek sponsors. We build long-term partnerships.",
  /** DECK slide 10. */
  commonsHeading: "Israel's AI Commons.",
  commonsBody:
    "Connecting global AI platforms to Israel's frontier builders, turning resources into national capability.",
  primary: { label: "Partner with APEX", href: "/partner" },
  contact: { label: "Contact us", subject: "Partnering with APEX" },
}
