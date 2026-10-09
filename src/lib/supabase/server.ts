import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Der Client wird bei jeder Anfrage neu erzeugt und nie global gespeichert.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // In einer Server Component dürfen keine Cookies geschrieben werden.
            // Das ist unkritisch, sobald der Login (Issue 5) die Sitzung auffrischt.
          }
        },
      },
    },
  );
}
