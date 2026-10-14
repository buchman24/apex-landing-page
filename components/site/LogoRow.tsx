import { permittedLogos } from "@/content/logos"
import { cn } from "@/lib/utils"

/**
 * LOGO SLOT. Company names render as text. A company switches to its logo image only
 * once it is listed in content/logos.ts with written permission.
 */
export function LogoRow({ companies, label, className }: { companies: string[]; label?: string; className?: string }) {
  return (
    <div data-logo-slot="" className={className}>
      {label ? <p className="label">{label}</p> : null}
      <ul className={cn("flex flex-wrap gap-x-7 gap-y-2", label && "mt-4")}>
        {companies.map((company) => {
          const logo = permittedLogos.find((l) => l.company === company)
          return (
            <li key={company} className="font-display text-[19px] font-medium tracking-[-0.02em] text-ink md:text-[22px]">
              {logo ? <img src={logo.src} alt={company} height={28} className="h-7 w-auto" /> : company}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
