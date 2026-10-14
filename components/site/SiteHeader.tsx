"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { site } from "@/content/site"
import { Logo } from "./Logo"
import { cn } from "@/lib/utils"

/**
 * Full-width navigation. Transparent over the hero, a quiet bar with a hairline once the
 * page scrolls. On the home page it marks the section in view.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 16))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (!isHome) {
      setActive(null)
      return
    }
    const ids = site.nav.map((n) => n.homeAnchor)
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    // Close when focus or a tap leaves the header.
    const onFocus = (e: FocusEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("focusin", onFocus)
    document.addEventListener("pointerdown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("focusin", onFocus)
      document.removeEventListener("pointerdown", onDown)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const hrefFor = (item: (typeof site.nav)[number]) => (isHome ? `#${item.homeAnchor}` : item.href)
  const isCurrent = (item: (typeof site.nav)[number]) =>
    isHome ? active === item.homeAnchor : item.href !== "/" && !item.href.startsWith("/#") && pathname.startsWith(item.href)
  const ctaHref = isHome ? site.navCta.href.replace("/", "") : site.navCta.href
  const solid = scrolled || open

  return (
    <header ref={headerRef} data-site-header="" className="fixed inset-x-0 top-0 z-50 text-ink">
      <div className="site-bar" data-solid={solid ? "" : undefined}>
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((item) => {
                const current = isCurrent(item)
                return (
                  <li key={item.label}>
                    <Link
                      href={hrefFor(item)}
                      aria-current={current ? (isHome ? "location" : "page") : undefined}
                      className={cn(
                        "relative inline-flex min-h-[44px] items-center text-[14px] font-medium text-ink/70 transition-colors hover:text-ink",
                        current && "text-ink after:absolute after:inset-x-0 after:bottom-[9px] after:h-px after:bg-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link href={ctaHref} className="btn btn-primary h-11 px-5 text-[14px]">
              {site.navCta.label}
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
                ) : (
                  <path d="M2 7h16M2 13h16" stroke="currentColor" strokeWidth="1.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="site-menu max-h-[calc(100svh-var(--header-h))] overflow-y-auto overscroll-contain border-b border-rule/15 lg:hidden"
      >
        <ul className="wrap hairlines py-2">
          {site.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={hrefFor(item)}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(item) ? (isHome ? "location" : "page") : undefined}
                className="flex min-h-[60px] items-center font-display text-[24px] font-medium tracking-[-0.025em] text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
