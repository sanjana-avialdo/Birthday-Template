-- Run this in the Supabase SQL editor (or via `supabase db push`) once per project.

create extension if not exists "pgcrypto";

-- One row per created birthday card.
create table if not exists cards (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  recipient_name text not null,
  sender_name text not null,
  message text,
  theme text not null default 'aurora-sky',
  music_url text,
  pin_hash text,
  pin_hint text,
  timeline jsonb not null default '[]',
  reasons jsonb not null default '[]',
  love_letter text,
  final_message text,
  created_at timestamptz not null default now()
);

-- Uploaded photos/videos attached to a card.
create table if not exists card_media (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references cards (id) on delete cascade,
  storage_path text not null,
  media_type text not null check (media_type in ('image', 'video')),
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Wishes left by guests on a card.
create table if not exists wishes (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references cards (id) on delete cascade,
  author_name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists card_media_card_id_idx on card_media (card_id);
create index if not exists wishes_card_id_idx on wishes (card_id);

alter table cards enable row level security;
alter table card_media enable row level security;
alter table wishes enable row level security;

-- Cards and their media/wishes are readable by anyone who has the slug
-- (the PIN, if set, is enforced in the app layer since pin_hash is never
-- selected back to the client as plaintext).
create policy "cards are publicly readable" on cards for select using (true);
create policy "card_media is publicly readable" on card_media for select using (true);
create policy "wishes are publicly readable" on wishes for select using (true);

-- Guests can add a wish to any card.
create policy "anyone can add a wish" on wishes for insert with check (true);

-- Writes to cards/card_media go through the service-role client
-- (src/lib/supabase/admin.ts) from server actions/API routes, so no public
-- insert/update policy is defined for those tables here.
