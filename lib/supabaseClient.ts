import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    // Only throw in browser/during build if these are missing and we try to use the client
    // In development, this might happen before .env is set up
    console.warn("Supabase credentials missing. Check .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
