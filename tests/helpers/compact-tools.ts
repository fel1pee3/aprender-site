import { expect, type Page } from "@playwright/test";

export const toolsName = /^(Acessibilidade e idioma|Accessibility and language|Accesibilidad e idioma)$/;

export async function openTools(page: Page) {
  const trigger = page.getByRole("button", { name: toolsName });
  if (await trigger.getAttribute("aria-expanded") !== "true") await trigger.click();
  const panel = page.getByRole("region", { name: toolsName });
  await expect(panel).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  return { trigger, panel };
}
