import type { ReactNode } from "react"
import { SceneCanvas } from "@/components/scene/SceneCanvas"
import { SiteHeader } from "@/components/site/SiteHeader"
import { SiteFooter } from "@/components/site/SiteFooter"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {/* Fixed 3D background: static poster first, WebGL scene once the page is idle. */}
      <SceneCanvas />
      <SiteHeader />
      <main id="main" className="relative z-10">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
