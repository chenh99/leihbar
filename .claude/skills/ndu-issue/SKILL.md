---
name: ndu-issue
description: Macht aus einem Satz ein fertiges Issue im Format von docs/BACKLOG.md und hängt es ans Backlog an – danach Frage, ob es priorisiert werden soll
argument-hint: [ein Satz, z. B. „Besitzer*innen sollen Anfragen ablehnen können“]
---

Die Person gibt dir einen Satz: $ARGUMENTS. Mach daraus ein Issue und hänge es ans Backlog an.

## Ablauf

1. **Lies vorher** `docs/BACKLOG.md` (Format, bestehende Issues, Nummern), `docs/PRODUKT.md` (falls vorhanden) und `docs/ENTSCHEIDUNGEN.md`. Prüf, ob es das Issue oder etwas Ähnliches schon gibt. Wenn ja: sag es und frag, ob du trotzdem ein neues anlegen sollst. Das Anlegen selbst ist ein reiner Text-Eintrag – keine Datenbank und kein Code.
2. **Ist der Satz leer oder zu unklar** (wer? was genau? warum?), stell eine Rückfrage mit höchstens 2–3 Optionen, bevor du schreibst. Ist er klar genug, schreib direkt.
3. **Formuliere das Issue** genau in diesem Format (so wie die vorhandenen Issues):

```
### ⬜ Issue <Nummer> — <Kurztitel, 2–5 Wörter>
**Ziel:** <1–2 Sätze: was danach möglich ist, für wen, warum – „damit …“>
**Nicht im Umfang:** <Dinge, die man hier naheliegend mitdenken würde, die aber bewusst fehlen>
**Akzeptanzkriterien:**
- Gegeben …, wenn …, dann …
- …

**Fertig, wenn:** <eine Zeile: was die Person im Browser tut und sieht, um es zu prüfen>
```

4. **Hänge es an**: ans Ende der Issue-Abschnitte, direkt vor „## Später / Ideen“. Passt es zu keiner vorhandenen `##`-Überschrift, leg unter dem letzten Abschnitt eine neue an („## Neu hinzugekommen“). Ändere kein bestehendes Issue.
5. **Frag am Ende**: „Soll ich das Issue priorisieren, also weiter nach oben schieben? Dann sag mir, vor welchem Issue es stehen soll.“ Verschieb es nur nach Antwort. Setz es nicht auf 🔧 und fang nicht an, es umzusetzen.

## Regeln für den Inhalt

- **Nummer:** höchste vorhandene Nummer + 1. Im Backlog können Nummern doppelt vorkommen; wenn dir das auffällt, sag es in einem Satz, ändere aber nichts daran.
- **Ziel:** Rolle und Nutzen benennen („Besitzer*innen …, damit …“). Keine technische Lösung.
- **Akzeptanzkriterien:** 3–5 Stück, jedes im Format „Gegeben … wenn … dann …“ (beim Ziel „Gegeben ich …, wenn ich …, dann …“ aus Sicht der Nutzer*in). Jedes muss im Browser prüfbar sein und darf nur eine Sache prüfen. **Mindestens ein Negativfall** (Fehler, fehlende Berechtigung, leere Eingabe, leerer Zustand), bei Aktionen mit Daten auch „nach Reload noch da“.
- **Immer mitdenken**, wenn es zum Satz passt: Anmeldung/Berechtigung (wer darf das, wer nicht), leerer Zustand, verständliche deutsche Fehlermeldung, Handybreite (375 px).
- **Nicht im Umfang:** 2–4 konkrete Punkte; keine Floskeln.
- **Fertig, wenn:** genau eine Zeile (ein Satz, per Semikolon erweiterbar), die Klicks und das Erwartete nennt, auch den Negativfall.
- Alles auf Deutsch, duzend, ohne Code und ohne Dateinamen in Zielen und Kriterien (Ausnahme: Adressen wie `/meine-anfragen`, wenn sie vorgegeben sind). Keine Annahmen erfinden: Was du nicht weißt, kommt als Rückfrage, nicht als Kriterium.

## Antwort an die Person

Kurz, auf Deutsch, ohne Code: Zeig das fertige Issue (wie es im Backlog steht), sag unter welcher Nummer und in welchem Abschnitt es steht, und stell die Priorisierungsfrage aus Schritt 5. Nichts weiter vorschlagen.
