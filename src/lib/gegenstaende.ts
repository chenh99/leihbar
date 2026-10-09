// Abfragen für Gegenstände aus der Supabase-Tabelle `items`.

import { createClient } from "@/lib/supabase/server";
import type { Gegenstand, Kategorie } from "@/data/gegenstaende";

export type ItemZeile = {
  id: string;
  titel: string;
  kategorie: Kategorie;
  beschreibung: string;
  besitzer: string;
  ort: string;
  preis_pro_tag: number | string;
  verfuegbar: boolean;
  bild_url: string | null;
};

export const spalten =
  "id, titel, kategorie, beschreibung, besitzer, ort, preis_pro_tag, verfuegbar, bild_url";

export function zuGegenstand(zeile: ItemZeile): Gegenstand {
  return {
    id: zeile.id,
    titel: zeile.titel,
    kategorie: zeile.kategorie,
    beschreibung: zeile.beschreibung,
    besitzer: zeile.besitzer,
    ort: zeile.ort,
    preisProTag: Number(zeile.preis_pro_tag),
    verfuegbar: zeile.verfuegbar,
    bild: zeile.bild_url,
  };
}

/** Alle gerade ausleihbaren Gegenstände, älteste zuerst; optional nur eine Kategorie. */
export async function holeVerfuegbare(kategorie?: Kategorie): Promise<Gegenstand[]> {
  const supabase = await createClient();
  let abfrage = supabase.from("items").select(spalten).eq("verfuegbar", true);
  if (kategorie) abfrage = abfrage.eq("kategorie", kategorie);
  const { data, error } = await abfrage.order("created_at", { ascending: true });
  if (error) throw new Error(`Gegenstände konnten nicht geladen werden: ${error.message}`);
  return (data as ItemZeile[]).map(zuGegenstand);
}

const uuidMuster = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Ein Gegenstand über seine Adresse; `undefined`, wenn es ihn nicht gibt. */
export async function holeGegenstand(id: string): Promise<Gegenstand | undefined> {
  // Eine erfundene Adresse ist keine gültige ID – die Datenbank würde sonst einen Fehler melden.
  if (!uuidMuster.test(id)) return undefined;
  const supabase = await createClient();
  const { data, error } = await supabase.from("items").select(spalten).eq("id", id).maybeSingle();
  if (error) throw new Error(`Gegenstand konnte nicht geladen werden: ${error.message}`);
  return data ? zuGegenstand(data as ItemZeile) : undefined;
}
