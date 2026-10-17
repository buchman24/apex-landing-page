/// <reference lib="webworker" />
import { buildGeometry, transferables } from "./geometry"

self.onmessage = (e: MessageEvent<{ detail: "low" | "high" }>) => {
  const g = buildGeometry(e.data.detail)
  ;(self as unknown as DedicatedWorkerGlobalScope).postMessage(g, transferables(g))
}
