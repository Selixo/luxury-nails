# Backend — Plan implementacji

## Stack

- **Next.js** App Router — Server Components + Server Actions (brak osobnego API)
- **Supabase** — PostgreSQL + Auth + Row Level Security
- **Twilio** — SMS OTP przy rejestracji (weryfikacja numeru telefonu)
- **Vercel** — hosting Next.js
- **GitHub Actions** — cron ping Supabase (zapobiega usypianiu darmowego planu)

---

## Schema bazy danych

```sql
-- Rozszerzenie auth.users z Supabase
profiles (
  id          uuid  PK  FK → auth.users
  phone       text  UNIQUE
  name        text
  role        text  -- 'client' | 'admin'
  created_at  timestamptz
)

services (
  id            uuid  PK
  name          text
  category      text
  price         numeric
  duration_min  int
  active        bool  DEFAULT true
)

bookings (
  id                   uuid  PK
  client_id            uuid  FK → profiles
  service_id           uuid  FK → services
  date                 date
  time                 time
  status               text  -- 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes                text
  inspiration_url      text
  cancellation_reason  text
  stylist_note         text
  created_at           timestamptz
)

bans (
  id          uuid  PK
  client_id   uuid  FK → profiles  UNIQUE
  reason      text
  note        text
  banned_by   uuid  FK → profiles
  banned_at   timestamptz
)

ratings (
  id          uuid  PK
  booking_id  uuid  FK → bookings  UNIQUE
  stars       int   -- 1–5
  comment     text
  created_at  timestamptz
)

settings (
  id             uuid  PK
  working_hours  jsonb  -- { pon: { enabled, start, end }, ... }
  break_min      int    DEFAULT 15
)
```

---

## Faza 0 — Fundament [ ]

- [ ] Utworzenie projektu Supabase
- [ ] Zmienne środowiskowe w `.env.local`
- [ ] Instalacja `@supabase/supabase-js` + `@supabase/ssr`
- [ ] Klient Supabase — plik server (`utils/supabase/server.ts`) i browser (`utils/supabase/client.ts`)
- [ ] Migracje SQL — wszystkie tabele + RLS policies
- [ ] Seed — dane testowe (usługi, 1 admin, kilka klientek)

---

## Faza 1 — Autentykacja [ ]

- [ ] Twilio podpięty pod Supabase Auth (Phone provider)
- [ ] `StepPhone` → `supabase.auth.signInWithOtp({ phone })`
- [ ] `StepVerify` (PIN) → `supabase.auth.verifyOtp({ phone, token })`
- [ ] `StepRegister` → zapis imienia do `profiles`, ustawienie hasła
- [ ] `StepPassword` → `supabase.auth.signInWithPassword` dla powracających klientek
- [ ] `middleware.ts` → ochrona `/panel/*`, redirect na `/logowanie` jeśli brak sesji
- [ ] Middleware sprawdza `profiles.role` → redirect na właściwy panel (admin/klient)
- [ ] Wylogowanie → `supabase.auth.signOut()`

---

## Faza 2 — Panel klienta [ ]

- [ ] **Profil** — odczyt `profiles`, update imienia, zmiana hasła
- [ ] **Historia** — `bookings` JOIN `services`, filtrowanie po `client_id`, odczyt `ratings`
- [ ] **Dashboard** — najbliższa wizyta (`status IN (pending, confirmed)`), statystyki
- [ ] **Anulowanie wizyty** — Server Action: `UPDATE bookings SET status='cancelled'`
- [ ] **Nowa rezerwacja** — walidacja wolnego terminu, `INSERT INTO bookings`
- [ ] **Ocena wizyty** — Server Action: `INSERT/UPDATE ratings`
- [ ] **Banned screen** — middleware sprawdza `bans` przy wejściu do `/panel/klient`, renderuje `BannedScreen` z prawdziwymi danymi zamiast `?demo-ban=1`

---

## Faza 3 — Panel admina [ ]

- [ ] **Wizyty** — lista z filtrami, Server Actions: potwierdź / anuluj / notatka stylisty
- [ ] **Klientki** — lista z wyszukiwarką, Server Actions: ban / unban (INSERT/DELETE `bans`)
- [ ] **Dashboard** — COUNT wizyt dziś, oczekujące, wolne okna dziś (obliczane z bazy)
- [ ] **Kalendarz** — `bookings` dla wybranego tygodnia JOIN `profiles` + `services`
- [ ] **Podsumowanie** — SUM(price) GROUP BY miesiąc/kategoria, top klientki
- [ ] **Ustawienia** — odczyt/zapis `services` (ceny, czas) + `settings` (godziny pracy)

---

## Faza 4 — Stabilność [ ]

- [ ] GitHub Actions cron — ping Supabase raz dziennie (zapobiega usypianiu)
- [ ] `loading.tsx` na poziomie route'ów (skeleton states)
- [ ] `error.tsx` na poziomie route'ów
- [ ] Twilio webhook — `app/api/twilio/route.ts` (opcjonalnie, jeśli potrzebny callback)

---

## Architektura komponentów

```
page.tsx (Server Component)
  → dane pobierane bezpośrednio z Supabase (bez useEffect/fetch)
  → przekazuje jako props do:
     *Component.tsx ("use client")
       → obsługuje UI state i interakcje
       → mutacje przez Server Actions
```

---

## Notatki

- Supabase free tier pauzuje po 7 dniach bez aktywności → cron ping obowiązkowy
- SMS Twilio ~0.05–0.07 zł/szt — wysyłane tylko przy rejestracji (jednorazowo per klientka)
- Brak osobnego serwera API — Next.js Server Actions zastępują REST endpoints
- RLS w Supabase zastępuje ręczne sprawdzanie uprawnień w kodzie
