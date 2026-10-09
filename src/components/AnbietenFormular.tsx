"use client";

import { useActionState } from "react";
import { kategorien } from "@/data/gegenstaende";
import { gegenstandAnbieten } from "@/app/anbieten/actions";
import { startZustand, type FormularFeld } from "@/lib/anbieten";

const feldKlassen =
  "min-h-11 w-full rounded-xl border bg-card px-4 py-2 text-base text-foreground";

export default function AnbietenFormular() {
  const [zustand, formAction, laeuft] = useActionState(gegenstandAnbieten, startZustand);
  const { fehler, werte, meldung } = zustand;

  // Gemeinsame Eigenschaften eines Feldes: Rahmenfarbe, Fehlerverknüpfung für Screenreader.
  const feld = (name: FormularFeld) => ({
    id: name,
    name,
    "aria-invalid": fehler[name] ? true : undefined,
    "aria-describedby": fehler[name] ? `${name}-fehler` : undefined,
  });
  const rahmen = (name: FormularFeld) => (fehler[name] ? "border-danger" : "border-border");
  const fehlerText = (name: FormularFeld) =>
    fehler[name] && (
      <p id={`${name}-fehler`} className="mt-1 text-sm font-medium text-danger">
        {fehler[name]}
      </p>
    );

  return (
    // noValidate: Die Prüfung und die Meldungen kommen von uns, nicht vom Browser.
    // key: React setzt Formulare nach dem Absenden zurück; so werden die Eingaben danach wieder eingetragen.
    <form
      key={JSON.stringify(zustand)}
      action={formAction}
      noValidate
      className="flex max-w-xl flex-col gap-5"
    >
      <div>
        <label htmlFor="titel" className="mb-1 block font-medium">
          Titel
        </label>
        <input {...feld("titel")} type="text" defaultValue={werte.titel} className={`${feldKlassen} ${rahmen("titel")}`} />
        {fehlerText("titel")}
      </div>

      <div>
        <label htmlFor="kategorie" className="mb-1 block font-medium">
          Kategorie
        </label>
        <select {...feld("kategorie")} defaultValue={werte.kategorie} className={`${feldKlassen} ${rahmen("kategorie")}`}>
          <option value="">Bitte wählen</option>
          {kategorien.map((kategorie) => (
            <option key={kategorie} value={kategorie}>
              {kategorie}
            </option>
          ))}
        </select>
        {fehlerText("kategorie")}
      </div>

      <div>
        <label htmlFor="beschreibung" className="mb-1 block font-medium">
          Beschreibung
        </label>
        <textarea
          {...feld("beschreibung")}
          rows={4}
          defaultValue={werte.beschreibung}
          className={`${feldKlassen} ${rahmen("beschreibung")}`}
        />
        {fehlerText("beschreibung")}
      </div>

      <div>
        <label htmlFor="ort" className="mb-1 block font-medium">
          Ort
        </label>
        <input {...feld("ort")} type="text" defaultValue={werte.ort} className={`${feldKlassen} ${rahmen("ort")}`} />
        {fehlerText("ort")}
      </div>

      <div>
        <label htmlFor="preis" className="mb-1 block font-medium">
          Preis pro Tag in Euro
        </label>
        <input
          {...feld("preis")}
          type="text"
          inputMode="decimal"
          defaultValue={werte.preis}
          className={`${feldKlassen} ${rahmen("preis")}`}
        />
        <p className="mt-1 text-sm text-muted">Gib 0 ein, wenn du den Gegenstand gratis verleihst.</p>
        {fehlerText("preis")}
      </div>

      <div>
        <label htmlFor="besitzer" className="mb-1 block font-medium">
          Dein Name (optional)
        </label>
        <input id="besitzer" name="besitzer" type="text" defaultValue={werte.besitzer} className={`${feldKlassen} border-border`} />
      </div>

      {meldung && (
        <p role="alert" className="font-medium text-danger">
          {meldung}
        </p>
      )}

      <button
        type="submit"
        disabled={laeuft}
        className="min-h-11 w-full rounded-xl bg-accent px-5 font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 sm:w-fit"
      >
        {laeuft ? "Wird gespeichert …" : "Gegenstand anbieten"}
      </button>
    </form>
  );
}
