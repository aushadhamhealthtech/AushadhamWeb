# AushadhamWeb

Aushadham health-tech web platform — landing page, authentication, and API layer.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.1.6 |
| Language | TypeScript | 5.x |
| UI | React, Tailwind CSS v4, Radix UI, shadcn/ui | React 19.2 |
| Animation | GSAP | 3.x |
| Auth | Better Auth (email/password, session management) | 1.5.x |
| Database | PostgreSQL via Supabase | — |
| ORM | Drizzle ORM + Drizzle Kit | 0.45.x |
| Email | Resend | 6.x |
| API Docs | Scalar (OpenAPI via Better Auth plugin) | — |
| Deployment | Vercel | — |
| Icons | Lucide React | — |

## Project Structure

```
app/
  page.tsx              # Landing page
  signin/page.tsx       # Sign-in page
  signup/page.tsx       # Sign-up page
  api/
    auth/[...all]/      # Better Auth catch-all route
    docs/               # Scalar API documentation UI
    openapi/            # OpenAPI JSON spec endpoint
lib/
  auth.ts               # Better Auth config (Resend email, Drizzle adapter)
  auth-client.ts        # Client-side auth helpers
  db.ts                 # Drizzle database client
  schema.ts             # Drizzle schema (user, session, account, verification)
drizzle.config.ts       # Drizzle Kit config
```

## Database Schema

Four tables managed by Better Auth + Drizzle:

- **user** — id, name, email, emailVerified, image, phone, role (default: `patient`)
- **session** — token-based sessions, 7-day expiry, daily refresh
- **account** — OAuth/credential provider accounts linked to users
- **verification** — email verification and password reset tokens

## Environment Variables

Create a `.env.local` file:

```env
# Auth
BETTER_AUTH_SECRET=<random-secret>
BETTER_AUTH_URL=http://localhost:3000

# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://<user>:<password>@<host>:6543/<db>

# Public
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Resend) — optional, build succeeds without it
RESEND_API_KEY=<your-resend-api-key>
RESEND_FROM_EMAIL=Aushadham <noreply@aushadham.com>

# OAuth (optional — only if using social login)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

### Database Migrations

```bash
npx drizzle-kit push    # Push schema to database
npx drizzle-kit studio  # Open Drizzle Studio GUI
```

### Build

```bash
npm run build
npm start
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| ALL | `/api/auth/*` | Better Auth routes (sign-in, sign-up, session, etc.) |
| GET | `/api/docs` | Scalar API documentation UI |
| GET | `/api/openapi` | OpenAPI JSON spec |

## Deployment (Vercel)

The project auto-deploys from `main` via Vercel.

**Required Vercel environment variables:**
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (set to your production URL)
- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`

**Optional:**
- `RESEND_API_KEY` — needed for email functionality (password reset, OTP)
- `RESEND_FROM_EMAIL`

## Current Status

- [x] Landing page
- [x] Sign-in / Sign-up with email & password
- [x] Session management (7-day expiry, remember me)
- [x] Password reset email flow (Resend)
- [x] Scalar API documentation
- [x] Supabase PostgreSQL + Drizzle ORM
- [ ] Domain-verified email sending (currently using `onboarding@resend.dev`)
- [ ] Reset password page UI
- [ ] OAuth social login (Google, GitHub)
- [ ] Doctor onboarding API — wire up form submission in `DoctorOnboardingView` to persist professional profile data (registration number, specialization, experience, clinic, bio)
- [ ] Footer social links — replace placeholder `href="#"` with real social media URLs (Facebook, Instagram, Twitter, LinkedIn)
