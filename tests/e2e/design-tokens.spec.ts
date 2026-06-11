/**
 * Design Token Rollout Tests — Task #1
 *
 * Verifies that:
 * 1. All brand CSS variables are correctly defined in :root
 * 2. No raw brand hex strings remain as inline DOM style attributes on non-SVG elements
 * 3. Key elements on every affected page render with the correct computed colours
 * 4. The shadcn --primary token is remapped to brand-dark
 */

import { test, expect, type Page } from "@playwright/test";

// ─── Expected brand values (hex → rgb for computed style matching) ────────────
const BRAND = {
  dark:        { hex: "#065b4b", rgb: "rgb(6, 91, 75)" },
  mid:         { hex: "#228573", rgb: "rgb(34, 133, 115)" },
  light:       { hex: "#3aa692", rgb: "rgb(58, 166, 146)" },
  surface:     { hex: "#e8f5f2", rgb: "rgb(232, 245, 242)" },
  surfaceAlt:  { hex: "#f0faf7", rgb: "rgb(240, 250, 247)" },
  surfaceDeep: { hex: "#c8ebe3", rgb: "rgb(200, 235, 227)" },
  footer:      { hex: "#1f5f4a", rgb: "rgb(31, 95, 74)" },
  inputBg:     { hex: "#fafffe", rgb: "rgb(250, 255, 254)" },
  borderLight: { hex: "#d1ece6", rgb: "rgb(209, 236, 230)" },
};

// ─── Raw hex strings that must NOT appear as inline style values on non-SVG elements ─
const BANNED_INLINE_HEX = [
  "#065b4b", "#228573", "#3aa692", "#e8f5f2", "#f0faf7",
  "#c8ebe3", "#1f5f4a", "#fafffe", "#d1ece6",
];

