import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import NotFound from "@/app/not-found";
import { getSolution } from "@/data/solutions";
import { getArticle } from "@/data/editorial";

type Route = { params: Promise<{ locale: string; segments?: string[] }> };
type PageModule = { default: () => Promise<ReactNode>; generateMetadata?: () => Promise<Metadata> };
// Reuse the same server components, data and styles as Portuguese routes.
// Actual prefixed routes avoid rewrites, process-local state and duplicate copy.
const staticPages: Record<string, () => Promise<PageModule>> = {
  "/": () => import("@/app/page"),
  "/a-editora": () => import("@/app/a-editora/page"),
  "/a-editora/trajetoria": () => import("@/app/a-editora/trajetoria/page"),
  "/a-editora/edgar-linhares": () => import("@/app/a-editora/edgar-linhares/page"),
  "/a-editora/paic": () => import("@/app/a-editora/paic/page"),
  "/solucoes": () => import("@/app/solucoes/page"),
  "/formacao": () => import("@/app/formacao/page"),
  "/plataformas": () => import("@/app/plataformas/page"),
  "/em-acao": () => import("@/app/em-acao/page"),
  "/acervo": () => import("@/app/acervo/page"),
  "/recursos": () => import("@/app/recursos/page"),
  "/recursos/tabela-precos": () => import("@/app/recursos/tabela-precos/page"),
  "/contato": () => import("@/app/contato/page"),
  "/acessibilidade": () => import("@/app/acessibilidade/page"),
};
async function resolvePage(params: Route["params"]) {
  const { locale, segments = [] } = await params;
  if (locale !== "en" && locale !== "es") return undefined;
  const path = "/" + segments.join("/");
  const loader = staticPages[path];
  if (loader) {
    const module = await loader();
    return { render: module.default, metadata: () => module.generateMetadata?.() || {} };
  }
  if (segments.length === 2 && segments[0] === "solucoes") {
    if (!getSolution(segments[1])) return undefined;
    const module = await import("@/app/solucoes/[slug]/page");
    const props = { params: Promise.resolve({ slug: segments[1] }) };
    return { render: () => module.default(props), metadata: () => module.generateMetadata(props) };
  }
  if (segments.length === 2 && segments[0] === "em-acao") {
    if (!getArticle(segments[1])) return undefined;
    const module = await import("@/app/em-acao/[slug]/page");
    const props = { params: Promise.resolve({ slug: segments[1] }) };
    return { render: () => module.default(props), metadata: () => module.generateMetadata(props) };
  }
  return undefined;
}
export async function generateMetadata({ params }: Route): Promise<Metadata> {
  return (await resolvePage(params))?.metadata() || {};
}
export default async function LocalizedPage({ params }: Route) {
  const page = await resolvePage(params);
  if (!page) {
    const { locale, segments = [] } = await params;
    const fallback = (locale === "not-found" && segments.length === 0)
      || ((locale === "en" || locale === "es") && segments.length === 1 && segments[0] === "not-found");
    // Only Proxy's 404 destination renders normally. Missing asset/API URLs,
    // which deliberately bypass Proxy, still use Next's native 404 status.
    if (fallback) return <NotFound />;
    notFound();
  }
  return page.render();
}
