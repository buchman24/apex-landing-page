import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.ADD_MEMBER_PASSWORD;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN_WRITE;
const REPO = 'buchman24/apex-landing-page';
const FILE_PATH = 'data/members.ts';

async function uploadPhotoToGithub(file: File, name: string): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') + '.' + ext;
  const githubPath = `public/team/${filename}`;

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');

  // Check if file already exists (to get sha for update)
  let sha: string | undefined;
  const check = await fetch(`https://api.github.com/repos/${REPO}/contents/${githubPath}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
  });
  if (check.ok) {
    const existing = await check.json();
    sha = existing.sha;
  }

  const body: any = { message: `Add photo for ${name}`, content: base64 };
  if (sha) body.sha = sha;

  const resp = await fetch(`https://api.github.com/repos/${REPO}/contents/${githubPath}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error('Photo upload failed: ' + (err.message || resp.status));
  }

  return `/team/${filename}`;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = formData.get('password') as string;
  const name = (formData.get('name') as string)?.trim();
  const linkedinUrl = (formData.get('linkedinUrl') as string)?.trim();
  const jobTitle = (formData.get('jobTitle') as string)?.trim();
  const photo = formData.get('photo') as File | null;

  if (!password || password !== PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  if (!name || !linkedinUrl || !jobTitle || !photo || photo.size === 0) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // Upload photo to public/team/
    const imageSrc = await uploadPhotoToGithub(photo, name);

    // Fetch current members.ts
    const fileResp = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );
    if (!fileResp.ok) throw new Error('Failed to fetch members.ts');
    const fileData = await fileResp.json();
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const sha = fileData.sha;

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 14);
    const cleanLinkedin = linkedinUrl.replace(/\/+$/, '');
    const newEntry = `  { id: "${id}", name: "${name}", description: "${jobTitle}", imageSrc: "${imageSrc}", linkedinUrl: "${cleanLinkedin}" },\n`;

    const marker = 'export const allMembers';
    const markerIdx = content.indexOf(marker);
    if (markerIdx === -1) throw new Error('Could not find allMembers marker');
    const closingIdx = content.lastIndexOf('];', markerIdx);
    if (closingIdx === -1) throw new Error('Could not find closing bracket');

    const updated = content.substring(0, closingIdx) + newEntry + content.substring(closingIdx);

    const commitResp = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Add community member: ${name}`,
          content: Buffer.from(updated).toString('base64'),
          sha
        })
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
