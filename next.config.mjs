/** @type {import('next').NextConfig} */
const nextConfig = {
  // The repo has no ESLint setup yet. TypeScript errors DO fail the build.
  eslint: { ignoreDuringBuilds: true },
  // Unchanged on purpose: turning on Vercel image optimisation has quota and
  // billing implications for the Vercel project. The new pages ship no raster
  // images above the fold.
  images: { unoptimized: true },
  poweredByHeader: false,
  async redirects() {
    return [
      // Old routes folded into the new structure. Query strings (utm_*) are kept.
      { source: "/community", destination: "/people", permanent: true },
      { source: "/community/showcase", destination: "/people", permanent: true },
      { source: "/apply", destination: "/tracks/architects", permanent: true },
    ]
  },
}

export default nextConfig
