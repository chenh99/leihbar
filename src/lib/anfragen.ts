// Abfragen für Anfragen aus der Supabase-Tabelle `requests`.

import { createClient } from "@/lib/supabase/server";

export type AnfrageStand = {
  /** Wie viele Personen den Gegenstand angefragt haben. */
  anzahl: number;
  /** Ob die angemeldete Person ihn angefragt hat; `undefined`, wenn niemand angemeldet ist. */
  angefragt: boolean | undefined;
};

export async function holeAnfrageStand(itemId: string): Promise<AnfrageStand> {
  const supabase = await createClient();
  const { data: sitzung } = await supabase.auth.getClaims();
  const userId = sitzung?.claims?.sub;

  const { count, error } = await supabase
    .from("requests")
    .select("id", { count: "exact", head: true })
    .eq("item_id", itemId);
  if (error) throw new Error(`Anfragen konnten nicht gezählt werden: ${error.message}`);

  let angefragt: boolean | undefined;
  if (userId) {
    const { data, error: eigeneFehler } = await supabase
      .from("requests")
      .select("id")
      .eq("item_id", itemId)
      .eq("user_id", userId)
      .maybeSingle();
    if (eigeneFehler) throw new Error(`Anfrage konnte nicht geprüft werden: ${eigeneFehler.message}`);
    angefragt = Boolean(data);
  }

  return { anzahl: count ?? 0, angefragt };
}
