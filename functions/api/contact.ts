// Cloudflare Pages Function
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    // 1) Validar que existan las envs (sin loguear secretos)
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({
          error: "Missing server env",
          hasUrl: Boolean(env.SUPABASE_URL),
          hasKey: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2) Parsear body
    const { name, email, company, phone, message } = await request.json();

    // 3) Preparar payload (campos opcionales null)
    const payload = {
      name,
      email,
      company: company ?? null,
      phone: phone ?? null,
      message: message ?? null,
    };

    // 4) Llamar a Supabase REST con Service Role en ambos headers
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Unhandled" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
