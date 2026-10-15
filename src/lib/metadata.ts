import type { Metadata } from "next";
import imageDimensions from "@/data/image-dimensions.json";

export const productionOrigin = "https://aprender-site.vercel.app";
function resolveOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    try {
      const candidate = new URL(configured);
      const isLocal = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(
        candidate.hostname,
      );
      if (candidate.protocol === "https:" && !isLocal) return candidate.origin;
      if (process.env.NODE_ENV === "development" && isLocal)
        return candidate.origin;
    } catch {
      /* An invalid deployment variable cannot leak into public metadata. */
    }
  }
  return productionOrigin;
}
export const siteOrigin = resolveOrigin();
export const absoluteUrl = (path: string) => new URL(path, siteOrigin).href;

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/social/aprender-share.jpg",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const socialImage = absoluteUrl(image);
  const imageAlt = image === "/images/social/aprender-share.jpg"
    ? "Aprender Editora: materiais e formação para aprender, com educadoras em formação e livros de Lendo e Escrevendo"
    : title;
  const dimensions = (
    imageDimensions as Record<string, { width: number; height: number }>
  )[image];
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type,
      locale: "pt_BR",
      siteName: "Aprender Editora",
      images: [{ url: socialImage, alt: imageAlt, ...dimensions }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage, alt: imageAlt }],
    },
  };
}
