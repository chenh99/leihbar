import Link from "next/link";
import { Plus } from "lucide-react";
import GegenstandKarte from "@/components/GegenstandKarte";
import KategorieFilter from "@/components/KategorieFilter";
import { kategorien, type Kategorie } from "@/data/gegenstaende";
import { holeVerfuegbare } from "@/lib/gegenstaende";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { kategorie } = await searchParams;
  // Unbekannte oder mehrfache Werte in der Adresse zählen als „Alle“.
  const aktiv = kategorien.find((k): k is Kategorie => k === kategorie);
  const verfuegbare = await holeVerfuegbare(aktiv);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-8 pb-16 sm:pt-12">
      <h1 className="mb-3 max-w-3xl font-serif text-5xl leading-[1.05] text-wand-text sm:text-7xl">
        Was brauchst du diese Woche?
      </h1>
      <p className="mb-8 max-w-xl text-lg text-wand-text-gedaempft">
        Studierende verleihen hier, was sie gerade nicht brauchen. Zettel antippen und anfragen.
      </p>

      <section id="gegenstaende" aria-labelledby="brett-titel" className="scroll-mt-4">
        <h2 id="brett-titel" className="sr-only">
          Gerade verfügbar
        </h2>
        <KategorieFilter aktiv={aktiv} />
        {verfuegbare.length > 0 ? (
          <>
            <p className="mb-6 text-wand-text-gedaempft">
              {verfuegbare.length === 1
                ? "Gerade hängt 1 Zettel am Brett."
                : `Gerade hängen ${verfuegbare.length} Zettel am Brett.`}
            </p>
            {/* Jede zweite Spalte hängt etwas tiefer, wie Zettel, die nach und nach dazukamen. */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
              {verfuegbare.map((gegenstand, index) => (
                <li key={gegenstand.id} className={versatz(index)}>
                  <GegenstandKarte gegenstand={gegenstand} prioritaet={index === 0} />
                </li>
              ))}
              <li className={versatz(verfuegbare.length)}>
                <AufhaengenZettel />
              </li>
            </ul>
          </>
        ) : (
          <div className="zettel nadel max-w-md -rotate-1 p-5">
            <p className="mb-2 text-lg">
              {aktiv
                ? `In der Kategorie „${aktiv}“ hängt gerade kein Zettel.`
                : "Gerade hängt kein Zettel am Brett. Häng doch den ersten auf."}
            </p>
            <Link
              href={aktiv ? "/#gegenstaende" : "/anbieten"}
              scroll={false}
              className="inline-flex min-h-11 items-center font-medium underline"
            >
              {aktiv ? "Alle Kategorien anzeigen" : "Gegenstand anbieten"}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

/** Versatz nach unten für die mittleren Spalten – je nach Spaltenzahl (2, 3 oder 4). */
function versatz(index: number) {
  const handy = index % 2 === 1 ? "translate-y-6" : "translate-y-0";
  const tablet = index % 3 === 1 ? "sm:translate-y-8" : "sm:translate-y-0";
  const laptop = index % 2 === 1 ? "lg:translate-y-8" : "lg:translate-y-0";
  return `${handy} ${tablet} ${laptop}`;
}

/** Der leere Zettel am Ende des Bretts: führt zum Anbieten. */
function AufhaengenZettel() {
  return (
    <Link
      href="/anbieten"
      className="flex h-full min-h-48 flex-col items-center justify-center gap-2 border-2 border-dashed border-wand-text-gedaempft p-4 text-center text-wand-text hover:border-wand-text"
    >
      <Plus aria-hidden className="size-8" />
      <span className="font-serif text-lg leading-snug">Eigenen Zettel aufhängen</span>
      <span className="text-sm text-wand-text-gedaempft">Gegenstand anbieten</span>
    </Link>
  );
}
