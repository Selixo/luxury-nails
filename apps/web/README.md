# apps/web

The Next.js application powering Luxury Nails — a booking platform that handles everything from a client's first visit to the owner's revenue report.

## The problem it solves

A client wants to book an appointment. Without this system: they call the salon, the owner checks a paper calendar, writes it down, and hopes nobody double-books. With this system: the client books online in under two minutes, the owner sees it instantly in the dashboard and in Google Calendar, and the slot is automatically blocked.

## Features

### For clients

- **SMS-based auth** — no passwords, no accounts to remember; identity verified via OTP on every login
- **Live availability** — only real open slots are shown based on working hours and existing bookings
- **Booking flow** — pick a service, choose a date and time, confirm — done
- **Booking history** — view past visits, leave star ratings and comments
- **Profile management** — update personal details or delete account (GDPR compliant)

### For the salon owner (admin)

- **Booking dashboard** — see all pending, confirmed, and completed appointments; accept or reject with one click
- **Weekly calendar** — visual overview of the week, color-coded by booking status
- **Client management** — view client profiles, ban problematic clients
- **Services & hours** — add/edit/deactivate services, set working hours per day
- **Google Calendar sync** — confirmed bookings appear automatically in the owner's Google Calendar
- **Reports** — monthly revenue, booking counts, per-service stats; export to PDF or CSV

### Public site

- Landing page with gallery, pricing, reviews carousel, and location map
- Fully SEO-optimised (meta tags, Open Graph, JSON-LD, sitemap, robots.txt)
- Cookie consent with granular analytics/marketing controls (GDPR)
- Privacy policy and terms of service

## Setup

### 1. Environment variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GA_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

### 2. Generate Supabase types

Run inside `apps/web/`:

```bash
npm run gen:types
```

Re-run whenever the database schema changes.

## Architecture

### Data fetching

| Layer             | How                                                                   |
| ----------------- | --------------------------------------------------------------------- |
| Server Components | Direct Supabase queries — no API layer                                |
| Server Actions    | All mutations (`"use server"`)                                        |
| React Query       | Client-side data that needs to stay fresh (e.g. available time slots) |

API routes are avoided — only `/api/export/summary` (PDF) and `/api/google/callback` (OAuth) exist.

### Supabase clients

| File                     | Used for                             |
| ------------------------ | ------------------------------------ |
| `lib/supabase/server.ts` | Server Components & Server Actions   |
| `lib/supabase/client.ts` | Client Components                    |
| `lib/supabase/admin.ts`  | Service role — admin-only operations |

### Security

- Row Level Security (RLS) enabled on all tables
- Clients can only read/modify their own data
- Admin operations gated behind `is_admin()` Postgres function
- Google OAuth protected with CSRF state parameter (httpOnly cookie)
- GDPR: consent required before analytics load, account deletion supported

### Feature structure

Each feature lives in `features/<name>/` and co-locates its components, hooks, server actions, schemas, and types:

```
features/
  dashboard/
    bookings/       # Booking list + status management
    calendar/       # Weekly calendar view
    clients/        # Client list + ban management
    settings/       # Services, hours, Google Calendar
    summary/        # Reports, PDF export
  home/             # Landing page sections
  reservation/      # Multi-step booking & auth flow
```

## Conventions

- Zod schemas in `schemas.ts` next to the form or action that uses them
- Feature-specific types in `types.ts` inside the feature folder
- Polish locale throughout — UI text, dates, phone numbers (`pl_PL`)
- Path alias `@/*` resolves to `apps/web/`
