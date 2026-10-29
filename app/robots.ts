import type { MetadataRoute } from "next"
import { site } from "@/content/site"
import { deployEnv } from "@/lib/placeholders"

export default function robots(): MetadataRoute.Robots {
  const isProduction = deployEnv === "production"
  return {
    // Previews must not be indexed.
    rules: isProduction ? { userAgent: "*", allow: "/", disallow: ["/add-member", "/api/"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
