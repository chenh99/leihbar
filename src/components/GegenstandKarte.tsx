import Image from "next/image";
import { preisText } from "@/lib/format";
import type { Gegenstand } from "@/data/gegenstaende";

type Props = {
  gegenstand: Gegenstand;
  /** Das erste sichtbare Bild lädt vorrangig. */
  prioritaet?: boolean;
};

export default function GegenstandKarte({ gegenstand, prioritaet = false }: Props) {
  const { titel, kategorie, besitzer, ort, preisProTag, bild } = gegenstand;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-accent-soft">
        <Image
          src={bild}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
          priority={prioritaet}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="w-fit rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-foreground">
          <span className="sr-only">Kategorie: </span>
          {kategorie}
        </p>
        <h3 className="text-lg font-semibold leading-snug">{titel}</h3>
        <p className="font-medium">{preisText(preisProTag)}</p>
        <dl className="mt-auto space-y-1 pt-2 text-sm text-muted">
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
  );
}