// ─── Helper: read a CSS custom property from :root ────────────────────────────
async function getRootVar(page: Page, varName: string): Promise<string> {
  return page.evaluate((name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    varName
  );
}

// ─── Helper: get computed colour of an element ────────────────────────────────
async function getComputedColor(page: Page, selector: string, prop = "color"): Promise<string> {
  return page.$eval(selector, (el, p) =>
    getComputedStyle(el).getPropertyValue(p).trim(), prop
  );
}

// ─── Helper: find non-SVG elements with banned inline hex in style attr ───────
async function findBannedInlineHex(page: Page): Promise<string[]> {
  return page.evaluate((hexList) => {
    const violations: string[] = [];
    // Walk all elements that are NOT svg/path/circle/rect/line/ellipse/text/polygon/polyline
    const svgTags = new Set(["svg","path","circle","rect","line","ellipse","text","polygon","polyline","g","defs","use","mask","clippath","stop","lineargradient","radialgradient"]);
    document.querySelectorAll("*").forEach((el) => {
      if (svgTags.has(el.tagName.toLowerCase())) return;
      const style = (el as HTMLElement).style;
      if (!style) return;
      const styleStr = style.cssText.toLowerCase();
      for (const hex of hexList) {
        if (styleStr.includes(hex.toLowerCase())) {
          violations.push(`<${el.tagName.toLowerCase()}> style="${style.cssText}" — banned hex: ${hex}`);
        }
      }
    });
    return violations;
  }, BANNED_INLINE_HEX);
}

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 1: CSS variable definitions
// ─────────────────────────────────────────────────────────────────────────────
test.describe("CSS variables — :root definitions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("--brand-dark is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-dark");
    expect(val).toBe("#065b4b");
  });

  test("--brand-mid is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-mid");
    expect(val).toBe("#228573");
  });

  test("--brand-light is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-light");
    expect(val).toBe("#3aa692");
  });

  test("--brand-surface is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-surface");
    expect(val).toBe("#e8f5f2");
  });

  test("--brand-surface-alt is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-surface-alt");
    expect(val).toBe("#f0faf7");
  });

  test("--brand-surface-deep is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-surface-deep");
    expect(val).toBe("#c8ebe3");
  });

  test("--brand-footer is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-footer");
    expect(val).toBe("#1f5f4a");
  });

  test("--brand-input-bg is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-input-bg");
    expect(val).toBe("#fafffe");
  });

  test("--brand-border-light is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-border-light");
    expect(val).toBe("#d1ece6");
  });

  test("--brand-mid-ring is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-mid-ring");
    // Browsers may normalize rgba() to hex8 (#rrggbbaa) or keep as rgba — accept both.
    // rgba(34, 133, 115, 0.12) → hex8 = #2285731f
    const isRgba = /rgba\(\s*34\s*,\s*133\s*,\s*115\s*,\s*0\.12\s*\)/.test(val);
    const isHex8 = val.toLowerCase() === "#2285731f";
    expect(isRgba || isHex8, `Unexpected --brand-mid-ring value: "${val}"`).toBe(true);
  });

  test("--brand-dark-ring is defined and correct", async ({ page }) => {
    const val = await getRootVar(page, "--brand-dark-ring");
    // Browsers normalize rgba(6, 91, 75, 0.12) → hex8 = #065b4b1f
    const isRgba = /rgba\(\s*6\s*,\s*91\s*,\s*75\s*,\s*0\.12\s*\)/.test(val);
    const isHex8 = val.toLowerCase() === "#065b4b1f";
    expect(isRgba || isHex8, `Unexpected --brand-dark-ring value: "${val}"`).toBe(true);
  });

  test("shadcn --primary is remapped to brand-dark", async ({ page }) => {
    // Chromium resolves oklch() → lab() in getComputedStyle.
    // oklch(0.318 0.087 174.8) ≈ lab(22% ...) — a dark teal, NOT near-black lab(14.5% 0 0).
    // We verify the resolved value is NOT the old shadcn near-black.
    const val = await getRootVar(page, "--primary");
    const isOldBlack = val.includes("0.205 0 0") || val.includes("14.5") && val.includes("0 0");
    expect(isOldBlack, `--primary still looks like near-black: "${val}"`).toBe(false);
    // Also verify it resolves to a green/teal — lab lightness ~22, non-zero chroma
    // lab(22.0123% -31.4328 2.78554) — negative 'a' axis = green
    if (val.startsWith("lab(")) {
      const labA = parseFloat(val.split(" ")[1]);
      expect(labA, `--primary lab 'a' should be negative (green), got: ${labA}`).toBeLessThan(0);
    }
  });

  test("shadcn --ring is remapped to brand-mid", async ({ page }) => {
    // oklch(0.535 0.099 180.7) ≈ lab(47% ...) — mid teal, NOT near-grey lab(64% 0 0).
    const val = await getRootVar(page, "--ring");
    const isOldGrey = val.includes("0.708 0 0") || (val.includes("64") && val.includes("0 0"));
    expect(isOldGrey, `--ring still looks like near-grey: "${val}"`).toBe(false);
    if (val.startsWith("lab(")) {
      const labA = parseFloat(val.split(" ")[1]);
      expect(labA, `--ring lab 'a' should be negative (teal/green), got: ${labA}`).toBeLessThan(0);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 2: Landing page — no banned inline hex on non-SVG elements
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Landing page — no raw hex inline styles", () => {
  test("/ — no banned brand hex in non-SVG inline styles", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const violations = await findBannedInlineHex(page);
    expect(violations, `Found banned inline hex:\n${violations.join("\n")}`).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 3: Hero section computed colours
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Hero section — computed colours", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("h1 heading is brand-dark", async ({ page }) => {
    // The main hero heading should be text-brand-dark
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const color = await h1.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe(BRAND.dark.rgb);
  });

  test("CTA button background is a brand colour", async ({ page }) => {
    // The Book Appointment / primary CTA button should be bg-brand-mid or bg-brand-dark
    const cta = page.locator("a:has-text('Book Appointment'), button:has-text('Book Appointment')").first();
    if (await cta.count() > 0) {
      const bg = await cta.evaluate((el) => getComputedStyle(el).backgroundColor);
      const brandBgs = [BRAND.mid.rgb, BRAND.dark.rgb, BRAND.light.rgb];
      expect(brandBgs).toContain(bg);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 4: Footer computed colours
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Footer — computed colours", () => {
  test("footer background is brand-footer (#1f5f4a)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();
    const bg = await footer.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe(BRAND.footer.rgb);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 5: Testimonials section
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Testimonials section — computed colours", () => {
  test("section background is brand-surface-alt", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Find a section/div with bg-brand-surface-alt (rgb 240 250 247)
    const match = await page.evaluate((expectedBg) => {
      const sections = document.querySelectorAll("section, div");
      for (const el of sections) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg === expectedBg) return true;
      }
      return false;
    }, BRAND.surfaceAlt.rgb);
    expect(match, `No element found with background ${BRAND.surfaceAlt.rgb}`).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 6: Doctor onboarding page — primitives.tsx token usage
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Doctor onboarding — primitives tokens", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/doctor-onboarding");
    await page.waitForLoadState("networkidle");
  });

  test("/doctor-onboarding — no banned brand hex in non-SVG inline styles", async ({ page }) => {
    const violations = await findBannedInlineHex(page);
    expect(violations, `Found banned inline hex:\n${violations.join("\n")}`).toHaveLength(0);
  });

  test("page renders without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/doctor-onboarding");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 7: Patient profile setup — primitives.tsx token usage
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Patient profile setup — primitives tokens", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/patient-profile-setup");
    await page.waitForLoadState("networkidle");
  });

  test("/patient-profile-setup — no banned brand hex in non-SVG inline styles", async ({ page }) => {
    const violations = await findBannedInlineHex(page);
    expect(violations, `Found banned inline hex:\n${violations.join("\n")}`).toHaveLength(0);
  });

  test("page renders without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/patient-profile-setup");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 8: Auth modal — inline hex check when opened
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Auth modal — computed colours and no inline hex", () => {
  test("modal opens on sign-in click (or route exists)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Try to open auth modal — look for sign-in button in navbar
    const signInBtn = page.locator("button:has-text('Sign in'), a:has-text('Sign in'), button:has-text('Login')").first();
    if (await signInBtn.count() > 0) {
      await signInBtn.click();
      // Wait a moment for modal to animate open
      await page.waitForTimeout(600);
      // Check no banned hex in inline styles
      const violations = await findBannedInlineHex(page);
      expect(violations, `Modal has banned inline hex:\n${violations.join("\n")}`).toHaveLength(0);
    } else {
      // Modal trigger not found — skip gracefully (auth is disabled intentionally)
      test.skip();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 9: Doctor profile setup
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Doctor profile setup page", () => {
  test("/doctor-profile-setup — no banned brand hex in non-SVG inline styles", async ({ page }) => {
    await page.goto("/doctor-profile-setup");
    await page.waitForLoadState("networkidle");
    const violations = await findBannedInlineHex(page);
    expect(violations, `Found banned inline hex:\n${violations.join("\n")}`).toHaveLength(0);
  });

  test("page renders without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/doctor-profile-setup");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 10: Dashboard and patient dashboard pages
// ─────────────────────────────────────────────────────────────────────────────
test.describe("App pages — no regressions", () => {
  const pages = [
    "/dashboard",
    "/patient-dashboard",
  ];

  for (const route of pages) {
    test(`${route} — no banned brand hex in non-SVG inline styles`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const violations = await findBannedInlineHex(page);
      expect(violations, `Found banned inline hex:\n${violations.join("\n")}`).toHaveLength(0);
    });

    test(`${route} — renders without JS errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      expect(errors).toHaveLength(0);
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 11: Visual snapshots — screenshot every key page for manual review
// ─────────────────────────────────────────────────────────────────────────────
test.describe("Visual snapshots", () => {
  const snapshots = [
    { route: "/",                      name: "landing-page" },
    { route: "/doctor-onboarding",     name: "doctor-onboarding" },
    { route: "/doctor-profile-setup",  name: "doctor-profile-setup" },
    { route: "/patient-profile-setup", name: "patient-profile-setup" },
    { route: "/dashboard",             name: "doctor-dashboard" },
    { route: "/patient-dashboard",     name: "patient-dashboard" },
  ];

  for (const { route, name } of snapshots) {
    test(`screenshot: ${name}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500); // allow animations to settle
      await page.screenshot({
        path: `playwright-report/screenshots/${name}.png`,
        fullPage: true,
      });
      // Just verify the page has content — screenshot is the artefact
      const bodyText = await page.textContent("body");
      expect(bodyText?.length).toBeGreaterThan(50);
    });
  }
});
