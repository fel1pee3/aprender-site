import { NextResponse, type NextRequest } from "next/server";
import { splitLocale } from "./i18n/shared";
import { legacyRoutes } from "./data/legacy-routes";
import { solutions } from "./data/solutions";
import { articles } from "./data/editorial";

const pagePaths = new Set([
  "/", "/a-editora", "/a-editora/trajetoria", "/a-editora/edgar-linhares",
  "/a-editora/paic", "/solucoes", "/formacao", "/plataformas", "/em-acao",
  "/acervo", "/recursos", "/recursos/tabela-precos", "/contato", "/acessibilidade",
  ...solutions.map(solution => `/solucoes/${solution.slug}`),
  ...articles.map(article => `/em-acao/${article.slug}`),
]);

export function proxy(request: NextRequest) {
  const parsed = splitLocale(request.nextUrl.pathname);
  const locale = parsed.locale;
  const { path } = parsed;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-aprender-locale", locale);
  requestHeaders.set("x-aprender-path", path);
  if (parsed.locale !== "pt") {
    const legacy = legacyRoutes[path];
    if (legacy) {
      const destination = legacy.startsWith("/") ? `/${locale}${legacy === "/" ? "" : legacy}` : legacy;
      const target = new URL(destination, request.url);
      request.nextUrl.searchParams.forEach((value, key) => { if (!target.searchParams.has(key)) target.searchParams.set(key, value); });
      return NextResponse.redirect(target, 308);
    }
  }
  // Decide missing routes before streaming. Rendering the ordinary localized
  // fallback avoids Next's early-error shell, which omits the document language
  // and visible content until client recovery in the installed version.
  // Next's loading.md "Status codes" documents this Proxy/rewrite approach.
  const missing = !pagePaths.has(path);
  const fallbackPath = locale === "pt" ? "/not-found" : `/${locale}/not-found`;
  const response = missing && request.nextUrl.pathname !== fallbackPath
    ? NextResponse.rewrite(new URL(fallbackPath, request.url), { status: 404, request: { headers: requestHeaders } })
    : NextResponse.next({ status: missing ? 404 : 200, request: { headers: requestHeaders } });
  response.headers.set("Content-Language", locale === "pt" ? "pt-BR" : locale);
  return response;
}
export const config = { matcher: ["/((?!api|_next|images|documents|media|fonts|.*\\..*).*)"] };
