# @workspace/ui

Shared component library for the Luxury Nails monorepo. Built on [shadcn/ui](https://ui.shadcn.com) primitives (Radix UI + Tailwind CSS v4) and extended with project-specific components.

## Why a separate package

Components live here instead of inside `apps/web` so they stay decoupled from application logic. Any future app in this monorepo can consume the same primitives without duplicating code.

## Usage

```tsx
import { Button } from "@workspace/ui/components/button"
import { Dialog, DialogContent } from "@workspace/ui/components/dialog"
```

Global styles must be imported once in the root layout:

```tsx
import "@workspace/ui/globals.css"
```

## Components

| Component     | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `button`      | Button with variants: default, ghost, outline, destructive |
| `calendar`    | Date picker calendar (react-day-picker)                    |
| `carousel`    | Embla Carousel wrapper with navigation                     |
| `chart`       | Recharts wrapper for data visualisation                    |
| `date-picker` | Calendar inside a popover with formatted value display     |
| `dialog`      | Modal dialog (Radix)                                       |
| `input-otp`   | OTP code input with slot-based UI                          |
| `popover`     | Floating popover (Radix)                                   |
| `select`      | Dropdown select (Radix)                                    |
| `sheet`       | Slide-out side panel (Radix)                               |
| `star-rating` | Interactive star rating input                              |

## Design tokens

Custom tokens defined in `globals.css` and used across the app:

| Token                          | Used for                      |
| ------------------------------ | ----------------------------- |
| `--cell-size`, `--cell-radius` | Admin calendar grid           |
| `text-gold`, `bg-gold/*`       | Brand gold palette            |
| `--font-display`               | Cormorant Garamond (headings) |
| `--font-sans`                  | Geist (body text)             |

## Adding components

To scaffold a new shadcn component into this package, run from the repo root:

```bash
npx shadcn@latest add <component> -c apps/web
```

This places the component in `packages/ui/src/components/` automatically.

## Dependencies

- [Radix UI](https://www.radix-ui.com) — accessible headless primitives
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [Embla Carousel](https://www.embla-carousel.com) — carousel engine
- [Recharts](https://recharts.org) — charting
- [date-fns](https://date-fns.org) — date formatting
- [Lucide React](https://lucide.dev) — icons
- [class-variance-authority](https://cva.style) — variant-based component styling
