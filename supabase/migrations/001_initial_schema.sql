-- ============================================================
-- 001 — Initial schema
-- ============================================================

create extension if not exists "uuid-ossp";


create table public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  phone       text unique not null,
  name        text not null,
  role        text not null default 'client' check (role in ('client', 'admin')),
  created_at  timestamptz not null default now()
);


create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, phone, name, role)
  values (
    new.id,
    coalesce(new.phone, ''),
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


create table public.services (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  category      text not null,
  price         numeric(8,2) not null,
  duration_min  int not null,
  active        boolean not null default true
);


create table public.bookings (
  id                   uuid primary key default uuid_generate_v4(),
  client_id            uuid not null references public.profiles on delete cascade,
  service_id           uuid not null references public.services on delete restrict,
  date                 date not null,
  time                 time not null,
  status               text not null default 'pending'
                         check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  notes                text,
  inspiration_url      text,
  cancellation_reason  text,
  stylist_note         text,
  created_at           timestamptz not null default now()
);

create index bookings_client_id_idx on public.bookings (client_id);
create index bookings_date_idx on public.bookings (date);
create index bookings_status_idx on public.bookings (status);


create table public.bans (
  id          uuid primary key default uuid_generate_v4(),
  client_id   uuid not null unique references public.profiles on delete cascade,
  reason      text not null,
  note        text,
  banned_by   uuid not null references public.profiles on delete restrict,
  banned_at   timestamptz not null default now()
);


  id          uuid primary key default uuid_generate_v4(),
  booking_id  uuid not null unique references public.bookings on delete cascade,
  stars       int not null check (stars between 1 and 5),
  comment     text,
  created_at  timestamptz not null default now()
);


create table public.settings (
  id             uuid primary key default uuid_generate_v4(),
  working_hours  jsonb not null default '{
    "pon": {"enabled": true,  "start": "09:00", "end": "17:00"},
    "wt":  {"enabled": true,  "start": "09:00", "end": "17:00"},
    "sr":  {"enabled": true,  "start": "09:00", "end": "17:00"},
    "czw": {"enabled": true,  "start": "09:00", "end": "17:00"},
    "pt":  {"enabled": true,  "start": "09:00", "end": "18:00"},
    "sob": {"enabled": true,  "start": "10:00", "end": "15:00"}
  }',
  break_min      int not null default 15
);


insert into public.settings (working_hours, break_min) values (default, default);
