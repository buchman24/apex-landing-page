import { missing, type Approval } from "./_lib"

/*
  Form destinations and legal wording.

  Track applications (Architects and the Founders waiting list) go to the existing
  /api/apply endpoint, which writes to the "APEX Track Applications (Website)" Google Sheet.

  The RSVP and newsletter forms have no destination yet. Until an endpoint URL is set
  here, those forms show as MISSING on previews and their submit buttons stay disabled,
  so no submission can be silently lost.
*/

export const formEndpoints = {
  rsvp: missing("Endpoint URL that receives event invitation requests (RSVP)", "Dvir Maimon with Amit Buchman"),
  newsletter: missing("Endpoint URL that receives newsletter sign-ups", "Dvir Maimon with Amit Buchman"),
}

/*
  !!! PENDING LEGAL REVIEW !!!
  Marketing-consent checkbox wording, required by Israeli anti-spam law
  (Communications Law, section 30A). Shown next to the RSVP and newsletter forms,
  unchecked by default. The final wording must be approved by the lawyer before
  going live. Change only the value text, then set approved: true.
*/
export const MARKETING_CONSENT: Approval<string> = {
  value:
    "I agree to receive emails from APEX about programs, events and the quarterly newsletter. I can unsubscribe at any time.",
  approved: false,
  approver: "Legal counsel (via Community O) and Avishag Bohbot",
  note: "PENDING LEGAL REVIEW. Draft wording only.",
}
