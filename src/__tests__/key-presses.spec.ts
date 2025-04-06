import { test, expect } from "@playwright/test";

test("should display last key and key history", async ({ page }) => {
  await page.goto("/#/key-press");

  const lastKey = page.locator('[data-test="last-key-pressed"]');
  const keyHistory = page.locator('[data-test="key-history"]');
  const historyItems = () => keyHistory.locator('[data-test^="key-"]');

  // Initial State
  await expect(lastKey).toHaveText("No key pressed");
  await expect(historyItems()).toHaveCount(0);

  // Simulate typing keys
  const keys = ["a", "b", "c", "d", "e", "f"];
  for (const key of keys) {
    await page.keyboard.press(key);
    await expect(lastKey).toHaveText(key);
  }

  // Verify the last 5 keys (should be in reverse order of input)
  const expected = ["f", "e", "d", "c", "b"];
  const actual = await historyItems().allTextContents();
  expect(actual).toEqual(expected);

  await expect(historyItems()).toHaveCount(5);
});
