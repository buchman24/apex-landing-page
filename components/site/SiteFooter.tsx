import Link from "next/link"
import { site } from "@/content/site"
import { isMissing } from "@/content/_lib"
import { Logo } from "./Logo"
import { Missing } from "./Missing"

export function SiteFooter() {
  const { footer } = site
  return (
    <footer className="relative z-10 bg-[#0a1624] text-white">
      <div className="wrap grid gap-12 pb-14 pt-16 md:grid-cols-[1.6fr_1fr_1fr] md:pb-20 md:pt-24">
        <div>
          <Logo tone="paper" />
          <p className="mt-6 max-w-[22ch] font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            {footer.tagline}
          </p>
          <p className="mt-8 text-[15px]">
            <a className="text-white underline decoration-white/30 underline-offset-[5px] hover:decoration-white" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          </p>
        </div>
        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#9fb2c7] sm:text-[12px]">{col.title}</p>
            <ul className="mt-4 space-y-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-[40px] items-center text-[15px] text-[#d5dde6] transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 font-mono text-[11px] uppercase tracking-[0.1em] text-[#9fb2c7] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} APEX · {footer.legalLine}
          </p>
          {isMissing(footer.privacyNotice) ? <Missing item={footer.privacyNotice} className="normal-case tracking-normal md:max-w-md" /> : null}
        </div>
      </div>
    </footer>
  )
}
