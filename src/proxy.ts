import type { NextRequest } from "next/server";
import { sitzungAufrufen } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return sitzungAufrufen(request);
}

export const config = {
  // Alles außer Next-Dateien und Bildern.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|gegenstaende/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
