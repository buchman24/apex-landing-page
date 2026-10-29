/**
 * Turns the terrain into GPU-ready arrays. Runs inside a Web Worker
 * (scene.worker.ts) so the main thread never blocks; the engine falls back to
 * calling it directly if workers are unavailable.
 */
import { along, buildTerrain } from "./terrain.mjs"

/** Number of output arcs that fan out of the summit ("frontier technology comes out"). */
export const ARCS = 7

export type SceneGeometry = {
  /** Interleaved per vertex: pos(3) normal(3) bary(3) info(3) = 12 floats. info: face random, border fade, distance to route. */
  surface: Float32Array
  /** Vertex positions for pointer picking. */
  verts: Float32Array
  ridge: Float32Array
  route: Float32Array
  /** The talent path: from beyond the left edge, along the foothills and up the route into the summit. */
  climb: Float32Array
  /** Fraction of the climb (by length) where the foothill inflow ends and the route begins. */
  routeStart: number
  /** ARCS output arcs, 64 points each, concatenated. */
  arcs: Float32Array
  peaks: Float32Array
  summit: [number, number, number]
}

export function buildGeometry(detail: "low" | "high"): SceneGeometry {
  const T = buildTerrain({ detail })
  const P = T.positions
  const F = T.fade
  const tris = T.tris
  const route = along(T.route, 64)
  const nTri = tris.length / 3
  const surface = new Float32Array(nTri * 3 * 12)
  let seed = 1234567
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  let o = 0
  for (let t = 0; t < nTri; t++) {
    const a = tris[t * 3], b = tris[t * 3 + 1], c = tris[t * 3 + 2]
    const ax = P[a * 3], ay = P[a * 3 + 1], az = P[a * 3 + 2]
    const bx = P[b * 3], by = P[b * 3 + 1], bz = P[b * 3 + 2]
    const cx = P[c * 3], cy = P[c * 3 + 1], cz = P[c * 3 + 2]
    // Face normal, pointing up.
    const ux = bx - ax, uy = by - ay, uz = bz - az
    const vx = cx - ax, vy = cy - ay, vz = cz - az
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx
    const nl = Math.hypot(nx, ny, nz) || 1
    nx /= nl; ny /= nl; nz /= nl
    if (ny < 0) { nx = -nx; ny = -ny; nz = -nz }
    // Distance from the face centre to the route (xz), drives the "rails build the mountain" fill.
    const mx = (ax + bx + cx) / 3, mz = (az + bz + cz) / 3
    let best = 1e9
    for (let i = 0; i < route.length; i += 3) {
      const d = (route[i] - mx) ** 2 + (route[i + 2] - mz) ** 2
      if (d < best) best = d
    }
    const info0 = rand()
    const info1 = Math.min(F[a], F[b], F[c])
    const info2 = Math.sqrt(best)
    const idx = [a, b, c]
    for (let k = 0; k < 3; k++) {
      const v = idx[k]
      surface[o++] = P[v * 3]; surface[o++] = P[v * 3 + 1]; surface[o++] = P[v * 3 + 2]
      surface[o++] = nx; surface[o++] = ny; surface[o++] = nz
      surface[o++] = k === 0 ? 1 : 0; surface[o++] = k === 1 ? 1 : 0; surface[o++] = k === 2 ? 1 : 0
      surface[o++] = info0; surface[o++] = info1; surface[o++] = info2
    }
  }
  const ridge = new Float32Array(T.ridgeDots.length * 3)
  T.ridgeDots.forEach((v, i) => {
    ridge[i * 3] = P[v * 3]; ridge[i * 3 + 1] = P[v * 3 + 1] + 0.02; ridge[i * 3 + 2] = P[v * 3 + 2]
  })
  const H = T.height
  // Talent enters from just beyond the left edge of the hero frame, at the depth of the range,
  // sweeps along the foothills and joins the route up to the summit.
  const lead: number[] = []
  const ctrl = [[-30, -7], [-20, -4.8], [-12.5, -1.2], [-7, 2.6], [-3, 5.5]]
  for (let c = 0; c < ctrl.length - 1; c++)
    for (let i = 0; i < 8; i++) {
      const k = i / 8
      const x = ctrl[c][0] + (ctrl[c + 1][0] - ctrl[c][0]) * k, z = ctrl[c][1] + (ctrl[c + 1][1] - ctrl[c][1]) * k
      lead.push(x, Math.max(H(x, z), 0.2) + 0.45, z)
    }
  const climbRaw = new Float32Array([...lead, ...T.route])
  const climb = along(climbRaw, 260)
  const len = (a: ArrayLike<number>) => {
    let L = 0
    for (let i = 3; i < a.length; i += 3) L += Math.hypot(a[i] - a[i - 3], a[i + 1] - a[i - 2], a[i + 2] - a[i - 1])
    return L
  }
  const routeStart = len(lead) / len(climbRaw)
  // Output arcs: an ordered fan leaving the summit and bending out to the right, into the sky.
  const S = T.summit
  const arcs = new Float32Array(ARCS * 64 * 3)
  for (let k = 0; k < ARCS; k++) {
    const th = (22 + (k * 80) / (ARCS - 1)) * (Math.PI / 180)
    const L = 10 + k * 0.8
    const end = [S[0] + Math.sin(th) * L, S[1] + 1.2 + Math.cos(th) * L * 0.42, S[2] - 3 - k * 0.7]
    const c1 = [S[0] + 0.25, S[1] + 3.1, S[2] - 0.2]
    const c2 = [end[0] - Math.sin(th) * 2.6, end[1] + 1.1, end[2] + 0.5]
    for (let i = 0; i < 64; i++) {
      const t = i / 63, u = 1 - t
      for (let j = 0; j < 3; j++) {
        arcs[(k * 64 + i) * 3 + j] = u * u * u * (S[j] + (j === 1 ? 0.15 : 0)) + 3 * u * u * t * c1[j] + 3 * u * t * t * c2[j] + t * t * t * end[j]
      }
    }
  }
  return {
    surface,
    verts: new Float32Array(P),
    ridge,
    route: along(T.route, 120),
    climb,
    routeStart,
    arcs,
    peaks: T.peaks,
    summit: T.summit,
  }
}

export function transferables(g: SceneGeometry): ArrayBuffer[] {
  return [g.surface, g.verts, g.ridge, g.route, g.climb, g.arcs, g.peaks].map((a) => a.buffer as ArrayBuffer)
}
