import Link from "next/link"
import { notFoundPage } from "@/content/site"
import { SceneCanvas } from "@/components/scene/SceneCanvas"
import { SiteHeader } from "@/components/site/SiteHeader"
import { SiteFooter } from "@/components/site/SiteFooter"

/** Unknown addresses (old links included) land here, inside the normal site frame. */
export default function NotFound() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SceneCanvas />
      <SiteHeader />
      <main id="main" className="relative z-10">
        <section data-scene="aerial" aria-labelledby="nf-title" className="relative">
          <div className="wrap flex min-h-[100svh] flex-col justify-center pb-24 pt-[calc(var(--header-h)+4.5rem)] md:pb-32 md:pt-[calc(var(--header-h)+8rem)]">
            <div className="col">
              <p className="label">404</p>
              <h1 id="nf-title" className="h-section mt-6 max-w-[14ch]">
                {notFoundPage.heading}
              </h1>
              <p className="lede mt-6 max-w-[38ch]">{notFoundPage.body}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/" className="btn btn-primary">
                  {notFoundPage.home}
                </Link>
                <Link href="/tracks" className="btn btn-ghost">
                  {notFoundPage.tracks}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
