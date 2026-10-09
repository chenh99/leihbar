"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox } from "lucide-react";
import { usePathname } from "next/navigation";
import { navKlassen } from "@/components/NavLink";
import { createClient } from "@/lib/supabase/client";

/** Symbol im Header mit der Zahl offener Anfragen auf meine Gegenstände; aktualisiert sich live. */
export default function AnfrageHinweis({
  userId,
  anzahl: startwert,
}: {
  userId: string;
  anzahl: number;
}) {
  const aktiv = usePathname() === "/anfragen-an-mich";
  const [anzahl, setAnzahl] = useState(startwert);
  const [letzterStartwert, setLetzterStartwert] = useState(startwert);

  // Lädt der Server nach einem Seitenwechsel eine neue Zahl, übernehmen wir sie.
  if (startwert !== letzterStartwert) {
    setLetzterStartwert(startwert);
    setAnzahl(startwert);
  }

  useEffect(() => {
    const supabase = createClient();

    // Immer neu zählen statt hoch- oder runterzählen: So wird nichts doppelt gezählt.
    // Die Datenbank meldet nur Änderungen, die diese Person lesen darf.
    async function neuZaehlen() {
      const { count } = await supabase
        .from("requests")
        .select("id, items!inner(owner_id)", { count: "exact", head: true })
        .eq("status", "offen")
        .eq("items.owner_id", userId);
      if (count !== null) setAnzahl(count);
    }

    const kanal = supabase
      .channel(`offene-anfragen-${userId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "requests" }, neuZaehlen)
      .subscribe();

    return () => {
      supabase.removeChannel(kanal);
    };
  }, [userId]);

  return (
    <Link
      href="/anfragen-an-mich"
      aria-label={anzahl > 0 ? `Anfragen an mich, ${anzahl} offen` : "Anfragen an mich"}
      aria-current={aktiv ? "page" : undefined}
      className={`relative ${navKlassen(aktiv)}`}
    >
      <Inbox aria-hidden className="size-5" />
      {anzahl > 0 && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zettel-mint px-1 text-xs font-semibold text-tinte"
        >
          {anzahl}
        </span>
      )}
    </Link>
  );
}
