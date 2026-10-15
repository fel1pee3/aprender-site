import type { Metadata } from "next";
import imageDimensions from "@/data/image-dimensions.json";
import { localizedPath, type Locale } from "@/i18n/shared";
import { assetUrl } from "@/lib/asset-url";

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
}, locale: Locale = "pt"): Metadata {
  const socialImage = absoluteUrl(assetUrl(image));
  const imageAlt = image === "/images/social/aprender-share.jpg"
    ? ({ pt: "Aprender Editora: materiais e formação para aprender, com educadoras em formação e livros de Lendo e Escrevendo", en: "Aprender Editora: learning materials and teacher development, with educators in training and books from Lendo e Escrevendo", es: "Aprender Editora: materiales y formación para aprender, con educadoras en formación y libros de Lendo e Escrevendo" })[locale]
    : title;
  const dimensions = (
    imageDimensions as Record<string, { width: number; height: number }>
  )[image];
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(localizedPath(path, locale)), languages: { "pt-BR": absoluteUrl(localizedPath(path, "pt")), en: absoluteUrl(localizedPath(path, "en")), es: absoluteUrl(localizedPath(path, "es")), "x-default": absoluteUrl(localizedPath(path, "pt")) } },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath(path, locale)),
      type,
      locale: { pt: "pt_BR", en: "en_US", es: "es_ES" }[locale],
      alternateLocale: ["pt_BR", "en_US", "es_ES"].filter(value => value !== { pt: "pt_BR", en: "en_US", es: "es_ES" }[locale]),
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
