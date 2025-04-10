import { expect, test } from "@playwright/test";

test.describe("JavaScript Alerts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/alerts");
  });

  test("should display simple alert", async ({ page }) => {
    const alertButton = page.getByRole("button", { name: "Show Alert" });
    await alertButton.click();

    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe("This is a simple alert!");
      await dialog.accept();
    });
  });

  test("should display confirm dialogs and choose ok", async ({ page }) => {
    const confirmButton = page.getByRole("button", { name: "Show Confirm" });
    await confirmButton.click();

    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("Do you want to proceed?");
      await dialog.accept();
    });
  });

  test("should display confirm dialogs and choose cancel", async ({ page }) => {
    const confirmButton = page.getByRole("button", { name: "Show Confirm" });
    await confirmButton.click();

    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("Do you want to proceed?");
      await dialog.dismiss();
    });
  });

  test("should display prompt dialog and enter text", async ({ page }) => {
    const promptButton = page.getByRole("button", { name: "Show Prompt" });
    await promptButton.click();

    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter your name:");
      await dialog.accept("John Doe");
    });
  });

  test("should display prompt dialog and cancel", async ({ page }) => {
    const promptButton = page.getByRole("button", { name: "Show Prompt" });
    await promptButton.click();

    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter your name:");
      await dialog.dismiss();
    });
  });

  test.afterEach(async ({ page }) => {
    // Wait for the last action to be displayed
    const resultContainer = page.locator('[data-test="result-container"]');

    await expect(resultContainer).toBeVisible();
    await expect(resultContainer).toContainText(/Last action:/);

    const lastActionText = await resultContainer.innerText();
    expect(lastActionText).toMatch(
      /Last action: (Alert shown|Confirm dialog: (OK|Cancel)|Prompt dialog: ".*"|Prompt dialog: Cancel)/,
    );
  });
});
