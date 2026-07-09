import { NextResponse } from "next/server";

// Applications from the track sign-up questionnaire land in the
// "APEX Track Applications" Notion database. Configure via env:
//   NOTION_TOKEN               - internal integration secret (starts with "ntn_"/"secret_")
//   NOTION_APPLICATIONS_DB_ID  - the applications database id
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_APPLICATIONS_DB_ID;

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

    if (!name || !email || !track) {
      return NextResponse.json(
        { error: "Name, email, and track are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    const trackName = track === "Founders" ? "Founders" : "Architects";

    if (!NOTION_TOKEN || !NOTION_DB_ID) {
      // Fail loudly in logs, but don't leak config state to the client.
      console.error("Missing NOTION_TOKEN or NOTION_APPLICATIONS_DB_ID env var");
      return NextResponse.json(
        { error: "Applications are temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const properties: Record<string, unknown> = {
      Name: { title: [{ text: { content: name } }] },
      Email: { email },
      "Track Interested": { select: { name: trackName } },
      Status: { select: { name: "New" } },
    };
    if (linkedin) properties["LinkedIn Profile"] = { url: linkedin };
    if (militaryTrack) properties["Military Track"] = { rich_text: [{ text: { content: militaryTrack } }] };
    if (why) properties["Why"] = { rich_text: [{ text: { content: why } }] };

    const resp = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: NOTION_DB_ID }, properties }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("Notion API error:", resp.status, detail);
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
