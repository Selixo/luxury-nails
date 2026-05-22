-- ============================================================
-- 002 — Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.services  enable row level security;
alter table public.bookings  enable row level security;
alter table public.bans      enable row level security;
alter table public.ratings   enable row level security;
alter table public.settings  enable row level security;


create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;


create policy "Klient widzi swój profil"
  on public.profiles for select
  using (auth.uid() = id);


create policy "Admin widzi wszystkie profile"
  on public.profiles for select
  using (public.is_admin());


create policy "Klient edytuje swój profil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Wszyscy czytają usługi"
  on public.services for select
  using (auth.role() = 'authenticated' and active = true);


create policy "Admin zarządza usługami"
  on public.services for all
  using (public.is_admin());



create policy "Klient widzi swoje wizyty"
  on public.bookings for select
  using (auth.uid() = client_id);


create policy "Klient tworzy wizytę"
  on public.bookings for insert
  with check (auth.uid() = client_id);


create policy "Klient anuluje wizytę"
  on public.bookings for update
  using (auth.uid() = client_id);


create policy "Admin widzi wszystkie wizyty"
  on public.bookings for all
  using (public.is_admin());


create policy "Klient sprawdza swój ban"
  on public.bans for select
  using (auth.uid() = client_id);


create policy "Admin zarządza banami"
  on public.bans for all
  using (public.is_admin());


create policy "Klient widzi swoje oceny"
  on public.ratings for select
  using (
    exists (
      select 1 from public.bookings
      where id = ratings.booking_id and client_id = auth.uid()
    )
  );


create policy "Klient dodaje ocenę"
  on public.ratings for insert
  with check (
    exists (
      select 1 from public.bookings
      where id = ratings.booking_id and client_id = auth.uid()
    )
  );

create policy "Klient edytuje ocenę"
  on public.ratings for update
  using (
    exists (
      select 1 from public.bookings
      where id = ratings.booking_id and client_id = auth.uid()
    )
  );


create policy "Admin widzi wszystkie oceny"
  on public.ratings for all
  using (public.is_admin());

create policy "Admin zarządza ustawieniami"
  on public.settings for all
  using (public.is_admin());
