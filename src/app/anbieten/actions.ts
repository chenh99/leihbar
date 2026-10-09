"use server";

import { redirect } from "next/navigation";
import { kategorien } from "@/data/gegenstaende";
import type { FormularZustand } from "@/lib/anbieten";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, name: string) {
  const wert = formData.get(name);
  return typeof wert === "string" ? wert.trim() : "";
}

export async function gegenstandAnbieten(
  _vorher: FormularZustand,
  formData: FormData,
): Promise<FormularZustand> {
  const werte = {
    titel: text(formData, "titel"),
    kategorie: text(formData, "kategorie"),
    beschreibung: text(formData, "beschreibung"),
    ort: text(formData, "ort"),
    preis: text(formData, "preis"),
    besitzer: text(formData, "besitzer"),
  };
  const fehler: FormularZustand["fehler"] = {};

  if (!werte.titel) fehler.titel = "Bitte gib einen Titel ein.";
  else if (werte.titel.length > 100) fehler.titel = "Der Titel darf höchstens 100 Zeichen lang sein.";

  if (!kategorien.some((k) => k === werte.kategorie)) fehler.kategorie = "Bitte wähle eine Kategorie aus.";
  if (!werte.beschreibung) fehler.beschreibung = "Bitte beschreibe den Gegenstand kurz.";
  if (!werte.ort) fehler.ort = "Bitte gib an, wo man den Gegenstand abholen kann.";

  // Komma als Dezimaltrenner ist erlaubt: „2,50“.
  const preis = werte.preis === "" ? NaN : Number(werte.preis.replace(",", "."));
  if (werte.preis === "" || Number.isNaN(preis)) fehler.preis = "Bitte gib den Preis pro Tag als Zahl ein (0 für gratis).";
  else if (preis < 0) fehler.preis = "Der Preis darf nicht negativ sein.";
  else if (preis > 10000) fehler.preis = "Der Preis pro Tag darf höchstens 10.000 € betragen.";

  if (Object.keys(fehler).length > 0) return { fehler, werte };

  const supabase = await createClient();
  const { data: sitzung } = await supabase.auth.getClaims();
  if (!sitzung?.claims) redirect("/anmelden?weiter=%2Fanbieten");

  const { error } = await supabase.from("items").insert({
    owner_id: sitzung.claims.sub,
    titel: werte.titel,
    kategorie: werte.kategorie,
    beschreibung: werte.beschreibung,
    ort: werte.ort,
    preis_pro_tag: Math.round(preis * 100) / 100,
    besitzer: werte.besitzer || "Unbekannt",
  });

  if (error) {
    return {
      fehler: {},
      meldung: "Das Speichern hat leider nicht geklappt. Bitte versuche es gleich noch einmal.",
      werte,
    };
  }

  redirect("/#gegenstaende");
}
