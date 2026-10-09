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
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-3xl font-bold">Meine Anfragen</h1>
      {anfragen.length > 0 ? (
        <>
          <h2 className="sr-only">Deine angefragten Gegenstände</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {anfragen.map(({ gegenstand, status }, index) => (
              <li key={gegenstand.id} className="flex flex-col gap-2">
                <AnfrageStatus status={status} />
                <GegenstandKarte gegenstand={gegenstand} prioritaet={index === 0} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="max-w-xl text-lg text-muted">
          Du hast noch nichts angefragt.{" "}
          <Link href="/#gegenstaende" className="inline-flex min-h-11 items-center font-medium text-foreground underline">
            Schau dir an, was gerade verfügbar ist
          </Link>
          .
        </p>
      )}
    </main>
  );
}
