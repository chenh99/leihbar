# Entscheidungen

> Hier hält Claude fest, was im Projekt festgelegt wurde, damit es in späteren Sessions noch gilt.
> Format: Datum — Entscheidung — Grund

- 2026-10-08 — Stack: Next.js + Tailwind + Supabase + Vercel — Kursvorgabe
- 2026-10-08 — Sprache der Oberfläche: Deutsch — Zielgruppe NDU-Studierende
- 2026-10-09 — Gegenstände liegen in der Supabase-Tabelle `items` (Bild als Pfad in `bild_url`, `owner_id` bleibt leer bis Issue 5); Row Level Security: alle dürfen lesen und anlegen, niemand ändern oder löschen — Issue 4
- 2026-10-09 — Adressen der Detailseiten nutzen die ID aus der Datenbank (`/gegenstand/<uuid>`) statt Namen wie `/abendkleid` — Folge von Issue 4
- 2026-10-09 — Anmeldung mit Supabase Auth (E-Mail und Passwort, E-Mail-Bestätigung aus); `/anbieten` und `/meine-anfragen` nur für Angemeldete; Regel für `items`: anlegen nur Angemeldete mit `owner_id` = eigene ID, lesen alle, ändern/löschen niemand — Issue 5
- 2026-10-09 — Anfragen liegen in der Tabelle `requests` (`item_id`, `user_id`, höchstens eine Anfrage pro Person und Gegenstand); Row Level Security: lesen alle, anlegen nur Angemeldete für sich selbst, löschen nur die eigene, ändern niemand — Issue 6
- 2026-10-09 — `requests` hat `status` (offen/angenommen/abgelehnt, Start immer „offen“) und `email` (setzt die Datenbank aus dem Login). Lesen nur Besitzer*in des Gegenstands und anfragende Person; ändern nur die Besitzer*in und nur `status` (Spaltenrechte); beim Anlegen nur `item_id` und `user_id`. Der Anfragen-Zähler läuft über die Funktion `anzahl_anfragen` (liefert nur die Zahl) und ein Live-Signal der Datenbank (`anfrage_signal`, nur mit Gegenstands-ID) — Issue 10
