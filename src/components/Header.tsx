import Link from "next/link";
import { abmelden } from "@/app/anmelden/actions";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === "string" ? data.claims.email : null;
  const angemeldet = Boolean(data?.claims);

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold">
          <span className="inline-block h-3 w-3 rounded-full bg-accent" />
          Leihbar
        </Link>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-4 text-sm text-muted">
          {/* Am Handy ist im Header kein Platz; die Liste erreicht man über das Logo. */}
          <Link href="/#gegenstaende" className="hidden min-h-11 items-center hover:text-foreground sm:flex">
            Gegenstände
          </Link>
          <Link href="/anbieten" className="flex min-h-11 items-center hover:text-foreground">
            Anbieten
          </Link>
          {angemeldet ? (
            <>
              {email && (
                <span className="max-w-24 truncate sm:max-w-48" title={email}>
                  {email}
                </span>
              )}
              <form action={abmelden}>
                <button type="submit" className="flex min-h-11 items-center hover:text-foreground">
                  Abmelden
                </button>
              </form>
            </>
          ) : (
            <Link href="/anmelden" className="flex min-h-11 items-center hover:text-foreground">
              Anmelden
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
