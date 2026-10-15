import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const normalize = value => value.replace(/\s+/g, " ").trim();
const read = file => JSON.parse(readFileSync(file, "utf8"));
const packs = ["content-primary", "content-institutional", "ui", "forms", "audit", "common"];
const messages = Object.fromEntries(["en", "es"].map(locale => [locale, Object.assign({}, ...packs.filter(pack => existsSync(`src/i18n/messages/${pack}.${locale}.json`)).map(pack => read(`src/i18n/messages/${pack}.${locale}.json`)))]));
const files = [];
function walk(folder) { for (const item of readdirSync(folder, { withFileTypes: true })) { const name = path.join(folder,item.name); if (item.isDirectory()) walk(name); else if (name.endsWith(".tsx")) files.push(name); } }
walk("src/app"); walk("src/components");
const ui = new Map(), clientKeys = new Set();
for (const filename of files) {
  const source = readFileSync(filename, "utf8");
  const client = /^['"]use client['"];?/m.test(source);
  const tree = ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  function visit(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "t" && node.arguments.length) {
      const argument = node.arguments[0];
      if (ts.isStringLiteralLike(argument)) {
        const key = normalize(argument.text);
        if (/[A-Za-zÀ-ž]/u.test(key) && !/^(https?:|mailto:|\/|#)/.test(key)) {
          if (!ui.has(key)) ui.set(key, []);
          ui.get(key).push(filename.replaceAll("\\", "/"));
        }
      }
    }
    // Include literals passed to native option-group builders, not just t().
    if (client && ts.isStringLiteralLike(node)) {
      const key = normalize(node.text);
      if (messages.en[key] !== undefined || messages.es[key] !== undefined) clientKeys.add(key);
    }
    ts.forEachChild(node,visit);
  }
  visit(tree);
}
const required = new Set(ui.keys());
for (const [filename, property] of [["docs/accessibility/translation-primary.json","entries"],["docs/accessibility/translation-institutional.json","decisions"]]) {
  for (const row of read(filename)[property]) required.add(normalize(row.source));
}
const failures = [];
const placeholders = value => [...value.matchAll(/\{\d+\}/g)].map(match=>match[0]).sort().join("|");
for (const locale of ["en","es"]) {
  for (const key of required) if (!messages[locale][key]?.trim()) failures.push({ locale, key, issue:"missing", files:ui.get(key) });
  for (const [key,value] of Object.entries(messages[locale])) {
    if (!value.trim() || key !== normalize(key)) failures.push({ locale,key,issue:"empty-or-unnormalized" });
    if (placeholders(key) !== placeholders(value)) failures.push({ locale,key,issue:"placeholder-mismatch" });
    if (/\uFFFD/u.test(key+value)) failures.push({ locale,key,issue:"invalid-unicode" });
  }
}
const keyFile = "src/i18n/client-message-keys.json";
const keys = [...clientKeys].sort();
if (process.argv.includes("--write-client-keys")) writeFileSync(keyFile, JSON.stringify(keys,null,2)+"\n");
else if (!existsSync(keyFile) || JSON.stringify(read(keyFile)) !== JSON.stringify(keys)) failures.push({issue:"client-key-inventory-outdated",action:"node scripts/check-i18n.mjs --write-client-keys"});
mkdirSync("docs/accessibility",{recursive:true});
const report = { checkedAt:new Date().toISOString(), method:"AST t() literals, both data manifests, explicit preservation records and controlled placeholders; each requested locale only", sourceUiKeys:ui.size, sourceRequiredKeys:required.size, localeKeys:Object.fromEntries(Object.entries(messages).map(([key,value])=>[key,Object.keys(value).length])), clientUiKeys:keys.length, rawClientInventoryIncludesOnlyUsedLocale:true, failures };
writeFileSync("docs/accessibility/i18n-coverage.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({sourceUiKeys:report.sourceUiKeys,sourceRequiredKeys:report.sourceRequiredKeys,localeKeys:report.localeKeys,clientUiKeys:keys.length,failures:failures.length}));
if (failures.length) { console.error(JSON.stringify(failures.slice(0,20),null,2)); process.exitCode=1; }
