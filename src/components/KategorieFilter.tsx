import Link from "next/link";
import { LayoutGrid, Laptop, Shirt, Sofa, Tent, type LucideIcon } from "lucide-react";
import { kategorien, type Kategorie } from "@/data/gegenstaende";

type Props = {
  /** Die gerade gewählte Kategorie; ohne Angabe ist „Alle“ aktiv. */
  aktiv?: Kategorie;
};

// Jede Kategorie hat ihr eigenes Icon (rein dekorativ, der Name steht daneben).
const icons: Record<Kategorie, LucideIcon> = {
  Mode: Shirt,
  "Wohnen & Deko": Sofa,
  Technik: Laptop,
  Freizeit: Tent,
};

// Die Kategorien sind kleine Reiter-Zettel: der gewählte ist mintgrün und hängt etwas schief.
const basis = "inline-flex min-h-11 items-center gap-2 px-4 font-medium transition";
const inaktiv = "border border-wand-linie text-wand-text hover:border-wand-text";
const aktivKlassen = "zettel zettel-mint -rotate-2";

function Reiter({
  href,
  aktiv,
  icon: Icon,
  children,
}: {
  href: string;
  aktiv: boolean;
  icon: LucideIcon;
  children: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={aktiv ? "true" : undefined}
      className={`${basis} ${aktiv ? aktivKlassen : inaktiv}`}
    >
      <Icon aria-hidden className="size-4.5 shrink-0" />
      {children}
    </Link>
  );
}

export default function KategorieFilter({ aktiv }: Props) {
  return (
    <nav aria-label="Nach Kategorie filtern" className="mb-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Reiter href="/#gegenstaende" aktiv={!aktiv} icon={LayoutGrid}>
            Alle
          </Reiter>
        </li>
        {kategorien.map((kategorie) => (
          <li key={kategorie}>
            <Reiter
              href={`/?kategorie=${encodeURIComponent(kategorie)}#gegenstaende`}
              aktiv={aktiv === kategorie}
              icon={icons[kategorie]}
            >
              {kategorie}
            </Reiter>
          </li>
        ))}
      </ul>
    </nav>
  );
}
