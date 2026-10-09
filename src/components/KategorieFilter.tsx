import Link from "next/link";
import { kategorien, type Kategorie } from "@/data/gegenstaende";

type Props = {
  /** Die gerade gewählte Kategorie; ohne Angabe ist „Alle“ aktiv. */
  aktiv?: Kategorie;
};

const basis =
  "inline-flex min-h-11 items-center rounded-full border px-4 font-medium transition";
const inaktiv = "border-border bg-card text-foreground hover:bg-accent-soft";
const aktivKlassen = "border-accent bg-accent text-white";

export default function KategorieFilter({ aktiv }: Props) {
  return (
    <nav aria-label="Nach Kategorie filtern" className="mb-6">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/#gegenstaende"
            scroll={false}
            aria-current={aktiv ? undefined : "true"}
            className={`${basis} ${aktiv ? inaktiv : aktivKlassen}`}
          >
            Alle
          </Link>
        </li>
        {kategorien.map((kategorie) => (
          <li key={kategorie}>
            <Link
              href={`/?kategorie=${encodeURIComponent(kategorie)}#gegenstaende`}
              scroll={false}
              aria-current={aktiv === kategorie ? "true" : undefined}
              className={`${basis} ${aktiv === kategorie ? aktivKlassen : inaktiv}`}
            >
              {kategorie}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
