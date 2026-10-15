/** Real HTTP evidence; does not assert CDN HITs or download a document collection.
 * QA_BASE_URL=http://localhost:3101 CACHE_REPORT_OUTPUT=docs/cache/local-production.json node scripts/check-cache-http.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = new URL(process.env.QA_BASE_URL || "http://localhost:3101");
const output = path.resolve(root, process.env.CACHE_REPORT_OUTPUT || "docs/cache/local-production.json");
const headerNames = [
  "cache-control", "etag", "last-modified", "age", "x-vercel-cache",
  "vary", "content-type", "content-range", "accept-ranges", "content-length", "x-nextjs-cache", "link",
];
const report = {
  schemaVersion: 1,
  checkedAt: new Date().toISOString(),
  base: base.origin,
  method: {
    runtime: `Node ${process.version} fetch; no browser cache or cookie jar`,
    requests: "Real GETs followed by HEAD and conditional GET for selected files when a validator is present. Home HTML and its HTTP Link preloads discover generated JS/CSS/font URLs; other bodies are canceled after headers. A single selected PDF also receives Range: bytes=0-63, with its body canceled after headers.",
    conditionals: "Conditional GETs use fetch cache: no-cache with an explicit Cache-Control: max-age=0 request header, recorded with the validator. Node/Undici's default fetch mode otherwise adds Pragma: no-cache and Cache-Control: no-cache to requests carrying validators; those reload headers can make a server correctly return 200 instead of 304. This script requests validation without those reload headers; response status remains an observation, not an assertion.",
    interpretation: "Observed response headers only; missing headers are omitted. No HIT, 304 or Range support is assumed. This is HTTP evidence, not a browser transfer/performance comparison or proof of production CDN behavior for an unpublished checkout.",
    publication: ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)
      ? "Local server: the report cannot establish final Vercel CDN headers. Run against a production build, not next dev."
      : "Read-only observation of the existing public deployment. Its version can differ from the current checkout; these results do not validate unpublished local changes. No deployment or purge is performed.",
    documentSelection: "Only the first PDF URL declared in src/data/resources.ts is requested; no complete PDF body or other PDFs are downloaded.",
  },
  selections: [],
  requests: [],
  skipped: [],
};

function observedHeaders(headers) {
  return Object.fromEntries(headerNames.filter(name => headers.has(name)).map(name => [name, headers.get(name)]));
}

async function request(resource, method = "GET", requestHeaders = {}, readHtml = false) {
  const requestedUrl = new URL(resource.url, base).href;
  const observation = { resource: resource.id, method, url: requestedUrl };
  const conditional = Object.keys(requestHeaders).some(name => /^if-(?:none-match|modified-since)$/i.test(name));
  const sentHeaders = conditional ? { ...requestHeaders, "Cache-Control": "max-age=0" } : requestHeaders;
  if (Object.keys(sentHeaders).length) observation.requestHeaders = sentHeaders;
  if (conditional) observation.fetchCache = "no-cache";
  try {
    const response = await fetch(requestedUrl, {
      method,
      headers: sentHeaders,
      ...(conditional ? { cache: "no-cache" } : {}),
      redirect: "follow",
      signal: AbortSignal.timeout(30_000),
    });
    observation.status = response.status;
    if (response.url !== requestedUrl) observation.finalUrl = response.url;
    observation.headers = observedHeaders(response.headers);
    let html;
    if (readHtml && response.ok && response.headers.get("content-type")?.includes("text/html")) {
      html = await response.text();
      observation.body = "Home HTML consumed for asset discovery";
    } else {
      await response.body?.cancel();
      observation.body = method === "HEAD" || response.status === 304 ? "No response body" : "Canceled after response headers";
    }
    report.requests.push(observation);
    return { observation, html };
  } catch (error) {
    observation.error = `${error.name}: ${error.message}`;
    if (error.cause?.code) observation.errorCode = error.cause.code;
    report.requests.push(observation);
    return { observation };
  }
}

function htmlAssetUrls(html) {
  const urls = new Map();
  for (const match of html.matchAll(/\b(?:src|href|content)\s*=\s*["']([^"']+)["']/gi)) {
    const value = match[1].replaceAll("&amp;", "&");
    try {
      const url = new URL(value, base);
      // Known local files are probed at the selected server, even when metadata
      // deliberately uses its canonical public origin in a local production build.
      if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/images/")) {
        urls.set(url.pathname + url.search, url);
        if (url.pathname === "/_next/image" && url.searchParams.has("url")) {
          const source = new URL(url.searchParams.get("url"), base);
          if (source.pathname.startsWith("/images/")) urls.set(source.pathname + source.search, source);
        }
      }
    } catch { /* Ignore text metadata and other non-URL attributes. */ }
  }
  return [...urls.values()];
}

