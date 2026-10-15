import type { NextConfig } from "next";
import { legacyRoutes } from "./src/data/legacy-routes";

const config: NextConfig = {
  distDir: process.env.APRENDER_BUILD_DIR || ".next",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // The build emits a distinct ?v=<content hash> for each local image.
    // Query strings are intentionally supported only in this public image tree.
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/_next/static/media/**", search: "" },
    ],
  },
  async redirects() {
    return Object.entries(legacyRoutes).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default config;
