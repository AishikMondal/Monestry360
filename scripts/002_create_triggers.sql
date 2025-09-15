-- Function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, user_type)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'user_type', 'traveller')
  )
  on conflict (id) do nothing;

  -- Create specific user type record
  if (new.raw_user_meta_data ->> 'user_type') = 'traveller' then
    insert into public.travellers (id, age_group, travel_style)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'age_group', 'adult'),
      coalesce(new.raw_user_meta_data ->> 'travel_style', 'solo')
    )
    on conflict (id) do nothing;
  elsif (new.raw_user_meta_data ->> 'user_type') = 'monastery' then
    insert into public.monasteries (id, monastery_name, district, address)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'monastery_name', ''),
      coalesce(new.raw_user_meta_data ->> 'district', 'East Sikkim'),
      coalesce(new.raw_user_meta_data ->> 'address', '')
    )
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Add updated_at triggers to all tables
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger travellers_updated_at
  before update on public.travellers
  for each row
  execute function public.handle_updated_at();

create trigger monasteries_updated_at
  before update on public.monasteries
  for each row
  execute function public.handle_updated_at();

create trigger monastery_events_updated_at
  before update on public.monastery_events
  for each row
  execute function public.handle_updated_at();

create trigger trip_plans_updated_at
  before update on public.trip_plans
  for each row
  execute function public.handle_updated_at();
