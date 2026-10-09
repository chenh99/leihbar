import { Check, X } from "lucide-react";
import AnfrageStatus from "@/components/AnfrageStatus";
import type { AnfrageAnMich } from "@/lib/anfragen";

/** Anfragen zu einem eigenen Gegenstand – mit „Annehmen“ und „Ablehnen“. */
export default function AnfragenListe({
  itemId,
  anfragen,
  aktion,
}: {
  itemId: string;
  anfragen: AnfrageAnMich[];
  aktion: (formData: FormData) => Promise<void>;
}) {
  return (
    <section className="mx-auto mt-14 max-w-4xl">
      <h2 className="mb-6 font-serif text-2xl text-wand-text">Anfragen zu deinem Gegenstand</h2>
      {anfragen.length === 0 ? (
        <p className="text-wand-text-gedaempft">Noch hat niemand diesen Gegenstand angefragt.</p>
      ) : (
        <ul className="space-y-5">
          {anfragen.map((anfrage, index) => (
            <li
              key={anfrage.id}
              className={`zettel nadel flex flex-col gap-4 p-4 pt-5 sm:flex-row sm:items-center sm:justify-between ${
                index % 2 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"
              }`}
            >
              <div className="flex min-w-0 flex-col gap-3">
                <p className="break-all">
                  <span className="text-tinte-gedaempft">Angefragt von: </span>
                  {anfrage.email}
                </p>
                <AnfrageStatus status={anfrage.status} />
              </div>
              <form action={aktion} className="flex gap-2">
                <input type="hidden" name="anfrageId" value={anfrage.id} />
                <input type="hidden" name="itemId" value={itemId} />
                <button
                  type="submit"
                  name="status"
                  value="angenommen"
                  disabled={anfrage.status === "angenommen"}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-tinte px-4 py-2 font-semibold text-zettel disabled:opacity-40 sm:flex-none"
                >
                  <Check aria-hidden className="size-5" />
                  Annehmen
                </button>
                <button
                  type="submit"
                  name="status"
                  value="abgelehnt"
                  disabled={anfrage.status === "abgelehnt"}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border-2 border-tinte px-4 py-2 font-semibold disabled:opacity-40 sm:flex-none"
                >
                  <X aria-hidden className="size-5" />
                  Ablehnen
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
