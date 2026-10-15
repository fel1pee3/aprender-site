export const preferenceCookie = "aprender-reading-v1";
export const languageCookie = "aprender-language";
export const defaultPreferences = {
  theme: "system",
  contrast: "normal",
  textSize: "100",
  spacing: "standard",
  motion: "system",
} as const;
export type ReadingPreferences = {
  theme: "system" | "light" | "dark";
  contrast: "normal" | "more";
  textSize: "100" | "125" | "150" | "175" | "200";
  spacing: "standard" | "comfortable";
  motion: "system" | "reduce";
};
const allowed: Record<keyof ReadingPreferences, readonly string[]> = {
  theme: ["system", "light", "dark"],
  contrast: ["normal", "more"],
  textSize: ["100", "125", "150", "175", "200"],
  spacing: ["standard", "comfortable"],
  motion: ["system", "reduce"],
};
export function parsePreferences(cookie?: string): ReadingPreferences {
  const result: ReadingPreferences = { ...defaultPreferences };
  if (!cookie || cookie.length > 1024) return result;
  try {
    const value: unknown = JSON.parse(decodeURIComponent(cookie));
    if (!value || typeof value !== "object" || Array.isArray(value)) return result;
    for (const key of Object.keys(allowed) as (keyof ReadingPreferences)[]) {
      const candidate = (value as Record<string, unknown>)[key];
      if (typeof candidate === "string" && allowed[key].includes(candidate)) {
        Object.assign(result, { [key]: candidate });
      }
    }
  } catch { /* Invalid or blocked storage leaves useful defaults. */ }
  return result;
}
export function preferenceAttributes(value: ReadingPreferences) {
  return {
    "data-theme": value.theme,
    "data-contrast": value.contrast,
    "data-text-size": value.textSize,
    "data-spacing": value.spacing,
    "data-motion": value.motion,
  };
}
