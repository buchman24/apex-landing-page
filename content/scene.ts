/*
  Labels that float in the 3D scene, pinned to points on the mountain.
  They repeat words that are already on the page (EXACT copy from the brief),
  so screen readers skip them.

  Where they show: the pinned home hero (data-scene-hero) shows "talent" and "frontier"
  while its first scroll drives talent in and technology out. Each SceneBreak names the
  keys it shows, e.g. <SceneBreak scene="route" labels="rails" />. Over the static poster
  (reduced motion, no WebGL) only "talent" and "frontier" appear, and only on the home page.
*/
export const sceneLabels = {
  /** Where the talent particles enter, at the foot of the range. */
  talent: "Talent goes in.",
  /** On the route that climbs to the summit. */
  rails: "The rails",
  /** On the orbit above the summit, where frontier technology leaves. */
  frontier: "Frontier technology comes out.",
}
