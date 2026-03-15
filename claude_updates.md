# Aushadham QA Testing & Code Optimization Report

**Date:** 2026-03-13
**Tested by:** Claude (Opus 4.6) — Automated QA + Playwright E2E
**Site URL:** http://localhost:3000
**Branch:** main

---

## Testing Methodology

### Tools Used
- **Playwright MCP** — Browser automation for functional testing (desktop 1280x800, mobile 375x812)
- **TypeScript compiler** — Static type checking (`npx tsc --noEmit`)
- **Browser console** — Runtime error/warning monitoring
- **Manual code review** — Full codebase audit across all components, utilities, and configuration

### Pages & Flows Tested
- Homepage (all 7 sections: Hero, How It Works, Mission, Vision, Testimonials, Experts, Doctors CTA)
- Sign-in modal (open, validation, empty submit, error display, close)
- Sign-up modal (switch from sign-in, form fields, patient/doctor toggle)
- Navigation scroll-spy (section highlighting on scroll)
- Mobile bottom navigation bar (visibility, footer hide behavior)
- Footer links and social icons
- Desktop and mobile responsive layouts

---

## Bugs Fixed

### 1. Console Warning: `Element not found: .steps-section`

**File:** `components/sections/how-it-works-section.tsx:77`

**Problem:** The `revealCards()` animation function was called with a CSS string selector `.steps-section` as the ScrollTrigger trigger. When `useGSAP` scopes animations to a ref, GSAP looks for `.steps-section` *inside* the scoped element — but `.steps-section` is the class on the scoped element itself, not a child. This caused GSAP to log a warning on every page load.

**Fix:** Changed from string selector to passing `sectionRef.current` directly as the trigger element:
```tsx
// Before
revealCards(".step-card", ".steps-section", { stagger: 0.2 });

// After
if (sectionRef.current) {
    revealCards(".step-card", sectionRef.current, { stagger: 0.2 });
}
```

---

### 2. Production `console.log` in DoctorCard

**File:** `components/cards/doctor-card.tsx:25-26`

**Problem:** The doctor card had `onClick` and `onKeyDown` handlers that called `console.log("Doctor profile coming soon")`. This pollutes the browser console in production and provides no user-facing feedback.

**Fix:** Removed the `onClick` and `onKeyDown` handlers entirely. The card still has `role="button"`, `tabIndex={0}`, `cursor-pointer`, and `aria-label` for accessibility — ready to be wired up when doctor profile pages are built.

---

### 3. TypeScript Error: `phone` not in signUp type

**File:** `components/modals/auth-modal.tsx:382-388`

**Problem:** The `signUp.email()` call passed `phone` and `role` as additional fields (configured in `lib/auth.ts` via `user.additionalFields`), but better-auth's TypeScript types don't include custom fields in the client-side type signature. This caused a TS2353 error: *"'phone' does not exist in type..."*.

**Fix:** Added a type assertion to satisfy the compiler while preserving runtime behavior:
```tsx
// Before
const { error } = await signUp.email({
    email, password: pw, name: `${firstName} ${lastName}`.trim(),
    phone: phone || undefined, role,
});

// After
const { error } = await signUp.email({
    email, password: pw, name: `${firstName} ${lastName}`.trim(),
    phone: phone || undefined, role,
} as Parameters<typeof signUp.email>[0]);
```

---

### 4. Footer Copyright Hardcoded to 2023

**File:** `components/layout/footer.tsx:136`

**Problem:** Copyright text read `© 2023 Aushadham` — static and outdated.

**Fix:** Made it dynamic:
```tsx
// Before
© 2023 Aushadham. All rights reserved.

// After
© {new Date().getFullYear()} Aushadham. All rights reserved.
```

---

## Performance Optimizations

### 5. GSAP ScrollTrigger Registered 3 Times

**Files:**
- `components/animation-provider.tsx` (kept — single source of truth)
- `lib/animations/scrollReveal.ts` (removed)
- `lib/animations/statsCounter.ts` (removed)

**Problem:** `gsap.registerPlugin(ScrollTrigger)` was called in three separate files. While GSAP handles duplicate registration gracefully, it's unnecessary work on import and creates confusing dependency chains.

