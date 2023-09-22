const { test, expect } = require("@playwright/test");

test("Add item to an existing shopping list", async ({ page }) => {
    await page.goto("/lists/1");
    await page.fill('input[name="name"]', "Milk");
    await page.click('button[type="submit"]');
    const itemName = await page.textContent("text=Milk");
    expect(itemName).toBe("Milk");
  });
  