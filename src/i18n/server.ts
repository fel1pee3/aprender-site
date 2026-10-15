import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { asLocale, createTranslator, messageKey, type Messages, type Locale } from "./shared";
import { solutions, stages, objectives } from "@/data/solutions";
import { priceRows } from "@/data/prices";
import { navigation } from "@/data/navigation";
import clientMessageKeys from "./client-message-keys.json";

export const getLocale = cache(async () => asLocale((await headers()).get("x-aprender-locale")));
export const getMessages = cache(async (locale: Locale): Promise<Messages> => {
  if (locale === "pt") return {};
  const modules = locale === "en"
    ? await Promise.all([import("./messages/content-primary.en.json"), import("./messages/content-institutional.en.json"), import("./messages/ui.en.json"), import("./messages/forms.en.json"), import("./messages/audit.en.json"), import("./messages/common.en.json")])
    : await Promise.all([import("./messages/content-primary.es.json"), import("./messages/content-institutional.es.json"), import("./messages/ui.es.json"), import("./messages/forms.es.json"), import("./messages/audit.es.json"), import("./messages/common.es.json")]);
  return Object.assign({}, ...modules.map(module => module.default));
});
export const getTranslator = cache(async () => {
  const locale = await getLocale();
  return createTranslator(locale, await getMessages(locale));
});
export async function getClientMessages(): Promise<Messages> {
  const locale = await getLocale();
  if (locale === "pt") return {};
  const all = await getMessages(locale);
  const keys = new Set(clientMessageKeys);
  const add = (value: unknown) => { if (typeof value === "string") keys.add(messageKey(value)); };
  for (const solution of solutions) for (const key of ["name", "description", "stage", "subtitle"] as const) add(solution[key]);
  for (const item of [...stages, ...objectives]) add(item.label);
  for (const item of navigation) add(item.label);
  for (const row of priceRows) for (const key of ["audience", "schoolYear", "kit", "collection", "segment"] as const) add(row[key]);
  return Object.fromEntries([...keys].filter(key => all[key] !== undefined).map(key => [key, all[key]]));
}
