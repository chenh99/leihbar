import type { AnfrageStatus as Status } from "@/lib/anfragen";

const farben: Record<Status, string> = {
  offen: "border-tinte text-tinte",
  angenommen: "border-zusage text-zusage",
  abgelehnt: "border-gefahr text-gefahr",
};

/** Der Stand einer Anfrage als Stempel: schräg, mit Rahmen in der Farbe des Status. */
export default function AnfrageStatus({ status }: { status: Status }) {
  return (
    <p className={`w-fit -rotate-6 border-2 bg-zettel px-2 py-0.5 font-serif text-base ${farben[status]}`}>
      <span className="sr-only">Status: </span>
      {status}
    </p>
  );
}
