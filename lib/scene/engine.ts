/**
 * THE ASCENT. The APEX scene, drawn with raw WebGL (WebGL2, WebGL1 fallback, no libraries).
 *
 * Talent goes in: a dense stream of small, scattered points (each one a person) enters from
 * the left, converges up the route and is absorbed into the summit.
 * Frontier technology comes out: from the summit, ordered bright lines leave along a fan of arcs.
 * The change of form, from scattered points to ordered lines, is the message.
 *
 * In the hero the first scroll drives the process (SceneProgress.hero); the summit lights up
 * when the first line leaves. Further down, the faceted range fills in, the route closes,
 * and day turns to night, where the same lines and the AI Commons network close the story.
 *
 * Loaded lazily by components/scene/SceneCanvas.tsx. Purely decorative: if anything throws,
 * the caller keeps the static poster.
 */
import { frame, perspective } from "./camera.mjs"
import { rings as ringRadii } from "./terrain.mjs"
import { KEYFRAMES, type SceneName } from "./keyframes"
import { ARCS, type SceneGeometry } from "./geometry"
import { labelCandidates, type LabelCandidates } from "./labels"

/** hero: 0..1 progress through the pinned hero, or -1 when the page has no hero in view. */
export type SceneProgress = { from: SceneName; to: SceneName; t: number; hero: number }
export type SceneOptions = {
  detail: "low" | "high"
  getProgress: () => SceneProgress
  pointer: boolean
  onFirstFrame?: () => void
  /** Called every frame with candidate label anchors (best first) in CSS pixels. */
  onLabels?: (labels: LabelCandidates) => void
  /** The GPU context was lost (show the poster) or restored (hide it again). */
  onContextChange?: (alive: boolean) => void
}
export type SceneHandle = { stop(): void }

type GL = WebGLRenderingContext | WebGL2RenderingContext
type V3 = [number, number, number]

/* ------------------------------------------------------------------ colours */
const hex = (h: string): V3 => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as V3
const DAY_TOP = hex("#F4F3EF")
const DAY_HOR = hex("#E2E9F1")
const NIGHT_TOP = hex("#0A1624")
const NIGHT_HOR = hex("#16305A")
const NAVY = hex("#25346F")
const BLUE = hex("#2E61AE")
const ICE = hex("#7FB7E3")
const SLATE = hex("#4A6585")
const INK = hex("#0D1B2A")
const WHITE: V3 = [1, 1, 1]

/* ------------------------------------------------------------------ maths */
const sm = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
const win = (a: number, b: number, x: number) => sm(clamp01((x - a) / (b - a)))
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const mix3 = (a: V3, b: V3, t: number): V3 => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]
const nextFrame = () => new Promise<number>((r) => requestAnimationFrame(r))
const fract = (x: number) => x - Math.floor(x)

/** Critically damped spring toward `to` (SmoothDamp). Mutates cur and vel. */
function damp(cur: number[], vel: number[], to: number[], smoothTime: number, dt: number) {
  const w = 2 / smoothTime, x = w * dt, e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  for (let i = 0; i < cur.length; i++) {
    const c = cur[i] - to[i], tmp = (vel[i] + w * c) * dt
    vel[i] = (vel[i] - w * tmp) * e
    cur[i] = to[i] + (c + tmp) * e
  }
}

/** Point at parameter u (0..1) along an xyz polyline sampled evenly by arc length. */
function at(poly: ArrayLike<number>, u: number, out: number[], offset = 0, count = poly.length / 3) {
  const n = count - 1
  const f = clamp01(u) * n, i = Math.min(Math.floor(f), n - 1), k = f - i
  const a = (offset + i) * 3, b = (offset + i + 1) * 3
  for (let j = 0; j < 3; j++) out[j] = poly[a + j] + (poly[b + j] - poly[a + j]) * k
  return out
}

/* ------------------------------------------------------------------ shaders (GLSL ES 1.00, upgraded for WebGL2) */
const SKY_VS = `attribute vec2 aP;void main(){gl_Position=vec4(aP,0.,1.);}`
const SKY_FN = `uniform vec3 uTop,uHor;uniform vec2 uRes;vec3 sky(){float y=gl_FragCoord.y/uRes.y;return mix(uHor,uTop,smoothstep(.18,.95,y));}`
const SKY_FS = `${SKY_FN}void main(){gl_FragColor=vec4(sky(),1.);}`