**Fix:** Removed the `import { ScrollTrigger } from "gsap/ScrollTrigger"` and `gsap.registerPlugin(ScrollTrigger)` calls from both utility files. The single registration in `animation-provider.tsx` (which wraps the entire page) ensures ScrollTrigger is available before any animations run.

---

### 6. Duplicate Hover Animations (CSS + GSAP Conflict)

**Files:**
- `components/cards/doctor-card.tsx`
- `components/sections/how-it-works-section.tsx`
- `components/sections/testimonials-section.tsx`
- `components/sections/mission-section.tsx`

**Problem:** Multiple components had both:
1. CSS Tailwind hover classes (`hover:scale-[1.03]`, `hover:shadow-xl`, `hover:-translate-y-1.5`)
2. The `.card-hover` class, which triggers GSAP's `addCardHovers()` from `animation-provider.tsx` (scale: 1.03, y: -8)

Both animation systems fighting over `transform` on the same element caused jank and inconsistent behavior.

**Fix:** Removed the `.card-hover` class from elements that already have CSS-based hover transitions. CSS transitions are more performant for simple hover effects (GPU-accelerated, no JS overhead), so those were kept. GSAP hover remains available for elements that specifically need it.

---

### 7. Vision Marquee RAF Runs When Tab Is Hidden

**File:** `components/sections/vision-section.tsx:160-166`

**Problem:** The vision section uses `requestAnimationFrame` for a continuous auto-scrolling marquee. When the browser tab is hidden/backgrounded, `requestAnimationFrame` still fires (though throttled), wasting CPU cycles on invisible scroll calculations.

**Fix:** Added a `document.hidden` check to skip scroll updates when the tab isn't visible:
```tsx
// Before
if (!s.paused && !s.dragging) {

// After
if (!s.paused && !s.dragging && !document.hidden) {
```

---

### 8. Unnecessary `ctaLoading` State in Hero

**File:** `components/sections/hero-section.tsx:134-141`

**Problem:** The "Upload Your Reports Now" button had a `useState(false)` for `ctaLoading` with a `setTimeout(() => setCtaLoading(false), 500)`. The button only triggers a smooth scroll to the "How It Works" section — no async operation, no loading state needed. This added unnecessary state management and a 500ms disabled window.

**Fix:** Removed the `ctaLoading` state, `useState` import, the `setTimeout`, the `disabled` prop, and the `disabled:*` Tailwind classes. The handler now simply scrolls:
```tsx
function handleUploadCta() {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
}
```

---

## UX & Accessibility Fixes

### 9. Missing `autocomplete` Attributes on Auth Form Inputs

**File:** `components/modals/auth-modal.tsx`

**Problem:** Browser console showed a DOM warning: *"Input elements should have autocomplete attributes"*. The `AuthInput` component had `autoComplete={id}`, but IDs like `identifier`, `signin-password`, `signup-password` are not valid autocomplete values. Additionally, inline inputs for first name, last name, and confirm password had no autocomplete at all.

**Fix:** Updated the `AuthInput` component to derive proper autocomplete values based on input type:
```tsx
autoComplete={
    type === "email" ? "email"
    : type === "password" ? (id.includes("signup") ? "new-password" : "current-password")
    : type === "tel" ? "tel"
    : id
}
```

Added explicit `autoComplete` attributes to inline inputs:
- `firstName` → `autoComplete="given-name"`
- `lastName` → `autoComplete="family-name"`
- `signup-confirm-password` → `autoComplete="new-password"`

Also changed the sign-in email input `id` from `"identifier"` to `"email"` for semantic correctness.

---

### 10. User Dropdown Doesn't Close on Outside Click

**File:** `components/layout/navbar.tsx`

**Problem:** When signed in, clicking the user name opens a dropdown with "Sign out". Clicking anywhere outside the dropdown did not close it — the user had to click the name again. This is a common UX anti-pattern.

**Fix:** Added a `useRef` on the dropdown container and a `useEffect` that listens for `mousedown` events on `document`. If the click target is outside the ref, the dropdown closes:
```tsx
const userMenuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
            setUserMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
}, [userMenuOpen]);
```

---

## Dead Code Removed

