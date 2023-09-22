const { test, expect } = require("@playwright/test");

test("Homepage has correct title", async ({ page }) => {
    await page.goto("/");
    const title = await page.textContent("h1");
    expect(title).toBe("Shared shopping lists");
  });
  