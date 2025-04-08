import {expect, test} from "@playwright/test";

test("should show correct current value when slider is moved", async ({page}) => {
  await page.goto("/#/slider");

  const slider = page.locator('[data-test="slider"]');
  const tooltip = page.locator('[data-test="slider-tooltip"]');
  const valueDisplay = page.locator('[data-test="slider-value"]');

  // Initial state
  await expect(valueDisplay).toContainText("50");

  await slider.hover()
  await slider.fill("0");

  await expect(tooltip).toHaveText("0");
  await expect(valueDisplay).toContainText("0");

  await slider.hover()
  await slider.fill("100");

  await expect(tooltip).toHaveText("100");
  await expect(valueDisplay).toContainText("100");
})