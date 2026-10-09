import type { Metadata } from "next";
import AnmeldeFormular from "@/components/AnmeldeFormular";
import { sichereAdresse } from "@/lib/anmelden";

export const metadata: Metadata = { title: "Anmelden" };

export default async function AnmeldenSeite({ searchParams }: PageProps<"/anmelden">) {
  const { weiter } = await searchParams;
  const ziel = sichereAdresse(typeof weiter === "string" ? weiter : undefined);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-3xl font-bold">Anmelden</h1>
      <p className="mb-8 max-w-xl text-lg text-muted">
        Melde dich mit E-Mail und Passwort an, um Gegenstände anzubieten und anzufragen.
      </p>
      <AnmeldeFormular weiter={ziel} />
    </main>
  );
}