### 11. Mobile Hamburger Menu (Dead Code)

**File:** `components/layout/navbar.tsx`

**Problem:** The navbar contained:
1. A hamburger button (`<Menu>` / `<X>` icon toggle) with `className="hidden"` — it was **always hidden** and never rendered
2. A full mobile slide-down menu (50+ lines) gated by `menuOpen` state — but `menuOpen` could never be set to `true` since the hamburger was hidden
3. `useState` for `menuOpen` and imports for `Menu` and `X` icons — all unused

The mobile navigation is handled by the fixed bottom bar, making this code completely dead.

**Fix:** Removed:
- The hamburger `<button>` element
- The entire `{menuOpen && (...)}` mobile menu block (~50 lines)
- The `menuOpen` / `setMenuOpen` state
- The `Menu` and `X` imports from lucide-react

---

## Verification Results

| Check | Result |
|-------|--------|
| TypeScript (`npx tsc --noEmit`) | 0 errors |
| Browser Console (desktop) | 0 errors, 0 warnings |
| Browser Console (mobile) | 0 errors, 0 warnings |
| Desktop layout (1280x800) | All 7 sections render correctly |
| Mobile layout (375x812) | Responsive, bottom nav works |
| Auth modal — Sign In | Opens, validates, shows errors, closes |
| Auth modal — Sign Up | Switches correctly, all fields present |
| Navigation scroll-spy | Highlights active section on scroll |
| Footer | Dynamic copyright year (2026), all links render |
| GSAP animations | Hero entrance, scroll reveals, hover effects all functional |
| Vision marquee | Auto-scrolls, pauses on hover/drag, stops when tab hidden |

---

---

## Password Reset Email Integration (Resend)

### 12. Wired Up Forgot Password Flow with Resend

**Files:**
- `lib/auth.ts` — Added Resend email provider + `sendResetPassword` callback
- `lib/auth-client.ts` — Exported `requestPasswordReset` from auth client
- `components/modals/auth-modal.tsx` — Replaced fake `setTimeout` with real `requestPasswordReset()` API call, added error display

**Problem:** The "Forgot password?" flow in the auth modal was entirely fake — it used a `setTimeout` to simulate sending an email after 1.4 seconds, then showed a "Check your inbox!" success screen. No email was ever sent because Better Auth had no email provider configured.

**Fix:**

1. **Installed Resend** (`npm install resend`) as the email delivery provider
2. **Configured `sendResetPassword`** in `lib/auth.ts`:
   - Uses `void resend.emails.send(...)` (non-awaited per Better Auth docs to prevent timing attacks)
   - Sends a branded HTML email with a "Reset Password" CTA button
   - Configurable sender via `RESEND_FROM_EMAIL` env var
3. **Wired the modal to the real API** in `auth-modal.tsx`:
   - Replaced `setTimeout(() => setSent(true), 1400)` with `await requestPasswordReset({ email, redirectTo: "/reset-password" })`
   - Added error state and error display for failed requests
   - Success screen only shows after the API confirms the email was queued

### Environment Variables Required

| Key | Value | Where |
|-----|-------|-------|
| `RESEND_API_KEY` | Your Resend API key | `.env.local` + Vercel |
| `RESEND_FROM_EMAIL` | `Aushadham <noreply@yourdomain.com>` (optional) | `.env.local` + Vercel |

**How to get a Resend API key:**
1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Go to API Keys → Create API Key
3. Add it to `.env.local` as `RESEND_API_KEY=re_xxxxxxxx`
4. Add the same key in Vercel → Settings → Environment Variables

**Important:** On Resend's free tier, you can only send from `onboarding@resend.dev` unless you verify your own domain. To use a custom `from` address like `noreply@aushadham.com`, add and verify the domain in Resend's dashboard.

### Reset Password Page (TODO)

The `redirectTo: "/reset-password"` in the forgot password flow points to a page that **doesn't exist yet**. When a user clicks the reset link in their email, they'll be redirected to `/reset-password?token=VALID_TOKEN`. A reset password page needs to be created at `app/reset-password/page.tsx` that:
1. Reads the `token` query parameter
2. Shows a "New password" form
3. Calls Better Auth's `resetPassword` endpoint with the token and new password

