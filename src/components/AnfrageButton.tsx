"use client";

import { useFormStatus } from "react-dom";
import { Check, Send } from "lucide-react";

function Knopf({ angefragt }: { angefragt: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-pressed={angefragt}
      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-2 font-semibold disabled:opacity-60 sm:w-fit ${
        angefragt
          ? "border border-border bg-background text-foreground"
          : "bg-accent text-white"
      }`}
    >
      {angefragt ? <Check aria-hidden className="size-5" /> : <Send aria-hidden className="size-5" />}
      {angefragt ? "Angefragt ✓" : "Ausleihen anfragen"}
    </button>
  );
}

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
    <form action={aktion}>
      <input type="hidden" name="itemId" value={itemId} />
      <Knopf angefragt={angefragt} />
    </form>
  );
}
