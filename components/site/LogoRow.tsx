import { permittedLogos, type LogoPermission } from "@/content/logos"
import { cn } from "@/lib/utils"

/**
 * LOGO SLOT. A company shows its logo once it is listed in content/logos.ts with its
 * permission; every other company shows as text.
 */
export function LogoRow({ companies, label, className }: { companies: string[]; label?: string; className?: string }) {
  return (
    <div data-logo-slot="" className={className}>
      {label ? <p className="label">{label}</p> : null}
      <ul className={cn("flex flex-wrap items-center gap-x-8 gap-y-5", label && "mt-5")}>
        {companies.map((company) => {
          const logo = permittedLogos.find((l) => l.company === company)
          return (
            <li key={company} className="flex min-h-[40px] items-center font-display text-[19px] font-medium tracking-[-0.02em] text-ink md:text-[22px]">
              {logo ? <Logo logo={logo} /> : company}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Logo({ logo }: { logo: LogoPermission }) {
  const img = <img src={logo.src} alt={logo.alt ?? logo.company} style={{ height: logo.height }} className="block w-auto max-w-[180px]" loading="lazy" decoding="async" />
  return (
    <span className="inline-flex items-center gap-2">
      {logo.tile === "dark" ? <span className="inline-flex items-center rounded-[3px] bg-[#0d1b2a] px-2.5 py-2">{img}</span> : img}
      {logo.text ? <span className="text-[15px] md:text-[17px]">{logo.text}</span> : null}
    </span>
  )
}
