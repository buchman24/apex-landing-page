// @ts-check
/**
 * APEX scene geometry: a seeded wireframe mountain range, the climbing route,
 * the summit and the orbit arcs, plus the tiny camera maths shared by the
 * WebGL engine (lib/scene/engine.ts) and the poster script
 * (scripts/render-poster.mjs). Pure and deterministic: no DOM, no globals,
 * the same seed always yields the same numbers, so the static poster and the
 * live scene line up.
 *
 * World units: y is up, the camera looks roughly toward -z, the main peak sits
 * at x≈5 and the lower range rolls away to negative x.
 */

/** @typedef {[number, number, number]} Vec3 */
/** @typedef {'low' | 'high'} Detail */
/**
 * @typedef {object} Terrain
 * @property {Float32Array} positions xyz per vertex
 * @property {Uint32Array} edges vertex index pairs, each edge once
 * @property {Uint32Array} ridgeDots vertex indices that get a dot
 * @property {Float32Array} route polyline xyz, foothill to summit
 * @property {Float32Array} inflow polyline xyz, left foreground to route start
 * @property {Vec3} summit
 * @property {Float32Array[]} orbits [big orbit arc, launch arc from the summit]
 * @property {Float32Array} launch polyline xyz the emitted particles follow
 * @property {Float32Array} nodes xyz of the orbit nodes
 * @property {Float32Array} fade per-vertex border fade (0..1)
 * @property {Uint32Array} tris vertex index triples (faceted surface)
 * @property {Float32Array} peaks xyz of every peak apex except the summit
 * @property {(x: number, z: number) => number} height the height field
 */
/**
 * Tangent-space framing (an off-axis frustum at distance 1).
 * @typedef {{ eye: Vec3, target: Vec3, l: number, r: number, b: number, t: number }} Frame
 */

export const SEED = 2025;

/** Colours shared by the engine and the poster (hex, from the Oct 2026 deck). */
export const COLORS = {
  paper: '#F4F3EF',
  near: '#7F98B6',
  far: '#C8D4E0',
  steel: '#8FA4BC',
  slate: '#4A6585',
  navy: '#25346F',
  blue: '#2E61AE',
  node: '#244D77',
};

/**
 * Line shading, mirrored by the engine's vertex shader and by the poster.
 * near/fog: the foreground fades in and the distance fades out to paper,
 * both in multiples of the eye→target distance.
 * mist: valleys fade (min factor, y where it starts lifting, y where it is gone).
 * floor: the bottom of the frame dissolves between these NDC y values.
 * line: base alpha of a terrain line.
 */
export const LOOK = { near: [0.4, 0.7], fog: [0.6, 2.1], mist: [0.3, 0.4, 3.6], floor: [-1.05, -0.45], line: 0.62 };

/**
 * Terrain line alpha and fog mix (0 near, 1 far) at a vertex.
 * @param {number} x @param {number} y @param {number} z @param {number} w border fade of the vertex
 * @param {ArrayLike<number>} eye @param {number} D eye→target distance @param {number} ny NDC y on screen
 */
export function shade(x, y, z, w, eye, D, ny) {
  const d = Math.hypot(x - eye[0], y - eye[1], z - eye[2]);
  const f = smooth(LOOK.fog[0] * D, LOOK.fog[1] * D, d);
  const [m0, y0, y1] = LOOK.mist;
  const k = smooth(LOOK.near[0] * D, LOOK.near[1] * D, d);
  return [LOOK.line * w * k * smooth(LOOK.floor[0], LOOK.floor[1], ny) * (1 - f) * (m0 + (1 - m0) * smooth(y0, y1, y)), f];
}

/**
 * Summit ring radii in world units for an eye→summit distance: they shrink
 * slower than perspective so close-ups do not get huge rings.
 * @param {number} d
 */
export function rings(d) {
  const k = Math.pow(d / 24, 0.55);
  return [0.7 * k, 1.2 * k, 1.85 * k];
}

/** @param {number} a @param {number} b @param {number} x */
export function smooth(a, b, x) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

