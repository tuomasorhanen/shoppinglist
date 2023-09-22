const { test, expect } = require("@playwright/test");

test("Deactivate an existing shopping list", async ({ page }) => {
    await page.goto("/lists");
    await page.click('button[text="Deactivate list!"]');
    await page.waitForSelector('text=Groceries', { state: 'detached' });
    const listName = await page.$("text=Groceries");
    expect(listName).toBe(null);
  });
  