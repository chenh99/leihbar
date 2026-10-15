"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
// Der mintgrüne Zettel ist ein eigenes Element hinter dem Text und gleitet beim Wechsel zum neuen Reiter.
const basis = "relative inline-flex min-h-11 items-center gap-2 px-4 font-medium transition";
const inaktiv = "border border-wand-linie text-wand-text hover:border-wand-text";
const aktivKlassen = "border border-transparent";

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
      {aktiv && (
        <motion.span
          layoutId="aktiver-reiter"
          aria-hidden
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="zettel zettel-mint pointer-events-none absolute inset-0 -rotate-2"
        />
      )}
      <Icon aria-hidden className="relative size-4.5 shrink-0" />
      <span className="relative">{children}</span>
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
