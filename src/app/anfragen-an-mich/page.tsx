import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { holeOffeneAnfragen } from "@/lib/anfragen";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Anfragen an mich" };

export default async function AnfragenAnMichSeite() {
  // Zusätzlich zur Weiterleitung in proxy.ts: geschützte Seiten prüfen auch selbst.
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/anmelden?weiter=%2Fanfragen-an-mich");

  const anfragen = await holeOffeneAnfragen();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-8 pb-16 sm:pt-12">
      <h1 className="mb-3 font-serif text-4xl text-wand-text sm:text-5xl">Anfragen an mich</h1>
      {anfragen.length > 0 ? (
        <>
          <p className="mb-8 text-wand-text-gedaempft">
            {anfragen.length === 1
              ? "1 Anfrage wartet auf deine Antwort."
              : `${anfragen.length} Anfragen warten auf deine Antwort.`}
          </p>
          <h2 className="sr-only">Offene Anfragen auf deine Gegenstände</h2>
          <ul className="max-w-3xl space-y-5">
            {anfragen.map((anfrage, index) => (
              <li
                key={anfrage.id}
                className={`zettel nadel flex flex-col gap-3 p-4 pt-5 sm:flex-row sm:items-center sm:justify-between ${
                  index % 2 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"
                }`}
              >
                <div className="min-w-0">
                  <p className="font-serif text-lg">{anfrage.items.titel}</p>
                  <p className="break-all">
                    <span className="text-tinte-gedaempft">Angefragt von: </span>
                    {anfrage.email}
                  </p>
                </div>
                <Link
                  href={`/gegenstand/${anfrage.items.id}`}
                  className="inline-flex min-h-11 items-center justify-center bg-tinte px-4 py-2 font-semibold text-zettel sm:shrink-0"
                >
                  Beantworten
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="zettel nadel mt-6 max-w-md -rotate-1 p-5">
          <p className="mb-2 text-lg">Gerade wartet keine Anfrage auf dich.</p>
          <Link href="/#gegenstaende" className="inline-flex min-h-11 items-center font-medium underline">
            Schau dir an, was gerade am Brett hängt
          </Link>
        </div>
      )}
    </main>
  );
}
