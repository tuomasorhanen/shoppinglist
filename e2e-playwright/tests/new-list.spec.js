const { test, expect } = require("@playwright/test");

test("Create a new shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.fill('input[name="name"]', "Groceries");
  await page.click('button[type="submit"]');
  const listName = await page.textContent("text=Groceries");
  expect(listName).toBe("Groceries");
});
