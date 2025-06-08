import "dotenv/config";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

interface DummyClient {
  from(): { insert(data: unknown): Promise<{ error: null }> };
}

let supabase: SupabaseClient | DummyClient;
let supabaseConfigured = false;

const supabaseUrl = process.env.SUPABASE_URL?.trim();
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  process.env.SUPABASE_SERVICE_KEY?.trim() ||
  process.env.SUPABASE_SECRET_KEY?.trim() ||
  process.env.SUPABASE_ANON_KEY?.trim() ||
  process.env.SUPABASE_KEY?.trim();

function isValidUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

if (!isValidUrl(supabaseUrl) || !serviceKey) {
  console.warn(
    "Supabase credentials are missing or invalid; set SUPABASE_URL and a service key in your environment. Form submissions will be logged only."
  );
  supabase = {
    from() {
      return {
        async insert(_data: unknown) {
          console.log("contact submission", _data);
          return { error: null };
        },
      };
    },
  };
} else {
  supabase = createClient(supabaseUrl, serviceKey);
  supabaseConfigured = true;
}

export { supabase, supabaseConfigured };
