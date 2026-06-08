import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.ADD_MEMBER_PASSWORD;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN_WRITE;
const REPO = 'buchman24/apex-landing-page';
const FILE_PATH = 'data/members.ts';

export async function POST(req: NextRequest) {
  const { password, name, linkedinUrl, jobTitle, photoUrl } = await req.json();

  if (!password || password !== PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  if (!name || !linkedinUrl) {
    return NextResponse.json({ error: 'Name and LinkedIn URL are required' }, { status: 400 });
  }

  try {
    // Fetch current file from GitHub
    const fileResp = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );
    if (!fileResp.ok) throw new Error('Failed to fetch members.ts from GitHub');
    const fileData = await fileResp.json();
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const sha = fileData.sha;

    // Generate a unique ID from name
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 14);
    const description = jobTitle?.trim() || '';
    const imageSrc = photoUrl?.trim() || '/team/placeholder.png';
    const cleanLinkedin = linkedinUrl.trim().replace(/\/+$/, '');

    const newEntry = `  { id: "${id}", name: "${name}", description: "${description}", imageSrc: "${imageSrc}", linkedinUrl: "${cleanLinkedin}" },\n`;

    // Insert just before the closing ]; of communityMembers (before allMembers export)
    const marker = 'export const allMembers';
    const markerIdx = content.indexOf(marker);
    if (markerIdx === -1) throw new Error('Could not find allMembers marker in members.ts');
    const closingIdx = content.lastIndexOf('];', markerIdx);
    if (closingIdx === -1) throw new Error('Could not find communityMembers closing bracket');

    const updated = content.substring(0, closingIdx) + newEntry + content.substring(closingIdx);

    // Commit to GitHub
    const commitResp = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add community member: ${name}`,
          content: Buffer.from(updated).toString('base64'),
          sha,
        }),
      }
    );
    if (!commitResp.ok) {
      const err = await commitResp.json();
      throw new Error(err.message || 'GitHub commit failed');
    }

    return NextResponse.json({ success: true, name });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
