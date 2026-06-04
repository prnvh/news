import type { APIRoute } from "astro";
import { getSupabaseAdmin, isSupabaseConfigured } from "../../../lib/supabase/admin";
import { parseSubscribePayload } from "../../../lib/newsletter/validate";

export const prerender = false;

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!isSupabaseConfigured()) {
    return jsonResponse(
      {
        ok: false,
        message:
          "Newsletter signup is not configured yet. Please try again later.",
      },
      503,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: "Invalid JSON body." }, 400);
  }

  const parsed = parseSubscribePayload(body);
  if (!parsed.ok) {
    return jsonResponse({ ok: false, message: parsed.message }, 400);
  }

  const { email, source } = parsed.data;
  const referer = request.headers.get("referer") ?? undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  try {
    const supabase = getSupabaseAdmin();

    const { data: existing, error: selectError } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (selectError) {
      console.error("newsletter select error", selectError);
      return jsonResponse(
        { ok: false, message: "Could not process subscription." },
        500,
      );
    }

    if (existing?.status === "active") {
      return jsonResponse({
        ok: true,
        alreadySubscribed: true,
        message: "You are already subscribed.",
      });
    }

    if (existing?.status === "unsubscribed") {
      const { error: updateError } = await supabase
        .from("newsletter_subscribers")
        .update({
          status: "active",
          unsubscribed_at: null,
          subscribed_at: new Date().toISOString(),
          source,
          metadata: {
            resubscribed: true,
            referer,
            userAgent,
            ip: clientAddress,
          },
        })
        .eq("id", existing.id);

      if (updateError) {
        console.error("newsletter resubscribe error", updateError);
        return jsonResponse(
          { ok: false, message: "Could not process subscription." },
          500,
        );
      }

      return jsonResponse({
        ok: true,
        message: "Welcome back — you are subscribed again.",
      });
    }

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
        source,
        metadata: {
          referer,
          userAgent,
          ip: clientAddress,
        },
      });

    if (insertError) {
      if (insertError.code === "23505") {
        return jsonResponse({
          ok: true,
          alreadySubscribed: true,
          message: "You are already subscribed.",
        });
      }
      console.error("newsletter insert error", insertError);
      return jsonResponse(
        { ok: false, message: "Could not process subscription." },
        500,
      );
    }

    return jsonResponse({
      ok: true,
      message: "Thanks for subscribing.",
    });
  } catch (error) {
    console.error("newsletter subscribe fatal", error);
    return jsonResponse(
      { ok: false, message: "Could not process subscription." },
      500,
    );
  }
};
