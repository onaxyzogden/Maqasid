---
title: "Orientation content repair (persisted-title mojibake migration) + uniform font + Why/How split"
type: decision
date: 2026-07-26
status: accepted
tags: [milos, orientation, prophetic-path, mojibake, migration, localStorage, seed-hydration, ui, font, shared-components]
superseded_by: null
---

# Orientation content repair (persisted-title mojibake migration) + uniform font + Why/How split

## Context

On the live `/app/orientation` screen the highlighted "what's next" step rendered a **garbled title** (`Fajr â†' Quran` — a corrupted `→`), an **empty "Why & how"** ("No extra guidance…"), **"No sources available,"** and an **"Ungrounded"** pill. Four symptoms, one bug.

**Root cause (code-confirmed).** Seed static content (`description`/`sources`/`tier`/`why`/`how`/`amanahRationale`) is **never persisted** — `persistTasks` strips it on every write and it re-hydrates live from the current seed at read time, joined **by title**: `getTaskMap(boardId).get(task.title)` in [seed-hydrator.js](src/services/seed-hydrator.js). The [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]] session repaired the **seed files** — so the seed's title is now clean `Fajr → Quran` — but the operator's **localStorage still holds the OLD corrupt title** `Fajr â†' Quran` (saved before that repair). Clean seed title ≠ corrupt persisted title → the join misses → the task is served bare, producing all four symptoms at once. The title is effectively write-once (no path rewrites it from seed), and the idle `backfillAndStripSeeds` also matches by title, so it can't heal the orphan and instead **appends a clean duplicate** beside it. This is the **persisted-title dimension** of [[project-seed-mojibake]] that the seed-file repair did not (and could not) reach — the seed fix cleaned the source of truth; the corruption survives in every device's saved data.

Two independent presentational asks rode along, both locked with the operator via AskUserQuestion:
- **Font not uniform** — the content tier mixed families (`.os-sheet__task-title` sans, `.os-sheet__now-text` directly below it serif). Operator chose **Sans (DM Sans)**.
- **Split the combined "Why & how" accordion** into separate **Why** and **How** dropdowns. Operator chose **both surfaces** (apply in the shared component — no guard prop).

**Amanah gate:** covenant-positive on the repair — it restores Qur'an-adjacent titles to their exact original bytes by the same proven pure byte-reversal used on the seed files (nothing invented or approximated). Font + split are neutral-presentational. No capital / CSRA / salam / yield surface.

## Decision

**1. Content repair — one-shot persisted-title mojibake migration.**

New pure, zero-dependency module [src/services/mojibake.js](src/services/mojibake.js) (unit-testable with no `localStorage`; `TextDecoder` is a Node global):
- `repairMojibake(str)` — reverse one string: strip UTF-8 BOM → map each char back to its cp1252 byte (Latin-1 tail 0xA0–0xFF identity; cp1252 punctuation via a fixed table; the five cp1252-undefined bytes 0x81/8D/8F/90/9D preserved as identity C1) → `new TextDecoder('utf-8', {fatal:true})`. **Three guard gates make it a strict no-op** on anything that is not this exact corruption: (a) any char outside cp1252's image → return original; (b) pure-ASCII (`!sawHigh`) → original; (c) bytes not valid UTF-8, or decode === input → original. Byte-proven no-op on ASCII, an already-clean `→`, Arabic script, `Café`, smart-quote `Qur'an`, em-dash, middle-dot. Repairs `â†'` → `→`; idempotent thereafter.
- `repairBoardTasks(tasks, boardId)` — repair task + subtask titles, then **dedup by title within the board**, returning the **same array reference** when nothing changed (so the orchestrator skips the write). Dedup is **loss-proof**: `taskHasState` (has `completedAt`/`dueDate`/`notes`/`checklist`/`attachments`, or `columnId !== col_${boardId}_to_do`, or any subtask `done`/`notApplicable`/`snoozedUntilDayKey`) picks the survivor (stateful wins; else smallest `order`; tie → earliest `createdAt`); every loser's subtask state folds into the survivor by subtask-title (`done ||=`, `notApplicable ||=`, `snoozedUntilDayKey ??=`) and loser-only subtasks append. No completion or snooze is ever dropped.

Orchestrator `repairMojibakeTaskTitles()` in [migration.js](src/services/migration.js): gated by an **independent one-shot flag** `bbiz_mojibake_titles_repaired` (**not** a `SCHEMA_VERSION` bump — that would re-run the whole contacts migration for every 5.0 user). Enumerates boards via `listKeys('tasks_')`, repairs each, writes only changed boards, stamps the flag. Called as the **first line of `runMigrations()`, before the version guard** — `runMigrations()` runs synchronously at [main.jsx](src/main.jsx) before React mounts and before the idle backfill, so repaired titles are in place before any hydration. The flag is added to `SYNC_EXCLUDED_KEYS` in [storage.js](src/services/storage.js) so **each device repairs its own data exactly once** (the flag must not sync).

**Resilience (permanent immunization)** in [seed-hydrator.js](src/services/seed-hydrator.js): a `seedByTitle(map, title)` helper retries the title lookup with `repairMojibake(title)` on a miss (applied in `hydrateTask`, `getSeedSubtask`, and the subtask map). Pure, never writes storage, no-op on clean titles — so **content** hydration stays immune even if mojibake is later reintroduced via import/restore. The one-shot data repair stays primary (only it fixes the *displayed* title and removes the duplicate).

