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
    <section className="mt-10 border-t border-border pt-6">
      <h2 className="mb-4 text-xl font-semibold">Anfragen zu deinem Gegenstand</h2>
      {anfragen.length === 0 ? (
        <p className="text-muted">Noch hat niemand diesen Gegenstand angefragt.</p>
      ) : (
        <ul className="space-y-3">
          {anfragen.map((anfrage) => (
            <li
              key={anfrage.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 flex-col gap-2">
                <p className="break-all">
                  <span className="text-muted">Angefragt von: </span>
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
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 font-semibold text-white disabled:opacity-50 sm:flex-none"
                >
                  <Check aria-hidden className="size-5" />
                  Annehmen
                </button>
                <button
                  type="submit"
                  name="status"
                  value="abgelehnt"
                  disabled={anfrage.status === "abgelehnt"}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 font-semibold text-foreground disabled:opacity-50 sm:flex-none"
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
