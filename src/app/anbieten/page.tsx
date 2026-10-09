import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnbietenFormular from "@/components/AnbietenFormular";

export const metadata: Metadata = { title: "Gegenstand anbieten" };

export default function AnbietenSeite() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
      <Link
        href="/#gegenstaende"
        className="mb-6 inline-flex min-h-11 items-center gap-2 font-medium text-foreground underline"
      >
        <ArrowLeft aria-hidden className="size-5" />
        Zurück zur Liste
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Gegenstand anbieten</h1>
      <p className="mb-8 max-w-xl text-lg text-muted">
        Was möchtest du verleihen? Dein Angebot erscheint danach sofort in der Liste.
      </p>
      <AnbietenFormular />
    </main>
  );
}
