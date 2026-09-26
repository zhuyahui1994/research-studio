const { test, expect } = require("@playwright/test");

test("core workflow, persistence and responsive layout", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/index.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(500);
  const guide = page.locator("#guideStart");
  if (await guide.count()) await guide.click();

  await page.locator("#loadDemoTop").click();
  await page.locator('[data-page="quality"]').click();
  await page.locator("#runQuality").click();
  await page.locator("#cleanBtn").click();
  await page.locator('[data-page="inference"]').click();
  await page.locator("#runInference").click();
  await expect(page.locator("#inferResult")).toContainText("方法前提自动检查");

  await page.locator('[data-page="modeling"]').click();
  await page.locator("#runModel").click();
  await expect(page.locator("#modelResult")).toContainText("VIF");

  await page.locator("#storageCenterBtn").click();
  await expect(page.locator("#modalBody")).toContainText("IndexedDB 镜像");
  await page.locator("#modalClose").click();

  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("researchStudioAppData")));
  expect(stored.projects.length).toBeGreaterThan(0);
  expect(errors).toEqual([]);

  await page.setViewportSize({ width: 390, height: 844 });
  const width = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: innerWidth }));
  expect(width.body).toBe(width.viewport);
});