// x, z, height, radius, sharpness
const PEAKS = [
  [5, -2, 7.4, 4, 1.05], // the summit
  [1.2, 1.8, 3.5, 2, 1.15], // shoulder, front left of the summit
  [10.5, 2.5, 2.6, 2.4, 1.3],
  [11, -9, 5, 3.2, 1.2],
  [17, -4, 3.2, 2.8, 1.3],
  [15, -18, 4.6, 3.6, 1.25],
  [22, -12, 3.6, 3.4, 1.3],
  [0.5, -12, 4.2, 3.2, 1.25],
  [6, -21, 4.8, 3.8, 1.25],
  [-4, -7, 2.8, 2.4, 1.25],
  [-9, -13, 3.4, 3, 1.25],
  [-14, -8, 2.4, 2.4, 1.3],
  [-19, -16, 3.2, 3.2, 1.3],
  [-25, -10, 2.4, 3, 1.3],
  [-7, -21, 3.8, 3.6, 1.25],
  [-16, -26, 3.6, 3.8, 1.3],
  [-28, -22, 3, 3.6, 1.3],
  [-2, -2, 1.6, 2, 1.4],
  [-10, -2, 1.3, 2.4, 1.4],
  [-20, -3, 1.6, 2.6, 1.4],
  [-3, 5.5, 1, 1.8, 1.5], // the foothill where the route starts
  [-9, 8, 0.8, 2.4, 1.5],
  [3.5, 9, 0.7, 2.2, 1.5],
];

/**
 * The mesh lives on a trapezoid aligned with the hero camera: rows at
 * geometric distances, columns spreading with the frustum, so triangles keep
 * a similar size on screen. ox/oz: origin, yaw: heading, d: near/far distance,
 * wl/wr: half widths to the left/right as (slope, offset).
 */
const GRID = { ox: -4, oz: 21, yaw: 0.08, d: [11, 54], wl: [0.64, 3], wr: [0.78, 5] };

/** Mulberry32 PRNG. @param {number} seed */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** @param {number} x @param {number} y @param {number} s */
function hash(x, y, s) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Value noise in [0,1). @param {number} x @param {number} y @param {number} s */
function noise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y);
  let fx = x - ix, fy = y - iy;
  fx = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
  fy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
  const a = hash(ix, iy, s), b = hash(ix + 1, iy, s);
  const c = hash(ix, iy + 1, s), d = hash(ix + 1, iy + 1, s);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

/** fBm in about [-1,1]. @param {number} x @param {number} y @param {number} s @param {number} o */
function fbm(x, y, s, o) {
  let v = 0, a = 0.5;
  for (let i = 0; i < o; i++) {
    v += a * (noise(x, y, s + i) * 2 - 1);
    x = x * 2.03 + 17.1;
    y = y * 2.03 - 9.7;
    a *= 0.5;
  }
  return v;
}

/** Ridged noise in [0,1]. @param {number} x @param {number} y @param {number} s */
function ridged(x, y, s) {
  const n = 1 - Math.abs(noise(x, y, s) * 2 - 1);
  const m = 1 - Math.abs(noise(x * 2.1 + 5.3, y * 2.1 - 1.7, s + 7) * 2 - 1);
  return n * n * 0.7 + m * m * 0.3;
}

/** @param {number} seed @returns {(x: number, z: number) => number} */
export function heightField(seed = SEED) {
  return (x, z) => {
    let v = 0, m = 0;
    for (let i = 0; i < PEAKS.length; i++) {
      const P = PEAKS[i], dx = x - P[0], dz = (z - P[1]) * 1.1, d2 = dx * dx + dz * dz;
      if (d2 > 30 * P[3] * P[3]) continue;
      const d = Math.sqrt(d2), a = Math.atan2(dz, dx);
      const k = 1 + (i ? 1 : 0.55) * (0.17 * Math.sin(3 * a + i * 1.7) + 0.09 * Math.sin(5 * a + i * 2.9) + 0.05 * Math.sin(9 * a + i));
      const e = Math.exp(-Math.pow(d / (P[3] * k), P[4]));
      v += P[2] * e;
      if (e > m) m = e;
    }
    v *= 1 + 0.24 * m * (ridged(x * 0.5, z * 0.5, seed) - 0.5);
    return v + 0.42 + 0.55 * fbm(x * 0.15, z * 0.15, seed + 31, 3) + 0.12 * fbm(x * 0.7, z * 0.7, seed + 53, 2);
  };
}

/**
 * Catmull-Rom through xz control points, resampled to n points by arc length.
 * @param {number[][]} c @param {number} n
 */
