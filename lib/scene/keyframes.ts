/**
 * Camera keys for the scroll-driven ascent. Pages tag their sections with
 * data-scene="<name>"; the scene interpolates between the keys of the two
 * sections around the middle of the viewport.
 *
 * World: y up, summit at about (5, 8.6, -2), the range rolls toward -x.
 * Every key is composed for 16:9 with the mountain body on the right, so the
 * left ~45% stays quiet for text. Portrait screens reuse the same keys through
 * the pull-back rule in frame() (camera.mjs), which keeps the top as sky.
 *
 * solid: 0 = wireframe blueprint, 1 = filled, lit mountain (the transformation)
 * rails: how much of the route to the summit is built (0..1)
 * hole:  1 = the route shows its missing segment (the missing piece)
 * night: 0 = day (paper sky), 1 = night (navy sky, stars, glowing lines)
 * net:   1 = the AI Commons network lines between the summit and the range
 * pan:   portrait screens only: sideways pan of the frame (see frame()), set so the
 *        summit sits a little right of centre on phones
 */
export type SceneName = "base" | "approach" | "gap" | "route" | "ridge" | "summit" | "beacon" | "aerial"

export type CameraKey = {
  eye: [number, number, number]
  target: [number, number, number]
  fov: number
  solid: number
  rails: number
  hole: number
  night: number
  net: number
  pan: number
}

export const SCENE_ORDER: readonly SceneName[] = ["base", "approach", "gap", "route", "ridge", "summit", "beacon", "aerial"]

/** Night keys: pages switch their text panels to navy for these (see app/globals.css). */
export const NIGHT_SCENES: readonly SceneName[] = ["beacon", "aerial"]

export const KEYFRAMES: Record<SceneName, CameraKey> = {
  // Hero and poster: low and wide from the front left, the whole range.
  base: { eye: [-4, 4.8, 21], target: [-2, 6.6, -4], fov: 36, solid: 0.06, rails: 0.32, hole: 0, night: 0, net: 0, pan: 0 },
  // Closer to the foothills where talent enters and the route starts.
  approach: { eye: [-7.5, 5.4, 14], target: [0.8, 3, -1], fov: 38, solid: 0.18, rails: 0.5, hole: 0, night: 0, net: 0, pan: -0.36 },
  // Above the lower route looking up: the route has a missing segment.
  gap: { eye: [-5.6, 5, 10], target: [3, 5.4, -2.6], fov: 40, solid: 0.32, rails: 0.92, hole: 1, night: 0, net: 0, pan: -0.45 },
  // Following the route uphill: the rails close and the mountain fills in.
  route: { eye: [-3.6, 6.2, 7.4], target: [3.8, 6.6, -2], fov: 41, solid: 0.58, rails: 1, hole: 0, night: 0, net: 0, pan: -0.54 },
  // High on the ridge near the summit.
  ridge: { eye: [-1.4, 9, 5.4], target: [5.2, 7.4, -2.6], fov: 42, solid: 0.82, rails: 1, hole: 0, night: 0, net: 0, pan: -0.63 },
  // The summit and its beacon, fully built.
  summit: { eye: [-1.2, 9.6, 8.4], target: [4.6, 8.8, -2.4], fov: 40, solid: 1, rails: 1, hole: 0, night: 0, net: 0, pan: -0.59 },
  // Night: above the summit looking out, frontier technology leaving on the orbits.
  beacon: { eye: [-4.5, 10.2, 14], target: [2.5, 10.4, -4], fov: 44, solid: 1, rails: 1, hole: 0, night: 1, net: 0, pan: -0.42 },
  // Night aerial over the whole range: the AI Commons network.
  aerial: { eye: [-15, 21, 27], target: [0, 1.8, -5], fov: 38, solid: 1, rails: 1, hole: 0, night: 1, net: 1, pan: -0.39 },
}
