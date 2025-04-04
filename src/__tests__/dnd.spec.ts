import { test, expect } from "@playwright/test";

test.describe("Drag and Drop List", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/drag-drop");
  });

  test("should reorder items using mouse drag and drop", async ({ page }) => {
    const firstItem = page.locator('[data-test^="sortable-item"]').nth(0);
    const secondItem = page.locator('[data-test^="sortable-item"]').nth(1);

    // get items and their drag handles
    await firstItem.locator('[data-test^="drag-handle-"]').hover();
    await page.mouse.down();
    await secondItem.locator('[data-test^="drag-handle-"]').hover();
    await page.mouse.up();

    // Verify order change
    const newOrder = await page
      .locator('[data-test^="sortable-item-"]')
      .allInnerTexts();
    expect(newOrder.slice(0, 3)).toEqual(["Item 2", "Item 1", "Item 3"]);
  });

  test("should reorder representative items using keyboard interactions", async ({
    page,
  }) => {
    const dragDropList = page.locator('[data-test="drag-drop-list"]');

    // Get the first item and its drag handle
    const firstItem = dragDropList
      .locator('[data-test^="sortable-item-"]')
      .nth(0);
    const handle = firstItem.locator('[data-test^="drag-handle-"]');

    // Focus on the drag handle
    await handle.focus();

    // Move item down using ArrowDown
    await page.keyboard.press("Space"); // Pick up the item
    await page.keyboard.press("ArrowDown"); // Move down
    await page.keyboard.press("Space"); // Drop the item

    // Verify order change
    const newOrder = await dragDropList
      .locator('[data-test^="sortable-item-"]')
      .allInnerTexts();
    expect(newOrder.slice(0, 2)).toEqual(["Item 2", "Item 1"]);
  });
});
