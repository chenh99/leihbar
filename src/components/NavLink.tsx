"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Pfad, unter dem ein Menüpunkt als „aktiv“ gilt (ohne #Sprungmarke). */
function istAktiv(href: string, pfad: string) {
  const ziel = href.split("#")[0] || "/";
  return ziel === "/" ? pfad === "/" : pfad === ziel || pfad.startsWith(`${ziel}/`);
}

/** Klassen für Menüpunkte in der Leiste: Die aktive Seite hängt als kleiner weißer Zettel darin. */
export function navKlassen(aktiv: boolean) {
  return `flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-2 transition ${
    aktiv ? "zettel rotate-1 text-tinte" : "text-wand-text-gedaempft hover:text-wand-text"
  }`;
}

/** Menüpunkt mit Icon. Am Handy ist nur das Icon zu sehen, der Text bleibt für Bildschirmleser. */
export default function NavLink({
  href,
  icon,
  children,
  textAmHandy = false,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  textAmHandy?: boolean;
}) {
  const aktiv = istAktiv(href, usePathname());
  return (
    <Link href={href} aria-current={aktiv ? "page" : undefined} className={navKlassen(aktiv)}>
      {icon}
      <span className={textAmHandy ? "" : "sr-only sm:not-sr-only"}>{children}</span>
    </Link>
  );
}
