"use client";

import { useActionState, useState } from "react";
import { anmelden, registrieren } from "@/app/anmelden/actions";
import { startZustand } from "@/lib/anmelden";

const feldKlassen =
  "min-h-11 w-full border-2 border-tinte/60 bg-zettel px-4 py-2 text-base text-tinte";

export default function AnmeldeFormular({ weiter }: { weiter: string }) {
  const [neu, setNeu] = useState(false);
  const [anmeldeZustand, anmeldeAktion, anmeldeLaeuft] = useActionState(anmelden, startZustand);
  const [registrierZustand, registrierAktion, registrierLaeuft] = useActionState(registrieren, startZustand);

  const zustand = neu ? registrierZustand : anmeldeZustand;
  const laeuft = neu ? registrierLaeuft : anmeldeLaeuft;

  return (
    <div className="zettel nadel max-w-xl rotate-[0.4deg] p-5 pt-7 sm:p-8">
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
          {neu && <p className="mt-1 text-sm text-tinte-gedaempft">Mindestens 8 Zeichen.</p>}
        </div>

        {zustand.meldung && (
          <p role="alert" className="font-medium text-gefahr">
            {zustand.meldung}
          </p>
        )}

        <button
          type="submit"
          disabled={laeuft}
          className="min-h-11 w-full bg-tinte px-5 font-semibold text-zettel disabled:opacity-60 sm:w-fit"
        >
          {laeuft ? "Einen Moment …" : neu ? "Registrieren" : "Anmelden"}
        </button>
      </form>

      <p className="mt-6 text-tinte-gedaempft">
        {neu ? "Du hast schon ein Konto?" : "Noch kein Konto?"}{" "}
        <button
          type="button"
          onClick={() => setNeu(!neu)}
          className="inline-flex min-h-11 items-center font-medium text-tinte underline"
        >
          {neu ? "Zur Anmeldung" : "Jetzt registrieren"}
        </button>
      </p>
    </div>
  );
}