---

## Scalar API Documentation Setup

### 13. Installed Scalar + Better Auth OpenAPI Plugin

**Files:**
- `lib/auth.ts` — Added `openAPI()` plugin from `better-auth/plugins`
- `app/api/openapi/route.ts` — Created: merges Better Auth's auto-generated spec with manual custom route spec
- `app/api/docs/route.ts` — Created: Scalar UI served at `/api/docs`
- `APIs.md` — Updated documentation tooling section
- `package.json` — Added `@scalar/nextjs-api-reference`

**What it does:**

Interactive API documentation is now live at `/api/docs` (both local and Vercel). The setup uses two spec sources merged into one:

1. **Better Auth `openAPI()` plugin** — Auto-generates OpenAPI spec for all auth endpoints. Stays in sync with `lib/auth.ts` config automatically. If you add a Better Auth plugin or change settings, the docs update themselves.
2. **Manual `customSpec` in `app/api/openapi/route.ts`** — For non-auth routes (`/api/doctors`, `/api/appointments`, etc.) added manually as they are built.

**How to add a new custom API route to the docs:**
1. Create the route file (e.g., `app/api/doctors/route.ts`)
2. Add its OpenAPI path definition to `customSpec.paths` in `app/api/openapi/route.ts`
3. The endpoint appears in Scalar automatically

**Server selector:** Scalar has a dropdown to switch between servers listed in the spec. Currently only `localhost:3000` is configured. To add production, add another entry to the `servers` array in `app/api/openapi/route.ts`.

---

## Files Modified

| File | Changes |
|------|---------|
| `components/modals/auth-modal.tsx` | Autocomplete attributes, email ID fix, TS type assertion, real forgot password flow |
| `components/layout/navbar.tsx` | Outside-click dropdown close, removed dead hamburger code |
| `components/layout/footer.tsx` | Dynamic copyright year |
| `components/cards/doctor-card.tsx` | Removed console.log, removed duplicate card-hover class |
| `components/sections/hero-section.tsx` | Removed unnecessary ctaLoading state |
| `components/sections/how-it-works-section.tsx` | Fixed GSAP trigger selector, removed card-hover class |
| `components/sections/testimonials-section.tsx` | Removed duplicate card-hover class |
| `components/sections/mission-section.tsx` | Removed duplicate card-hover class |
| `components/sections/vision-section.tsx` | Added document.hidden check to RAF |
| `lib/animations/scrollReveal.ts` | Removed duplicate ScrollTrigger registration |
| `lib/animations/statsCounter.ts` | Removed duplicate ScrollTrigger registration |
| `lib/auth.ts` | Added Resend email provider + sendResetPassword callback + `openAPI()` plugin |
| `lib/auth-client.ts` | Exported requestPasswordReset |
| `app/api/openapi/route.ts` | New — serves merged OpenAPI spec (auto-generated auth + manual custom routes) |
| `app/api/docs/route.ts` | New — Scalar interactive API docs UI |
| `APIs.md` | Updated documentation tooling section to reflect installed Scalar setup |

---

## Frontend Code Review & Refactor (2026-03-15)

**Reviewed by:** Claude (Opus 4.6) — Code Review Agent + Manual Fixes

### Security Fixes

| # | Issue | File | Fix |
|---|-------|------|-----|
| 1 | Unauthenticated test-email endpoint with insecure `Math.random()` OTP | `app/api/test-email/route.ts` | Deleted entire route |
| 2 | XSS in password reset email — `user.name` interpolated into HTML unescaped | `lib/auth.ts` | Added `escapeHtml()` with full entity escaping (including single quotes) |
| 3 | `DATABASE_URL` non-null assertion bypassed TypeScript safety | `lib/db.ts` | Added runtime validation with clear error message |
| 4 | `void` on `resend.emails.send()` silently swallowed email failures | `lib/auth.ts` | Changed to `await` so errors propagate |
| 5 | URL in email template used `escapeHtml()` which breaks `&` in query params | `lib/auth.ts` | Changed to `encodeURI()` for the `href` attribute |

### Component Reuse (DRY Fixes)

