"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Fragt den Gegenstand an – oder zieht die Anfrage zurück, wenn sie schon besteht. */
export async function anfrageUmschalten(formData: FormData) {
  const itemId = formData.get("itemId");
  if (typeof itemId !== "string") return;

  const supabase = await createClient();
  const { data: sitzung } = await supabase.auth.getClaims();
  const userId = sitzung?.claims?.sub;
  if (!userId) redirect(`/anmelden?weiter=${encodeURIComponent(`/gegenstand/${itemId}`)}`);

  const { data: vorhanden } = await supabase
    .from("requests")
    .select("id")
    .eq("item_id", itemId)
    .eq("user_id", userId)
    .maybeSingle();

  if (vorhanden) {
    await supabase.from("requests").delete().eq("id", vorhanden.id);
  } else {
    await supabase.from("requests").insert({ item_id: itemId, user_id: userId });
  }

  revalidatePath(`/gegenstand/${itemId}`);
}

/** Die Besitzer*in nimmt eine Anfrage an oder lehnt sie ab. Die Datenbank prüft, dass der Gegenstand ihr gehört. */
export async function anfrageBeantworten(formData: FormData) {
  const anfrageId = formData.get("anfrageId");
  const itemId = formData.get("itemId");
  const status = formData.get("status");
  if (typeof anfrageId !== "string" || typeof itemId !== "string") return;
  if (status !== "angenommen" && status !== "abgelehnt") return;

  const supabase = await createClient();
  const { data: sitzung } = await supabase.auth.getClaims();
  if (!sitzung?.claims) redirect(`/anmelden?weiter=${encodeURIComponent(`/gegenstand/${itemId}`)}`);

  await supabase.from("requests").update({ status }).eq("id", anfrageId);

  revalidatePath(`/gegenstand/${itemId}`);
  revalidatePath("/meine-anfragen");
}
