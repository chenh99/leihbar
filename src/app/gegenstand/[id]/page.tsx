import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GegenstandBild from "@/components/GegenstandBild";
import { holeGegenstand } from "@/lib/gegenstaende";
import { preisText } from "@/lib/format";

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

  const { titel, kategorie, beschreibung, besitzer, ort, preisProTag, verfuegbar, bild } =
    gegenstand;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
      <Link
        href="/#gegenstaende"
        className="mb-6 inline-flex min-h-11 items-center gap-2 font-medium text-foreground underline"
      >
        <ArrowLeft aria-hidden className="size-5" />
        Zurück zur Liste
      </Link>

      <article className="grid gap-6 md:grid-cols-2 md:gap-10">
        <GegenstandBild
          bild={bild}
          alt={titel}
          sizes="(min-width: 768px) 480px, 100vw"
          prioritaet
          className="rounded-2xl border border-border"
        />

        <div className="flex flex-col gap-4">
          <p className="w-fit rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-foreground">
            <span className="sr-only">Kategorie: </span>
            {kategorie}
          </p>
          <h1 className="text-3xl font-bold leading-tight">{titel}</h1>
          <p className="text-xl font-medium">{preisText(preisProTag)}</p>
          {!verfuegbar && (
            <p className="w-fit rounded-xl border border-border px-4 py-2 text-muted">
              Dieser Gegenstand ist gerade verliehen.
            </p>
          )}
          <p className="text-lg">{beschreibung}</p>
          <dl className="space-y-1 text-muted">
            <div className="flex gap-1">
              <dt>Ort:</dt>
              <dd>{ort}</dd>
            </div>
            <div className="flex gap-1">
              <dt>Verleiht:</dt>
              <dd>{besitzer}</dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}
