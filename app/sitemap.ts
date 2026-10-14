import type { MetadataRoute } from "next"
import { site } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/tracks", "/tracks/architects", "/tracks/founders", "/people", "/partner", "/community/alumni"].map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
  }))
}
