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
    // Die Datenbank schickt bei jeder neuen oder zurückgezogenen Anfrage ein Signal
    // (nur mit der Gegenstands-ID); die Zahl holen wir dann über die Zähl-Funktion.
    async function neuZaehlen() {
      const { data } = await supabase.rpc("anzahl_anfragen", { p_item_id: itemId });
      if (typeof data === "number") setAnzahl(data);
    }

    const kanal = supabase
      .channel(`anfragen-${itemId}`)
      .on("broadcast", { event: "geaendert" }, neuZaehlen)
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
