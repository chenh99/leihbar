"use client";

import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, Scissors } from "lucide-react";

function Knopf({ angefragt }: { angefragt: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-pressed={angefragt}
      className={`abreissstreifen flex min-h-16 w-full items-center justify-center gap-3 px-5 py-3 disabled:opacity-60 ${
        angefragt ? "bg-tinte/5" : "bg-zettel-mint"
      }`}
    >
      {angefragt ? <Check aria-hidden className="size-5" /> : <Scissors aria-hidden className="size-5" />}
      <span className="flex flex-col items-start text-left">
        <span className="font-serif text-lg leading-tight">
          {angefragt ? "Angefragt" : "Ausleihen anfragen"}
        </span>
        {angefragt && <span className="text-sm text-tinte-gedaempft">Antippen, um zurückzuziehen</span>}
      </span>
    </button>
  );
}

/**
 * Der Abreißstreifen unten am Zettel. Beim Anfragen reißt er ab und fällt weg –
 * das ist der eine Bewegungsmoment der App.
 */
export default function AnfrageButton({
  itemId,
  angefragt,
  aktion,
}: {
  itemId: string;
  angefragt: boolean;
  aktion: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={aktion} className="relative">
      <input type="hidden" name="itemId" value={itemId} />
      {/* initial={false}: Beim Laden der Seite bewegt sich nichts, nur beim Wechsel. */}
      <AnimatePresence mode="popLayout" initial={false}>
        {angefragt ? (
          <motion.div
            key="angefragt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Knopf angefragt />
          </motion.div>
        ) : (
          <motion.div
            key="offen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: 140, rotate: 8, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "left top" }}
          >
            <Knopf angefragt={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