const SURF_VS = `attribute vec3 aP,aN,aB,aI;uniform mat4 uVP;varying vec3 vP,vN,vB,vI;
void main(){vP=aP;vN=aN;vB=aB;vI=aI;gl_Position=uVP*vec4(aP,1.);}`
const SURF_FS = `${SKY_FN}
uniform vec3 uEye,uSun,uSum,uWire;uniform vec2 uFog;uniform vec4 uHit;uniform float uSolid,uNight,uIntro,uGlow;
varying vec3 vP,vN,vB,vI;
void main(){
vec3 n=normalize(vN);float d=distance(vP,uEye);float fog=smoothstep(uFog.x,uFog.y,d);
float h=vP.y,up=n.y;
vec3 c=mix(vec3(.145,.204,.435),vec3(.18,.38,.682),smoothstep(1.,3.8,h));
c=mix(c,vec3(.50,.72,.89),smoothstep(3.4,6.2,h)*smoothstep(.3,.8,up));
float sl=5.4+(.78-up)*5.;
c=mix(c,vec3(.98,.985,.99),smoothstep(sl-.35,sl+.35,h)*smoothstep(.42,.72,up));
float lam=max(dot(n,uSun),0.);
vec3 lit=c*(.34+.66*lam)*(.78+.22*up);
lit=mix(lit,lit*vec3(.44,.54,.8)+vec3(.02,.04,.1),uNight);
float sd=distance(vP,uSum);
float glow=uGlow*exp(-sd*sd/7.);
float yN=gl_FragCoord.y/uRes.y;
float build=uSolid*36.-vI.z-vI.x*4.;
float fill=smoothstep(0.,3.,build)*smoothstep(0.,.08,uSolid)*smoothstep(.15,.6,uIntro)*mix(smoothstep(.05,.3,yN),1.,uSolid*uSolid);
vec3 s=sky();
vec3 col=mix(s,lit,fill*(1.-fog)*vI.y);
#ifdef DERIV
vec3 fw=fwidth(vB);vec3 e=smoothstep(vec3(0.),fw*1.35,vB);float wire=1.-min(min(e.x,e.y),e.z);
#else
float wire=1.-smoothstep(0.,.035,min(min(vB.x,vB.y),vB.z));
#endif
float near=smoothstep(uFog.x*.12,uFog.x*.38,d);
float calm=mix(smoothstep(.02,.4,yN)*mix(.4,1.,smoothstep(.6,3.6,h)),1.,fill*.55);
float wa=mix(.5,.2+.16*uNight,fill)*(1.-fog*.92)*near*vI.y*calm;
float r=uIntro*52.;wa*=1.-smoothstep(r-5.,r,distance(vP.xz,uSum.xz));
float hd=distance(vP,uHit.xyz);wa+=uHit.w*.75*exp(-hd*hd/4.)*(1.-fog)*vI.y;
wa=clamp(wa+glow*.6,0.,1.);
col=mix(col,uWire,wire*wa);
col+=uWire*wire*wa*uNight*.1;
col+=vec3(.55,.75,.98)*glow*.35*(.35+.65*uNight);
gl_FragColor=vec4(col,1.);
}`

const PT_VS = `attribute vec3 aP;attribute vec4 aC;attribute float aS;uniform mat4 uVP;uniform float uPx,uA;uniform vec3 uEye;uniform vec2 uFog;varying vec4 vC;
void main(){gl_Position=uVP*vec4(aP,1.);gl_PointSize=aS*uPx;float d=distance(aP,uEye);vC=aC;vC.a*=uA*(1.-smoothstep(uFog.x,uFog.y*1.15,d));}`
const PT_FS = `varying vec4 vC;void main(){float r=length(gl_PointCoord-.5);float a=vC.a*(1.-smoothstep(.3,.5,r));if(a<.004)discard;gl_FragColor=vec4(vC.rgb*a,a);}`

const LN_VS = `attribute vec3 aP;attribute float aT;uniform mat4 uVP;varying float vT;void main(){vT=aT;gl_Position=uVP*vec4(aP,1.);}`
const LN_FS = `uniform vec4 uC;uniform vec3 uD;varying float vT;
void main(){if(uD.x>0.&&fract(vT*uD.x-uD.y)>uD.z)discard;float a=uC.a;gl_FragColor=vec4(uC.rgb*a,a);}`

// The flag of Israel, drawn procedurally: white field, two blue stripes, Star of David.
const FLAG_VS = `attribute vec2 aUV;uniform mat4 uVP;uniform vec3 uTop,uRight,uDown,uNorm;uniform float uTime,uW,uH;varying vec2 vUV;varying float vS;
void main(){vUV=aUV;float ph=aUV.x*6.5-uTime*3.;vS=cos(ph);
vec3 p=uTop+uRight*aUV.x*uW+uDown*aUV.y*uH+uNorm*(sin(ph)*.085*aUV.x+sin(aUV.x*11.-uTime*4.3+aUV.y*2.)*.02*aUV.x);
gl_Position=uVP*vec4(p,1.);}`
const FLAG_FS = `uniform float uNight,uAspect;varying vec2 vUV;varying float vS;
float tri(vec2 p,float r){const float k=1.7320508;p.x=abs(p.x)-r;p.y=p.y+r/k;if(p.x+k*p.y>0.)p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.;p.x-=clamp(p.x,-2.*r,0.);return -length(p)*sign(p.y);}
void main(){
float v=vUV.y;float aa=.006;
float st=smoothstep(.094-aa,.094+aa,v)*(1.-smoothstep(.25-aa,.25+aa,v))+smoothstep(.75-aa,.75+aa,v)*(1.-smoothstep(.906-aa,.906+aa,v));
vec2 q=vec2((vUV.x-.5)*uAspect,.5-v);
float s=min(abs(tri(q,.1576)),abs(tri(vec2(q.x,-q.y),.1576))); // half side = 0.182 circumradius * sqrt(3)/2
float star=1.-smoothstep(.017-aa,.017+aa,s);
vec3 col=mix(vec3(1.),vec3(0.,.22,.72),clamp(st+star,0.,1.));
col*=.86+.14*vS;
col=mix(col,col*.58+vec3(.03,.05,.1),uNight);
gl_FragColor=vec4(col,1.);
}`

function upgrade(src: string, frag: boolean, gl2: boolean, highp: boolean) {
  const prec = `precision ${highp ? "highp" : "mediump"} float;\n`
  if (!gl2) return frag ? `#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#define DERIV\n#endif\n${prec}${src}` : src
  if (frag) return `#version 300 es\n#define DERIV\n${prec}out vec4 oC;\n${src.replace(/varying/g, "in").replace(/gl_FragColor/g, "oC")}`
  return `#version 300 es\n${src.replace(/attribute/g, "in").replace(/varying/g, "out")}`
}

