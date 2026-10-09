// Abfragen für Anfragen aus der Supabase-Tabelle `requests`.

import { createClient } from "@/lib/supabase/server";
import { spalten, zuGegenstand, type ItemZeile } from "@/lib/gegenstaende";
import type { Gegenstand } from "@/data/gegenstaende";

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

  // Die Zahl kommt aus einer Datenbank-Funktion: Sie verrät nur die Anzahl, nicht wer angefragt hat.
  const { data: anzahl, error } = await supabase.rpc("anzahl_anfragen", { p_item_id: itemId });
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

  return { anzahl: anzahl ?? 0, angefragt };
}

export type AnfrageStatus = "offen" | "angenommen" | "abgelehnt";

export type MeineAnfrage = { gegenstand: Gegenstand; status: AnfrageStatus };

/** Die Gegenstände, die die angemeldete Person angefragt hat – die neueste Anfrage zuerst. */
export async function holeMeineAnfragen(): Promise<MeineAnfrage[]> {
  const supabase = await createClient();
  const { data: sitzung } = await supabase.auth.getClaims();
  const userId = sitzung?.claims?.sub;
  if (!userId) return [];

  const { data, error } = await supabase
    .from("requests")
    .select(`created_at, status, items(${spalten})`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Anfragen konnten nicht geladen werden: ${error.message}`);

  return (data as unknown as { status: AnfrageStatus; items: ItemZeile | null }[]).flatMap(
    (zeile) => (zeile.items ? [{ gegenstand: zuGegenstand(zeile.items), status: zeile.status }] : []),
  );
}

export type AnfrageAnMich = {
  id: string;
  email: string;
  status: AnfrageStatus;
};

/** Ob die angemeldete Person den Gegenstand angeboten hat. */
export async function istBesitzerin(itemId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: sitzung } = await supabase.auth.getClaims();
  const userId = sitzung?.claims?.sub;
  if (!userId) return false;

  const { data, error } = await supabase
    .from("items")
    .select("id")
    .eq("id", itemId)
    .eq("owner_id", userId)
    .maybeSingle();
  if (error) throw new Error(`Besitzer*in konnte nicht geprüft werden: ${error.message}`);
  return Boolean(data);
}

/** Alle Anfragen zu einem Gegenstand – nur für die Besitzer*in (die Datenbank erlaubt es sonst nicht). */
export async function holeAnfragenZuGegenstand(itemId: string): Promise<AnfrageAnMich[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("requests")
    .select("id, email, status")
    .eq("item_id", itemId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Anfragen konnten nicht geladen werden: ${error.message}`);
  return data as AnfrageAnMich[];
}

export type OffeneAnfrage = {
  id: string;
  email: string;
  created_at: string;
  items: { id: string; titel: string };
};

/** Alle offenen Anfragen auf Gegenstände der angemeldeten Person – die älteste zuerst. */
export async function holeOffeneAnfragen(): Promise<OffeneAnfrage[]> {
  const supabase = await createClient();
  const { data: sitzung } = await supabase.auth.getClaims();
  const userId = sitzung?.claims?.sub;
  if (!userId) return [];

  const { data, error } = await supabase
    .from("requests")
    .select("id, email, created_at, items!inner(id, titel, owner_id)")
    .eq("status", "offen")
    .eq("items.owner_id", userId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Offene Anfragen konnten nicht geladen werden: ${error.message}`);
  return data as unknown as OffeneAnfrage[];
}
