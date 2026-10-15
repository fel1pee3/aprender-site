import { writeFileSync } from "node:fs";
const results = [];
for (const name of ["bnnr-lat_03.jpg", "bnnr-lat_05.jpg"]) {
  for (const host of ["www.aprendereditora.com.br", "aprendereditora.com.br"]) {
    const url = `https://${host}/v2/midia/kcfinder/images/Banner%20Lateral%20Formulario/${name}`;
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(12000),
      });
      const bytes = Buffer.from(await response.arrayBuffer());
      results.push({
        url,
        status: response.status,
        contentType: response.headers.get("content-type"),
        sizeBytes: bytes.length,
        returnedHtml: /^\s*<!DOCTYPE\s+html/i.test(
          bytes.subarray(0, 100).toString(),
        ),
        jpegSignature: bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
      });
    } catch (error) {
      results.push({ url, error: String(error) });
    }
  }
}
writeFileSync(
  "docs/migration/unavailable-banners.json",
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      results,
      note: "Limited recovery on both official hostnames. The broken sidebar images are distinct from the three verified video resources preserved in the archive; their unavailable graphic content was not invented.",
    },
    null,
    2,
  ) + "\n",
);
console.log(JSON.stringify(results));
