import { expect, test } from "@playwright/test";
import { documentResources } from "../src/data/resources";
import { testimonials } from "../src/data/archive";

const legacyHost = /https?:\/\/(?:www\.)?aprendereditora\.com\.br(?:\/|$)/i;

test("consulta institucional usa recursos próprios e não carrega PDFs automaticamente", async ({ page }) => {
  test.setTimeout(120_000);
  const legacyRequests: string[] = [];
  const prematureDocuments: string[] = [];
  page.on("request", request => {
    const url = decodeURIComponent(request.url());
    if (legacyHost.test(url)) legacyRequests.push(url);
    if (/\.pdf(?:[?#]|$)/i.test(url)) prematureDocuments.push(url);
  });
  for (const route of ["/", "/a-editora", "/a-editora/trajetoria", "/a-editora/paic", "/a-editora/edgar-linhares", "/formacao", "/acervo", "/recursos", "/recursos/tabela-precos", "/contato", "/solucoes/brincando-e-aprendendo"]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.locator("footer").scrollIntoViewIfNeeded();
    const destinations = await page.locator("a[href], img[src], source[src], track[src], video[poster], iframe[src], object[data], embed[src]").evaluateAll(nodes =>
      nodes.flatMap(node => ["href", "src", "poster", "data", "srcset"].map(name => node.getAttribute(name) || "")),
    );
    expect(destinations.filter(url => legacyHost.test(decodeURIComponent(url))), route).toEqual([]);
    expect(destinations.filter(url => /\.pdf#page=/i.test(url)), route).toEqual([]);
  }
  expect(legacyRequests).toEqual([]);
  expect(prematureDocuments).toEqual([]);
});

test("nove depoimentos integrais abrem localmente sob demanda e devolvem o foco", async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 390, height: 844 });
  const originals: string[] = [];
  page.on("request", request => {
    if (request.url().includes("/images/testimonials/original-")) originals.push(request.url());
  });
  await page.goto("/acervo");
  await expect(page.getByRole("button", { name: /^Ver registro integral de / })).toHaveCount(9);
  expect(originals).toEqual([]);
  for (const person of testimonials) {
    const trigger = page.getByRole("button", { name: `Ver registro integral de ${person.name}`, exact: true });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: `Ver registro integral de ${person.name}`, exact: true });
    await expect(dialog).toBeVisible();
    const image = dialog.getByRole("img");
    await expect(image).toHaveAttribute("src", person.originalImage);
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBe(1200);
    await dialog.getByRole("button", { name: "Ver tamanho original" }).click();
    await expect(dialog.getByRole("button", { name: "Ajustar à tela" })).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
  expect(new Set(originals.map(url => new URL(url).pathname)).size).toBe(9);
});

test("galeria aparece cedo, mantém seleção no hover e funciona por teclado", async ({ page }) => {
  await page.goto("/solucoes/brincando-e-aprendendo");
  const gallery = page.getByRole("region", { name: "Galeria dos materiais", exact: true });
  await expect(gallery).toBeVisible();
  const box = await gallery.boundingBox();
  expect(box!.y).toBeLessThan(1800);
  const image = gallery.locator("figure > button img");
  const firstAlt = await image.getAttribute("alt");
  const second = gallery.getByRole("button", { name: /^Ver imagem 2:/ });
  await second.hover();
  await expect(image).toHaveAttribute("alt", firstAlt!);
  await second.focus();
  await page.keyboard.press("Enter");
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await expect(image).not.toHaveAttribute("alt", firstAlt!);
  await gallery.getByRole("button", { name: "Imagem anterior", exact: true }).click();
  await expect(image).toHaveAttribute("alt", firstAlt!);
  const select = gallery.getByLabel("Material ou volume");
  const options = await select.locator("option").evaluateAll(nodes => nodes.map(node => (node as HTMLOptionElement).value));
  await select.selectOption(options[1]);
  await expect(gallery.getByRole("button", { name: /^Ver imagem 1:/ })).toHaveAttribute("aria-pressed", "true");
  const currentAlt = await image.getAttribute("alt");
  await gallery.getByRole("button", { name: `Ampliar imagem: ${currentAlt}`, exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Ampliar imagem", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(gallery.getByRole("button", { name: `Ampliar imagem: ${currentAlt}`, exact: true })).toBeFocused();
});

test("header mantém altura ao rolar e âncoras ficam livres da navegação fixa", async ({ page }) => {
  await page.goto("/formacao");
  const header = page.locator("body > header");
  const initial = await header.boundingBox();
  await page.evaluate(() => scrollTo({ top: 1100, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-scrolled", "true");
  const scrolled = await header.boundingBox();
  expect(scrolled!.height).toBe(initial!.height);
  await page.getByRole("link", { name: "Plano de ação", exact: true }).click();
  await expect(page).toHaveURL(/#plano-de-acao$/);
  const target = page.locator("#plano-de-acao");
  await expect.poll(async () => (await target.boundingBox())!.y).toBeGreaterThanOrEqual(initial!.height - 1);
});

test("menu móvel mantém foco, fecha com Escape e destaca a rota atual", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/acervo");
  const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("dialog", { name: "Explore a Aprender" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: /Acervo/ })).toHaveAttribute("aria-current", "page");
  for (let index = 0; index < 14; index++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("dialog[open]")))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("amostras e documento do PAIC indicam PDF, nova aba e origem local", async ({ page, request }) => {
  await page.goto("/recursos");
  for (const resource of documentResources) {
    expect(resource.url).toMatch(/^\/documents\/[^#]+\.pdf$/);
    const links = page.locator(`a[href="${resource.url}"]`);
    const link = links.first();
    await expect(link).toBeAttached();
    await expect(link).toContainText("PDF");
    const target = await link.getAttribute("target");
    if (target === "_blank") await expect(link).toContainText(/nova aba/i);
  }
  const sample = documentResources.find(resource => resource.kind === "sample")!;
  const response = await request.get(sample.url, { headers: { Range: "bytes=0-15" } });
  expect(response.status()).toBe(206);
  expect(response.headers()["content-type"]).toMatch(/application\/pdf/);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  expect(response.headers()["content-range"]).toBe(`bytes 0-15/${sample.sizeBytes}`);
});

test("baixar descrição oferece o arquivo WebVTT real", async ({ page }) => {
  await page.goto("/acervo#video-1");
  const pending = page.waitForEvent("download");
  await page.locator("#video-1").getByRole("link", { name: "Baixar descrição visual em WebVTT" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("comp-1-description.vtt");
  expect(await download.failure()).toBeNull();
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  expect(Buffer.concat(chunks).toString("utf8")).toMatch(/^WEBVTT\s/);
});

test("preferência de movimento reduzido mantém foco e conteúdo imediatamente disponíveis", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explorar soluções", exact: true })).toBeVisible();
  const motion = await page.evaluate(() => ({
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    transitions: Array.from(document.querySelectorAll("a,button,input")).map(node => getComputedStyle(node).transitionDuration),
  }));
  expect(motion.scroll).toBe("auto");
  expect(motion.transitions.every(value => value.split(",").every(duration => parseFloat(duration) === 0))).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("proposta e materiais iniciais permanecem visíveis sem JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explorar soluções", exact: true })).toBeVisible();
    await page.goto("/solucoes/brincando-e-aprendendo");
    const gallery = page.getByRole("region", { name: "Galeria dos materiais", exact: true });
    await expect(gallery.locator("figure img")).toBeVisible();
    await expect(page.locator("#edicoes")).toContainText("Brincando");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  } finally {
    await context.close();
  }
});

test("busca sem acentos preserva URL e contato prepara contexto sem transmitir dados", async ({ page }) => {
  const mutations: string[] = [];
  page.on("request", request => {
    if (["POST", "PUT", "PATCH"].includes(request.method())) mutations.push(request.url());
  });
  await page.goto("/solucoes");
  await page.getByLabel("Qual solução você procura?").fill("emocoes");
  await expect(page.getByRole("heading", { name: "Fluir das Emoções", exact: true })).toBeVisible();
  await expect(page).toHaveURL(/q=emocoes/);
  await page.reload();
  await expect(page.getByLabel("Qual solução você procura?")).toHaveValue("emocoes");
  await page.goto("/contato?solucao=fluir-das-emocoes");
  await expect(page.getByLabel("Solução de interesse")).toHaveValue("fluir-das-emocoes");
  await page.getByLabel("Seu nome").fill("Verificação de interface");
  await page.getByLabel("E-mail", { exact: false }).first().fill("interface@example.com");
  await page.getByLabel("Como podemos ajudar?").fill("Gostaria de conhecer os materiais e a formação.");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByText("A mensagem ainda não foi enviada.", { exact: false })).toBeVisible();
  await expect(page.locator("#prepared-message")).toHaveValue(/Solução de interesse: Fluir das Emoções/);
  await expect(page.getByRole("link", { name: "Abrir aplicativo de e-mail" })).toHaveAttribute("href", /^mailto:aprendereditora@aprendereditora\.com\.br\?/);
  expect(mutations).toEqual([]);
});
