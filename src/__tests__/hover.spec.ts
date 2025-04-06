import { expect, test } from "@playwright/test";

test("should show image effect when hovering", async ({ page }) => {
  await page.goto("/#/hover");

  const figure1 = page.locator('[data-test="hover-figure-1"]');
  const figure2 = page.locator('[data-test="hover-figure-2"]');
  const figure3 = page.locator('[data-test="hover-figure-3"]');

  await figure1.hover();
  const caption1 = page.locator('[data-test="hover-caption-1"]');
  await expect(caption1).toBeVisible();

  await figure2.hover();
  const caption2 = page.locator('[data-test="hover-caption-2"]');
  await expect(caption2).toBeVisible();

  await figure3.hover();
  const caption3 = page.locator('[data-test="hover-caption-3"]');
  await expect(caption3).toBeVisible();
});
