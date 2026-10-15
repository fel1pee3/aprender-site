import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptPath), "..");

/** Version existing image URLs without copying or renaming public assets. */
export function generateAssetVersions(root = projectRoot) {
  const imagesDirectory = path.join(root, "public", "images");
  const outputPath = path.join(root, "src", "data", "asset-versions.json");
  const files = [];
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(filename);
      else if (entry.isFile()) files.push(filename);
    }
  }
  walk(imagesDirectory);
  const versions = Object.fromEntries(files.map(filename => [
    `/images/${path.relative(imagesDirectory, filename).split(path.sep).join("/")}`,
    createHash("sha256").update(readFileSync(filename)).digest("hex").slice(0, 16),
  ]).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0));
  const content = `${JSON.stringify(versions, null, 2)}\n`;
  const changed = !existsSync(outputPath) || readFileSync(outputPath, "utf8") !== content;
  if (changed) {
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, content);
  }
  return { count: files.length, changed, outputPath };
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  const result = generateAssetVersions();
  console.log(`Image versions: ${result.count}; manifest ${result.changed ? "updated" : "unchanged"}.`);
}
