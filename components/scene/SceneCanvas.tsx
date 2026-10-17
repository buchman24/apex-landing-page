"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { sceneLabels } from "@/content/scene"
import { KEYFRAMES, SCENE_ORDER, type SceneName } from "@/lib/scene/keyframes"
import { frame, perspective } from "@/lib/scene/camera.mjs"
import { labelCandidates, type LabelCandidates, type LabelKey, type Point } from "@/lib/scene/labels"
import type { SceneHandle, SceneProgress } from "@/lib/scene/engine"
import styles from "./scene.module.css"

type Marker = { scene: SceneName; center: number }
type Box = { left: number; top: number; right: number; bottom: number }
type Fit = { p: Point; h: "left" | "right"; v: "up" | "down"; wrap: boolean; box: Box }
type Size = { w: number; h: number }
type Spot = Omit<SceneProgress, "hero">

const KEYS = Object.keys(sceneLabels) as LabelKey[]

/**
 * The always-visible viewport height (mobile toolbar shown). Scroll maths use it instead of
 * innerHeight, which changes while the toolbar slides in and out and made the scene jump.
 */
let visibleH = 0
const vh = () => visibleH || window.innerHeight

function readMarkers(): Marker[] {
  const y = window.scrollY
  return Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"))
    .map((el) => {
      const r = el.getBoundingClientRect()
      return { scene: el.dataset.scene as SceneName, center: r.top + y + r.height / 2 }
    })
    .filter((m) => SCENE_ORDER.includes(m.scene))
}

function progressAt(markers: Marker[]): Spot {
  if (!markers.length) return { from: "base", to: "base", t: 0 }
  const c = window.scrollY + vh() / 2
  if (c <= markers[0].center) return { from: markers[0].scene, to: markers[0].scene, t: 0 }
  for (let i = 0; i < markers.length - 1; i++) {
    const a = markers[i], b = markers[i + 1]
    if (c < b.center) return { from: a.scene, to: b.scene, t: (c - a.center) / Math.max(1, b.center - a.center) }
  }
  const last = markers[markers.length - 1]
  return { from: last.scene, to: last.scene, t: 0 }
}

/** Progress through the pinned hero (0..1), or -1 when the page has no hero. */
function heroProgress(): number {
  const hero = document.querySelector<HTMLElement>("[data-scene-hero]")
  if (!hero) return -1
  const r = hero.getBoundingClientRect()
  return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh())))
}

