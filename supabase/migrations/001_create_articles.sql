create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  author text not null default 'Chase Pelky',
  excerpt text not null,
  content text not null,
  tags text[] default '{}',
  read_time_minutes integer not null default 5,
  published boolean not null default false,
  published_at timestamptz,
  revised_at timestamptz,
  revision_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists articles_slug_idx on public.articles(slug);
create index if not exists articles_published_idx on public.articles(published);
