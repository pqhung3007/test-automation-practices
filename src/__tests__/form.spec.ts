import { expect, test } from "@playwright/test";

test("should show error for empty email", async ({ page }) => {
  await page.goto("/#/forms");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Forms and Validation",
  );
  await page.fill('[data-test="email-input"]', "");
  await page.click('[data-test="submit-button"]');
  expect(await page.isVisible('[data-test="email-error"]')).toBeTruthy();
});
