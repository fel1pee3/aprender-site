import sharp from "sharp";
import { mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const asset = (name) => path.join(root, "public/images", name);
mkdirSync(asset("social"), { recursive: true });
const photo = await sharp(asset("formacao-professores.webp"))
  .resize(445, 486, { fit: "cover", position: "centre" })
  .png().toBuffer();
const logo = await sharp(asset("logo.png"))
  .resize(235, 82, { fit: "contain", background: "#f7f8f2" })
  .png().toBuffer();
const materials = await sharp(asset("materials/primary-lendo-kit-3.webp"))
  .resize(244, 214, { fit: "contain", background: "#fffdf7" })
  .png().toBuffer();
const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f7f8f2"/>
  <rect x="0" y="0" width="12" height="630" fill="#157a3b"/>
  <path d="M704 90 Q704 48 746 48 H1152 V537 H704 Z" fill="#e7eddd"/>
  <text x="60" y="192" font-family="Arial,sans-serif" font-size="14" letter-spacing="2" font-weight="700" fill="#0c4b2b">ALFABETIZAÇÃO E EDUCAÇÃO BÁSICA</text>
  <g font-family="Georgia,serif" font-size="61" fill="#17352a">
    <text x="57" y="276">Materiais e formação</text>
    <text x="57" y="353">para <tspan fill="#157a3b">aprender.</tspan></text>
  </g>
  <path d="M202 368 Q345 353 488 365" fill="none" stroke="#eaaf38" stroke-width="4"/>
  <g font-family="Arial,sans-serif" font-size="21" fill="#526359">
    <text x="60" y="423">Livros, formação de educadores e</text>
    <text x="60" y="455">acompanhamento das redes de ensino.</text>
  </g>
  <path d="M60 546 H90" stroke="#79946f"/>
  <text x="105" y="552" font-family="Arial,sans-serif" font-size="15" fill="#526359">Ao lado de quem ensina. Desde 2005.</text>
  <rect x="798" y="353" width="350" height="242" rx="6" fill="#fffdf7" stroke="#dedfcf"/>
</svg>`);

// Composes existing assets; source photos and book covers are retained intact.
await sharp(svg).composite([
  { input: photo, left: 702, top: 45 },
  { input: logo, left: 60, top: 54 },
  { input: Buffer.from(`<svg width="355" height="245" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="353" height="243" rx="6" fill="#fffdf7" stroke="#dedfcf"/></svg>`), left: 800, top: 350 },
  { input: materials, left: 805, top: 363 },
  { input: Buffer.from(`<svg width="95" height="150" xmlns="http://www.w3.org/2000/svg"><text x="0" y="40" font-family="Georgia,serif" font-size="17" fill="#17352a"><tspan x="0">Lendo e</tspan><tspan x="0" dy="25">Escrevendo</tspan></text><text x="0" y="111" font-family="Arial,sans-serif" font-size="10" fill="#526359"><tspan x="0">Criança, professor</tspan><tspan x="0" dy="15">e família</tspan></text></svg>`), left: 1045, top: 393 },
]).jpeg({ quality: 88, mozjpeg: true }).toFile(asset("social/aprender-share.jpg"));
const output = asset("social/aprender-share.jpg");
console.log(JSON.stringify({ path: path.relative(root, output), width: 1200, height: 630, bytes: readFileSync(output).length }));
