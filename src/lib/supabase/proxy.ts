import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Seiten, die nur Angemeldete sehen dürfen.
const geschuetzt = ["/meine-anfragen", "/anfragen-an-mich", "/anbieten"];

// Frischt die Sitzung bei jeder Anfrage auf und leitet Nicht-Angemeldete zur Anmeldung.
export async function sitzungAufrufen(request: NextRequest) {
  let antwort = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          antwort = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => antwort.cookies.set(name, value, options));
        },
      },
    },
  );

  // Dieser Aufruf darf nicht entfernt werden, sonst werden Leute zufällig abgemeldet.
  const { data } = await supabase.auth.getClaims();
  const angemeldet = Boolean(data?.claims);

  const pfad = request.nextUrl.pathname;
  if (!angemeldet && geschuetzt.some((seite) => pfad === seite || pfad.startsWith(`${seite}/`))) {
    const ziel = request.nextUrl.clone();
    ziel.pathname = "/anmelden";
    ziel.search = `?weiter=${encodeURIComponent(pfad)}`;
    return NextResponse.redirect(ziel);
  }

  return antwort;
}
