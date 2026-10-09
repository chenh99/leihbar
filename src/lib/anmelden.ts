// Gemeinsame Typen und Startwerte für das Formular „Anmelden / Registrieren“.
// Liegt bewusst nicht in actions.ts: Dateien mit "use server" dürfen nur Funktionen exportieren.

export type AnmeldeZustand = {
  /** Meldung als ganzer Satz, z. B. bei falschem Passwort. */
  meldung?: string;
  email: string;
};

export const startZustand: AnmeldeZustand = { email: "" };

/** Erlaubt nur Ziele innerhalb der App (kein Weiterleiten auf fremde Seiten). */
export function sichereAdresse(wert: string | null | undefined) {
  return wert && wert.startsWith("/") && !wert.startsWith("//") ? wert : "/";
}