**2. Uniform content font → DM Sans.** Retarget the serif content outliers to `var(--font-body)` (= DM Sans; `--font-serif` = Noto Serif), leaving the intentional **mono label layer** (crumb, eyebrow, "NOW", pills, tags) untouched. Shared [SubtaskStepDetail.css](src/components/shared/SubtaskStepDetail.css): `.os-sheet__now-text`, `.os-sheet__clear-title`, plus an explicit `--font-body` on `.orient-evidence__toggle` (was inheriting). Orientation-only [Orientation.css](src/components/orientation/Orientation.css): `.orient-head__title`, `.orient-card__now-text`, `.orient-card__clear-title`. One-token swap, no structural change. The Prophetic Path **page** chrome (banner + timeline headlines in `PropheticPath.css`) keeps its serif — a separate visual layer, out of scope.

**3. Why/How split — both surfaces via the shared component** [SubtaskStepDetail.jsx](src/components/shared/SubtaskStepDetail.jsx). `deriveGuidance(subtask)` has 3-branch precedence: structured `why`/`how` plain-text fields → else split the `**Why?** … **How?** …` markdown `description` at the How marker (tolerant regex; bold headers dropped because the accordion labels now carry them) → else empty. `SubtaskWhyHow` renders `<DetailSection label="Why">` and `<DetailSection label="How">` as two independent accordions; when a subtask has no guidance at all, one "Why & how" section carries the gentle empty note. Reuses the existing `DetailSection` shell + `.orient-evidence__*` CSS (Evidence is the third toggle below) — **no new CSS**. Because it lives in the shared component, the orientation sheet **and** the Prophetic Path node drill-in get the split identically (the "both surfaces" decision), with no guard prop.

## Rationale

The four visible symptoms are one join miss, so one key repair fixes all four at once — restoring the title re-matches the seed and content (`sources`, `why`/`how`, tier → Grounded pill) flows back automatically, while the loss-proof dedup absorbs the duplicate the backfill appended without touching progress. Gating on an independent flag (not `SCHEMA_VERSION`) and excluding it from sync is what makes it a true **per-device one-shot** that never re-runs the contacts migration and never races the cloud snapshot. The hydrator fallback is cheap insurance: it makes *content* correct forever regardless of how a corrupt title re-enters, without ever writing storage. Splitting Why/How in the shared component (rather than per-surface) is the same one-implementation discipline that produced `SubtaskStepDetail` in [[2026-07-26-milos-centered-popups-node-drill-in]] — the two covenant surfaces cannot drift.

## Alternatives Considered

- **Rewrite the persisted title from the seed on hydrate** — rejected; hydration is a read path and must not write localStorage, and there is no clean by-id link to the seed (the title *is* the key). A one-shot migration is the correct place to mutate saved data.
- **Bump `SCHEMA_VERSION` to trigger the repair** — rejected; it would re-run the entire 5.0 contacts migration for every existing user. An independent flag scopes the work to exactly this repair.
- **Hydrator fallback alone (no data migration)** — rejected as insufficient; it fixes *content* but leaves the **displayed** mojibake title and the appended duplicate in place. The data repair is primary; the fallback is defense-in-depth.
- **Guard-prop the split to one surface** — rejected by the operator ("both surfaces"); putting it in the shared component is less code and prevents drift.
- **Font: retarget everything to serif / keep the mix** — rejected; operator chose DM Sans, and uniformity across the content tier was the whole complaint.

## Verification

- `npm test` — **124/124** (the new [mojibake.test.js](src/services/__tests__/mojibake.test.js), 22 cases: reversal round-trip incl. the full morning-routine title and `€`/`é`/`'`, idempotency, BOM strip, strict no-op on ASCII/clean-arrow/Arabic/`Café`/smart-quote/em-dash/middle-dot/empty/null, and `repairBoardTasks` dedup — done-survives, moved-column, loser-only-subtask append, both-stateful tie-break → earliest `createdAt`, snooze preserved, same-ref no-op).
- `npm run lint` — composite **green** (eslint 0 errors; the lone warning is a pre-existing unused-disable in `IslamicPanel.jsx`, untouched here; grounding-strict ✓, inline-refs 0, pillar-glyphs up to date). No seed/grounding data touched.
- **Preview, both surfaces (screenshots captured, [[project-screenshot-hang]] did not recur).** Orientation drill-in (Faith → Hajj): clean title, **Grounded** pill + Bayyinah badge, **separate Why and How dropdowns** with distinct content (Why = rationale, How = the five-conditions steps — the description-split branch), Evidence populated with **Surah Ali 'Imran [3:97]** + a Qarina inference; title/NOW/labels one sans font. Prophetic Path node drill-in (Salat al-Witr): same three-dropdown split + uniform font, exercising the **structured `why`/`how` fields** branch ("The Sovereign and the Holy…" / "After the salam of Witr, remain seated…").
- **localStorage (read-only):** `bbiz_mojibake_titles_repaired === '1'`; **0 mojibake titles** across all 114 task boards; reload is a clean no-op (flag holds, 0 console errors).

## Connections

- [[milos]] — the affected project; its `CLAUDE.md` warns about this exact cp1252/UTF-8 hazard
- [[project-seed-mojibake]] — the parent defect; this decision resolves its **persisted-title / display** dimension (the seed-file repair fixed the source of truth only)
- [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]] — the prior session that repaired the seed files by the same proven byte-reversal; this migration reverses the identical corruption in saved titles
- [[2026-07-26-milos-centered-popups-node-drill-in]] — created `shared/SubtaskStepDetail.jsx`; the Why/How split + font swap land there, so both surfaces move together
- [[2026-07-25-milos-orientation-carousel-redesign]] — the surface where the garbled step was reported
- [[amanah-gate]] — Qur'an-adjacent titles restored by pure reversal, nothing authored
