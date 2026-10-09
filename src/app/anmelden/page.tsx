import type { Metadata } from "next";
import AnmeldeFormular from "@/components/AnmeldeFormular";
import { sichereAdresse } from "@/lib/anmelden";

export const metadata: Metadata = { title: "Anmelden" };

export default async function AnmeldenSeite({ searchParams }: PageProps<"/anmelden">) {
  const { weiter } = await searchParams;
  const ziel = sichereAdresse(typeof weiter === "string" ? weiter : undefined);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="mb-3 font-serif text-4xl text-wand-text sm:text-5xl">Anmelden</h1>
      <p className="mb-10 max-w-xl text-lg text-wand-text-gedaempft">
        Melde dich mit E-Mail und Passwort an, um Gegenstände anzubieten und anzufragen.
      </p>
      <AnmeldeFormular weiter={ziel} />
    </main>
  );
}
