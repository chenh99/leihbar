// Gemeinsame Typen und Startwerte für das Formular „Gegenstand anbieten“.
// Liegt bewusst nicht in actions.ts: Dateien mit "use server" dürfen nur Funktionen exportieren.

export type FormularFeld = "titel" | "kategorie" | "beschreibung" | "ort" | "preis";

export type FormularZustand = {
  /** Fehlermeldung zu einzelnen Feldern, als ganzer Satz. */
  fehler: Partial<Record<FormularFeld, string>>;
  /** Allgemeine Meldung, z. B. wenn das Speichern nicht geklappt hat. */
  meldung?: string;
  /** Eingaben, damit nach einem Fehler nichts neu getippt werden muss. */
  werte: Record<FormularFeld | "besitzer", string>;
};

export const startZustand: FormularZustand = {
  fehler: {},
  werte: { titel: "", kategorie: "", beschreibung: "", ort: "", preis: "", besitzer: "" },
};
