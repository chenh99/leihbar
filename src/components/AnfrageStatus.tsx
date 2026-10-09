import type { AnfrageStatus as Status } from "@/lib/anfragen";

const texte: Record<Status, string> = {
  offen: "offen",
  angenommen: "angenommen",
  abgelehnt: "abgelehnt",
};

const farben: Record<Status, string> = {
  offen: "border border-border bg-background text-foreground",
  angenommen: "bg-foreground text-background",
  abgelehnt: "border border-danger text-danger",
};

/** Kleines Etikett mit dem Stand einer Anfrage. */
export default function AnfrageStatus({ status }: { status: Status }) {
  return (
    <p className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${farben[status]}`}>
      <span className="sr-only">Status: </span>
      {texte[status]}
    </p>
  );
}
