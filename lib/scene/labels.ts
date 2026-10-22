import { ARC, CLIMB, ROUTE } from "./anchors"

export type LabelKey = "talent" | "rails" | "frontier"
export type Point = { x: number; y: number }
/** Candidate anchor points per label, best first, in CSS pixels. */
export type LabelCandidates = Record<LabelKey, Point[]>

function project(VP: Float32Array, p: ArrayLike<number>, i: number, W: number, H: number): Point | null {
  const x = p[i], y = p[i + 1], z = p[i + 2]
  const cw = VP[3] * x + VP[7] * y + VP[11] * z + VP[15]
  if (cw <= 0.05) return null
  const cx = (VP[0] * x + VP[4] * y + VP[8] * z + VP[12]) / cw
  const cy = (VP[1] * x + VP[5] * y + VP[9] * z + VP[13]) / cw
  return { x: ((cx + 1) / 2) * W, y: ((1 - cy) / 2) * H }
}

/** Points of a path with t in [from, to], ordered from `best` outwards, kept when inside the frame. */
function along(VP: Float32Array, path: Float32Array, W: number, H: number, from: number, to: number, best: number): Point[] {
  const n = path.length / 3
  const picks: { p: Point; d: number }[] = []
  for (let k = 0; k < n; k++) {
    const t = k / (n - 1)
    if (t < from || t > to) continue
    const p = project(VP, path, k * 3, W, H)
    if (!p || p.x < W * 0.03 || p.x > W * 0.97 || p.y < H * 0.08 || p.y > H * 0.96) continue
    picks.push({ p, d: Math.abs(t - best) })
  }
  return picks.sort((a, b) => a.d - b.d).map((c) => c.p)
}

/**
 * Where the labels may sit for a given view, best first. W and H are CSS pixels; works for
 * any screen shape. The page takes the first candidate whose text fits without covering
 * other text (components/scene/SceneCanvas.tsx).
 * - "Talent goes in.": along the talent path, from where it enters the frame.
 * - "Frontier technology comes out.": along an output arc, from its middle outwards.
 * - "The rails": along the route, from its middle outwards.
 */
export function labelCandidates(VP: Float32Array, W: number, H: number): LabelCandidates {
  return {
    // From where the path enters the frame. On phones that is already on the route, so it may go high.
    talent: along(VP, CLIMB, W, H, 0, 0.9, 0),
    frontier: along(VP, ARC, W, H, 0.18, 0.92, 0.5),
    rails: along(VP, ROUTE, W, H, 0.12, 0.92, 0.5),
  }
}
