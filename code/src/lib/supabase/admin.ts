import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSecret } from "astro:env/server";
import type { Database } from "../../types/database";

let client: SupabaseClient<Database> | null = null;

/** Read at runtime (Vercel/process.env), not baked in at build via import.meta.env. */
function getSupabaseCredentials(): { url: string; serviceRoleKey: string } | null {
  const url = getSecret("SUPABASE_URL")?.trim();
  const serviceRoleKey = getSecret("SUPABASE_SERVICE_ROLE_KEY")?.trim();
  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (client) return client;

  const credentials = getSupabaseCredentials();
  if (!credentials) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them in Vercel and .env for local API testing.",
    );
  }

  client = createClient<Database>(
    credentials.url,
    credentials.serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  return client;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseCredentials() !== null;
}
