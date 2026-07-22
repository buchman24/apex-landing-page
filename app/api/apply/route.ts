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

    const resp = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        linkedin,
        militaryTrack,
        track: trackName,
        why,
      }),
      redirect: "follow",
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("Apps Script error:", resp.status, detail);
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
