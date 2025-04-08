import { expect, test } from "@playwright/test";
import * as path from "path";

test.describe("File Upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/file-upload");
  });

  test("should upload files using file input and drag-and-drop", async ({ page }) => {
    const browseButton = page.locator('[data-test="file-select-button"]');
    await browseButton.click();

    const filePath = path.resolve("src/__tests__/mocks/test-file.txt");
    await page.setInputFiles("input[type=file]", filePath);

    // Expect loading state
    await expect(page.locator('[data-test="upload-loading"]')).toBeVisible();
    await page.waitForTimeout(1000); // mock network delay
    await expect(page.locator('[data-test="upload-loading"]')).toBeHidden();

    const uploadedFile = page.locator('[data-test="uploaded-file-0"]');
    await expect(uploadedFile).toContainText("test-file.txt");
  });
});
