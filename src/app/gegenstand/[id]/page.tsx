import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GegenstandBild from "@/components/GegenstandBild";
import { holeGegenstand } from "@/lib/gegenstaende";
import AnfrageButton from "@/components/AnfrageButton";
import AnfrageZaehler from "@/components/AnfrageZaehler";
import AnfragenListe from "@/components/AnfragenListe";
import { holeAnfrageStand, holeAnfragenZuGegenstand, istBesitzerin } from "@/lib/anfragen";
import { preisText } from "@/lib/format";
import { anfrageBeantworten, anfrageUmschalten } from "./actions";

export async function generateMetadata({
  params,
}: PageProps<"/gegenstand/[id]">): Promise<Metadata> {
  const { id } = await params;
  const gegenstand = await holeGegenstand(id);
  return { title: gegenstand ? gegenstand.titel : "Nicht gefunden" };
}

export default async function GegenstandSeite({ params }: PageProps<"/gegenstand/[id]">) {
  const { id } = await params;
  const gegenstand = await holeGegenstand(id);
  if (!gegenstand) notFound();

  const { anzahl, angefragt } = await holeAnfrageStand(id);
  const eigener = await istBesitzerin(id);
  const anfragen = eigener ? await holeAnfragenZuGegenstand(id) : [];

  const { titel, kategorie, beschreibung, besitzer, ort, preisProTag, verfuegbar, bild } =
    gegenstand;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-4 pb-12 sm:py-12">
      <Link
        href="/#gegenstaende"
        className="mb-4 inline-flex min-h-11 items-center gap-2 font-medium text-wand-text underline sm:mb-8"
      >
        <ArrowLeft aria-hidden className="size-5" />
        Zurück zum Brett
      </Link>

      {/* Zwei Zettel: oben Foto, Titel, Preis und der Abreißstreifen (am Handy ohne Scrollen
          erreichbar), darunter ein zweiter Zettel mit Beschreibung und Angaben. */}
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="zettel nadel -rotate-[0.6deg]">
          <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-2 md:gap-8">
            <div className="mx-auto w-4/5 rotate-1 bg-zettel p-2 pb-4 shadow-[2px_3px_0_color-mix(in_srgb,var(--tinte)_20%,transparent)] md:w-full">
              <GegenstandBild bild={bild} alt={titel} sizes="(min-width: 768px) 420px, 75vw" prioritaet />
            </div>

            <div className="flex flex-col gap-3 md:justify-center">
              <h1 className="font-serif text-3xl leading-tight sm:text-4xl">{titel}</h1>
              <p className="font-serif text-2xl">{preisText(preisProTag)}</p>
              {!verfuegbar && (
                <p className="w-fit border-2 border-tinte px-3 py-1">Dieser Gegenstand ist gerade verliehen.</p>
              )}
              <AnfrageZaehler itemId={id} anzahl={anzahl} />
            </div>
          </div>

          <AnfrageButton itemId={id} angefragt={angefragt === true} aktion={anfrageUmschalten} />
        </div>

        <div className="zettel nadel w-full max-w-2xl rotate-[0.8deg] p-5 pt-7 sm:ml-12">
          <h2 className="mb-3 font-serif text-xl">Beschreibung</h2>
          <p className="mb-4 text-lg leading-relaxed">{beschreibung}</p>
          <dl className="space-y-1 text-tinte-gedaempft">
            <div className="flex gap-1">
              <dt>Kategorie:</dt>
              <dd className="text-tinte">{kategorie}</dd>
            </div>
            <div className="flex gap-1">
              <dt>Ort:</dt>
              <dd className="text-tinte">{ort}</dd>
            </div>
            {besitzer && (
              <div className="flex gap-1">
                <dt>Verleiht:</dt>
                <dd className="text-tinte">{besitzer}</dd>
              </div>
            )}
          </dl>
        </div>
      </article>

      {eigener && <AnfragenListe itemId={id} anfragen={anfragen} aktion={anfrageBeantworten} />}
    </main>
  );
}
