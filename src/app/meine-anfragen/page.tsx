import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnfrageStatus from "@/components/AnfrageStatus";
import GegenstandKarte from "@/components/GegenstandKarte";
import { holeMeineAnfragen } from "@/lib/anfragen";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Meine Anfragen" };

export default async function MeineAnfragenSeite() {
  // Zusätzlich zur Weiterleitung in proxy.ts: geschützte Seiten prüfen auch selbst.
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/anmelden?weiter=%2Fmeine-anfragen");

  const anfragen = await holeMeineAnfragen();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-8 pb-16 sm:pt-12">
      <h1 className="mb-3 font-serif text-4xl text-wand-text sm:text-5xl">Meine Anfragen</h1>
      {anfragen.length > 0 ? (
        <>
          <p className="mb-8 text-wand-text-gedaempft">Der Stempel zeigt, was die Besitzer*in geantwortet hat.</p>
          <h2 className="sr-only">Deine angefragten Gegenstände</h2>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {anfragen.map(({ gegenstand, status }, index) => (
              <li key={gegenstand.id}>
                <GegenstandKarte
                  gegenstand={gegenstand}
                  prioritaet={index === 0}
                  stempel={<AnfrageStatus status={status} />}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="zettel nadel mt-6 max-w-md -rotate-1 p-5">
          <p className="mb-2 text-lg">Du hast noch nichts angefragt.</p>
          <Link href="/#gegenstaende" className="inline-flex min-h-11 items-center font-medium underline">
            Schau dir an, was gerade am Brett hängt
          </Link>
        </div>
      )}
    </main>
  );
}
