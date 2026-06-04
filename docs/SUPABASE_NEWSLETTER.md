# Supabase newsletter setup

Newsletter signups are stored in `public.newsletter_subscribers` and submitted through `POST /api/newsletter/subscribe` (Vercel serverless via `@astrojs/vercel`).

## 1. Create or choose a Supabase project

Use a **dedicated** project for Frontier Manual (recommended), or an existing project you control.

## 2. Run the migration

**Option A — Dashboard**

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Paste and run `supabase/migrations/20260604120000_newsletter_subscribers.sql`.

**Option B — CLI**

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## 3. Get API credentials

Project **Settings → API**:

| Variable | Where |
|----------|--------|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key (secret) |

Never commit the service role key or expose it in the browser.

## 4. Configure Vercel

Project → **Settings → Environment Variables** (Production + Preview):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Redeploy after adding variables.

## 5. Local API testing

```bash
cp .env.example .env
# fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
npm run dev
```

Submit the form on `/subscribe` or the homepage. The API route only works when env vars are set.

For a full production-like test including Pagefind:

```bash
npm run build
npm run preview
```

## 6. View subscribers

Table Editor → `newsletter_subscribers`, or SQL:

```sql
select email, status, source, subscribed_at
from public.newsletter_subscribers
order by subscribed_at desc;
```

## Security notes

- RLS is enabled with **no** public insert policies; only the service role (server API) writes rows.
- Honeypot field `website` blocks basic bots.
- Emails are normalized to lowercase before insert.
