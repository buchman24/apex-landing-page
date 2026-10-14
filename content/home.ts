import { missing } from "./_lib"

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

export const how = {
  eyebrow: "How we do it",
  /** DECK slides 1 and 14. */
  heading: "The talent is here. We build the rails.",
  /** DECK slide 2. */
  lede: "Rare talent compounds with a home, knowhow, and compute.",
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
