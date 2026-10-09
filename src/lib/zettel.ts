// Kleine Helfer für den Look „Schwarzes Brett“: Jeder Zettel hängt etwas anders,
// aber bei jedem Laden gleich – deshalb aus der ID berechnet statt zufällig.

function zahlAus(id: string) {
  let summe = 0;
  for (const zeichen of id) summe = (summe * 31 + zeichen.charCodeAt(0)) % 1000;
  return summe;
}

/** Neigung des Zettels in Grad, zwischen −2 und +2. */
export function neigung(id: string): number {
  return (zahlAus(id) % 41) / 10 - 2;
}

/** Etwa jeder dritte Zettel ist mintgrün. */
export function istMint(id: string): boolean {
  return zahlAus(id) % 3 === 0;
}
