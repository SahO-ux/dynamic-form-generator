import { test, expect } from "@playwright/test";

test("JSON editor validation error displays", async ({ page }) => {
  await page.goto(process.env.REACT_APP_API_URL as string);

  // Enter invalid JSON
  await page.fill(".monaco-editor textarea", "{ invalid: JSON }");
  const errorMessage = await page.locator("text=Invalid JSON format");
  await expect(errorMessage).toBeVisible();
});
