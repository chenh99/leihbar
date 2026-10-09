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
        className="mb-6 inline-flex min-h-11 items-center gap-2 font-medium text-wand-text underline"
      >
        <ArrowLeft aria-hidden className="size-5" />
        Zurück zum Brett
      </Link>
      <h1 className="mb-3 font-serif text-4xl text-wand-text sm:text-5xl">Gegenstand anbieten</h1>
      <p className="mb-10 max-w-xl text-lg text-wand-text-gedaempft">
        Was möchtest du verleihen? Dein Zettel hängt danach sofort am Brett.
      </p>
      <AnbietenFormular />
    </main>
  );
}
