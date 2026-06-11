import { test, expect } from "@playwright/test";

/**
 * Task #4 — Back-nav state persistence in doctor-profile-setup
 *
 * Before the fix: each step component owned its own useState, so navigating
 * Back caused unmount → remount → state reset. All entered data was lost.
 *
 * After the fix: all form data is lifted to DoctorProfileSetupPage and passed
 * as props. Unmounting a step component no longer loses its data.
 */

test.describe("Doctor profile setup — Back-nav state persistence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/doctor-profile-setup");
    await page.waitForLoadState("networkidle");
  });

  test("page loads on step 1 without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/doctor-profile-setup");
    await page.waitForLoadState("networkidle");
    expect(errors.filter((e) => !e.includes("hydration"))).toHaveLength(0);
  });

  test("Step 1 → Step 2 → Back → Step 1 input survives", async ({ page }) => {
    // Fill clinic name on Step 1
    const clinicInput = page.locator('input[id="clinicName"]').first();
    await clinicInput.fill("Aushadham Test Clinic");
    await expect(clinicInput).toHaveValue("Aushadham Test Clinic");

    // Navigate to Step 2
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await expect(page.getByRole("heading", { name: "Practice details" })).toBeVisible({ timeout: 5000 });

    // Navigate Back to Step 1
    await page.getByRole("button", { name: /Back/i }).click();
    await expect(page.getByRole("heading", { name: "Clinic details" })).toBeVisible({ timeout: 5000 });

    // Clinic name must still be present — this was the bug
    const clinicInputAgain = page.locator('input[id="clinicName"]').first();
    await expect(clinicInputAgain).toHaveValue("Aushadham Test Clinic");
  });

  test("Step 1 → Step 2 → fill experience → Back → Next → experience value survives", async ({ page }) => {
    // Go to Step 2
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await page.waitForTimeout(400);

    // Fill experience on Step 2
    const experienceInput = page.locator('input[name="experience"], input[id="experience"]').first();
    await experienceInput.fill("8");
    await expect(experienceInput).toHaveValue("8");

    // Back to Step 1
    await page.getByRole("button", { name: /Back/i }).click();
    await page.waitForTimeout(400);

    // Forward to Step 2 again
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await page.waitForTimeout(400);

    // Experience value must survive the round-trip
    const experienceAgain = page.locator('input[name="experience"], input[id="experience"]').first();
    await expect(experienceAgain).toHaveValue("8");
  });

  test("Step 1 → Step 2 → Step 3 → Back → Back → Step 1 data still intact", async ({ page }) => {
    // Fill Step 1
    const clinicInput = page.locator('input[id="clinicName"]').first();
    await clinicInput.fill("Deep Nav Test Clinic");

    // Step 1 → Step 2 → Step 3
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await expect(page.getByRole("heading", { name: "Practice details" })).toBeVisible({ timeout: 5000 });
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await expect(page.getByRole("heading", { name: "Time slots" })).toBeVisible({ timeout: 5000 });

    // Back → Back to Step 1
    await page.getByRole("button", { name: /Back/i }).click();
    await expect(page.getByRole("heading", { name: "Practice details" })).toBeVisible({ timeout: 5000 });
    await page.getByRole("button", { name: /Back/i }).click();
    await expect(page.getByRole("heading", { name: "Clinic details" })).toBeVisible({ timeout: 5000 });

    // Step 1 data survives two Back navigations
    const clinicInputFinal = page.locator('input[id="clinicName"]').first();
    await expect(clinicInputFinal).toHaveValue("Deep Nav Test Clinic");
  });

  test("Step 3 time slots survive Back navigation", async ({ page }) => {
    // Navigate to Step 3
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await page.waitForTimeout(350);
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await page.waitForTimeout(350);

    // Enable Monday by clicking the + toggle button over the Mon day button
    const monToggle = page.locator("button[title='Enable day']").first();
    await monToggle.click();

    // Back to Step 2
    await page.getByRole("button", { name: /Back/i }).click();
    await page.waitForTimeout(350);

    // Forward to Step 3 again
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await page.waitForTimeout(350);

    // The Mon toggle should still be enabled (its title changes to "Disable day" when active)
    const monToggleAfter = page.locator("button[title='Disable day']").first();
    await expect(monToggleAfter).toBeVisible({ timeout: 3000 });
  });

  test("Step 2 illness tags survive Back navigation", async ({ page }) => {
    // Navigate to Step 2
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await page.waitForTimeout(400);

    // Click a suggestion tag (Diabetes)
    await page.getByRole("button", { name: "+ Diabetes" }).click();

    // Back to Step 1
    await page.getByRole("button", { name: /Back/i }).click();
    await page.waitForTimeout(350);

    // Forward to Step 2 again
    await page.getByRole("button", { name: /Save & Continue/i }).click();
    await page.waitForTimeout(400);

    // "Diabetes ×" chip should still be visible (it was added as a selected tag)
    await expect(page.getByRole("button", { name: /Diabetes ×/ })).toBeVisible({ timeout: 3000 });
  });
});
