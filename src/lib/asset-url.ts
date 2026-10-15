import versions from "@/data/asset-versions.json";

const imageVersions: Readonly<Record<string, string>> = versions;

export function assetUrl(source: string): string;
export function assetUrl<T>(source: T): T;
/** Keep external/unknown URLs and static imports intact; version known images. */
export function assetUrl(source: unknown): unknown {
  if (typeof source !== "string" || !source.startsWith("/") || source.startsWith("//")) return source;
  const hashIndex = source.indexOf("#");
  const fragment = hashIndex < 0 ? "" : source.slice(hashIndex);
  const location = hashIndex < 0 ? source : source.slice(0, hashIndex);
  const queryIndex = location.indexOf("?");
  const pathname = queryIndex < 0 ? location : location.slice(0, queryIndex);
  if (!Object.hasOwn(imageVersions, pathname)) return source;
  const query = new URLSearchParams(queryIndex < 0 ? "" : location.slice(queryIndex + 1));
  query.set("v", imageVersions[pathname]);
  return `${pathname}?${query.toString()}${fragment}`;
}
