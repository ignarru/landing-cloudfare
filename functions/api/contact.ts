import { createClient } from '@supabase/supabase-js';
import { insertContactSchema, type InsertContact } from '../../shared/schema';

const lastSubmission = new Map<string, number>();

export const onRequestPost = async (context: any): Promise<Response> => {
  const env = (context.env ?? {}) as Record<string, string>;
  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const last = lastSubmission.get(ip) ?? 0;
    if (Date.now() - last < 60_000) {
      return new Response(JSON.stringify({ message: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await context.request.json();
    const parsed = insertContactSchema.safeParse(data);
    if (!parsed.success) {
      return new Response(JSON.stringify({ message: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = env.SUPABASE_URL?.trim();
    const serviceKey =
      env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
      env.SUPABASE_SERVICE_KEY?.trim() ||
      env.SUPABASE_SECRET_KEY?.trim() ||
      env.SUPABASE_ANON_KEY?.trim() ||
      env.SUPABASE_KEY?.trim();

    if (!supabaseUrl || !serviceKey) {
      console.warn('Supabase credentials missing; logging submission');
      console.log('contact submission', parsed.data);
      lastSubmission.set(ip, Date.now());
      return new Response(JSON.stringify({ message: 'Service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const { error } = await supabase
      .from('contacts')
      .insert(parsed.data as InsertContact);
    if (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: error.message || 'Failed to store contact' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    lastSubmission.set(ip, Date.now());
    return new Response(JSON.stringify({ message: 'ok' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
