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
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-3xl font-bold">Anfragen an mich</h1>
      {anfragen.length > 0 ? (
        <>
          <h2 className="sr-only">Offene Anfragen auf deine Gegenstände</h2>
          <ul className="mt-6 space-y-3">
            {anfragen.map((anfrage) => (
              <li
                key={anfrage.id}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-semibold">{anfrage.items.titel}</p>
                  <p className="break-all">
                    <span className="text-muted">Angefragt von: </span>
                    {anfrage.email}
                  </p>
                </div>
                <Link
                  href={`/gegenstand/${anfrage.items.id}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 py-2 font-semibold text-white sm:shrink-0"
                >
                  Beantworten
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="max-w-xl text-lg text-muted">
          Gerade wartet keine Anfrage auf dich.{" "}
          <Link href="/#gegenstaende" className="inline-flex min-h-11 items-center font-medium text-foreground underline">
            Schau dir an, was gerade verfügbar ist
          </Link>
          .
        </p>
      )}
    </main>
  );
}
