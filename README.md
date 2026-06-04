# Luxury Nails

A full-stack booking platform for a luxury nail salon — built to replace phone-based scheduling with a seamless online experience for both clients and the salon owner.

## What it does

Clients visit the site, pick a service and time slot, verify their identity via SMS, and book an appointment — all without calling the salon. The owner gets notified, confirms the booking, and it lands automatically in Google Calendar.

On the admin side: a real-time booking dashboard, a weekly calendar view, client management (including banning), revenue reports with PDF export, and full control over services and working hours.

## Why this exists

Most nail salons either rely on phone bookings (time-consuming, error-prone) or pay for expensive generic SaaS tools that don't fit their workflow. This system is purpose-built for a single salon — no unnecessary features, no monthly subscription, full ownership of data.

## What's inside

```
apps/
  web/              # Next.js 16 app — client portal + admin dashboard
packages/
  ui/               # Shared component library (@workspace/ui)
  eslint-config/    # Shared ESLint config
  typescript-config/ # Shared TypeScript config
```

→ [apps/web](./apps/web/README.md) — full feature breakdown, setup, architecture  
→ [packages/ui](./packages/ui/README.md) — component library docs

## Stack

Next.js 16 · Supabase (PostgreSQL + Auth) · Tailwind CSS v4 · TypeScript · Turborepo

## Requirements

- Node.js >= 20
- npm >= 11

## Getting started

```bash
npm install
npm run dev
```

See [apps/web/README.md](./apps/web/README.md) for environment variables and full setup.

## Commands

All commands run from the **repo root**.

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start all apps in development mode |
| `npm run build`     | Production build                   |
| `npm run typecheck` | TypeScript type checking           |
| `npm run lint`      | Lint all packages                  |
| `npm run format`    | Format code with Prettier          |

## Commits

Follows [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `chore:`, etc.), enforced by commitlint + Husky pre-commit hooks.
