const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;

export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!email || email.length > MAX_EMAIL_LENGTH) return null;
  if (!EMAIL_PATTERN.test(email)) return null;
  return email;
}

export interface SubscribePayload {
  email: string;
  website?: string;
  source?: string;
}

export function parseSubscribePayload(
  body: unknown,
): { ok: true; data: SubscribePayload } | { ok: false; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email : "";
  const website = typeof record.website === "string" ? record.website : "";
  const source =
    typeof record.source === "string" ? record.source.slice(0, 64) : "website";

  if (website.trim().length > 0) {
    return { ok: false, message: "Unable to subscribe." };
  }

  const normalized = normalizeEmail(email);
  if (!normalized) {
    return { ok: false, message: "Enter a valid email address." };
  }

  return {
    ok: true,
    data: { email: normalized, source },
  };
}
