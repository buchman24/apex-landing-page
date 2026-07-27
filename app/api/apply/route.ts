import { NextResponse } from "next/server";

// Track sign-up applications are appended to the "APEX Track Applications (Website)"
// Google Sheet (in Apex's Drive) via a Google Apps Script web app bound to that sheet.
// Configure via env:
//   GOOGLE_APPS_SCRIPT_URL - the Apps Script web-app deployment URL (…/exec)
const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

type ApplyBody = {
  name?: string;
  email?: string;
  linkedin?: string;
  militaryTrack?: string;
  track?: string;
  why?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplyBody;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const linkedin = (body.linkedin || "").trim();
    const militaryTrack = (body.militaryTrack || "").trim();
    const track = (body.track || "").trim();
    const why = (body.why || "").trim();

    if (!name || !email || !track || !linkedin) {
      return NextResponse.json(
        { error: "Name, email, LinkedIn profile, and track are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    const trackName = track === "Founders" ? "Founders" : "Architects";

    if (!APPS_SCRIPT_URL) {
      console.error("Missing GOOGLE_APPS_SCRIPT_URL env var");
      return NextResponse.json(
        { error: "Applications are temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Apps Script accepts the POST, runs doPost (which writes the row), then
    // 302-redirects to a googleusercontent URL to serve its response. That
    // redirect target returns an error page to non-browser clients, so we must
    // NOT follow it — the row is already written by the time we get the 302.
    // We use redirect: "manual" and treat the redirect (opaqueredirect / 3xx)
    // — or a direct 2xx — as a successful submission.
    const resp = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name,
        email,
        linkedin,
        militaryTrack,
        track: trackName,
        why,
      }),
      redirect: "manual",
    });

    const accepted =
      resp.type === "opaqueredirect" ||
      resp.status === 0 ||
      (resp.status >= 200 && resp.status < 400);

    if (!accepted) {
      const detail = await resp.text().catch(() => "");
      console.error("Apps Script error:", resp.status, resp.type, detail.slice(0, 300));
      return NextResponse.json(
        { error: "Something went wrong submitting your application. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("apply route error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
