import test, { expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wildrent/);
});

test("open menu", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Tous nos matériels" }).click();

  await expect(page.getByText("Brouette")).toBeVisible();
});

test("link to category", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Tous nos matériels" }).click();
  await page.getByText("Brouette").click();

  await expect(page).toHaveURL("products/list/brouette");
});

test("link to login", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Go to profile page" }).click();

  await expect(page).toHaveURL("/connect");
});

test("link to cart", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Go to cart page" }).click();

  await expect(page).toHaveURL("/cart");
});
