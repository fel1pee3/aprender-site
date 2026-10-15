import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { documentResources } from "../src/data/resources";

test("tabela 2027: 152 linhas, busca sem acento, combinação, URL, recarga e limpeza", async ({
  page,
}) => {
  const originalImageRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/images/resources/tabela-precos-2027.jpg"))
      originalImageRequests.push(request.url());
  });
  await page.goto("/recursos/tabela-precos");
  await expect(page.getByRole("status")).toContainText("152 itens encontrados");
  await expect(page.locator("tbody tr")).toHaveCount(152);
  await expect(page.locator("tbody tr").first()).toContainText("550,00");
  await page.getByLabel("Material ou ano").fill("ingles");
  await expect(page.getByRole("status")).toContainText("8 itens encontrados");
  await page.getByLabel("Destinatário").selectOption("Professor");
  await expect(page.getByRole("status")).toContainText("4 itens encontrados");
  await page
    .getByLabel("Coleção", { exact: true })
    .selectOption("Inglês — My Learning / Teaching Companion");
  await page.getByLabel("Material ou ano").fill("6º");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(page.locator("tbody tr")).toContainText(
    "MY TEACHING COMPANION 1",
  );
  await expect(page.locator("tbody tr")).toContainText("303,00");
  await expect(page).toHaveURL(
    (url) =>
      url.searchParams.get("q") === "6º" &&
      url.searchParams.get("publico") === "Professor" &&
      url.searchParams.get("colecao") ===
        "Inglês — My Learning / Teaching Companion",
  );
  await page.reload();
  await expect(page.getByLabel("Material ou ano")).toHaveValue("6º");
  await expect(page.getByLabel("Destinatário")).toHaveValue("Professor");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.getByLabel("Material ou ano").fill("inexistente-qa");
  await expect(
    page.getByRole("heading", { name: "Nenhum material nesta combinação." }),
  ).toBeVisible();
  await expect(page.locator("tbody tr")).toHaveCount(0);
  await page.getByRole("button", { name: "Ver todos os preços" }).click();
  await expect(page.getByRole("status")).toContainText("152 itens encontrados");
  await expect(page).toHaveURL(/\/recursos\/tabela-precos$/);
  expect(originalImageRequests).toEqual([]);
});

test("consulta de preços e catálogo chegam completos no HTML inicial", async ({
  request,
}) => {
  const table = await request.get("/recursos/tabela-precos");
  const tableHtml = await table.text();
  expect(table.status()).toBe(200);
  expect(tableHtml.match(/<tr(?:\s|>)/g)).toHaveLength(153);
  const filtered = await request.get(
    "/recursos/tabela-precos?colecao=ingles&publico=Professor&q=6%C2%BA",
  );
  const filteredHtml = await filtered.text();
  expect(filteredHtml.match(/<tr(?:\s|>)/g)).toHaveLength(2);
  expect(filteredHtml).toContain("MY TEACHING COMPANION 1");
  const catalog = await request.get("/solucoes");
  const html = await catalog.text();
  expect(html).toContain('id="catalog-search"');
  expect(html.match(/<h3(?:\s|>)/g)).toHaveLength(23);
});

test("tabela abre diretamente com coleção por slug e volta ao filtro pelo histórico", async ({
  page,
}) => {
  await page.goto(
    "/recursos/tabela-precos?colecao=ingles&publico=Aluno&q=9%C2%BA",
  );
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(page.locator("tbody tr")).toContainText(
    "MY LEARNING COMPANION 4",
  );
  await expect(page.locator("tbody tr")).toContainText("200,00");
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(152);
  await page.goBack();
  await expect(page.getByLabel("Material ou ano")).toHaveValue("9º");
  await expect(page.getByLabel("Destinatário")).toHaveValue("Aluno");
  await expect(page.locator("tbody tr")).toHaveCount(1);
});

