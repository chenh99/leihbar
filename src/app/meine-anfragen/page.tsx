import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Meine Anfragen" };

export default async function MeineAnfragenSeite() {
  // Zusätzlich zur Weiterleitung in proxy.ts: geschützte Seiten prüfen auch selbst.
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/anmelden?weiter=%2Fmeine-anfragen");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="mb-2 text-3xl font-bold">Meine Anfragen</h1>
      <p className="max-w-xl text-lg text-muted">Hier siehst du bald, was du angefragt hast.</p>
    </main>
  );
}
