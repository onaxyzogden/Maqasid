# Dashboard — CONTEXT.md

## Purpose
Components that compose the **Insight Dashboard** (`src/pages/Dashboard.jsx`) — MILOS's command center for the day. Since the 2026-04-23 Scholar UX pass the dashboard follows a **three-tier information architecture** aligned with the Islamic rhythm of action:

- **Qalb (نية · Intent)** — Niyyah hero, Manifesto banner, Evening Reflect button
- **Amal (عمل · Action)** — Onboarding, Focus task list, Maqasid bento, BBOS pipeline "Now + Next", main work grid
- **Barakah (بركة · Impact)** — Maqasid Focus panel, Activity feed

Tier wrappers live in `Dashboard.jsx` as `<section className="dash-tier dash-tier--{qalb|amal|barakah}">`; tier tints + bilingual eyebrows live in `Dashboard.css` (`.dash-tier*` block). Eyebrows render only when `settings-store.valuesLayer === 'islamic'`.

## File Inventory
| File | Description |
|------|-------------|
| ActivityChart.jsx | Legacy activity visualization. Not currently imported from Dashboard.jsx — retained for potential reuse. |
| ContextWidgetSlot.jsx | Submodule-aware right-column slot. Swaps widget based on `threshold-store.niyyahSubmodule` (e.g., Salah tracker when Faith → Salah is the active focus). |
| EveningReflectButton.jsx | Barakah-tier chip rendered alongside ManifestoBanner. Opens `EveningReflectModal` when clicked; receives `deepWorkPct` prop for ring fill. |
| EveningReflectModal.jsx | Modal that captures the user's end-of-day reflection and archives the day's niyyah into `threshold-store.history`. Paired with `rolloverIfStale()` on next morning load. |
| FocusTaskList.jsx | "Today's Deep Work" guided task list. Filters `task-store` by today's niyyah submodule. Lives in the Amal tier. |
| HealthPulse.jsx | Legacy pulse indicator. Not currently wired. |
| ManifestoBanner.jsx | Ad-lib niyyah sentence (feeling · pillar · submodule) from `threshold-store`. Click to re-edit via `app-store.openNiyyahOverride()`. Hides when niyyah is unset/skipped. Respects `valuesLayer`. Lives in the Qalb tier row beside EveningReflectButton. |
| ModuleHealthCard.jsx | Legacy module card. Not currently wired into Dashboard.jsx. |
| PillarCard.jsx | Legacy per-pillar card. Superseded by PillarProgressStrip's bento cards. |
| PillarProgressStrip.jsx | **Maqasid Bento** (post-2026-04-23 rewrite). Grid of 7 pillar cards, each with EN+AR label, big % completion, 7-day sparkline SVG, and `N done` / `N in progress` chips. Props: `valuesLayer`, `focusPillarIds` (today's niyyah — cards dim when outside focus). Resolves pillar ownership via `project.moduleId` → `pillar.subModuleIds`, falling back to `project.id` prefix. Empty state = dashed midline sparkline + "No tasks yet". |
| RippleRing.jsx | Animation helper used by the Niyyah hero / focus-complete toast. |

## Key Patterns
- **Tier wrappers are structural, not stylistic.** `.dash-tier` provides the container + tinted top-down gradient wash via `::before` + `color-mix` against `--accent` (gold), `--bg3` (neutral), `--success` (green). Don't hard-code tier colors — use the tier modifier.
- **Bilingual eyebrows are conditional.** `.dash-tier__eyebrow` only renders under `isIslamic`. Universal mode gets the tier tint without the heading — do not force Arabic on Universal users.
- **Zero-state = information scent**, not blank. `.insight-stat-card--zero` swaps `0` → `—`, mutes the value, and adds a dashed `__ghost-bar`. BCG empty state renders a ghost dashed sine SVG behind the CTA so the user sees the shape of what they'll earn. Keep this pattern for any new stat tile you add.
- **Sparklines live inside PillarProgressStrip**, not a shared component. If another surface needs sparklines, extract the inline `Sparkline({ data, color, width, height })` to `src/components/shared/`.
- **Niyyah bridges Dashboard ↔ PropheticPath.** Setting niyyah on Dashboard hero surfaces a "Begin the day's rhythm →" handoff link; PropheticPath echoes today's niyyah in a banner (`.pp-niyyah-echo`). This is the Qalb→Amal handoff — keep both ends synchronized when editing niyyah flow.

## Gotchas
- **PillarProgressStrip props are preserved across the 2026-04-23 rewrite.** Component name and prop shape (`valuesLayer`, `focusPillarIds`) are identical; `Dashboard.jsx` needed no import change. If you rename either, grep for usages.
- **BBOS pipeline is now "Now + Next" on the dashboard**, not the 9-stage strip. The full 9-stage view still lives in `src/components/bbos/BbosFullDashboard.{jsx,css}` (`.bfd__pipeline*` classes) — linked from `.pipeline-now__expand`. Don't conflate `.pipeline-now*` (Dashboard) with `.bfd__pipeline*` (BbosFullDashboard).
- **Tier containers bleed past content** via `margin-inline: calc(-1 * var(--space-4))`. If you nest tiers inside a narrower container, the tint will stop at its edges — not the viewport. This is intentional.
- **`prefers-reduced-motion` must be honored** by any new animated hero/ring in this folder. The Niyyah hero shimmer opts out; match that.
- **Do not render `EveningReflectButton` outside the Qalb tier row.** It's visually paired with ManifestoBanner and depends on the tier's horizontal flex layout in `.insight-manifesto-row`.
- **`task.completedAt` is an ISO timestamp**; the sparkline bucketizer uses **local-time** day keys (`yyyy-mm-dd` from `getFullYear/Month/Date`). Don't switch to `.toISOString().slice(0,10)` — it'll misbucket completions near midnight.

## Stores touched (read)
- `project-store` — `projects` (pillar resolution + BBOS filter)
- `task-store` — `tasksByProject` (bento stats, open tasks, BCG)
- `threshold-store` — `niyyahFocus`, `niyyahSubmodule`, `completedOpening`, `deferred`
- `settings-store` — `valuesLayer` (controls bilingual eyebrows + labels)
- `auth-store` — `user` (greeting)
- `office-store` — `events` (upcoming widget)
- `onboarding-store` — `tourCompleted`, `firstLoginAt`

## Recent changes
- **2026-04-23** — Scholar UX pass, 5 phases: Niyyah hero rewrite → Maqasid bento + sparklines → BBOS pipeline collapse → zero-state information scent → three-tier IA. See `wiki/decisions/` for the session's decision record.