test("coleções recuperadas, aliases e contato de Inglês conservam contexto", async ({
  page,
}) => {
  await page.goto("/solucoes");
  for (const [query, title, slug] of [
    ["Lendo e Escrevendo", "Lendo e Escrevendo", "lendo-e-escrevendo"],
    ["SuperaIDEB", "ACerta Brasil", "acerta-brasil"],
    ["My Teaching Companion", "Inglês", "ingles"],
  ]) {
    await page.getByLabel("Qual solução você procura?").fill(query);
    await expect(page.getByRole("status")).toContainText(
      "1 solução encontrada",
    );
    const heading = page.getByRole("heading", { name: title, exact: true });
    await expect(heading).toBeVisible();
    await expect(heading.locator("xpath=ancestor::a")).toHaveAttribute(
      "href",
      `/solucoes/${slug}`,
    );
  }
  await page.getByRole("heading", { name: "Inglês", exact: true }).click();
  await expect(page).toHaveURL(/\/solucoes\/ingles$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Inglês");
  await expect(page.locator("#oferta-2027 tbody tr")).toHaveCount(8);
  await page
    .getByRole("link", { name: "Tenho interesse nesta solução" })
    .click();
  await expect(page.getByLabel("Solução de interesse")).toHaveValue("ingles");
  await expect(page).toHaveURL(/solucao=ingles/);
});

test("galeria de materiais responde a seleção e controles por teclado", async ({
  page,
}) => {
  await page.goto("/solucoes/lendo-e-escrevendo#galeria");
  const gallery = page.getByRole("region", {
    name: "Galeria dos materiais",
    exact: true,
  });
  await expect(gallery).toBeVisible();
  const sample = documentResources.find(
    (item) => item.collectionSlug === "lendo-e-escrevendo",
  )!;
  expect(sample.previews).toHaveLength(3);
  await gallery.getByLabel("Material ou volume").selectOption(sample.title);
  await expect(gallery.getByRole("button", { name: /^Ver imagem / })).toHaveCount(3);
  await expect(
    gallery.getByText("1 de 3 imagens", { exact: true }),
  ).toBeVisible();
  const firstCaption = await gallery.locator("figcaption").textContent();
  await gallery
    .getByRole("button", { name: "Próxima imagem", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    gallery.getByText("2 de 3 imagens", { exact: true }),
  ).toBeVisible();
  await expect(gallery.locator("figcaption")).not.toHaveText(firstCaption!);
  await gallery
    .getByRole("button", { name: "Imagem anterior", exact: true })
    .focus();
  await page.keyboard.press("Space");
  await expect(
    gallery.getByText("1 de 3 imagens", { exact: true }),
  ).toBeVisible();
  await expect(gallery.locator("figcaption")).toHaveText(firstCaption!);
  await gallery.getByRole("button", { name: /^Ver imagem 3:/ }).focus();
  await page.keyboard.press("Enter");
  await expect(
    gallery.getByText("3 de 3 imagens", { exact: true }),
  ).toBeVisible();
  await expect(
    gallery.getByRole("button", { name: /^Ver imagem 3:/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await gallery.getByLabel("Material ou volume").selectOption("");
  await expect(gallery.getByRole("button", { name: /^Ver imagem /, pressed: true })).toHaveCount(1);
  await expect(gallery.getByRole("button", { name: /^Ver imagem / }).first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("biblioteca mantém 27 amostras e documento PAIC com nomes e informação de arquivo", async ({
  page,
}) => {
  await page.goto("/recursos");
  const samples = documentResources.filter((item) => item.kind === "sample");
  expect(samples).toHaveLength(27);
  expect(
    documentResources.filter((item) => item.kind === "institutional"),
  ).toHaveLength(1);
  for (const resource of documentResources) {
    const link = page.locator(`a[id="${resource.id}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute("href", resource.url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toContainText(resource.title);
    await expect(link).toContainText(`${resource.pageCount} páginas digitais`);
    await expect(link).toContainText("PDF");
  }
  const pdfUrls = await page
    .locator('main a[href$=".pdf"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(new Set(pdfUrls).size).toBe(29);
  await page.goto("/solucoes/acerta-brasil#amostras");
  await expect(page.locator('#amostras a[href$=".pdf"]')).toHaveCount(2);
  await expect(page.locator("#amostras")).toContainText("Matemática, 5º ano");
  await expect(page.locator("#amostras")).toContainText(
    "Língua Portuguesa, 5º ano",
  );
});

test("acervo oferece nove relatos, nove fotos e três vinhetas sob demanda", async ({
  page,
  request,
}) => {
  const mediaRequests: string[] = [];
  page.on("request", (req) => {
    if (/\/media\/comp-\d\.mp4/.test(req.url())) mediaRequests.push(req.url());
  });
  await page.goto("/acervo");
  await expect(page.locator("#depoimentos article")).toHaveCount(9);
  await expect(page.locator('#depoimentos button[aria-haspopup="dialog"]')).toHaveCount(9);
  await expect(page.locator("#formacoes figure")).toHaveCount(9);
  await expect(page.locator("video")).toHaveCount(3);
  expect(mediaRequests).toEqual([]);
  for (const video of await page.locator("video").all()) {
    await expect(video).toHaveAttribute("preload", "none");
    await expect(video).toHaveAttribute("controls", "");
    expect(await video.getAttribute("autoplay")).toBeNull();
    expect(
      await video.evaluate((node) => (node as HTMLVideoElement).paused),
    ).toBe(true);
    await expect(video).toHaveAttribute(
      "poster",
      /^\/images\/archive\/video-\d\.jpg$/,
    );
    const track = video.locator('track[kind="descriptions"]');
    await expect(track).toHaveCount(1);
    const response = await request.get((await track.getAttribute("src"))!);
    expect(response.status()).toBe(200);
    expect(await response.text()).toMatch(/^WEBVTT\s/);
  }
  const first = page.locator("video").first();
  await first.evaluate(async (node) => {
    await (node as HTMLVideoElement).play();
  });
  await expect
    .poll(() => first.evaluate((node) => (node as HTMLVideoElement).readyState))
    .toBeGreaterThan(0);
  const duration = await first.evaluate((node) => {
    const video = node as HTMLVideoElement;
    video.pause();
    return video.duration;
  });
  expect(duration).toBeGreaterThan(8);
  expect(duration).toBeLessThan(8.2);
  expect(mediaRequests.length).toBeGreaterThan(0);
  await page
    .locator("#video-1")
    .getByText("Ler a descrição visual completa", { exact: true })
    .click();
  await expect(page.locator("#video-1 details")).toContainText(
    "Vídeo sem áudio",
  );
});

const newRoutes = [
  "/acervo",
  "/recursos",
  "/recursos/tabela-precos",
  "/a-editora/trajetoria",
  "/a-editora/paic",
  "/a-editora/edgar-linhares",
  "/solucoes/lendo-e-escrevendo",
  "/solucoes/acerta-brasil",
  "/solucoes/ingles",
];

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`migração: sem overflow, imagens quebradas ou erros observados em ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 900 });
    for (const route of newRoutes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} em ${width}px`,
      ).toBe(true);
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.forEach(
            (image) => ((image as HTMLImageElement).loading = "eager"),
          ),
        );
      await page.evaluate(async () => {
        await Promise.all(
          Array.from(document.images).map((image) =>
            image.decode().catch(() => undefined),
          ),
        );
      });
      const broken = await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((image) => (image as HTMLImageElement).naturalWidth === 0)
            .map((image) => image.getAttribute("src")),
        );
      expect(broken, `${route} em ${width}px`).toEqual([]);
      expect(
        await page.locator("video").evaluateAll((videos) =>
          videos.every((node) => {
            const video = node as HTMLVideoElement;
            return (
              !video.autoplay && video.controls && video.preload === "none"
            );
          }),
        ),
        route,
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

for (const route of newRoutes) {
  test(`acessibilidade automatizada da rota recuperada ${route}`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        description: item.description,
        nodes: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}
