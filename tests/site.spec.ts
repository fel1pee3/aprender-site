import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { solutions } from "../src/data/solutions";
import { articles } from "../src/data/editorial";

test("todas as rotas públicas abrem diretamente; desconhecidas retornam 404", async ({
  request,
}) => {
  const paths = [
    "/",
    "/a-editora",
    "/solucoes",
    "/formacao",
    "/plataformas",
    "/em-acao",
    "/contato",
    ...solutions.map((x) => `/solucoes/${x.slug}`),
    ...articles.map((x) => `/em-acao/${x.slug}`),
  ];
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html).toContain("noindex");
    expect(html).toContain('lang="pt-BR"');
    expect(html.match(/<h1(?:\s|>)/g)?.length, path).toBe(1);
  }
  for (const path of [
    "/nao-existe",
    "/solucoes/nao-existe",
    "/em-acao/nao-existe",
  ])
    expect((await request.get(path)).status(), path).toBe(404);
  for (const solution of solutions) {
    const image = await request.get(solution.image);
    expect(image.status(), solution.image).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/webp");
  }
});

test("busca sem acentos, filtros combinados, estado vazio, URL e histórico", async ({
  page,
}) => {
  await page.goto("/solucoes");
  await expect(page.getByRole("status")).toContainText("20 soluções");
  await page.getByLabel("Etapa de ensino").selectOption("anos-iniciais");
  await page.getByLabel("Objetivo pedagógico").selectOption("matematica");
  await expect(page.getByRole("status")).toContainText("1 solução");
  await expect(
    page.getByRole("heading", { name: "AMMA", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Etapa de ensino")).toHaveValue("anos-iniciais");
  await page.getByLabel("Qual solução você procura?").fill("inexistente");
  await expect(
    page.getByRole("heading", { name: "Vamos tentar outro caminho?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver todas as soluções" }).click();
  await expect(page.getByRole("status")).toContainText("20 soluções");
  await page.getByLabel("Qual solução você procura?").fill("emocoes");
  await expect(
    page.getByRole("heading", { name: "Fluir das Emoções", exact: true }),
  ).toBeVisible();
  await expect(page).toHaveURL(/q=emocoes/);
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await page.getByLabel("Etapa de ensino").selectOption("infantil");
  await page.getByLabel("Etapa de ensino").selectOption("anos-finais");
  await page.goBack();
  await expect(page.getByLabel("Etapa de ensino")).toHaveValue("infantil");
});

test("contato mantém contexto, valida, prepara e copia sem transmitir", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/solucoes/amma");
  await page
    .getByRole("link", { name: "Tenho interesse nesta solução" })
    .click();
  await expect(page.getByLabel("Solução de interesse")).toHaveValue("amma");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Revise os campos",
  );
  await expect(page.getByLabel("Seu nome")).toBeFocused();
  await page.getByLabel("Seu nome").fill("Pessoa de teste");
  await page.getByLabel("Instituição").fill("Escola de demonstração");
  await page.getByLabel("E-mail", { exact: false }).first().fill("invalido");
  await page
    .getByLabel("Como podemos ajudar?")
    .fill("Gostaria de conhecer os materiais de Matemática.");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByLabel("Seu nome")).toHaveValue("Pessoa de teste");
  await page
    .getByLabel("E-mail", { exact: false })
    .first()
    .fill("teste@example.com");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  const mail = page.getByRole("link", { name: /Abrir.*e-mail/i });
  await expect(mail).toHaveAttribute(
    "href",
    /^mailto:aprendereditora@aprendereditora.com.br\?/,
  );
  expect(decodeURIComponent((await mail.getAttribute("href"))!)).toContain(
    "AMMA",
  );
  await page.getByRole("button", { name: /Copiar mensagem/ }).click();
  await expect(page.getByRole("status")).toContainText("Mensagem copiada");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Solução de interesse: AMMA",
  );
  await page.getByLabel("Seu nome").fill("Outro nome");
  await expect(mail).toHaveCount(0);
});

test("menu de celular: foco, Escape, navegação e estado atual", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Abrir menu de navegação" });
  await open.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(open).toBeFocused();
  await open.click();
  await page
    .getByRole("navigation", { name: "Navegação para celular" })
    .getByRole("link", { name: "Soluções", exact: false })
    .click();
  await expect(page).toHaveURL(/\/solucoes$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await open.click();
  await expect(
    page
      .getByRole("navigation", { name: "Navegação para celular" })
      .getByRole("link", { name: "Soluções", exact: false }),
  ).toHaveAttribute("aria-current", "page");
});

test("cópia indisponível oferece seleção manual, sem falso sucesso", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    }),
  );
  await page.goto("/contato");
  await page.getByLabel("Seu nome").fill("Pessoa de teste");
  await page
    .getByLabel("E-mail", { exact: false })
    .first()
    .fill("teste@example.com");
  await page
    .getByLabel("Como podemos ajudar?")
    .fill("Gostaria de conversar sobre formação.");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await page.getByRole("button", { name: "Copiar mensagem" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Não foi possível copiar automaticamente",
  );
  await expect(page.locator("#prepared-message")).toBeFocused();
  expect(
    await page.locator("#prepared-message").evaluate((el) => {
      const field = el as HTMLTextAreaElement;
      return field.selectionEnd - field.selectionStart;
    }),
  ).toBeGreaterThan(20);
});

test("páginas e imagens sem falhas, capturas e ausência de overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const width of [320, 375, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/",
      "/solucoes/brincando-e-aprendendo",
      "/solucoes",
      "/contato",
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} @ ${width}`,
      ).toBe(true);
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.forEach((im) => ((im as HTMLImageElement).loading = "eager")),
        );
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        await Promise.all(
          Array.from(document.images).map((im) =>
            im.decode().catch(() => undefined),
          ),
        );
      });
      const broken = await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((im) => (im as HTMLImageElement).naturalWidth === 0)
            .map((im) => im.getAttribute("src")),
        );
      expect(broken, `${path} @ ${width}`).toEqual([]);
      if (
        [375, 1440].includes(width) &&
        ["/", "/solucoes/brincando-e-aprendendo"].includes(path)
      ) {
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.screenshot({
          path: `.qa/${path === "/" ? "home" : "solution"}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
  expect(errors).toEqual([]);
});

test("acessibilidade automatizada nas rotas representativas", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/solucoes",
    "/solucoes/brincando-e-aprendendo",
    "/a-editora",
    "/formacao",
    "/plataformas",
    "/em-acao",
    "/contato",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((x) => ({
        id: x.id,
        description: x.description,
        nodes: x.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
});

test("zoom equivalente a 200% e preferência por movimento reduzido", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 450 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/solucoes");
  await expect(page.getByLabel("Qual solução você procura?")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});