type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null>; a: Record<string, number> }

function program(gl: GL, vs: string, fs: string, gl2: boolean, highp: boolean): Prog {
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const p = gl.createProgram()!
  gl.attachShader(p, sh(gl.VERTEX_SHADER, upgrade(vs, false, gl2, highp)))
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, upgrade(fs, true, gl2, highp)))
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error("scene: shader link failed")
  const u: Prog["u"] = {}, a: Prog["a"] = {}
  const nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number
  for (let i = 0; i < nu; i++) {
    const info = gl.getActiveUniform(p, i)!
    u[info.name] = gl.getUniformLocation(p, info.name)
  }
  const na = gl.getProgramParameter(p, gl.ACTIVE_ATTRIBUTES) as number
  for (let i = 0; i < na; i++) {
    const info = gl.getActiveAttrib(p, i)!
    a[info.name] = gl.getAttribLocation(p, info.name)
  }
  return { p, u, a }
}

/* ------------------------------------------------------------------ geometry loading */
async function loadGeometry(detail: "low" | "high"): Promise<SceneGeometry> {
  try {
    const worker = new Worker(new URL("./scene.worker.ts", import.meta.url), { type: "module" })
    const g = await new Promise<SceneGeometry>((resolve, reject) => {
      worker.onmessage = (e) => resolve(e.data as SceneGeometry)
      worker.onerror = reject
      worker.postMessage({ detail })
    })
    worker.terminate()
    return g
  } catch {
    const { buildGeometry } = await import("./geometry")
    await nextFrame()
    return buildGeometry(detail)
  }
}

/** Line strip -> GL_LINES pairs with a 0..1 parameter per vertex. */
function stripToLines(poly: ArrayLike<number>, out: number[], offset = 0, count = poly.length / 3) {
  for (let i = 0; i < count - 1; i++) {
    const a = (offset + i) * 3, b = (offset + i + 1) * 3
    out.push(poly[a], poly[a + 1], poly[a + 2], i / (count - 1))
    out.push(poly[b], poly[b + 1], poly[b + 2], (i + 1) / (count - 1))
  }
}

