# Aushadham — Development Changelog

**Last updated:** 2026-03-17
**Branch:** `password_resetting_email_otp` (branched from `main`)

---

## Session 1 — QA Audit & Optimization (2026-03-13)

Tested with Playwright MCP (desktop 1280x800, mobile 375x812), TypeScript compiler, and browser console.

### Bugs Fixed

| # | Issue | File | Fix |
|---|-------|------|-----|
| 1 | GSAP warning: `Element not found: .steps-section` | `how-it-works-section.tsx` | Pass `sectionRef.current` instead of string selector |
| 2 | `console.log` in DoctorCard onClick | `doctor-card.tsx` | Removed handlers (card not interactive yet) |
| 3 | TS2353: `phone` not in `signUp.email()` type | `auth-modal.tsx` | Type assertion: `as Parameters<typeof signUp.email>[0]` |
| 4 | Copyright hardcoded to 2023 | `footer.tsx` | `new Date().getFullYear()` |

### Performance

| # | Issue | File | Fix |
|---|-------|------|-----|
| 5 | ScrollTrigger registered 3 times | `scrollReveal.ts`, `statsCounter.ts` | Removed duplicates, kept `animation-provider.tsx` |
| 6 | CSS + GSAP hover conflicts on cards | 4 card/section components | Removed `.card-hover` class, kept CSS transitions |
| 7 | Vision marquee RAF runs when tab hidden | `vision-section.tsx` | Added `document.hidden` check |
| 8 | Unnecessary `ctaLoading` state in hero | `hero-section.tsx` | Removed state, direct `scrollIntoView` |

### UX & Accessibility

| # | Issue | File | Fix |
|---|-------|------|-----|
| 9 | Missing/wrong `autocomplete` attributes | `auth-modal.tsx` | Derived from input type (`email`, `new-password`, etc.) |
| 10 | Dropdown doesn't close on outside click | `navbar.tsx` | Added `mousedown` listener with ref |
| 11 | Dead hamburger menu code (~50 lines) | `navbar.tsx` | Removed (mobile nav uses bottom bar) |

---

## Session 2 — Code Review & Refactor (2026-03-15)

### Security

| # | Issue | Fix |
|---|-------|-----|
| 12 | Insecure test-email endpoint with `Math.random()` OTP | Deleted `app/api/test-email/route.ts` |
| 13 | XSS in reset email — unescaped `user.name` | Added `escapeHtml()` in `lib/auth.ts` |
| 14 | `DATABASE_URL` non-null assertion | Runtime validation with error message in `lib/db.ts` |
| 15 | `void` on email send silently swallowed failures | Changed to `await` in `lib/auth.ts` |

### DRY / Reuse

| # | Issue | Fix |
|---|-------|-----|
| 16 | Logo SVG duplicated in 3 files | Extracted `components/ui/logo.tsx` (variant + size props) |
| 17 | Star rating duplicated in 2 files | Extracted `components/ui/star-rating.tsx` |
| 18 | Sign-up name inputs duplicated AuthInput logic | Replaced with `AuthInput` component |

### Performance

| # | Issue | Fix |
|---|-------|-----|
| 19 | Vision RAF loop at 60fps even off-screen | Added `IntersectionObserver` |
| 20 | Inline GSAP tween on every hover | Replaced with CSS `transition-transform` |
| 21 | DoctorCard was client component with no interactivity | Removed `"use client"` — now server component |
| 22 | Navbar `setAtBottom` called on every scroll | Functional updater to skip no-ops |

### Code Quality

| # | Issue | Fix |
|---|-------|-----|
| 23 | Variable shadowing (`error` from useState vs API) | Renamed to `signInError`, `signUpError`, `resetError` |
| 24 | Unused animation exports in `auth.ts` | Removed; kept only `shakeField` |
| 25 | `React.FormEvent` deprecated in React 19 | Changed to `React.SyntheticEvent` |
| 26 | `reviewCount` falsy check rendered `0` to DOM | Changed to `!= null` |

---

## Session 3 — Password Reset Flow (2026-03-15 → 2026-03-17)

### Resend Email Integration

**Files:** `lib/auth.ts`, `lib/auth-client.ts`, `auth-modal.tsx`

- Installed `resend` package as email provider
- Configured `sendResetPassword` in `lib/auth.ts` — branded HTML email with reset CTA
- Replaced fake `setTimeout` in forgot password modal with real `requestPasswordReset()` call
- Env vars: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (optional)

### Reset Password Page

**File:** `app/reset-password/page.tsx` (new)

- Reads `token` and `error` from URL search params
- 4 states: loading → form / error
- Password validation: min 8 chars, match confirmation
- Calls `resetPassword({ newPassword, token })` via Better Auth client
- Success state with redirect to sign-in
- Matches Aushadham brand (teal gradient, rounded-full inputs, logo)

### Callback URL Fix

**File:** `lib/auth.ts:40`

- **Bug:** `encodeURI(url)` in email template double-encoded the callback URL (`%2F` → `%252F`)
- **Result:** Better Auth rejected the link with `INVALID_CALLBACK_URL`
- **Fix:** Removed `encodeURI()` — Better Auth already provides a properly formatted URL

### Scalar API Docs

- Installed `@scalar/nextjs-api-reference` + Better Auth `openAPI()` plugin
- Live at `/api/docs` — auto-syncs with auth config
- Custom routes added via `app/api/openapi/route.ts`

---

## Env Variables Required

| Key | Purpose | Required |
|-----|---------|----------|
| `DATABASE_URL` | Supabase PostgreSQL | Yes |
| `BETTER_AUTH_SECRET` | Session signing | Yes |
| `BETTER_AUTH_URL` | Server base URL | Yes |
| `NEXT_PUBLIC_APP_URL` | Client base URL | Yes |
| `RESEND_API_KEY` | Email delivery via Resend | Yes (for password reset) |
| `RESEND_FROM_EMAIL` | Custom sender address | No (defaults to `noreply@aushadham.com`) |

---

## TODO

- [ ] Doctor onboarding API — form collects data but submit is a placeholder
- [ ] Footer social links — all use `href="#"`
- [ ] Add env vars to Vercel for production deployment
