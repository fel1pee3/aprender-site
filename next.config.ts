import type { NextConfig } from "next";
import { legacyRoutes } from "./src/data/legacy-routes";

const config: NextConfig = {
  distDir: process.env.APRENDER_BUILD_DIR || ".next",
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return Object.entries(legacyRoutes).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default config;
