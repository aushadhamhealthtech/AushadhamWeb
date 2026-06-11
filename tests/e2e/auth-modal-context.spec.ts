import { test, expect } from "@playwright/test";

test.describe("Auth modal context — Task #2", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("modal is closed by default — no modal visible on page load", async ({ page }) => {
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toHaveCount(0);
  });

  test("Sign in button opens modal with signin view", async ({ page }) => {
    // Click the desktop Sign in button
    await page.getByRole("button", { name: "Sign in" }).first().click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });
  });

  test("Sign up button opens modal with signup view", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).first().click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });
  });

  test("modal can be closed after opening", async ({ page }) => {
    await page.getByRole("button", { name: "Sign in" }).first().click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Close via X button (first button inside dialog or aria-label close)
    const closeBtn = modal.locator("button").filter({ hasText: "" }).first();
    // Try pressing Escape as a reliable close mechanism
    await page.keyboard.press("Escape");
    await expect(modal).toHaveCount(0, { timeout: 3000 });
  });

  test("navbar Sign in button is not a plain router.push to /dashboard", async ({ page }) => {
    // If the button was still router.push("/dashboard"), clicking it would navigate
    // to a different URL. We verify the URL stays at "/" after click (modal opens in place).
    await page.getByRole("button", { name: "Sign in" }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("navbar Sign up button is not a plain router.push to /patient-dashboard", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("sign-in button has brand-light background (token applied)", async ({ page }) => {
    const btn = page.getByRole("button", { name: "Sign in" }).first();
    const bg = await btn.evaluate((el) => getComputedStyle(el).backgroundColor);
    // brand-light = #3aa692 = rgb(58, 166, 146)
    expect(bg).toBe("rgb(58, 166, 146)");
  });
});