/* ------------------------------------------------------------------ main */
export async function startScene(canvas: HTMLCanvasElement, opts: SceneOptions): Promise<SceneHandle> {
  const hi = opts.detail === "high"
  const geo = await loadGeometry(opts.detail)
  await nextFrame()

  const attrs = { antialias: hi, alpha: false, depth: true, premultipliedAlpha: true, powerPreference: "high-performance" as const, preserveDrawingBuffer: false }
  let gl: GL | null = canvas.getContext("webgl2", attrs) as WebGL2RenderingContext | null
  const gl2 = !!gl
  if (!gl) gl = (canvas.getContext("webgl", attrs) || canvas.getContext("experimental-webgl", attrs)) as WebGLRenderingContext | null
  if (!gl) throw new Error("scene: no webgl")
  const G = gl
  const hp = G.getShaderPrecisionFormat(G.FRAGMENT_SHADER, G.HIGH_FLOAT)
  const highp = !!hp && hp.precision > 0
  G.getExtension("KHR_parallel_shader_compile")

  /* ---- static data */
  const S = geo.summit
  const nArcPts = 64
  const lineData: number[] = []
  const seg: Record<string, [number, number]> = {}
  for (let k = 0; k < ARCS; k++) {
    const start = lineData.length / 4
    stripToLines(geo.arcs, lineData, k * nArcPts, nArcPts)
    seg[`arc${k}`] = [start, lineData.length / 4 - start]
  }
  // AI Commons network: arcs from the summit to every other peak.
  {
    const start = lineData.length / 4
    for (let i = 0; i < geo.peaks.length; i += 3) {
      const P: V3 = [geo.peaks[i], geo.peaks[i + 1], geo.peaks[i + 2]]
      const dist = Math.hypot(P[0] - S[0], P[2] - S[2])
      const lift = 2 + dist * 0.28
      const arc: number[] = []
      for (let k = 0; k <= 24; k++) {
        const t = k / 24, u = 1 - t
        const mid = [(S[0] + P[0]) / 2, Math.max(S[1], P[1]) + lift, (S[2] + P[2]) / 2]
        arc.push(u * u * S[0] + 2 * u * t * mid[0] + t * t * P[0], u * u * S[1] + 2 * u * t * mid[1] + t * t * P[1], u * u * S[2] + 2 * u * t * mid[2] + t * t * P[2])
      }
      stripToLines(arc, lineData)
    }
    seg.net = [start, lineData.length / 4 - start]
  }
  // Flag pole and the night beam above the summit.
  const POLE = 1.75
  const poleTop: V3 = [S[0], S[1] + POLE, S[2]]
  seg.pole = [lineData.length / 4, 2]
  lineData.push(S[0], S[1], S[2], 0, poleTop[0], poleTop[1], poleTop[2], 1)
  seg.beam = [lineData.length / 4, 2]
  lineData.push(S[0], S[1] + POLE + 0.1, S[2], 0, S[0], S[1] + 10, S[2], 1)
  // Rings are rebuilt every frame (camera facing): reserve space.
  const RING_SEG = 72
  const ringStart = lineData.length / 4
  for (let i = 0; i < 3 * RING_SEG * 2; i++) lineData.push(0, 0, 0, 0)
  const lines = new Float32Array(lineData)

  // Flag mesh: a strip of quads, uv only (shape and wave come from the shader).
  const FLAG_SEG = 18
  const flagUV = new Float32Array((FLAG_SEG + 1) * 4)
  for (let i = 0; i <= FLAG_SEG; i++) flagUV.set([i / FLAG_SEG, 0, i / FLAG_SEG, 1], i * 4)
  const FLAG_W = 1.3, FLAG_H = 0.945
  // The flag flies away from the fan of output lines, so the lines are seen leaving the summit.
  const fr = [-1, 0, 0.45], frl = Math.hypot(fr[0], fr[1], fr[2])
  const flagRight: V3 = [fr[0] / frl, fr[1] / frl, fr[2] / frl]
  const flagDown: V3 = [0, -1, 0]
  const flagNorm: V3 = [flagRight[2], 0, -flagRight[0]]

  // Stars on a dome behind the range.
  const nStars = hi ? 320 : 180
  const stars = new Float32Array(nStars * 8)
  let sd = 99
  const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647)
  for (let i = 0; i < nStars; i++) {
    const th = rnd() * Math.PI - Math.PI / 2, ph = 0.08 + rnd() * 0.9
    const R = 90
    stars.set([Math.sin(th) * Math.cos(ph) * R * 1.4, 6 + Math.sin(ph) * R * 0.6, -20 - Math.cos(th) * Math.cos(ph) * R, 0.86, 0.92, 1, 0.35 + rnd() * 0.65, 1 + rnd() * 1.6], i * 8)
  }
  // Ridge dots.
  const nRidge = geo.ridge.length / 3
  const ridge = new Float32Array(nRidge * 8)
  for (let i = 0; i < nRidge; i++) ridge.set([geo.ridge[i * 3], geo.ridge[i * 3 + 1], geo.ridge[i * 3 + 2], 1, 1, 1, 0.55, 2.2], i * 8)

  /* ---- talent: scattered points that converge up the route */
  const nTal = hi ? 2200 : 1300 // each point is a person; phones get fewer but larger points
  const tPhase = new Float32Array(nTal), tSpeed = new Float32Array(nTal), tJit = new Float32Array(nTal * 3), tSize = new Float32Array(nTal), tTint = new Float32Array(nTal)
  for (let i = 0; i < nTal; i++) {
    tPhase[i] = rnd()
    tSpeed[i] = 0.8 + rnd() * 0.45
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd())
    tJit[i * 3] = Math.cos(a) * r
    tJit[i * 3 + 1] = (rnd() - 0.3) * 0.5
    tJit[i * 3 + 2] = Math.sin(a) * r
    tSize[i] = hi ? 2.1 + rnd() * 1.7 : 2.6 + rnd() * 2
    tTint[i] = rnd()
  }
  /* ---- frontier technology: ordered comets along the arcs */
  const COMETS = hi ? 3 : 2
  const TRAIL = hi ? 46 : 30
  const nRoute = geo.route.length / 3
  const nDyn = nRoute + nTal + ARCS * COMETS * TRAIL + ARCS + 8
  const dyn = new Float32Array(nDyn * 8)

  /* ---- GL resources (rebuilt on context restore) */
  let progs: { sky: Prog; surf: Prog; pt: Prog; ln: Prog; flag: Prog }
  let bufs: { tri: WebGLBuffer; surf: WebGLBuffer; lines: WebGLBuffer; stars: WebGLBuffer; ridge: WebGLBuffer; dyn: WebGLBuffer; flag: WebGLBuffer }
  const nVerts = geo.surface.length / 12
  const setup = async () => {
    if (!gl2) G.getExtension("OES_standard_derivatives")
    progs = {
      sky: program(G, SKY_VS, SKY_FS, gl2, highp),
      surf: program(G, SURF_VS, SURF_FS, gl2, highp),
      pt: program(G, PT_VS, PT_FS, gl2, highp),
      ln: program(G, LN_VS, LN_FS, gl2, highp),
      flag: program(G, FLAG_VS, FLAG_FS, gl2, highp),
    }
    await nextFrame()
    const mk = (data: Float32Array, usage: number) => {
      const b = G.createBuffer()!
      G.bindBuffer(G.ARRAY_BUFFER, b)
      G.bufferData(G.ARRAY_BUFFER, data, usage)
      return b
    }
    bufs = {
      tri: mk(new Float32Array([-1, -1, 3, -1, -1, 3]), G.STATIC_DRAW),
      surf: mk(geo.surface, G.STATIC_DRAW),
      lines: mk(lines, G.DYNAMIC_DRAW),
      stars: mk(stars, G.STATIC_DRAW),
      ridge: mk(ridge, G.STATIC_DRAW),
      dyn: mk(dyn, G.DYNAMIC_DRAW),
      flag: mk(flagUV, G.STATIC_DRAW),
    }
  }
  await setup()

  const attrib = (pr: Prog, name: string, size: number, stride: number, offset: number) => {
    const loc = pr.a[name]
    if (loc === undefined || loc < 0) return
    G.enableVertexAttribArray(loc)
    G.vertexAttribPointer(loc, size, G.FLOAT, false, stride * 4, offset * 4)
  }
  const disableAll = () => {
    for (let i = 0; i < 4; i++) G.disableVertexAttribArray(i)
  }

  /* ---- state */
  const K0 = KEYFRAMES[opts.getProgress().from]
  // cur: eye(3) target(3) fov solid rails hole night net pan
  const pack = (k: typeof K0) => [...k.eye, ...k.target, k.fov, k.solid, k.rails, k.hole, k.night, k.net, k.pan]
  const cur = pack(K0)
  for (let i = 0; i < 3; i++) cur[i] = cur[3 + i] + (cur[i] - cur[3 + i]) * 1.12 // intro: settle in from further out
  const vel = new Array(cur.length).fill(0)
  const fx2 = [0, 0, 0], fxVel = [0, 0, 0] // hero progress, output level, scroll scrub (eased)
  const par = [0, 0], parVel = [0, 0], parTo = [0, 0]
  const hit = [0, 0, 0, 0], hitVel = [0, 0, 0, 0], hitTo = [0, 0, 0, 0]
  let pointerNdc: [number, number] | null = null
  let pointerDirty = false
  let lastInput = performance.now()

  const VP = new Float32Array(16)
  let W = 1, H = 1, dpr = 1
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, hi ? 1.5 : 1.25)
    W = Math.max(1, Math.round(canvas.clientWidth * dpr))
    H = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W
      canvas.height = H
    }
  }
  resize()
  // Resizing clears the canvas, so it only happens inside draw(), right before a new frame is rendered.
  let sizeDirty = false
  const ro = new ResizeObserver(() => (sizeDirty = true))
  ro.observe(canvas)

  const onScroll = () => (lastInput = performance.now())
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return
    pointerNdc = [(e.clientX / window.innerWidth) * 2 - 1, 1 - (e.clientY / window.innerHeight) * 2]
    pointerDirty = true
    lastInput = performance.now()
  }
  const onLeave = () => {
    pointerNdc = null
    pointerDirty = true
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  if (opts.pointer) {
    window.addEventListener("pointermove", onPointer, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
  }

  /* ---- per-frame */
  let raf = 0, running = true, first = true, lost = false, ridgeNight = -1
  const t0 = performance.now()
  let last = t0, frameSkip = 0
  const tmp = [0, 0, 0], tmp2 = [0, 0, 0]

  const project = (x: number, y: number, z: number) => {
    const cw = VP[3] * x + VP[7] * y + VP[11] * z + VP[15]
    if (cw <= 0.01) return null
    return [(VP[0] * x + VP[4] * y + VP[8] * z + VP[12]) / cw, (VP[1] * x + VP[5] * y + VP[9] * z + VP[13]) / cw] as const
  }
  const weight = (p: SceneProgress, names: SceneName[]) =>
    (names.includes(p.from) ? 1 - sm(p.t) : 0) + (names.includes(p.to) ? sm(p.t) : 0)

  const draw = (now: number) => {
    raf = requestAnimationFrame(draw)
    if (lost) return
    const idle = now - lastInput > 1400
    if (idle && !sizeDirty && (frameSkip = (frameSkip + 1) % 2) === 1) return // ~30fps when idle
    if (sizeDirty) {
      sizeDirty = false
      resize()
    }
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    const time = (now - t0) / 1000

    /* camera + params */
    const prog = opts.getProgress()
    const A = KEYFRAMES[prog.from], B = KEYFRAMES[prog.to]
    const t = sm(clamp01(prog.t))
    const target = pack(A).map((a, i) => mix(a, pack(B)[i], t))
    target[10] = mix(A.night, B.night, win(0.38, 0.62, prog.t)) // night in a narrow window
    // Hero: the camera leans in a little as the first scroll drives the process.
    const heroP = prog.hero < 0 ? 1 : prog.hero
    const baseW = weight(prog, ["base"])
    const lean = 0.07 * heroP * baseW
    for (let i = 0; i < 3; i++) target[i] = mix(target[i], target[3 + i], lean)
    damp(cur, vel, target, 0.5, dt)
    // Output level. In the hero the first lines leave on their own a moment after load (the
    // transformation is visible before any scroll), then the first scroll drives the full fan.
    // Later it follows the built mountain.
    const heroOut = prog.hero >= 0 ? Math.max(0.3 * win(0.2, 1.4, time), win(0.06, 0.8, prog.hero)) * baseW : 0
    damp(fx2, fxVel, [heroP, Math.max(heroOut, win(0.6, 1, target[7]) * (1 - baseW)), heroP], 0.35, dt)
    const out = clamp01(fx2[1])
    const scrub = fx2[2]

    if (opts.pointer && pointerNdc) {
      parTo[0] = pointerNdc[0]
      parTo[1] = pointerNdc[1]
    } else parTo[0] = parTo[1] = 0
    damp(par, parVel, parTo, 0.6, dt)

    const eye: V3 = [cur[0], cur[1], cur[2]], tgt: V3 = [cur[3], cur[4], cur[5]]
    const fx = tgt[0] - eye[0], fz = tgt[2] - eye[2], fl = Math.hypot(fx, fz) || 1
    const rx = -fz / fl, rz = fx / fl
    const D = Math.hypot(fx, tgt[1] - eye[1], fz)
    const pk = 0.025 * D
    eye[0] += rx * par[0] * pk
    eye[2] += rz * par[0] * pk
    eye[1] += par[1] * pk * 0.5

    const aspect = W / H
    perspective(frame(eye, tgt, cur[6], aspect, cur[12]), 0.3, 260, VP)
    const solid = cur[7], rails = cur[8], hole = cur[9], night = clamp01(cur[10]), net = clamp01(cur[11])
    const introE = 1 - Math.pow(1 - clamp01((time - 0.05) / 1.6), 3)
    const fogN = 0.62 * D, fogF = 2.3 * D
    const top = mix3(DAY_TOP, NIGHT_TOP, night), hor = mix3(DAY_HOR, NIGHT_HOR, night)
    const wire = mix3(SLATE, [0.66, 0.83, 0.97], night)
    // The summit lights up as the first line leaves, and burns fully once the fan is out.
    const flare = 0.55 * win(0, 0.16, out) + 0.45 * win(0.32, 0.9, out)

    /* pointer flashlight: nearest vertex on screen */
    if (pointerDirty || (pointerNdc && !idle)) {
      pointerDirty = false
      if (pointerNdc) {
        const v = geo.verts
        let best = 0.012, bi = -1
        for (let i = 0; i < v.length; i += 3) {
          const p = project(v[i], v[i + 1], v[i + 2])
          if (!p) continue
          const dx = p[0] - pointerNdc[0], dy = (p[1] - pointerNdc[1]) / aspect
          const d2 = dx * dx + dy * dy
          if (d2 < best) {
            best = d2
            bi = i
          }
        }
        if (bi >= 0) {
          hitTo[0] = v[bi]; hitTo[1] = v[bi + 1]; hitTo[2] = v[bi + 2]; hitTo[3] = 1
          if (hit[3] < 0.05) { hit[0] = hitTo[0]; hit[1] = hitTo[1]; hit[2] = hitTo[2] }
        } else hitTo[3] = 0
      } else hitTo[3] = 0
    }
    damp(hit, hitVel, hitTo, 0.25, dt)

    /* dynamic points */
    let n = 0
    const put = (x: number, y: number, z: number, c: V3, a: number, s: number) => {
      dyn[n * 8] = x; dyn[n * 8 + 1] = y; dyn[n * 8 + 2] = z
      dyn[n * 8 + 3] = c[0]; dyn[n * 8 + 4] = c[1]; dyn[n * 8 + 5] = c[2]
      dyn[n * 8 + 6] = a; dyn[n * 8 + 7] = s
      n++
    }
    // The route as a dotted line. In the hero it is complete: it is the path the talent climbs.
    const railsEff = Math.max(rails, baseW)
    const holeEff = hole * (1 - baseW)
    const routeCol = mix3(SLATE, ICE, night)
    for (let i = 0; i < nRoute; i += 2) {
      const u = i / (nRoute - 1)
      let a = win(railsEff + 0.02, railsEff - 0.04, u) * 0.55 * introE
      a *= 1 - holeEff * win(0.44, 0.47, u) * win(0.63, 0.6, u)
      if (a < 0.01) continue
      put(geo.route[i * 3], geo.route[i * 3 + 1] + 0.05, geo.route[i * 3 + 2], routeCol, a, 2.6)
    }
    // Talent goes in: scattered points that converge as they climb, absorbed at the summit.
    const talentCol = mix3(NAVY, WHITE, night)
    const talentAlt = mix3(BLUE, ICE, night)
    const rs = geo.routeStart
    const density = mix(0.55, 1, baseW)
    for (let i = 0; i < nTal; i++) {
      if (i > nTal * density) break
      const u = fract(tPhase[i] + time * 0.012 * tSpeed[i] + scrub * 0.85)
      at(geo.climb, u, tmp)
      const spread = mix(2.4, 0.04, win(0.15, 0.97, u))
      let a = 0.82 * introE * (1 - win(0.965, 1, u)) * win(0, 0.04, u)
      if (u > rs) {
        const ru = (u - rs) / (1 - rs)
        a *= win(railsEff + 0.03, railsEff - 0.03, ru)
        if (holeEff > 0.01) a *= 1 - holeEff * win(0.44, 0.46, ru)
      }
      if (a < 0.01) continue
      put(tmp[0] + tJit[i * 3] * spread, tmp[1] + tJit[i * 3 + 1] * spread * 0.4, tmp[2] + tJit[i * 3 + 2] * spread, tTint[i] > 0.82 ? talentAlt : talentCol, a, tSize[i])
    }
    // Frontier technology comes out: ordered bright lines leaving along the fan of arcs.
    const headCol = mix3(BLUE, WHITE, night)
    const tailCol = mix3([0.36, 0.56, 0.84], ICE, night)
    const activeArcs = out > 0.001 ? Math.min(ARCS, Math.ceil(out * ARCS + 0.001)) : 0
    for (let k = 0; k < activeArcs; k++) {
      const arcA = clamp01(out * ARCS - k)
      for (let c = 0; c < COMETS; c++) {
        const head = fract(time * 0.2 + k * 0.137 + c / COMETS + scrub * 0.6) * 1.15
        for (let j = 0; j < TRAIL; j++) {
          const p = head - j * 0.0042
          if (p < 0 || p > 1) continue
          const f = 1 - j / TRAIL
          at(geo.arcs, p, tmp2, k * nArcPts, nArcPts)
          put(tmp2[0], tmp2[1], tmp2[2], j < 3 ? headCol : tailCol, arcA * f * f * (1 - win(0.86, 1, p)) * 0.95, 1.1 + 4.4 * f * f)
        }
      }
      at(geo.arcs, 1, tmp2, k * nArcPts, nArcPts)
      put(tmp2[0], tmp2[1], tmp2[2], tailCol, arcA * 0.5, 3)
    }
    // Summit: node, and the flare that lights up when the first line leaves.
    const nodeCol = mix3([0.141, 0.302, 0.467], WHITE, night)
    put(S[0], S[1] + 0.06, S[2], nodeCol, 0.95 * introE, 8)
    const halo = Math.max(flare, night * 0.6)
    if (halo > 0.01) {
      put(S[0], S[1] + 0.3, S[2], mix3(BLUE, ICE, night), (0.16 + 0.06 * Math.sin(time * 2.2)) * halo, 70)
      put(S[0], S[1] + 0.3, S[2], mix3(ICE, WHITE, night), 0.28 * halo, 22)
    }

    /* rings (camera facing, pulsing) */
    const fwd = [tgt[0] - eye[0], tgt[1] - eye[1], tgt[2] - eye[2]]
    const fn = Math.hypot(fwd[0], fwd[1], fwd[2])
    const F = fwd.map((v) => v / fn)
    let R = [-F[2], 0, F[0]]
    const rl = Math.hypot(R[0], R[1], R[2]) || 1
    R = R.map((v) => v / rl)
    const U = [R[1] * F[2] - R[2] * F[1], R[2] * F[0] - R[0] * F[2], R[0] * F[1] - R[1] * F[0]]
    const radii = ringRadii(Math.hypot(S[0] - eye[0], S[1] - eye[1], S[2] - eye[2]))
    let o = ringStart * 4
    for (let r = 0; r < 3; r++) {
      const rad = radii[r] * (1 + 0.07 * Math.sin(time * 1.1 + r * 1.9) + 0.25 * flare * fract(time * 0.5 + r / 3))
      for (let k = 0; k < RING_SEG; k++) {
        for (const kk of [k, k + 1]) {
          const th = (kk / RING_SEG) * Math.PI * 2
          const c = Math.cos(th) * rad, s = Math.sin(th) * rad
          lines[o++] = S[0] + R[0] * c + U[0] * s
          lines[o++] = S[1] + 0.6 + R[1] * c + U[1] * s
          lines[o++] = S[2] + R[2] * c + U[2] * s
          lines[o++] = kk / RING_SEG
        }
      }
    }

    /* ---- render */
    G.viewport(0, 0, W, H)
    G.disable(G.BLEND)
    G.disable(G.DEPTH_TEST)
    G.depthMask(true)
    G.clearColor(top[0], top[1], top[2], 1)
    G.clear(G.COLOR_BUFFER_BIT | G.DEPTH_BUFFER_BIT)

    disableAll()
    G.useProgram(progs.sky.p)
    G.uniform3fv(progs.sky.u.uTop, top)
    G.uniform3fv(progs.sky.u.uHor, hor)
    G.uniform2f(progs.sky.u.uRes, W, H)
    G.bindBuffer(G.ARRAY_BUFFER, bufs.tri)
    attrib(progs.sky, "aP", 2, 2, 0)
    G.drawArrays(G.TRIANGLES, 0, 3)

    const pt = progs.pt
    G.enable(G.BLEND)
    G.blendFunc(G.ONE, G.ONE)
    if (night > 0.02) {
      disableAll()
      G.useProgram(pt.p)
      G.uniformMatrix4fv(pt.u.uVP, false, VP)
      G.uniform1f(pt.u.uPx, dpr)
      G.uniform1f(pt.u.uA, night * night)
      G.uniform3fv(pt.u.uEye, eye)
      G.uniform2f(pt.u.uFog, 1e4, 2e4)
      G.bindBuffer(G.ARRAY_BUFFER, bufs.stars)
      attrib(pt, "aP", 3, 8, 0)
      attrib(pt, "aC", 4, 8, 3)
      attrib(pt, "aS", 1, 8, 7)
      G.drawArrays(G.POINTS, 0, nStars)
    }

    // surface
    G.disable(G.BLEND)
    G.enable(G.DEPTH_TEST)
    G.depthFunc(G.LEQUAL)
    disableAll()
    const su = progs.surf
    G.useProgram(su.p)
    G.uniformMatrix4fv(su.u.uVP, false, VP)
    G.uniform3fv(su.u.uTop, top)
    G.uniform3fv(su.u.uHor, hor)
    G.uniform2f(su.u.uRes, W, H)
    G.uniform3fv(su.u.uEye, eye)
    G.uniform3f(su.u.uSun, -0.55, 0.62, 0.56)
    G.uniform3fv(su.u.uSum, S)
    G.uniform3fv(su.u.uWire, wire)
    G.uniform2f(su.u.uFog, fogN, fogF)
    G.uniform4f(su.u.uHit, hit[0], hit[1], hit[2], opts.pointer ? clamp01(hit[3]) : 0)
    G.uniform1f(su.u.uSolid, solid)
    G.uniform1f(su.u.uNight, night)
    G.uniform1f(su.u.uIntro, introE)
    G.uniform1f(su.u.uGlow, 0.9 * flare * (0.85 + 0.15 * Math.sin(time * 2.2)))
    G.bindBuffer(G.ARRAY_BUFFER, bufs.surf)
    attrib(su, "aP", 3, 12, 0)
    attrib(su, "aN", 3, 12, 3)
    attrib(su, "aB", 3, 12, 6)
    attrib(su, "aI", 3, 12, 9)
    G.drawArrays(G.TRIANGLES, 0, nVerts)

    // flag of Israel at the summit
    disableAll()
    const fp = progs.flag
    G.useProgram(fp.p)
    G.uniformMatrix4fv(fp.u.uVP, false, VP)
    G.uniform3fv(fp.u.uTop, poleTop)
    G.uniform3fv(fp.u.uRight, flagRight)
    G.uniform3fv(fp.u.uDown, flagDown)
    G.uniform3fv(fp.u.uNorm, flagNorm)
    G.uniform1f(fp.u.uTime, time)
    G.uniform1f(fp.u.uW, FLAG_W)
    G.uniform1f(fp.u.uH, FLAG_H)
    G.uniform1f(fp.u.uNight, night)
    G.uniform1f(fp.u.uAspect, FLAG_W / FLAG_H)
    G.bindBuffer(G.ARRAY_BUFFER, bufs.flag)
    attrib(fp, "aUV", 2, 2, 0)
    G.drawArrays(G.TRIANGLE_STRIP, 0, (FLAG_SEG + 1) * 2)

    // lines
    G.enable(G.BLEND)
    G.depthMask(false)
    G.blendFunc(G.ONE, night > 0.5 ? G.ONE : G.ONE_MINUS_SRC_ALPHA)
    disableAll()
    const ln = progs.ln
    G.useProgram(ln.p)
    G.uniformMatrix4fv(ln.u.uVP, false, VP)
    G.bindBuffer(G.ARRAY_BUFFER, bufs.lines)
    G.bufferSubData(G.ARRAY_BUFFER, ringStart * 16, lines.subarray(ringStart * 4))
    attrib(ln, "aP", 3, 4, 0)
    attrib(ln, "aT", 1, 4, 3)
    const lineCol = mix3(SLATE, ICE, night)
    const drawSeg = (name: string, a: number, dash: [number, number, number], col: V3 = lineCol) => {
      const s = seg[name]
      if (!s || a < 0.01) return
      G.uniform4f(ln.u.uC, col[0], col[1], col[2], a)
      G.uniform3f(ln.u.uD, dash[0], dash[1], dash[2])
      G.drawArrays(G.LINES, s[0], s[1])
    }
    for (let k = 0; k < activeArcs; k++) drawSeg(`arc${k}`, (0.16 + 0.14 * night) * clamp01(out * ARCS - k) * introE, [70, time * 0.3, 0.5])
    drawSeg("net", 0.42 * net, [26, time * 0.6, 0.5], ICE)
    drawSeg("beam", 0.32 * night, [0, 0, 1], ICE)
    drawSeg("pole", 0.95 * introE, [0, 0, 1], mix3(INK, WHITE, night))
    G.disable(G.DEPTH_TEST)
    for (let r = 0; r < 3; r++) {
      const ringA = (r === 1 ? 0.3 : 0.42) * introE * (0.7 + 0.3 * Math.sin(time * 1.1 + r * 1.9)) * (0.6 + 0.4 * flare)
      G.uniform4f(ln.u.uC, lineCol[0], lineCol[1], lineCol[2], ringA)
      G.uniform3f(ln.u.uD, r === 1 ? 48 : 0, 0, 0.5)
      G.drawArrays(G.LINES, ringStart + r * RING_SEG * 2, RING_SEG * 2)
    }
    G.enable(G.DEPTH_TEST)

    // points: ridge dots, route, talent, comets, summit
    disableAll()
    G.useProgram(pt.p)
    G.uniformMatrix4fv(pt.u.uVP, false, VP)
    G.uniform1f(pt.u.uPx, dpr)
    G.uniform3fv(pt.u.uEye, eye)
    G.uniform2f(pt.u.uFog, fogN, fogF * 1.6)
    G.blendFunc(G.ONE, night > 0.5 ? G.ONE : G.ONE_MINUS_SRC_ALPHA)
    G.uniform1f(pt.u.uA, (0.45 + 0.3 * night) * introE)
    G.bindBuffer(G.ARRAY_BUFFER, bufs.ridge)
    if (Math.abs(night - ridgeNight) > 0.01) {
      ridgeNight = night
      for (let i = 0; i < nRidge; i++) ridge.set(wire, i * 8 + 3)
      G.bufferData(G.ARRAY_BUFFER, ridge, G.DYNAMIC_DRAW)
    }
    attrib(pt, "aP", 3, 8, 0)
    attrib(pt, "aC", 4, 8, 3)
    attrib(pt, "aS", 1, 8, 7)
    G.drawArrays(G.POINTS, 0, nRidge)
    G.uniform1f(pt.u.uA, 1)
    G.bindBuffer(G.ARRAY_BUFFER, bufs.dyn)
    G.bufferSubData(G.ARRAY_BUFFER, 0, dyn.subarray(0, n * 8))
    attrib(pt, "aP", 3, 8, 0)
    attrib(pt, "aC", 4, 8, 3)
    attrib(pt, "aS", 1, 8, 7)
    G.drawArrays(G.POINTS, 0, n)
    G.depthMask(true)

    if (opts.onLabels) opts.onLabels(labelCandidates(VP, canvas.clientWidth, canvas.clientHeight))

    if (first) {
      first = false
      opts.onFirstFrame?.()
    }
  }

  const onVis = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
    } else if (running && !raf) {
      last = performance.now()
      raf = requestAnimationFrame(draw)
    }
  }
  const onLost = (e: Event) => {
    e.preventDefault()
    lost = true
    opts.onContextChange?.(false)
  }
  const onRestored = async () => {
    ridgeNight = -1
    await setup()
    lost = false
    opts.onContextChange?.(true)
  }
  document.addEventListener("visibilitychange", onVis)
  canvas.addEventListener("webglcontextlost", onLost)
  canvas.addEventListener("webglcontextrestored", onRestored)
  raf = requestAnimationFrame(draw)

  return {
    stop() {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointermove", onPointer)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVis)
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
      G.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}
