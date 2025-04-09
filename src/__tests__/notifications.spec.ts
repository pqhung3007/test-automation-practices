import { expect, test } from "@playwright/test";

test('should display notifications on button click', async ({ page }) => {
  await page.goto('/#/notifications');

  await page.getByRole('button', { name: 'Success Message' }).click();

  await expect(page.locator('[data-test="notification-container"]')).toBeVisible();
  await expect(page.locator('[data-test="notification-container"]')).toContainText(/success/i);

  // Wait for 5 seconds to allow the notification to disappear
  await page.waitForTimeout(5000);
  await expect(page.locator('[data-test="notification-container"]')).not.toBeVisible();
})