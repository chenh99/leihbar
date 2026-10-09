import Link from "next/link";
import GegenstandBild from "@/components/GegenstandBild";
import { preisText } from "@/lib/format";
import { istMint, neigung } from "@/lib/zettel";
import type { Gegenstand } from "@/data/gegenstaende";

type Props = {
  gegenstand: Gegenstand;
  /** Das erste sichtbare Bild lädt vorrangig. */
  prioritaet?: boolean;
  /** Optional ein Stempel auf dem Foto, z. B. der Status einer Anfrage. */
  stempel?: React.ReactNode;
};

/** Ein Gegenstand als Zettel am Brett: Foto, Titel, unten der Abreißstreifen mit Preis und Ort. */
export default function GegenstandKarte({ gegenstand, prioritaet = false, stempel }: Props) {
  const { id, titel, besitzer, ort, preisProTag, bild } = gegenstand;

  return (
    <article
      className={`zettel nadel flex h-full flex-col ${istMint(id) ? "zettel-mint" : ""}`}
      style={{ rotate: `${neigung(id)}deg` }}
    >
      <div className="relative p-2 pb-0">
        <GegenstandBild
          bild={bild}
          alt=""
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 30vw, 45vw"
          prioritaet={prioritaet}
        />
        {stempel && <div className="absolute bottom-2 left-4">{stempel}</div>}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3 pt-2 pb-3">
        <h3 className="font-serif text-base leading-snug sm:text-lg">
          {/* Der Link deckt den ganzen Zettel ab (after:absolute), so ist er überall antippbar. */}
          <Link href={`/gegenstand/${id}`} className="after:absolute after:inset-0">
            {titel}
          </Link>
        </h3>
        {besitzer && (
          <p className="text-sm text-tinte-gedaempft">
            <span className="sr-only">Verleiht: </span>
            <span aria-hidden>von </span>
            {besitzer}
          </p>
        )}
      </div>
      <dl className="abreissstreifen mt-auto px-3 py-2">
        <div>
          <dt className="sr-only">Preis:</dt>
          <dd className="font-serif text-base">{preisText(preisProTag)}</dd>
        </div>
        <div>
          <dt className="sr-only">Ort:</dt>
          <dd className="truncate text-sm text-tinte-gedaempft">{ort}</dd>
        </div>
      </dl>
    </article>
  );
}
