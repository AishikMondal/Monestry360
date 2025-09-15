-- Create profiles table for basic user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  user_type text not null check (user_type in ('traveller', 'monastery')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create travellers table for traveller-specific information
create table if not exists public.travellers (
  id uuid primary key references public.profiles(id) on delete cascade,
  age_group text check (age_group in ('child', 'adult', 'senior')),
  interests text[],
  preferred_districts text[],
  travel_style text check (travel_style in ('solo', 'family', 'group', 'couple')),
  accessibility_needs boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on travellers
alter table public.travellers enable row level security;

-- Travellers policies
create policy "travellers_select_own"
  on public.travellers for select
  using (auth.uid() = id);

create policy "travellers_insert_own"
  on public.travellers for insert
  with check (auth.uid() = id);

create policy "travellers_update_own"
  on public.travellers for update
  using (auth.uid() = id);

create policy "travellers_delete_own"
  on public.travellers for delete
  using (auth.uid() = id);

-- Create monasteries table for monastery-specific information
create table if not exists public.monasteries (
  id uuid primary key references public.profiles(id) on delete cascade,
  monastery_name text not null,
  district text not null check (district in ('North Sikkim', 'South Sikkim', 'East Sikkim', 'West Sikkim')),
  address text not null,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  founded_year integer,
  monastery_type text check (monastery_type in ('Nyingma', 'Kagyu', 'Gelug', 'Sakya', 'Bon')),
  description text,
  history text,
  architecture_style text,
  main_festivals text[],
  visiting_hours text,
  entry_fee decimal(10, 2) default 0,
  accessibility_level text check (accessibility_level in ('Easy', 'Moderate', 'Difficult')) default 'Moderate',
  contact_phone text,
  website_url text,
  image_urls text[],
  virtual_tour_url text,
  is_verified boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on monasteries
alter table public.monasteries enable row level security;

-- Monasteries policies - monasteries can manage their own data
create policy "monasteries_select_own"
  on public.monasteries for select
  using (auth.uid() = id);

create policy "monasteries_insert_own"
  on public.monasteries for insert
  with check (auth.uid() = id);

create policy "monasteries_update_own"
  on public.monasteries for update
  using (auth.uid() = id);

create policy "monasteries_delete_own"
  on public.monasteries for delete
  using (auth.uid() = id);

-- Allow public read access to verified and active monasteries
create policy "monasteries_public_read"
  on public.monasteries for select
  using (is_verified = true and is_active = true);

-- Create events table for monastery events
create table if not exists public.monastery_events (
  id uuid primary key default gen_random_uuid(),
  monastery_id uuid not null references public.monasteries(id) on delete cascade,
  title text not null,
  description text,
  event_type text check (event_type in ('Festival', 'Ceremony', 'Teaching', 'Meditation', 'Cultural', 'Other')),
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  location text,
  max_participants integer,
  registration_required boolean default false,
  entry_fee decimal(10, 2) default 0,
  contact_info text,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on monastery_events
alter table public.monastery_events enable row level security;

-- Events policies - monasteries can manage their own events
create policy "events_select_by_monastery"
  on public.monastery_events for select
  using (
    monastery_id in (
      select id from public.monasteries where auth.uid() = id
    )
  );

create policy "events_insert_by_monastery"
  on public.monastery_events for insert
  with check (
    monastery_id in (
      select id from public.monasteries where auth.uid() = id
    )
  );

create policy "events_update_by_monastery"
  on public.monastery_events for update
  using (
    monastery_id in (
      select id from public.monasteries where auth.uid() = id
    )
  );

create policy "events_delete_by_monastery"
  on public.monastery_events for delete
  using (
    monastery_id in (
      select id from public.monasteries where auth.uid() = id
    )
  );

-- Allow public read access to active events from verified monasteries
create policy "events_public_read"
  on public.monastery_events for select
  using (
    is_active = true and
    monastery_id in (
      select id from public.monasteries where is_verified = true and is_active = true
    )
  );

-- Create trip_plans table for traveller itineraries
create table if not exists public.trip_plans (
  id uuid primary key default gen_random_uuid(),
  traveller_id uuid not null references public.travellers(id) on delete cascade,
  title text not null,
  description text,
  start_date date not null,
  end_date date not null,
  total_days integer generated always as (end_date - start_date + 1) stored,
  monasteries_to_visit uuid[],
  events_to_attend uuid[],
  accommodation_preferences text,
  transportation_preferences text,
  budget_range text check (budget_range in ('Budget', 'Mid-range', 'Luxury')),
  group_size integer default 1,
  special_requirements text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on trip_plans
alter table public.trip_plans enable row level security;

-- Trip plans policies
create policy "trip_plans_select_own"
  on public.trip_plans for select
  using (
    traveller_id in (
      select id from public.travellers where auth.uid() = id
    )
  );

create policy "trip_plans_insert_own"
  on public.trip_plans for insert
  with check (
    traveller_id in (
      select id from public.travellers where auth.uid() = id
    )
  );

create policy "trip_plans_update_own"
  on public.trip_plans for update
  using (
    traveller_id in (
      select id from public.travellers where auth.uid() = id
    )
  );

create policy "trip_plans_delete_own"
  on public.trip_plans for delete
  using (
    traveller_id in (
      select id from public.travellers where auth.uid() = id
    )
  );

-- Allow public read access to public trip plans
create policy "trip_plans_public_read"
  on public.trip_plans for select
  using (is_public = true);
