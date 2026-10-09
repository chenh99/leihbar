import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Gegenstand nicht gefunden" };

export default function GegenstandNichtGefunden() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Diesen Gegenstand gibt es nicht</h1>
      <p className="mb-6 max-w-xl text-lg text-muted">
        Vielleicht ist die Adresse falsch oder der Gegenstand wurde entfernt. Schau
        in der Liste, was gerade verfügbar ist.
      </p>
      <Link
        href="/#gegenstaende"
        className="inline-flex min-h-11 items-center rounded-xl bg-accent px-5 font-medium text-white shadow-sm transition hover:opacity-90"
      >
        Zurück zur Liste
      </Link>
    </main>
  );
}
