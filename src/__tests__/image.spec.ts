import { expect, type Locator, test } from "@playwright/test";

test("should load images correctly", async ({ page }) => {
  await page.goto("/#/broken-images");

  const validImage = page.locator('[data-test="image-0"]');
  const brokenImage1 = page.locator('[data-test="image-1"]');
  const brokenImage2 = page.locator('[data-test="image-2"]');

  // Check if the valid image loads correctly
  await expect(validImage).toBeVisible();
  await expect(validImage).toHaveAttribute("src", /https:\/\/picsum\.photos/);

  // Check if the broken images are not visible or broken
  const isImageBroken = async (locator: Locator) => {
    return await locator.evaluate(
      (img) => (img as HTMLImageElement).naturalWidth === 0,
    );
  };

  expect(await isImageBroken(brokenImage1)).toBe(true);
  expect(await isImageBroken(brokenImage2)).toBe(true);
});
