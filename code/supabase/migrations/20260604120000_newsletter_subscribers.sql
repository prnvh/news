-- Frontier Manual newsletter subscribers
-- Apply via Supabase CLI or Dashboard SQL editor.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'active'
    check (status in ('active', 'unsubscribed')),
  source text not null default 'website',
  subscribed_at timestamptz not null default timezone('utc', now()),
  unsubscribed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists newsletter_subscribers_email_lower_idx
  on public.newsletter_subscribers (lower(email));

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);

create index if not exists newsletter_subscribers_subscribed_at_idx
  on public.newsletter_subscribers (subscribed_at desc);

alter table public.newsletter_subscribers enable row level security;

-- No anon/authenticated policies: inserts go through the server API (service role).
revoke all on table public.newsletter_subscribers from anon, authenticated;
revoke all on table public.newsletter_subscribers from public;
grant all on table public.newsletter_subscribers to service_role;

comment on table public.newsletter_subscribers is
  'Newsletter signups for Frontier Manual (written via /api/newsletter/subscribe).';
