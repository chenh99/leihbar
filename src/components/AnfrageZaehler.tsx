"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/** Zeigt, wie viele Personen den Gegenstand angefragt haben, und aktualisiert sich live. */
export default function AnfrageZaehler({
  itemId,
  anzahl: startwert,
}: {
  itemId: string;
  anzahl: number;
}) {
  const [anzahl, setAnzahl] = useState(startwert);
  const [letzterStartwert, setLetzterStartwert] = useState(startwert);

  // Nach dem eigenen Anfragen oder Zurückziehen liefert der Server einen neuen Startwert.
  if (startwert !== letzterStartwert) {
    setLetzterStartwert(startwert);
    setAnzahl(startwert);
  }

  useEffect(() => {
    const supabase = createClient();

    // Immer neu zählen statt hoch- oder runterzählen: So wird nichts doppelt gezählt.
    // Beim Zurückziehen nennt die Datenbank nur die Anfrage-ID, nicht den Gegenstand,
    // darum hören wir auf alle Änderungen und zählen für diesen Gegenstand neu.
    async function neuZaehlen() {
      const { count } = await supabase
        .from("requests")
        .select("id", { count: "exact", head: true })
        .eq("item_id", itemId);
      if (count !== null) setAnzahl(count);
    }

    const kanal = supabase
      .channel(`anfragen-${itemId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "requests" }, neuZaehlen)
      .subscribe();

    return () => {
      supabase.removeChannel(kanal);
    };
  }, [itemId]);

  return (
    <p className="text-muted">
      Anfragen: <span className="font-medium text-foreground">{anzahl}</span>
    </p>
  );
}
