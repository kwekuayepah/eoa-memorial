import { createClient } from "@supabase/supabase-js";

// Use server-side environment variables (without NEXT_PUBLIC_)
// These variables will be undefined on the client, which is what we want.
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    // Only warn if we are on the server (window is undefined) and keys are missing
    if (typeof window === 'undefined') {
        console.warn("Supabase credentials missing. Check .env.local");
    }
}

// Create the client. If keys are missing (e.g. on client), this might throw or fail gracefully depending on usage.
// Since we only use this in server-side API routes, it should be fine.
export const supabase = createClient(supabaseUrl || "", supabaseKey || "");
