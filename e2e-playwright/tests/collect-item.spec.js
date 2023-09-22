const { test, expect } = require("@playwright/test");

test("Mark an item as collected", async ({ page }) => {
    await page.goto("/lists/1");
    await page.click('button[text="Mark collected!"]');
    const itemText = await page.textContent("del");
    expect(itemText).toBe("Milk");
  });
  