import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { IBM_Plex_Mono, Inter, Inter_Tight, Poppins } from "next/font/google"
import "./globals.css"
import { site } from "@/content/site"
import { enforceReleaseGate } from "@/lib/release-gate"

// All fonts are downloaded at build time and served from our own domain (no third-party requests).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["500"], variable: "--font-display", display: "swap" })
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono", display: "swap", preload: false })
// The APEX wordmark only.
const poppins = Poppins({ subsets: ["latin"], weight: "700", variable: "--font-poppins", display: "swap", preload: false })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | APEX" },
  description: site.description,
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    type: "website",
    siteName: "APEX",
    title: site.title,
    description: site.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "APEX: the institution behind Israel's AI future." }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
}

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
  colorScheme: "light",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  // Fails the production build while content is missing or unapproved (see content/release.ts).
  enforceReleaseGate()
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${plexMono.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that scripts run, before first paint, so script-only fallbacks stay hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.setAttribute('data-js','')" }} />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}
