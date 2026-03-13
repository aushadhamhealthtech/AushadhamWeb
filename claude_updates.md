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

## Files Modified

| File | Changes |
|------|---------|
| `components/modals/auth-modal.tsx` | Autocomplete attributes, email ID fix, TS type assertion |
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