async function inspectFile(resource) {
  report.selections.push(resource);
  const { observation } = await request(resource);
  await request(resource, "HEAD");
  const etag = observation.headers?.etag;
  const modified = observation.headers?.["last-modified"];
  if (etag || modified) {
    await request(resource, "GET", etag ? { "If-None-Match": etag } : { "If-Modified-Since": modified });
  } else {
    report.skipped.push({ resource: resource.id, check: "Conditional GET", reason: "GET response supplied neither ETag nor Last-Modified" });
  }
  if (resource.type === "pdf") await request(resource, "GET", { Range: "bytes=0-63" });
}

const pages = [
  { id: "home", type: "html", url: "/" },
  { id: "collection", type: "html", url: "/solucoes/lendo-e-escrevendo" },
  { id: "prices", type: "html", url: "/recursos/tabela-precos" },
  { id: "english", type: "html", url: "/en" },
  { id: "spanish", type: "html", url: "/es" },
];
let html = "";
for (const page of pages) {
  report.selections.push(page);
  const response = await request(page, "GET", {}, page.id === "home");
  if (response.html) {
    html = response.html;
    // Next may emit font preloads in the HTTP Link header instead of the HTML.
    for (const match of (response.observation.headers?.link || "").matchAll(/<([^>]+)>/g)) html += `\n<link href="${match[1]}">`;
  }
}

const discovered = htmlAssetUrls(html);
const resources = [
  { id: "social-image", type: "image", url: "/images/social/aprender-share.jpg" },
  { id: "price-image", type: "image", url: "/images/resources/tabela-precos-2027.jpg" },
];
for (const resource of [...resources]) {
  const versioned = discovered.find(url => url.pathname === resource.url && url.search);
  if (versioned) resources.push({ ...resource, id: `${resource.id}-versioned`, url: versioned.pathname + versioned.search });
}
const resourcesSource = await readFile(path.join(root, "src/data/resources.ts"), "utf8");
const firstPdf = resourcesSource.match(/["']?url["']?\s*:\s*["']([^"']+\.pdf(?:\?[^"']*)?)["']/i)?.[1];
if (firstPdf) resources.push({ id: "first-document", type: "pdf", url: firstPdf });
else report.skipped.push({ resource: "first-document", reason: "No PDF URL found in src/data/resources.ts" });

for (const [type, extension] of [["javascript", /\.js$/i], ["stylesheet", /\.css$/i], ["font", /\.(?:woff2?|ttf|otf)$/i]]) {
  const found = discovered.find(url => url.pathname.startsWith("/_next/static/") && extension.test(url.pathname));
  if (found) resources.push({ id: `generated-${type}`, type, url: found.pathname + found.search });
  else report.skipped.push({ resource: `generated-${type}`, reason: "No matching /_next/static/ URL was present in the fetched home HTML" });
}
for (const resource of resources) await inspectFile(resource);

report.finishedAt = new Date().toISOString();
report.summary = {
  resources: report.selections.length,
  requests: report.requests.length,
  networkErrors: report.requests.filter(row => row.error).length,
  httpErrors: report.requests.filter(row => row.status >= 400).length,
  conditionalResponses: report.requests.filter(row => row.requestHeaders?.["If-None-Match"] || row.requestHeaders?.["If-Modified-Since"]).map(row => ({ resource: row.resource, status: row.status ?? null })),
};
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Cache HTTP: ${report.summary.resources} resources, ${report.summary.requests} requests, ${report.summary.networkErrors} network errors, ${report.summary.httpErrors} HTTP errors. Report: ${path.relative(root, output)}`);
if (report.summary.networkErrors || report.summary.httpErrors) process.exitCode = 1;
