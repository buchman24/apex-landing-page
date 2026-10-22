import { missing } from "./_lib"

/*
  The next three events, shown on the home page. Registration is closed and by approval.

  To add an event, copy this shape into the list below:
    { title: "Event name", date: "2026-11-02", time: "18:30-21:00", venue: "Full address", audience: "Who it is for" },
  Keep only the next three. Dates use YYYY-MM-DD.
*/

export type ApexEvent = {
  title: string
  date: string
  time: string
  venue: string
  audience?: string
}

export const upcomingEvents: ApexEvent[] = []

/** Shown while the list above is empty. Every Gantt event row is still "Needs decision" (14.10.2026). */
export const eventsMissing = missing(
  "The next three events: title, date, start and end time, full venue address, audience",
  "Dvir Maimon (with Avishag Bohbot for dates)",
)
