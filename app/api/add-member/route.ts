import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const photo = formData.get("photo") as File;

    if (!password || !name || !linkedinUrl || !jobTitle || !photo) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== process.env.ADD_MEMBER_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = process.env.GITHUB_TOKEN_WRITE!;
    const owner = "buchman24";
    const repo = "apex-landing-page";
    const headers = { Authorization: `token ${token}`, "Content-Type": "application/json" };

    const sanitizedName = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    const ext = photo.name.split(".").pop() || "jpg";
    const photoPath = `public/team/${sanitizedName}.${ext}`;
    const imageSrc = `/team/${sanitizedName}.${ext}`;

    // 1. Create blob for photo
    const photoBuffer = await photo.arrayBuffer();
    const photoBase64 = Buffer.from(photoBuffer).toString("base64");
    const photoBlobResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
      method: "POST", headers,
      body: JSON.stringify({ content: photoBase64, encoding: "base64" }),
    });
    const photoBlob = await photoBlobResp.json();
    if (!photoBlob.sha) throw new Error("Photo blob failed: " + JSON.stringify(photoBlob));

    // 2. Get current members.ts and insert new member
    const membersResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data/members.ts`, { headers });
    const membersData = await membersResp.json();
    let membersContent = Buffer.from(membersData.content.replace(/\n/g, ""), "base64").toString("utf-8");

    const memberId = sanitizedName;
    const newEntry = `  { id: "${memberId}", name: "${name}", description: "${jobTitle}", imageSrc: "${imageSrc}", linkedinUrl: "${linkedinUrl}" },\n`;
    const insertMarker = "export const allMembers";
    const insertIdx = membersContent.lastIndexOf("];", membersContent.indexOf(insertMarker));
    membersContent = membersContent.slice(0, insertIdx) + newEntry + membersContent.slice(insertIdx);

    // 3. Create blob for updated members.ts
    const membersBlobResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
      method: "POST", headers,
      body: JSON.stringify({ content: Buffer.from(membersContent).toString("base64"), encoding: "base64" }),
    });
    const membersBlob = await membersBlobResp.json();
    if (!membersBlob.sha) throw new Error("Members blob failed: " + JSON.stringify(membersBlob));

    // 4. Get current HEAD commit and tree
    const refResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`, { headers });
    const refData = await refResp.json();
    const latestCommitSha = refData.object.sha;
    const commitResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitResp.json();

    // 5. Create new tree with both files
    const treeResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
      method: "POST", headers,
      body: JSON.stringify({
        base_tree: commitData.tree.sha,
        tree: [
          { path: photoPath, mode: "100644", type: "blob", sha: photoBlob.sha },
          { path: "data/members.ts", mode: "100644", type: "blob", sha: membersBlob.sha },
        ],
      }),
    });
    const treeData = await treeResp.json();

    // 6. Create commit
    const newCommitResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
      method: "POST", headers,
      body: JSON.stringify({
        message: `Add community member: ${name}`,
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    });
    const newCommit = await newCommitResp.json();

    // 7. Update branch ref
    const updateRefResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`, {
      method: "PATCH", headers,
      body: JSON.stringify({ sha: newCommit.sha }),
    });
    const updateRef = await updateRefResp.json();
    if (!updateRef.object?.sha) throw new Error("Ref update failed: " + JSON.stringify(updateRef));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("add-member error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
