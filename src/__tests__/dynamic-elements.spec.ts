import { expect, test } from "@playwright/test";

test.describe("Dynamic Elements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/dynamic-elements");
  });

  test("should show hidden elements when button is clicked", async ({
    page,
  }) => {
    const toggleButton = page.locator('[data-test="toggle-hidden-button"]');
    const hiddenElement = page.locator('[data-test="hidden-content"]');

    await expect(hiddenElement).not.toBeVisible();

    await toggleButton.click();

    await expect(hiddenElement).toBeVisible();
  });

  test("should load dynamic content after specified time", async ({ page }) => {
    const loadTimeSlider = page.locator('[data-test="load-time-slider"]');
    const loadTimeValue = page.locator('[data-test="load-time-value"]');
    const reloadButton = page.locator('[data-test="reload-button"]');
    const contentArea = page.locator('[data-test="content-area"]');
    const loadingIndicator = contentArea.locator('[data-test="loading-indicator"]');
    const dynamicItems = contentArea.locator('[data-test^="dynamic-item-"]');

    await loadTimeSlider.fill("5");
    await expect(loadTimeValue).toHaveText("5s");

    await reloadButton.click();

    await expect(loadingIndicator).toBeVisible();

    // Wait for 5 seconds to simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Check if loading indicator is not visible and dynamic items are visible
    await expect(loadingIndicator).not.toBeVisible();
    await expect(dynamicItems).toHaveCount(3);
  })
});
