"use client";

import { useActionState, useState } from "react";
import { anmelden, registrieren } from "@/app/anmelden/actions";
import { startZustand } from "@/lib/anmelden";

const feldKlassen =
  "min-h-11 w-full rounded-xl border border-border bg-card px-4 py-2 text-base text-foreground";

export default function AnmeldeFormular({ weiter }: { weiter: string }) {
  const [neu, setNeu] = useState(false);
  const [anmeldeZustand, anmeldeAktion, anmeldeLaeuft] = useActionState(anmelden, startZustand);
  const [registrierZustand, registrierAktion, registrierLaeuft] = useActionState(registrieren, startZustand);

  const zustand = neu ? registrierZustand : anmeldeZustand;
  const laeuft = neu ? registrierLaeuft : anmeldeLaeuft;

  return (
    <div className="max-w-xl">
      {/* key: erzeugt das Formular beim Wechsel neu, damit Meldung und E-Mail zur Ansicht passen. */}
      <form key={neu ? "neu" : "alt"} action={neu ? registrierAktion : anmeldeAktion} noValidate className="flex flex-col gap-5">
        <input type="hidden" name="weiter" value={weiter} />
        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={zustand.email}
            className={feldKlassen}
          />
        </div>
        <div>
          <label htmlFor="passwort" className="mb-1 block font-medium">
            Passwort
          </label>
          <input
            id="passwort"
            name="passwort"
            type="password"
            autoComplete={neu ? "new-password" : "current-password"}
            className={feldKlassen}
          />
          {neu && <p className="mt-1 text-sm text-muted">Mindestens 8 Zeichen.</p>}
        </div>

        {zustand.meldung && (
          <p role="alert" className="font-medium text-danger">
            {zustand.meldung}
          </p>
        )}

        <button
          type="submit"
          disabled={laeuft}
          className="min-h-11 w-full rounded-xl bg-accent px-5 font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 sm:w-fit"
        >
          {laeuft ? "Einen Moment …" : neu ? "Registrieren" : "Anmelden"}
        </button>
      </form>

      <p className="mt-6 text-muted">
        {neu ? "Du hast schon ein Konto?" : "Noch kein Konto?"}{" "}
        <button
          type="button"
          onClick={() => setNeu(!neu)}
          className="inline-flex min-h-11 items-center font-medium text-foreground underline"
        >
          {neu ? "Zur Anmeldung" : "Jetzt registrieren"}
        </button>
      </p>
    </div>
  );
}
