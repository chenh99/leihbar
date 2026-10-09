import Image from "next/image";
import { Package } from "lucide-react";

type Props = {
  /** Pfad des Bildes; ohne Angabe erscheint ein neutraler Platzhalter. */
  bild: string | null;
  alt: string;
  sizes: string;
  prioritaet?: boolean;
  className?: string;
};

/** Bild mit festem Seitenverhältnis 4:3 – oder ein Platzhalter für Gegenstände ohne Foto. */
export default function GegenstandBild({ bild, alt, sizes, prioritaet = false, className = "" }: Props) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden bg-accent-soft ${className}`}>
      {bild ? (
        <Image src={bild} alt={alt} fill sizes={sizes} className="object-cover" priority={prioritaet} />
      ) : (
        <div className="flex size-full items-center justify-center text-muted">
          <Package aria-hidden className="size-12" />
          {alt && <span className="sr-only">Kein Bild vorhanden</span>}
        </div>
      )}
    </div>
  );
}