function spline(c, n) {
  /** @type {number[][]} */
  const dense = [];
  for (let i = 0; i < c.length - 1; i++) {
    const p0 = c[Math.max(i - 1, 0)], p1 = c[i], p2 = c[i + 1], p3 = c[Math.min(i + 2, c.length - 1)];
    for (let k = 0; k < 24; k++) {
      const t = k / 24, t2 = t * t, t3 = t2 * t;
      dense.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (p2[j] - p0[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  dense.push(c[c.length - 1]);
  return resample(dense, n, 2);
}

/** @param {number[][]} pts @param {number} n @param {number} dim */
function resample(pts, n, dim) {
  const L = [0];
  for (let i = 1; i < pts.length; i++) {
    let s = 0;
    for (let j = 0; j < dim; j++) s += (pts[i][j] - pts[i - 1][j]) ** 2;
    L.push(L[i - 1] + Math.sqrt(s));
  }
  /** @type {number[][]} */
  const out = [];
  let k = 1;
  for (let i = 0; i < n; i++) {
    const s = (L[L.length - 1] * i) / (n - 1);
    while (k < L.length - 1 && L[k] < s) k++;
    const f = (s - L[k - 1]) / (L[k] - L[k - 1] || 1);
    out.push(pts[k].map((v, j) => pts[k - 1][j] + (v - pts[k - 1][j]) * f));
  }
  return out;
}

/** @param {number[][]} pts */
const flat = (pts) => new Float32Array(pts.flat());

/**
 * Resample an xyz polyline to n points evenly spaced by arc length.
 * @param {Float32Array} poly @param {number} n
 */
export function along(poly, n) {
  /** @type {number[][]} */
  const pts = [];
  for (let i = 0; i < poly.length; i += 3) pts.push([poly[i], poly[i + 1], poly[i + 2]]);
  return flat(resample(pts, n, 3));
}

/**
 * Build the mountain range. 'low' ≈ 3.4k edges (phones), 'high' ≈ 8.9k (desktops).
 * @param {{ detail?: Detail, seed?: number }} [opts]
 * @returns {Terrain}
 */
export function buildTerrain({ detail = 'high', seed = SEED } = {}) {
  const hi = detail === 'high';
  const NU = hi ? 116 : 68, NV = hi ? 56 : 34;
  const rnd = rng(seed);
  const H = heightField(seed);
  const n = NU * NV;
  const P = new Float32Array(n * 3), fade = new Float32Array(n);
  const { ox, oz, yaw, d: [d0, d1], wl, wr } = GRID;
  const fx = Math.sin(yaw), fz = -Math.cos(yaw);
  const [sx, sz] = [PEAKS[0][0], PEAKS[0][1]];
  for (let j = 0; j < NV; j++)
    for (let i = 0; i < NU; i++) {
      const a = j * NU + i;
      let u = i / (NU - 1), v = j / (NV - 1);
      if (i && i < NU - 1) u += ((rnd() - 0.5) * 0.7) / (NU - 1);
      if (j && j < NV - 1) v += ((rnd() - 0.5) * 0.7) / (NV - 1);
      const d = d0 * Math.pow(d1 / d0, v);
      const lat = -(wl[0] * d + wl[1]) + u * ((wl[0] + wr[0]) * d + wl[1] + wr[1]);
      let x = ox + fx * d - fz * lat, z = oz + fz * d + fx * lat;
      // Finer triangles around the summit.
      const qx = x - sx, qz = z - sz, c = 1 - 0.55 * Math.exp(-(qx * qx + qz * qz) / 40);
      P[a * 3] = sx + qx * c;
      P[a * 3 + 2] = sz + qz * c;
      fade[a] = smooth(0, 0.12, u) * smooth(1, 0.86, u) * smooth(0, 0.08, v) * smooth(1, 0.8, v);
    }
  // A vertex exactly on every apex keeps the peaks sharp.
  /** @type {number[]} */
  const apex = [];
  for (const [px, pz] of PEAKS) {
    let best = -1, bd = 1e9;
    for (let a = 0; a < n; a++) {
      const dd = (P[a * 3] - px) ** 2 + (P[a * 3 + 2] - pz) ** 2;
      if (dd < bd) { bd = dd; best = a; }
    }
    if (bd < 2) {
      P[best * 3] = px;
      P[best * 3 + 2] = pz;
      apex.push(best);
    }
  }
  for (let a = 0; a < n; a++) P[a * 3 + 1] = H(P[a * 3], P[a * 3 + 2]);

  /** @type {number[]} */
  const E = [];
  /** @type {number[]} */
  const TR = [];
  for (let j = 0; j < NV; j++)
    for (let i = 0; i < NU; i++) {
      const a = j * NU + i;
      if (i < NU - 1) E.push(a, a + 1);
      if (j < NV - 1) E.push(a, a + NU);
      if (i < NU - 1 && j < NV - 1) {
        const b = a + 1, c = a + NU, d = c + 1;
        const ad = (P[a * 3] - P[d * 3]) ** 2 + (P[a * 3 + 2] - P[d * 3 + 2]) ** 2;
        const bc = (P[b * 3] - P[c * 3]) ** 2 + (P[b * 3 + 2] - P[c * 3 + 2]) ** 2;
        if (rnd() < 0.3 ? rnd() < 0.5 : ad < bc) {
          E.push(a, d);
          TR.push(a, b, d, a, d, c);
        } else {
          E.push(b, c);
          TR.push(a, b, c, b, d, c);
        }
      }
    }

  // Ridge dots: apexes plus convex, high vertices.
  const dots = new Set(apex);
  for (let j = 1; j < NV - 1; j++)
    for (let i = 1; i < NU - 1; i++) {
      const a = j * NU + i, y = P[a * 3 + 1];
      const avg = (P[a * 3 - 2] + P[a * 3 + 4] + P[(a - NU) * 3 + 1] + P[(a + NU) * 3 + 1]) / 4;
      if (y > 1.8 && y - avg > 0.12 && rnd() < (hi ? 0.35 : 0.55)) dots.add(a);
    }

  const S = /** @type {Vec3} */ ([sx, H(sx, sz), sz]);

  // The route: a left foreground foothill, across the shoulder saddle, up the
  // west ridge to the summit, floating slightly above the surface.
  const xz = spline([[-3, 5.5], [-1.2, 3.4], [0, 1], [1.9, -0.8], [3.5, -1.6], [sx, sz]], 64);
  const ry = xz.map(([x, z], i) => H(x, z) + 0.3 * (1 - i / 63));
  for (let pass = 0; pass < 6; pass++)
    for (let i = 1; i < 63; i++) ry[i] = Math.max(H(xz[i][0], xz[i][1]) + 0.08, (ry[i - 1] + ry[i] * 2 + ry[i + 1]) / 4);
  const route = xz.map(([x, z], i) => [x, ry[i], z]);
  route[63] = [...S];

  // Talent enters from the left foreground and joins the route.
  const inflow = spline([[-19, 10.5], [-13, 9.4], [-7.5, 7.6], [-3, 5.5]], 24).map(([x, z]) => [x, H(x, z) + 0.3, z]);

  // Orbit A: a large tilted circle whose centre sits right of and below the summit.
  const R = 7.2, C = [S[0] + 2.2, S[1] - 3.4, S[2] - 0.6];
  const tilt = 0.32, yw = 0.26;
  const e1 = [Math.cos(yw), 0, -Math.sin(yw)];
  const e2 = [Math.sin(yw) * Math.sin(tilt), Math.cos(tilt), Math.cos(yw) * Math.sin(tilt)];
  /** @param {number} th */
  const orbit = (th) => [0, 1, 2].map((j) => C[j] + R * (Math.cos(th) * e1[j] + Math.sin(th) * e2[j]));
  /** @type {number[][]} */
  const A = [];
  for (let i = 0; i <= 72; i++) A.push(orbit(2.95 - (2.6 * i) / 72));
  // Launch arc: straight up off the summit, pitching over into the orbit.
  const thJ = 1.72, J = orbit(thJ);
  const tan = [0, 1, 2].map((j) => Math.sin(thJ) * e1[j] - Math.cos(thJ) * e2[j]);
  const c1 = [S[0] - 0.2, S[1] + 2.2, S[2] + 0.2];
  const c2 = J.map((v, j) => v - tan[j] * 2.2);
  /** @type {number[][]} */
  const B = [];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32, u = 1 - t;
    B.push([0, 1, 2].map((j) => u * u * u * S[j] + 3 * u * u * t * c1[j] + 3 * u * t * t * c2[j] + t * t * t * J[j]));
  }
  /** @type {number[][]} */
  const tail = [];
  for (let i = 1; i <= 40; i++) tail.push(orbit(thJ - (1.55 * i) / 40));

  return {
    positions: P,
    fade,
    edges: new Uint32Array(E),
    ridgeDots: new Uint32Array([...dots]),
    route: flat(route),
    inflow: flat(inflow),
    summit: S,
    orbits: [flat(A), flat(B)],
    launch: flat(resample(B.concat(tail), 64, 3)),
    nodes: flat([orbit(2.35), orbit(1.18)]),
    tris: new Uint32Array(TR),
    peaks: flat(PEAKS.slice(1).filter((P) => P[2] > 2.3).map((P) => [P[0], H(P[0], P[1]), P[1]])),
    height: H,
  };
}

/* ---------------------------------------------------------------- camera */
export { WIDE, TALL, BREAK, frame, lookAt, perspective } from "./camera.mjs";
