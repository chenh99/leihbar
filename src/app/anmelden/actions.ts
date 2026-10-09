"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sichereAdresse, type AnmeldeZustand } from "@/lib/anmelden";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, name: string) {
  const wert = formData.get(name);
  return typeof wert === "string" ? wert.trim() : "";
}

export async function anmelden(_vorher: AnmeldeZustand, formData: FormData): Promise<AnmeldeZustand> {
  const email = text(formData, "email");
  const passwort = String(formData.get("passwort") ?? "");

  if (!email || !passwort) return { email, meldung: "Bitte gib E-Mail und Passwort ein." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: passwort });

  if (error) {
    return {
      email,
      meldung:
        error.code === "invalid_credentials"
          ? "E-Mail oder Passwort stimmt nicht. Bitte prüfe deine Eingabe."
          : "Die Anmeldung hat leider nicht geklappt. Bitte versuche es gleich noch einmal.",
    };
  }

  revalidatePath("/", "layout");
  redirect(sichereAdresse(text(formData, "weiter")));
}

export async function registrieren(_vorher: AnmeldeZustand, formData: FormData): Promise<AnmeldeZustand> {
  const email = text(formData, "email");
  const passwort = String(formData.get("passwort") ?? "");

  if (!email.includes("@")) return { email, meldung: "Bitte gib eine gültige E-Mail-Adresse ein." };
  if (passwort.length < 8) return { email, meldung: "Dein Passwort braucht mindestens 8 Zeichen." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password: passwort });

  if (error) {
    return {
      email,
      meldung:
        error.code === "user_already_exists"
          ? "Mit dieser E-Mail gibt es schon ein Konto. Bitte melde dich an."
          : error.code === "weak_password"
            ? "Dieses Passwort ist zu schwach. Wähle ein längeres oder ungewöhnlicheres."
            : "Die Registrierung hat leider nicht geklappt. Bitte versuche es gleich noch einmal.",
    };
  }

  // Ohne Sitzung verlangt Supabase noch eine E-Mail-Bestätigung – die sollte aus sein.
  if (!data.session) {
    return {
      email,
      meldung:
        "Dein Konto wurde angelegt, aber du bist noch nicht angemeldet. Vermutlich ist in Supabase die E-Mail-Bestätigung noch an – sag Bescheid, dann schauen wir gemeinsam nach.",
    };
  }

  revalidatePath("/", "layout");
  redirect(sichereAdresse(text(formData, "weiter")));
}

export async function abmelden() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
