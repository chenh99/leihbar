import { expect, test, type Page } from "@playwright/test";

// Issue 3, Kriterium 1: Klick auf „Mode“ zeigt nur Mode, und der Filter ist sichtbar aktiv.

async function titelAufDemBrett(page: Page) {
  return page.getByRole("article").getByRole("heading", { level: 3 }).allTextContents();
}

test("Klick auf „Mode“ zeigt nur Mode und markiert den Filter als aktiv", async ({ page }) => {
  await page.goto("/");
  const filter = page.getByRole("navigation", { name: "Nach Kategorie filtern" });
  await expect(filter.getByRole("link", { name: "Alle" })).toHaveAttribute("aria-current", "true");
  const alle = await titelAufDemBrett(page);
  expect(alle.length).toBeGreaterThan(0);

  await filter.getByRole("link", { name: "Mode" }).click();
  await expect(page).toHaveURL(/kategorie=Mode/);
  await expect(filter.getByRole("link", { name: "Mode" })).toHaveAttribute("aria-current", "true");
  await expect(filter.getByRole("link", { name: "Alle" })).not.toHaveAttribute("aria-current");

  // Die Liste wechselt erst kurz nach dem Klick – deshalb warten, bis sie kleiner geworden ist.
  await expect.poll(async () => (await titelAufDemBrett(page)).length).toBeLessThan(alle.length);
  const mode = await titelAufDemBrett(page);
  expect(mode.length).toBeGreaterThan(0);
  for (const titel of mode) expect(alle).toContain(titel);

  // Nur Mode: nichts davon taucht in der Kategorie „Technik“ auf.
  await filter.getByRole("link", { name: "Technik" }).click();
  await expect(filter.getByRole("link", { name: "Technik" })).toHaveAttribute("aria-current", "true");
  // Beim Wechsel blendet die Animation die alten Zettel kurz aus; so lange stehen beide Listen da.
  await expect
    .poll(async () => (await titelAufDemBrett(page)).filter((titel) => mode.includes(titel)))
    .toEqual([]);
  expect((await titelAufDemBrett(page)).length).toBeGreaterThan(0);
});
