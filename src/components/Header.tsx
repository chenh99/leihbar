import Link from "next/link";
import { LayoutGrid, LogIn, LogOut, SquarePlus } from "lucide-react";
import { abmelden } from "@/app/anmelden/actions";
import AnfrageHinweis from "@/components/AnfrageHinweis";
import Logo from "@/components/Logo";
import NavLink from "@/components/NavLink";
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

  const icon = "size-5 shrink-0";

  return (
    // Die Leiste ist der hellgraue Rahmen der Pinnwand.
    <header className="border-b-[6px] border-wand-schatten bg-wand-dunkel text-wand-text">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2">
        <Link href="/" className="flex min-h-11 items-center">
          <Logo />
        </Link>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-1 text-sm sm:gap-3">
          <NavLink href="/#gegenstaende" icon={<LayoutGrid aria-hidden className={icon} />}>
            Gegenstände
          </NavLink>
          <NavLink href="/anbieten" icon={<SquarePlus aria-hidden className={icon} />}>
            Anbieten
          </NavLink>
          {angemeldet ? (
            <>
              {userId && <AnfrageHinweis userId={userId} anzahl={offen} />}
              {email && (
                // Am Handy ist dafür kein Platz, damit der Header einzeilig bleibt.
                <span className="hidden max-w-48 truncate text-wand-text-gedaempft lg:inline" title={email}>
                  {email}
                </span>
              )}
              <form action={abmelden}>
                <button
                  type="submit"
                  className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-2 text-wand-text-gedaempft hover:text-wand-text"
                >
                  <LogOut aria-hidden className={icon} />
                  <span className="sr-only sm:not-sr-only">Abmelden</span>
                </button>
              </form>
            </>
          ) : (
            <NavLink href="/anmelden" icon={<LogIn aria-hidden className={icon} />} textAmHandy>
              Anmelden
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
