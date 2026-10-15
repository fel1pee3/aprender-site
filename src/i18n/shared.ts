export const locales = ["pt", "en", "es"] as const;
export type Locale = typeof locales[number];
export type Messages = Record<string, string>;
export const htmlLanguages = { pt: "pt-BR", en: "en", es: "es" } as const;
export const numberLocales = { pt: "pt-BR", en: "en-US", es: "es-ES" } as const;
export function asLocale(value: unknown): Locale {
  return value === "en" || value === "es" ? value : "pt";
}
export function splitLocale(path: string) {
  const match = path.match(/^\/(en|es)(?=\/|$)/);
  return { locale: asLocale(match?.[1]), path: match ? path.slice(match[0].length) || "/" : path };
}
export function localizedPath(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//") || /^\/(?:_next|images|documents|media|fonts)(?:\/|$)/.test(href) || /\.[a-z0-9]+(?:[?#]|$)/i.test(href)) return href;
  const { path } = splitLocale(href);
  return locale === "pt" ? path : `/${locale}${path === "/" ? "" : path}`;
}
export const messageKey = (value: string) => value.replace(/\s+/g, " ").trim();
export type Translator = ReturnType<typeof createTranslator>;
export function createTranslator(locale: Locale, messages: Messages = {}) {
  function t<T>(value: T, args?: unknown[]): T {
    if (typeof value !== "string") return value;
    const key = messageKey(value);
    let translated = locale === "pt" ? key : messages[key];
    if (translated === undefined) {
      // Composite captions retain independently translated edition/material labels.
      const separator = [" · ", "\n"].find(part => value.includes(part));
      translated = separator ? value.split(separator).map(part => t(part)).join(separator) : value;
    } else {
      translated = (value.match(/^\s+/)?.[0] || "") + translated + (value.match(/\s+$/)?.[0] || "");
    }
    if (args) translated = translated.replace(/\{(\d+)\}/g, (_, index) => String(t(args[Number(index)])));
    return translated as T;
  }
  return Object.assign(t, {
    locale,
    numberLocale: numberLocales[locale],
    href: (href: string) => localizedPath(href, locale),
    number: (value: number, options?: Intl.NumberFormatOptions) => new Intl.NumberFormat(numberLocales[locale], options).format(value),
    data: <T,>(value: T): T => {
      const skip = new Set(["id", "slug", "collectionSlug", "collectionSlugs", "relatedCollectionSlugs", "editionId", "stageId", "stageIds", "objectiveId", "source", "sourceUrl", "sourcePage", "url", "href", "image", "src", "poster", "originalSrc", "originalImage", "descriptionTrack", "accent"]);
      const visit = (item: unknown, key = ""): unknown => {
        if (skip.has(key)) return item;
        if (Array.isArray(item)) return item.map(child => visit(child, key));
        if (item && typeof item === "object") return Object.fromEntries(Object.entries(item).map(([name, child]) => [name, visit(child, name)]));
        return typeof item === "string" ? t(item) : item;
      };
      return visit(value) as T;
    },
  });
}
