import Link from "next/link";
import { abmelden } from "@/app/anmelden/actions";
import AnfrageHinweis from "@/components/AnfrageHinweis";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === "string" ? data.claims.email : null;
  const angemeldet = Boolean(data?.claims);
  const userId = data?.claims?.sub;

  // Offene Anfragen auf meine Gegenstände (die Datenbank zeigt nur, was ich lesen darf).
  let offen = 0;
  if (userId) {
    const { count } = await supabase
      .from("requests")
      .select("id, items!inner(owner_id)", { count: "exact", head: true })
      .eq("status", "offen")
      .eq("items.owner_id", userId);
    offen = count ?? 0;
  }

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold">
          <span className="inline-block h-3 w-3 rounded-full bg-accent" />
          Leihbar
        </Link>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-3 text-sm text-muted sm:gap-4">
          {/* Am Handy ist im Header kein Platz; die Liste erreicht man über das Logo. */}
          <Link href="/#gegenstaende" className="hidden min-h-11 items-center hover:text-foreground sm:flex">
            Gegenstände
          </Link>
          <Link href="/anbieten" className="flex min-h-11 items-center hover:text-foreground">
            Anbieten
          </Link>
          {angemeldet ? (
            <>
              {userId && <AnfrageHinweis userId={userId} anzahl={offen} />}
              {email && (
                // Am Handy ist dafür kein Platz, damit der Header einzeilig bleibt.
                <span className="hidden max-w-48 truncate sm:inline" title={email}>
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
