#!/usr/bin/env node
/**
 * Renders public/scene/poster-wide.webp and poster-tall.webp from the live WebGL scene, so the
 * static poster (first paint, reduced motion, no WebGL) matches the 3D hero: talent flowing in,
 * the first lines leaving the summit, the flag on the peak.
 *
 * Local tool, not part of the build. Runs headless Chrome through playwright-core:
 *   node scripts/render-posters.mjs
 * Env: CHROME_PATH (default: Google Chrome on macOS), PLAYWRIGHT_CORE (path to playwright-core
 * if it is not resolvable from this repo), HERO (hero progress to capture, default 0.42).
 */
import { execFileSync } from "node:child_process"
import { createServer } from "node:http"
import { mkdirSync, readFileSync, writeFileSync, mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"

const root = resolve(new URL("..", import.meta.url).pathname)
const work = mkdtempSync(join(tmpdir(), "apex-posters-"))
const SIZES = { "poster-wide": [1600, 900], "poster-tall": [900, 1600] }
const HERO = Number(process.env.HERO ?? 0.42)
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

writeFileSync(
  join(work, "entry.ts"),
  `import { startScene } from ${JSON.stringify(join(root, "lib/scene/engine.ts"))}
const q = new URLSearchParams(location.search)
const [w, h] = [Number(q.get("w")), Number(q.get("h"))]
Object.defineProperty(window, "devicePixelRatio", { value: 1 })
const c = document.querySelector("canvas")!
c.style.width = w + "px"
c.style.height = h + "px"
c.getContext("webgl2", { preserveDrawingBuffer: true, antialias: true, alpha: false, depth: true })
await startScene(c, { detail: "high", pointer: false, getProgress: () => ({ from: "base", to: "base", t: 0, hero: ${HERO} }) })
;(window as any).__ready = true
`,
)
writeFileSync(
  join(work, "index.html"),
  `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#f4f3ef}canvas{display:block}</style></head>
<body><canvas></canvas><script type="module" src="bundle.js"></script></body></html>`,
)
execFileSync("npx", ["-y", "esbuild@0.24.0", join(work, "entry.ts"), "--bundle", "--format=esm", "--target=es2022", `--outfile=${join(work, "bundle.js")}`], { stdio: "inherit" })

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost")
  const file = url.pathname === "/" ? "index.html" : url.pathname.slice(1)
  try {
    const body = readFileSync(join(work, file))
    res.writeHead(200, { "Content-Type": file.endsWith(".js") ? "text/javascript" : "text/html" }).end(body)
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise((ok) => server.listen(0, ok))
const port = server.address().port

const pw = process.env.PLAYWRIGHT_CORE ? await import(pathToFileURL(join(process.env.PLAYWRIGHT_CORE, "index.mjs")).href) : await import("playwright-core")
const browser = await pw.chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--hide-scrollbars"],
})
mkdirSync(join(root, "public/scene"), { recursive: true })
try {
  for (const [name, [w, h]] of Object.entries(SIZES)) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
    page.on("pageerror", (e) => console.error(name, e.message))
    await page.goto(`http://localhost:${port}/index.html?w=${w}&h=${h}`)
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 })
    // Let the intro settle and the first lines leave the summit.
    await page.waitForTimeout(6500)
    const data = await page.evaluate(() => document.querySelector("canvas").toDataURL("image/webp", 0.74))
    const buf = Buffer.from(data.split(",")[1], "base64")
    writeFileSync(join(root, "public/scene", `${name}.webp`), buf)
    console.log(`wrote public/scene/${name}.webp ${(buf.length / 1024).toFixed(1)} KB`)
    await page.close()
  }
} finally {
  await browser.close()
  server.close()
}
