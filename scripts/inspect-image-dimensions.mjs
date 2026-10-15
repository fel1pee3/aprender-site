import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
const dimensions = {};
async function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await visit(filename);
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      let width, height;
      try {
        ({ width, height } = await sharp(filename).metadata());
      } catch (error) {
        throw new Error(`Invalid image ${filename}: ${error.message}`);
      }
      dimensions[
        "/" + path.relative("public", filename).replaceAll("\\", "/")
      ] = { width, height };
    }
  }
}
await visit("public/images");
writeFileSync(
  "src/data/image-dimensions.json",
  JSON.stringify(dimensions, null, 2) + "\n",
);
console.log(`${Object.keys(dimensions).length} image dimensions inspected.`);
