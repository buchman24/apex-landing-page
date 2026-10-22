/*
  Company logo permissions.

  A company shows as text until it is listed here with its permission.
  Note: a website logo is listed as a paid benefit in the APEX Sponsor Package.

  To add a company: put the official file under public/logos/ and add a line, e.g.
    { company: "NVIDIA", src: "/logos/nvidia.svg", height: 22, permission: "Email from <name>, <date>" },
  `company` must match the name used in content/tracks.ts exactly.
  height: display height in px, set by eye so the logos look the same size.
  tile: "dark" for a logo that only exists in a light version (shown on a small dark tile).
  text: words shown after the logo, when the file does not carry the full name.
  alt: the image's alt text when it differs from the company name ("" when `text` already names it).
  Use the official file unchanged: several brand guidelines (NVIDIA, Nebius) forbid recolouring.
*/

export type LogoPermission = {
  company: string
  src: string
  height: number
  permission: string
  tile?: "dark"
  text?: string
  alt?: string
}

const OK = "Confirmed by Dvir Maimon, 15.10.2026"

/** Files are the companies' own, downloaded 15.10.2026 from their official sites (sources in the PR). */
export const permittedLogos: LogoPermission[] = [
  { company: "NVIDIA", src: "/logos/nvidia.svg", height: 20, permission: OK },
  { company: "Nebius", src: "/logos/nebius.svg", height: 24, permission: OK },
  { company: "Team8", src: "/logos/team8.svg", height: 26, permission: OK },
  { company: "Bessemer", src: "/logos/bessemer.svg", height: 30, permission: OK },
  { company: "Majestic Labs", src: "/logos/majestic-labs.svg", height: 13, tile: "dark", permission: OK },
  { company: "Dream Security", src: "/logos/dream-security.svg", height: 28, text: "Dream Security", alt: "", permission: OK },
  { company: "AI21", src: "/logos/ai21.svg", height: 20, permission: OK },
  { company: "IBM Research", src: "/logos/ibm.svg", height: 20, text: "Research", alt: "IBM", permission: OK },
  { company: "Decart", src: "/logos/decart.svg", height: 22, permission: OK },
  { company: "Plurai", src: "/logos/plurai.png", height: 24, permission: OK },
  { company: "Tenzai", src: "/logos/tenzai.svg", height: 20, tile: "dark", permission: OK },
  { company: "Bar-Ilan University", src: "/logos/bar-ilan.svg", height: 36, permission: OK },
]
