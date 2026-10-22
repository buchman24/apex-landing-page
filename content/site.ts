import { missing } from "./_lib"

/*
  Site-wide settings: name, metadata, navigation, footer.
  Edit the text in quotes. Links that start with "/#" scroll to a section of the home page.
*/

export const site = {
  name: "APEX",
  url: "https://www.apex.org.il",
  title: "APEX | The institution behind Israel's AI future.",
  description:
    "APEX is Israel's institution for exceptional AI builders. Talent goes in, world-class technology comes out.",
  contactEmail: "team@apex.org.il",

  /** Main navigation. On the home page, items with a homeAnchor highlight as you scroll. */
  nav: [
    { label: "Vision", homeAnchor: "moment", href: "/#moment" },
    { label: "Tracks", homeAnchor: "tracks", href: "/tracks" },
    { label: "Proof", homeAnchor: "proof", href: "/#proof" },
    { label: "People", homeAnchor: "people", href: "/people" },
    { label: "Events", homeAnchor: "events", href: "/#events" },
    { label: "Partners", homeAnchor: "partners", href: "/partner" },
  ],
  navCta: { label: "Join", href: "/#community" },

  footer: {
    tagline: "The institution behind Israel's AI future.",
    columns: [
      {
        title: "Tracks",
        links: [
          { label: "Architect Track", href: "/tracks/architects" },
          { label: "Founders Track", href: "/tracks/founders" },
          { label: "All tracks", href: "/tracks" },
        ],
      },
      {
        title: "APEX",
        links: [
          { label: "People", href: "/people" },
          { label: "Alumni", href: "/community/alumni" },
          { label: "Partner with APEX", href: "/partner" },
          { label: "Events", href: "/#events" },
        ],
      },
    ],
    /** Required on the site per the Community O legal summary (27.11.2025). */
    legalLine: "Operated by Community O R.A",
    privacyNotice: missing(
      "Privacy notice for the forms on this site: what is collected, where it is stored, retention, contact",
      "Avishag Bohbot with legal counsel (Community O)",
    ),
  },
}

/** The page shown for an address that does not exist. */
export const notFoundPage = {
  heading: "Page not found.",
  body: "The link may be out of date, or the page has moved.",
  home: "Home",
  tracks: "Tracks",
}
