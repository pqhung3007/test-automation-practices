import { expect, test } from "@playwright/test";

test("should sort the data when clicking on the header", async ({ page }) => {
  await page.goto("/#/tables");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Dynamic Tables",
  );

  // verify the initial order of the rows
  const rows = page.locator('[data-test^="table-row-"]');
  const initialOrder = await rows.allTextContents();

  // click on the header to sort the rows
  await page.click('[data-test="table-header-name"]');

  // verify the order of the rows after sorting
  const sortedOrder = await rows.allTextContents();
  const expectedOrder = [...initialOrder].sort();
  expect(sortedOrder).toEqual(expectedOrder);
});
