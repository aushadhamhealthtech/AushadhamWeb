# Aushadham API Reference

**Last updated:** 2026-03-17
**Base URL (local):** `http://localhost:3000`
**Base URL (production):** Set via `BETTER_AUTH_URL` env var

---

## Overview

All endpoints are served through a single Next.js catch-all route (`app/api/auth/[...all]/route.ts`) delegating to [Better Auth](https://www.better-auth.com/). No custom API routes exist yet — doctor data uses a mock in `lib/data/doctors.ts`.

---

## Active Endpoints (Used in UI)

| Method | Endpoint | Description | Request Body | Used In |
|--------|----------|-------------|-------------|---------|
| `POST` | `/api/auth/sign-in/email` | Sign in | `{ email, password, rememberMe? }` | `auth-modal.tsx` |
| `POST` | `/api/auth/sign-up/email` | Create account | `{ email, password, name, phone?, role? }` | `auth-modal.tsx` |
| `POST` | `/api/auth/sign-out` | Sign out | *(none)* | `navbar.tsx` |
| `GET` | `/api/auth/get-session` | Get session (cookie) | *(none)* | `navbar.tsx` |
| `POST` | `/api/auth/request-password-reset` | Send reset email via Resend | `{ email, redirectTo? }` | `auth-modal.tsx` |
| `POST` | `/api/auth/reset-password` | Reset password with token | `{ token, newPassword }` | `reset-password/page.tsx` |

## Available (Not Yet Used in UI)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|-------------|
| `POST` | `/api/auth/change-password` | Change password (authenticated) | `{ currentPassword, newPassword }` |
| `POST` | `/api/auth/change-email` | Change email | `{ newEmail, callbackURL? }` |
| `POST` | `/api/auth/verify-email` | Verify email token | `{ token }` |
| `POST` | `/api/auth/update-user` | Update profile | `{ name?, image? }` |
| `POST` | `/api/auth/delete-user` | Delete account | `{ password }` |
| `GET` | `/api/auth/list-sessions` | List active sessions | *(none)* |
| `POST` | `/api/auth/revoke-session` | Revoke a session | `{ sessionId }` |

---

## Auth Config

| Setting | Value |
|---------|-------|
| Session method | Cookie-based (`nextCookies()`) |
| Session expiry | 7 days |
| Session refresh | Every 24 hours |
| Min password length | 8 characters |
| Email provider | Resend (`sendResetPassword` callback) |
| OAuth | Google & GitHub configured but **not active** |

### Custom User Fields

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `phone` | string | no | — |
| `role` | string | no | `"patient"` |

---

## Database Tables

Schema in `lib/schema.ts`, managed by Drizzle ORM + Supabase PostgreSQL.

| Table | Purpose |
|-------|---------|
| `user` | Accounts (id, name, email, phone, role, createdAt) |
| `session` | Active sessions (token, userId, expiresAt, ipAddress, userAgent) |
| `account` | Auth providers — email/password, OAuth (providerId, password) |
| `verification` | Email verification & password reset tokens |

---

## Quick cURL Tests

```bash
# Sign Up
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","name":"Test User"}'

# Sign In
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Get Session
curl http://localhost:3000/api/auth/get-session \
  -H "Cookie: better-auth.session_token=<token>"

# Request Password Reset
curl -X POST http://localhost:3000/api/auth/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","redirectTo":"/reset-password"}'
```

---

## Interactive Docs (Scalar)

Live at **`/api/docs`** — powered by `@scalar/nextjs-api-reference` + Better Auth `openAPI()` plugin.

| File | Purpose |
|------|---------|
| `app/api/openapi/route.ts` | Merges auto-generated auth spec + custom route specs |
| `app/api/docs/route.ts` | Scalar UI reading from `/api/openapi` |

To add a new route: create the route file → add its OpenAPI path to `customSpec.paths` in `openapi/route.ts`.

---

## Planned Routes

| Endpoint | Purpose |
|----------|---------|
| `/api/doctors` | List/search doctors |
| `/api/appointments` | Booking management |
| `/api/reports` | Medical report uploads |
| `/api/consultations` | Video call sessions |