| # | Issue | Fix |
|---|-------|-----|
| 6 | Logo SVG duplicated in 3 files (navbar, footer, auth-modal) | Extracted shared `components/ui/logo.tsx` with `variant` and `size` props |
| 7 | Star rating logic duplicated in testimonials-section and doctor-card | Extracted shared `components/ui/star-rating.tsx` with half-star support |
| 8 | First/last name inputs in sign-up duplicated AuthInput logic with imperative focus/blur | Replaced with `AuthInput` component |
| 9 | Textarea in doctor onboarding used imperative focus/blur style mutation | Replaced with Tailwind `focus:` classes |

### Performance Fixes

| # | Issue | File | Fix |
|---|-------|------|-----|
| 10 | VisionSection RAF loop runs at 60fps even when off-screen | `vision-section.tsx` | Added `IntersectionObserver` to pause when not visible |
| 11 | Inline GSAP tween created on every hover event | `vision-section.tsx` | Replaced with CSS `transition-transform hover:scale-[1.08]` |
| 12 | `DoctorCard` marked `"use client"` but has no client-side interactivity | `doctor-card.tsx` | Removed `"use client"` — now a server component |
| 13 | Navbar `setAtBottom` called on every scroll event even when value unchanged | `navbar.tsx` | Added functional updater to skip no-op state updates |
| 14 | `AuthInput` used imperative `style` mutations on focus/blur | `auth-modal.tsx` | Replaced with Tailwind `focus:border-[#228573] focus:shadow-[...]` |

### Code Quality

| # | Issue | Fix |
|---|-------|-----|
| 15 | Variable shadowing — `error` from `useState` shadowed by API response destructuring | Renamed to `signInError`, `signUpError`, `resetError` |
| 16 | Unused animation exports (`animateAuthEntrance`, `animateAuthBlobs`, `animateRoleSwitch`) | Removed from `lib/animations/auth.ts`, kept only `shakeField` |
| 17 | GSAP animations used global CSS class selectors (`.auth-field`, `.auth-cta`) | Scoped to `modalRef.current.querySelectorAll()` |
| 18 | `React.FormEvent` deprecated in React 19 | Replaced with `React.SyntheticEvent` |
| 19 | `reviewCount` falsy check rendered literal `0` to DOM | Changed to `reviewCount != null` |

### Accessibility

| # | Issue | Fix |
|---|-------|-----|
| 20 | DoctorCard had `role="button"` and `tabIndex={0}` but no click handler | Removed misleading interactive attributes and `cursor-pointer` |
| 21 | Mobile nav bar was a `<div>` with no semantic role | Changed to `<nav role="navigation" aria-label="Mobile navigation">` |

### TODO (Future Work)

- [ ] **Doctor onboarding API** — `DoctorOnboardingView` form collects data but `handleSubmit` is a placeholder (`setTimeout` + close). Wire up state for each field and submit to an API endpoint.
- [ ] **Footer social links** — All social media links use `href="#"` with `target="_blank"`. Replace with real URLs when available.

### Files Modified

| File | Changes |
|------|---------|
| `app/api/test-email/route.ts` | Deleted (security risk) |
| `lib/auth.ts` | Added `escapeHtml()`, `await` on email send, `encodeURI()` for URL |
| `lib/db.ts` | Runtime validation for `DATABASE_URL` |
| `components/ui/logo.tsx` | New — shared logo component |
| `components/ui/star-rating.tsx` | New — shared star rating component |
| `components/modals/auth-modal.tsx` | Shared logo, AuthInput for names, Tailwind focus, variable shadowing, scoped GSAP, `SyntheticEvent` |
| `components/layout/navbar.tsx` | Shared logo, scroll handler optimization, mobile nav semantics |
| `components/layout/footer.tsx` | Shared logo |
| `components/sections/testimonials-section.tsx` | Shared StarRating |
| `components/cards/doctor-card.tsx` | Server component, shared StarRating, removed a11y anti-patterns, `reviewCount` fix |
| `components/sections/vision-section.tsx` | IntersectionObserver for RAF, CSS hover instead of GSAP |
| `lib/animations/auth.ts` | Removed unused exports |
| `README.md` | Removed test-email reference, added TODOs |
