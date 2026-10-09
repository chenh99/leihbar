import Link from "next/link";
import { Hand, Recycle, Search } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import GegenstandKarte from "@/components/GegenstandKarte";
import KategorieFilter from "@/components/KategorieFilter";
import { gegenstaende, kategorien, type Kategorie } from "@/data/gegenstaende";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { kategorie } = await searchParams;
  // Unbekannte oder mehrfache Werte in der Adresse zählen als „Alle“.
  const aktiv = kategorien.find((k): k is Kategorie => k === kategorie);
  const verfuegbare = gegenstaende.filter(
    (gegenstand) => gegenstand.verfuegbar && (!aktiv || gegenstand.kategorie === aktiv),
  );

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:block">
      <section className="mb-14">
        <p className="mb-3 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-foreground">
          NDU · Wintersemester 2026
        </p>
        <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Leihen statt kaufen.
        </h1>
        <p className="mb-8 max-w-xl text-lg text-muted">
          Abendkleid für den Ball, Akkuschrauber fürs WG-Regal, Zelt fürs
          Festival – am Campus hat es schon jemand. Anbieten, finden, anfragen.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#gegenstaende"
            className="rounded-xl bg-accent px-5 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Gegenstände ansehen
          </a>
          <span className="rounded-xl border border-border px-5 py-3 text-muted">
            Anbieten – kommt an Tag 2
          </span>
        </div>
      </section>

      <section aria-label="Was Leihbar kann" className="order-last mb-14 grid gap-4 sm:order-none sm:grid-cols-3">
        <FeatureCard
          icon={Search}
          titel="Alles an einem Ort"
          text="Was andere am Campus verleihen – von Mode über Möbel bis Technik, ohne Herumfragen in Chats."
        />
        <FeatureCard
          icon={Hand}
          titel="Mit einem Klick anfragen"
          text="Besitzer*innen sehen sofort, wer etwas ausleihen möchte. Kein Hin und Her mehr."
        />
        <FeatureCard
          icon={Recycle}
          titel="Leihen statt kaufen"
          text="Für einmal kaufen lohnt sich selten. Leihen spart Geld und Platz in der WG."
        />
      </section>

      <section id="gegenstaende" className="scroll-mt-4">
        <h2 className="mb-4 text-2xl font-semibold">Gerade verfügbar</h2>
        <KategorieFilter aktiv={aktiv} />
        {verfuegbare.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verfuegbare.map((gegenstand, index) => (
              <li key={gegenstand.id}>
                <GegenstandKarte gegenstand={gegenstand} prioritaet={index === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">
            {aktiv
              ? `In der Kategorie „${aktiv}“ ist gerade nichts verfügbar. `
              : "Gerade ist nichts verfügbar. Schau bald wieder vorbei. "}
            {aktiv && (
              <Link
                href="/#gegenstaende"
                scroll={false}
                className="inline-flex min-h-11 items-center font-medium text-foreground underline"
              >
                Alle Kategorien anzeigen
              </Link>
            )}
          </p>
        )}
      </section>
    </main>
  );
}
