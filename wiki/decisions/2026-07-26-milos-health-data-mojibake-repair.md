---
title: "MILOS — Reverse pre-existing UTF-8/cp1252 mojibake in the three Health-pillar data files (incl. Qur'anic verse data)"
type: decision
date: 2026-07-26
status: accepted
tags: [data, encoding, mojibake, amanah, quran, seed-tasks, health, windows]
superseded_by: null
---

# MILOS — Reverse pre-existing UTF-8/cp1252 mojibake in the three Health-pillar data files

## Context

While verifying the `/app/orientation` redesign, the Health pillar's morning-routine task title rendered as `Fajr â†' Quran ...` — the arrow `→` (U+2192, UTF-8 `E2 86 92`) showing as the 3-char sequence `â†'`. This is classic **double-encoding mojibake**: the file's original UTF-8 bytes were once misread as Windows-1252 (cp1252) and then re-saved as UTF-8, so every non-ASCII character (arrows, curly quotes, and — critically — Arabic) was corrupted.

Three files carried it, all introduced by a single commit:

- [src/data/seed-tasks/health-seed-tasks.js](src/data/seed-tasks/health-seed-tasks.js)
- [src/data/ayat/health-readiness-ayat.js](src/data/ayat/health-readiness-ayat.js) — **⚠️ Qur'anic verse data** (`READINESS_AYAT_HEALTH`, consumed by [ReadinessCheck.jsx](src/components/islamic/ReadinessCheck.jsx))
- [src/data/niyyah-feelings.js](src/data/niyyah-feelings.js) — additionally carried a leading **UTF-8 BOM** (`EF BB BF`) added by the corrupting re-save

**Root cause pinned by git:** the corruption entered with commit `cfad9dd` (which also renamed the Life pillar → Health: `READINESS_AYAT_LIFE`→`READINESS_AYAT_HEALTH`, `LIFE_SEED_TASKS`→`HEALTH_SEED_TASKS`, `life_*`→`health_*` keys, `'life'`→`'health'`). Its **parent `1171fc5`** holds the clean, pre-corruption bytes as the `life-*` files — an independent source of truth.

## Decision

Reverse the corruption with a **deterministic round-trip decode** rather than any hand-editing:

```
fixed = bytes.decode('utf-8').encode('cp1252').decode('utf-8')   # + strip leading BOM
```

This is the exact mathematical inverse of the corruption, so it **preserves `cfad9dd`'s intended Life→Health rename** while undoing only the encoding damage. Two edge cases handled:

- **The 5 cp1252-undefined bytes** (`0x81, 0x8D, 0x8F, 0x90, 0x9D`) — Arabic UTF-8 continuation bytes legitimately land on these, and the corrupting tool passed them through as their C1 control code points (U+0081 …). A custom `c1passthrough` codec error-handler re-emits the single byte for any C1 control char, so strict cp1252 encoding doesn't raise.
- **BOM** on `niyyah-feelings.js` — stripped before encoding; all three written **UTF-8, no BOM, LF preserved**.

Applied to the working tree, then committed as `9f87e8d` after the operator cleared the review gate on the ayat file.

## Rationale

- **Losslessly correct + rename-preserving.** A blind find/replace of visible mojibake pairs would miss the C1-passthrough bytes inside Arabic and risk touching revelation text. The round-trip is provably the inverse operation.
- **Amanah caution satisfied by an independent source, not by guessing.** The covenant rule is: never invent or approximate revelation text. The fix restores the *pre-corruption git blob*, and its Arabic was then cross-checked against the clean parent `1171fc5` (see Verified) — no Arabic/transliteration/translation was authored, reconstructed, or approximated.

## Alternatives Considered

- **Find/replace the visible mojibake sequences** — rejected: incomplete (misses C1-passthrough bytes embedded in Arabic) and unsafe near verse text.
- **`git checkout 1171fc5 -- <life files>` then re-rename** — rejected: reintroduces the rename by hand (error-prone) and loses any non-rename intent in `cfad9dd`; the round-trip preserves `cfad9dd` exactly minus the corruption.
- **Re-fetch the ayat from a mushaf / Quran MCP** — unnecessary and riskier than the byte-exact git blob; reserved only as a fallback had the parent been unavailable.

## Amanah

**Sensitive** — one file is Qur'anic verse data. Handled under the covenant caution: revelation text was **restored from the pre-corruption git blob** (independent source of truth), **never reconstructed or guessed**; byte-identity to the clean parent was **proven** (all 35 Arabic-bearing lines unchanged); and the **operator review gate was honored** before commit. No capital / sale / CSA / CSRA / salam / yield-share surface.

## Verified

- **Byte deltas reconcile exactly** with the Life→Health rename and nothing else: ayat `36,818 → 36,824` (+6 = `LIFE`→`HEALTH` ×3), seed `543,812 → 543,838` (+26 = export +2, 12 pillar keys +24), niyyah `5,279 → 5,285` (+6 = `'life'`→`'health'` ×3).
- **Decoded Arabic byte-counts == clean parent `1171fc5`, exactly:** ayat 4201, seed 14906, niyyah 96.
- **Ayat integrity proof (the crux):** on-disk fixed `health-readiness-ayat.js` diffed against `1171fc5:src/data/ayat/life-readiness-ayat.js` = **exactly 6 changed lines, all the `READINESS_AYAT_LIFE`→`READINESS_AYAT_HEALTH` rename** (usage comment, `export const`, lookup return); the 35 Arabic-bearing lines are **byte-identical** (order-preserving, set-diff 0/0).
- **Mojibake re-scan** (task pattern + broad broken-sequence set) = **0** on all three; no BOM, LF preserved.
- **`npm test` 77/77**; **`npm run lint`** eslint + `lint:grounding-strict` (`[STRICT] Pass`, Health 87/87 structured & grounded) + `audit:inline-refs` (`0 ≤ ratchet 0`) all green.

## Honestly bounded (pre-existing, unrelated)

`npm run lint` chains a 4th step, `generate:pillar-glyphs:check` (the ratchet from [[2026-07-05-milos-pillar-glyph-generator]]), which **fails** here with `ENOENT … node_modules/lucide-react/dist/esm/icons/compass.js`. **Proven pre-existing and unrelated:** with the three fixed files stashed (tree reverted to pre-fix HEAD) it fails *identically*, and the script reads only lucide icon modules + one CSS file — none of the edited data files. Root cause is a **worktree dependency-install gap** (this worktree's `node_modules` has no `lucide-react/dist/esm/icons` directory). Not caused by this change, not fixed (out of scope) — resolved by an `npm install` in the worktree. **Deferred.**

## Delivery

1 commit `9f87e8d` on `claude/sleepy-lamarr-3f62e8` (3 files, 784/784 in-place line rewrites — no lines added/removed). **Not pushed.** The ayat file's human-review gate was cleared by the operator after reviewing the Arabic-identity proof above.

## Connections

- [[milos]] — the affected app; Health-pillar data
- [[amanah-gate]] — the covenant caution governing revelation-text handling
- [[2026-07-05-milos-pillar-glyph-generator]] — source of the `generate:pillar-glyphs:check` ratchet that fails (pre-existing, worktree node_modules gap)
