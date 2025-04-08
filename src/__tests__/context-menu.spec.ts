import { expect, test } from "@playwright/test";

test("should open context menu on right-click", async ({ page }) => {
  await page.goto("/#/context-menu");

  const contextMenuArea = page.locator('[data-test="context-menu-area"]');
  const contextMenuTrigger = page.locator('[data-test="context-menu-trigger"]');
  const contextMenu = page.locator('[data-test="context-menu"]');
  const editButton = page.locator('[data-test="context-menu-edit"]');
  const deleteButton = page.locator('[data-test="context-menu-delete"]');
  const propertiesButton = page.locator(
    '[data-test="context-menu-properties"]',
  );

  // Initial State
  await contextMenu.waitFor({ state: "hidden" });

  // Right-click to open context menu
  await contextMenuTrigger.click({ button: "right" });
  await contextMenu.waitFor({ state: "visible" });

  // Check if the context menu and inner buttons are visible
  await expect(contextMenu).toBeVisible();
  await expect(editButton).toBeVisible();
  await expect(deleteButton).toBeVisible();
  await expect(propertiesButton).toBeVisible();

  // Click outside to close the context menu
  await contextMenuArea.click();
  await contextMenu.waitFor({ state: "hidden" });
});
