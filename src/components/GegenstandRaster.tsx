"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import GegenstandKarte from "@/components/GegenstandKarte";
import type { Gegenstand } from "@/data/gegenstaende";

/** Kurz genug, dass es sich flink anfühlt (Vorgabe: höchstens 0,4 s). */
const uebergang = { duration: 0.3, ease: "easeOut" } as const;

/**
 * Das Brett mit allen Zetteln. Wechselt die Kategorie, blenden wegfallende Zettel aus
 * und die übrigen gleiten an ihren neuen Platz. Beim ersten Laden passiert nichts.
 */
export default function GegenstandRaster({ gegenstaende }: { gegenstaende: Gegenstand[] }) {
  return (
    // Jede zweite Spalte hängt etwas tiefer, wie Zettel, die nach und nach dazukamen.
    <ul className="relative grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
      <AnimatePresence initial={false} mode="popLayout">
        {gegenstaende.map((gegenstand, index) => (
          <motion.li
            key={gegenstand.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={uebergang}
            className={versatz(index)}
          >
            <GegenstandKarte gegenstand={gegenstand} prioritaet={index === 0} />
          </motion.li>
        ))}
      </AnimatePresence>
      <motion.li layout transition={uebergang} className={versatz(gegenstaende.length)}>
        <AufhaengenZettel />
      </motion.li>
    </ul>
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
