import { createBrowserClient } from "@supabase/ssr";

// Für Komponenten, die im Browser laufen (z. B. die Live-Aktualisierung).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