/** Same narrow night window as the engine, so the text and the sky change together. */
function nightAt(p: Spot) {
  const x = Math.min(1, Math.max(0, (p.t - 0.38) / 0.24))
  const w = x * x * (3 - 2 * x)
  return KEYFRAMES[p.from].night + (KEYFRAMES[p.to].night - KEYFRAMES[p.from].night) * w
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/**
 * How strongly the current view asks for each label, 0..1, straight from the scroll position:
 * the hero shows both halves of the sentence until the next section rises, and a scene break
 * names its own labels while it holds the middle of the screen. The veil uses the same numbers,
 * so text, wash and labels all move with the finger instead of on timers.
 */
function labelStrength(): Partial<Record<LabelKey, number>> {
  const out: Partial<Record<LabelKey, number>> = {}
  const H = vh()
  const hero = document.querySelector<HTMLElement>("[data-scene-hero]")
  if (hero) {
    const s = smooth(H * 0.6, H * 0.92, hero.getBoundingClientRect().bottom)
    if (s > 0) out.talent = out.frontier = s
  }
  for (const el of document.querySelectorAll<HTMLElement>("[data-scene-break]")) {
    const r = el.getBoundingClientRect()
    const s = 1 - smooth(H * 0.2, H * 0.5, Math.abs(r.top + r.height / 2 - H / 2))
    if (s > 0)
      for (const key of (el.dataset.sceneBreak || "").split(" "))
        if (key in sceneLabels) out[key as LabelKey] = Math.max(out[key as LabelKey] ?? 0, s)
  }
  return out
}

const overlaps = (a: Box, b: Box) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

/**
 * The fixed 3D background. Shows the static poster first (and only the poster for
 * reduced motion, Save-Data, no WebGL, or ?static=1), then starts the WebGL scene once the
 * page has loaded and the browser is idle. It also owns the readability veil and the labels
 * pinned into the scene: "Talent goes in." where the talent enters, "Frontier technology
 * comes out." on the lines leaving the summit.
 */
export function SceneCanvas() {
  const pathname = usePathname()
  const canvas = useRef<HTMLCanvasElement>(null)
  const labelEls = useRef<Partial<Record<LabelKey, HTMLDivElement | null>>>({})
  const measureEl = useRef<HTMLDivElement>(null)
  const sceneEl = useRef<HTMLDivElement>(null)
  const svhEl = useRef<HTMLDivElement>(null)
  const veilEl = useRef<HTMLDivElement>(null)
  const markers = useRef<Marker[]>([])
  // Text size of each label on one line, and wrapped onto two lines (for narrow spots).
  const sizes = useRef<Partial<Record<LabelKey, { one: Size; two: Size }>>>({})
  const liveRef = useRef(false)
  const placeRef = useRef<(cands: LabelCandidates, live: boolean) => void>(() => {})
  const [live, setLive] = useState(false)

  // Page layout: scene markers, label sizes, veil, and label placement over the poster.
  useEffect(() => {
    const html = document.documentElement
    const VP = new Float32Array(16)
    let raf = 0

    // One read of the hidden measuring copies (one line and wrapped), no layout thrash.
    const measure = () => {
      if (svhEl.current) visibleH = svhEl.current.offsetHeight
      const box = measureEl.current
      if (!box) return
      for (const key of KEYS) {
        const one = box.querySelector<HTMLElement>(`[data-key="${key}"][data-wrap="0"] span`)
        const two = box.querySelector<HTMLElement>(`[data-key="${key}"][data-wrap="1"] span`)
        if (one && two) sizes.current[key] = { one: { w: one.offsetWidth, h: one.offsetHeight }, two: { w: two.offsetWidth, h: two.offsetHeight } }
      }
    }

    // Where each label sat last frame, so it stays put while its spot still works.
    const last: Partial<Record<LabelKey, Fit>> = {}
    // Frames a wanted label has failed to fit in a row. It is kept for a few frames before it
    // hides, so a spot that fails for a frame or two never makes it blink.
    const HOLD = 12
    let pairMiss = 0, railsMiss = 0

    placeRef.current = (cands, isLive) => {
      const show = labelStrength()
      const { clientWidth: W, clientHeight: H } = sceneEl.current ?? document.documentElement
      const avoid: Box[] = [{ left: 0, top: 0, right: W, bottom: 76 }]
      const copy = document.querySelector<HTMLElement>("[data-hero-copy]")?.getBoundingClientRect()
      if (copy && copy.bottom > 0) avoid.push({ left: copy.left - 16, top: copy.top - 16, right: copy.right + 16, bottom: copy.bottom + 16 })
      const fits = (b: Box) => b.left >= 12 && b.right <= W - 12 && b.top >= 0 && b.bottom <= Math.min(H, vh()) - 8 && !avoid.some((a) => overlaps(a, b))
      const boxAt = (p: Point, key: LabelKey, h: Fit["h"], v: Fit["v"], wrap: boolean): Box => {
        const { w, h: th } = sizes.current[key]![wrap ? "two" : "one"]
        const left = h === "right" ? p.x - 4 : p.x + 4 - w
        const top = v === "up" ? p.y - 34 - th : p.y + 34
        return { left, top, right: left + w, bottom: top + th }
      }
      // The first candidate (best first) where the text fits without covering other text,
      // on one line if possible, else on two. A label keeps last frame's spot while that spot
      // still fits and is nearly as good, so it does not flicker between neighbouring points.
      const fit = (key: LabelKey): Fit | null => {
        const list = cands[key]
        if (!sizes.current[key] || !list.length) return null
        let best: (Fit & { rank: number }) | null = null
        search: for (const wrap of [false, true])
          for (let rank = 0; rank < list.length; rank++) {
            const p = list[rank]
            const hs: Fit["h"][] = p.x > W * 0.56 ? ["left", "right"] : ["right", "left"]
            for (const v of ["up", "down"] as const)
              for (const h of hs) {
                const box = boxAt(p, key, h, v, wrap)
                if (fits(box)) {
                  best = { p, h, v, wrap, box, rank: rank + (wrap ? list.length : 0) }
                  break search
                }
              }
          }
        const prev = last[key]
        if (prev && best) {
          let rank = -1, d2 = 32 * 32
          list.forEach((p, i) => {
            const d = (p.x - prev.p.x) ** 2 + (p.y - prev.p.y) ** 2
            if (d < d2) (d2 = d), (rank = i)
          })
          if (rank >= 0) {
            const box = boxAt(list[rank], key, prev.h, prev.v, prev.wrap)
            const r = rank + (prev.wrap ? list.length : 0)
            if (r - best.rank <= 3 && fits(box)) return { ...prev, p: list[rank], box }
          }
        }
        return best
      }
      // Over the static poster only the hero view is true to the picture.
      const wanted = (key: LabelKey) => (show[key] ?? 0) > 0.01 && (isLive || (key !== "rails" && !!document.querySelector("[data-scene-hero]")))
      const fitted: Partial<Record<LabelKey, Fit>> = {}
      const heroEl = document.querySelector<HTMLElement>("[data-scene-hero]")
      const heroWants = !!heroEl && heroEl.getBoundingClientRect().bottom > vh() * 0.92
      // The two halves of the sentence show together or not at all.
      if (wanted("talent") && wanted("frontier")) {
        const out = fit("frontier")
        if (out) {
          avoid.push(out.box)
          const into = fit("talent")
          if (into) {
            fitted.frontier = out
            fitted.talent = into
            avoid.push(into.box)
          } else avoid.pop()
        }
        if (fitted.talent) pairMiss = 0
        else if (last.talent && last.frontier && ++pairMiss < HOLD) {
          fitted.talent = last.talent
          fitted.frontier = last.frontier
          avoid.push(last.talent.box, last.frontier.box)
        }
      } else pairMiss = 0
      if (wanted("rails")) {
        const r = fit("rails")
        if (r) (fitted.rails = r), (railsMiss = 0)
        else if (last.rails && ++railsMiss < HOLD) fitted.rails = last.rails
      } else railsMiss = 0
      for (const key of KEYS) {
        const node = labelEls.current[key]
        if (!node) continue
        const f = fitted[key]
        if (!f) {
          delete last[key]
          if (node.style.opacity !== "0") node.style.opacity = "0"
          continue
        }
        last[key] = f
        if (node.dataset.v !== f.v) node.dataset.v = f.v
        if (node.dataset.h !== f.h) node.dataset.h = f.h
        const wrap = f.wrap ? "1" : "0"
        if (node.dataset.wrap !== wrap) node.dataset.wrap = wrap
        node.style.transform = `translate3d(${f.p.x.toFixed(1)}px, ${f.p.y.toFixed(1)}px, 0)`
        const o = show[key] ?? 0
        if (Math.abs(parseFloat(node.style.opacity || "0") - o) > 0.01) node.style.opacity = o.toFixed(2)
      }
      // The hero keeps a plain-text copy of the sentence, shown only while the hero asks for the
      // labels and they cannot be placed. Once the hero scrolls away the state is left as it was,
      // so the copy never fades in on its way out.
      if (heroWants) {
        const fallback = !fitted.talent
        if (html.hasAttribute("data-hero-fallback") !== fallback) html.toggleAttribute("data-hero-fallback", fallback)
      }
    }

    const placeStatic = () => {
      if (liveRef.current) return
      const { clientWidth: W, clientHeight: H } = sceneEl.current ?? document.documentElement
      const k = KEYFRAMES.base
      perspective(frame(k.eye, k.target, k.fov, W / H, k.pan), 0.3, 260, VP)
      placeRef.current(labelCandidates(VP, W, H), false)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // The veil lifts while the hero or a scene break holds the screen.
        const open = Math.max(0, ...Object.values(labelStrength()))
        // Set on the veil itself: a variable on <html> would restyle the whole page every frame.
        const veil = 1 - open
        const v = veilEl.current
        if (v && Math.abs(parseFloat(v.style.opacity || "-1") - veil) > 0.004) v.style.opacity = veil.toFixed(3)
        const full = !!document.querySelector("[data-veil-full]")
        if ((html.dataset.veil === "full") !== full) full ? (html.dataset.veil = "full") : html.removeAttribute("data-veil")
        placeStatic()
      })
    }
    // Layout reads, at most once per frame however many observers fire.
    let pending = 0
    const update = () => {
      if (pending) return
      pending = requestAnimationFrame(() => {
        pending = 0
        markers.current = readMarkers()
        measure()
        onScroll()
      })
    }

    update()
    document.fonts?.ready.then(update)
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(pending)
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", onScroll)
      html.removeAttribute("data-veil")
      veilEl.current?.style.removeProperty("opacity")
      html.removeAttribute("data-hero-fallback")
    }
  }, [pathname])

  // The WebGL scene.
  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const params = new URLSearchParams(window.location.search)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (reduce.matches || conn?.saveData || params.has("static") || typeof WebGLRenderingContext === "undefined") return

    const html = document.documentElement
    let handle: SceneHandle | null = null
    let cancelled = false
    let idleId: number | undefined
    let timeoutId: number | undefined
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900
    const detail = isMobile || (navigator.hardwareConcurrency || 8) <= 4 ? "low" : "high"
    const pointer = window.matchMedia("(pointer: fine)").matches

    const setNight = (on: boolean) => {
      if (html.hasAttribute("data-scene-night") !== on) html.toggleAttribute("data-scene-night", on)
    }
    const setLiveState = (on: boolean) => {
      liveRef.current = on
      setLive(on)
      html.toggleAttribute("data-scene-live", on)
      if (!on) {
        setNight(false)
        window.dispatchEvent(new Event("resize"))
      }
    }

    const start = async () => {
      if (cancelled) return
      try {
        const { startScene } = await import("@/lib/scene/engine")
        if (cancelled) return
        const h = await startScene(el, {
          detail,
          pointer,
          getProgress: () => ({ ...progressAt(markers.current), hero: heroProgress() }),
          onLabels: (pos) => {
            setNight(nightAt(progressAt(markers.current)) > 0.5)
            if (liveRef.current) placeRef.current(pos, true)
          },
          onFirstFrame: () => setLiveState(true),
          onContextChange: setLiveState,
        })
        if (cancelled || reduce.matches) {
          h.stop()
          setLiveState(false)
          return
        }
        handle = h
      } catch (err) {
        setLiveState(false)
        console.debug("APEX scene unavailable, keeping the poster.", err)
      }
    }

    const schedule = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(start, { timeout: 2500 })
      else timeoutId = window.setTimeout(start, 600)
    }
    if (document.readyState === "complete") schedule()
    else window.addEventListener("load", schedule, { once: true })

    const onReduce = () => {
      if (!reduce.matches) return
      handle?.stop()
      handle = null
      setLiveState(false)
    }
    reduce.addEventListener("change", onReduce)

    return () => {
      cancelled = true
      window.removeEventListener("load", schedule)
      reduce.removeEventListener("change", onReduce)
      const w = window as Window & { cancelIdleCallback?: (id: number) => void }
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      handle?.stop()
      handle = null
      liveRef.current = false
      html.removeAttribute("data-scene-live")
      html.removeAttribute("data-scene-night")
    }
  }, [])

  return (
    <div ref={sceneEl} className={`${styles.scene} ${live ? styles.live : ""}`} aria-hidden="true">
      <picture className={styles.poster}>
        <source media="(max-aspect-ratio: 4/5)" srcSet="/scene/poster-tall.webp" />
        <img src="/scene/poster-wide.webp" width={1600} height={900} alt="" decoding="async" fetchPriority="high" />
      </picture>
      <canvas ref={canvas} className={styles.canvas} />
      <div ref={svhEl} className={styles.svh} />
      <div ref={veilEl} className={styles.veil} />
      <div ref={measureEl} className={`${styles.labels} ${styles.measure}`}>
        {KEYS.flatMap((key) =>
          ["0", "1"].map((wrap) => (
            <div key={key + wrap} className={styles.label} data-key={key} data-v="up" data-h="right" data-wrap={wrap}>
              <span>{sceneLabels[key]}</span>
            </div>
          )),
        )}
      </div>
      <div className={styles.labels}>
        {KEYS.map((key) => (
          <div key={key} ref={(n) => void (labelEls.current[key] = n)} className={styles.label} data-key={key} data-v="up" data-h="right" data-wrap="0">
            <b />
            <i />
            <span>{sceneLabels[key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
