import {expect, test} from "@playwright/test";

test.describe("Checkboxes", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/checkboxes");
  })

  test("should check all checkboxes", async ({ page }) => {
    const checkAll = page.locator('[data-test="check-all-button"]');
    await checkAll.click();

    const checkboxes = await page.locator('[data-test^="checkbox-"][type="checkbox"]').all();
    for (const checkbox of checkboxes) {
      const isChecked = await checkbox.isChecked();
      expect(isChecked).toBe(true);
    }
  })

  test("should uncheck all checkboxes", async ({ page }) => {
    const uncheckAll = page.locator('[data-test="uncheck-all-button"]');
    await uncheckAll.click();

    const checkboxes = await page.locator('[data-test^="checkbox-"][type="checkbox"]').all();
    for (const checkbox of checkboxes) {
      const isChecked = await checkbox.isChecked();
      expect(isChecked).toBe(false);
    }
  })
})
