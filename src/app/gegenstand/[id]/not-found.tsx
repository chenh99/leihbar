import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Gegenstand nicht gefunden" };

export default function GegenstandNichtGefunden() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <div className="zettel nadel max-w-xl -rotate-1 p-6 pt-8">
        <h1 className="mb-4 font-serif text-3xl">Diesen Gegenstand gibt es nicht</h1>
        <p className="mb-6 text-lg">
          Vielleicht ist die Adresse falsch oder der Zettel wurde abgenommen. Schau am Brett, was
          gerade verfügbar ist.
        </p>
        <Link
          href="/#gegenstaende"
          className="inline-flex min-h-11 items-center bg-tinte px-5 font-semibold text-zettel"
        >
          Zurück zum Brett
        </Link>
      </div>
    </main>
  );
}
