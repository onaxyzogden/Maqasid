# Maqasid OS — Lessons Learned
<!-- After any correction, log the pattern here to prevent recurrence. -->

## From: Technical Audit Remediation (Sprints 0-8, 2026-04-10 to 2026-04-11)

### 1. Mock data in dashboards masks integration bugs
**Finding:** #15 — MoneyDashboard had 5 hardcoded constants and 6+ dollar values, giving the illusion of a working dashboard while the money-store was never connected.
**Lesson:** Never ship a dashboard with mock/hardcoded data. Wire store selectors from the start, even if they return empty state. Use empty-state UI instead of fake numbers.

### 2. sessionStorage vs localStorage — ceremony state should be ephemeral
**Finding:** #19 — `openingModuleId` and `closingModuleId` in threshold-store were initialized as `null` (ephemeral) but should survive page refreshes within a session without persisting across sessions.
**Lesson:** Use sessionStorage for state that must survive refresh but not outlive the browser tab (ceremony progress, wizard steps). Reserve localStorage for durable user data.

### 3. Attachment limits need quota estimation, not just file-size checks
**Finding:** #22 — The 5 MB attachment limit was far too generous for localStorage (which has a ~5 MB total quota). A single large attachment could silently fill the quota and break other stores.
**Lesson:** When storing binary data in localStorage, estimate total quota usage (`new Blob(Object.values(localStorage)).size`) before accepting new data. Set per-item limits well below the total quota (e.g., 500 KB per file, 5 files max).

### 4. Message stores need pruning to prevent localStorage bloat
**Finding:** #23 — Office chat messages accumulated indefinitely with no cap, eventually risking quota exhaustion.
**Lesson:** Any append-only store writing to localStorage needs a pruning strategy. Set a per-partition cap (e.g., 500 messages per channel) and trim oldest entries on each write.

### 5. Dual stores create invisible data silos — document before unifying
**Finding:** #25 — contacts-store (`contacts_v2`) and crm-store (`crm_contacts`) held overlapping contact data with no sync. Users creating contacts in CRM couldn't see them in People, and vice versa.
**Lesson:** When two stores manage overlapping entities, the safe path is: (1) document the divergence in an ADR, (2) accept the isolation short-term, (3) plan unification only after a test framework is in place. Don't attempt a big-bang migration without tests.

### 6. CONTEXT.md files go stale during rapid sprints — update alongside code
**Finding:** #26 — Four CONTEXT.md files were missing files added during Sprints 4-7 (BbosFullDashboard, DashboardView, DashboardTaskCard, etc.).
**Lesson:** When adding or moving files, update the nearest CONTEXT.md in the same commit or sprint. Treat CONTEXT.md as part of the deliverable, not an afterthought.

### 7. Verify "false positive" findings before coding
**Findings:** #12, #35 — Both were flagged in the audit but were already resolved when investigated. #12 (PILLAR_CONTENT incomplete) was fully populated. #35 (migration timing) was already correct.
**Lesson:** Before implementing a fix, read the current code to confirm the finding still applies. Audits capture a point-in-time snapshot; the codebase may have moved since. Mark verified-correct findings as such to avoid unnecessary changes.

### 8. Separate display format from machine data in two-script pipelines
**Finding:** Hadith enrichment pipeline (2026-04-16) initially truncated Arabic + translation text in the review markdown AND in the patched `sources` field — the write-back script parsed truncated snippets back out of the MD. Sacred content ended up with ellipses in seed files.
**Lesson:** When a pipeline has a human-review stage and a machine write-back stage, emit a JSON sidecar with full content and keep the human-readable file for snippets/checkboxes only. Never round-trip data through a display-format parser; the display format is lossy by design.

### 9. Scope regex-based file patches to the smallest unique context
**Finding:** Write-back regex matched `title: '...', done: false,` across entire seed files — subtask titles repeat across `core` / `growth` / `excellence` levels, so the first match always won and other levels silently stayed unpatched.
**Lesson:** When patching JS data files by regex, first slice the file to the target array (e.g., `faith_shahada_core: [ ... ]`) using brace/bracket counting, then run the title match inside that slice only. Also: post-run, fail loudly if `notFound > 0` — silent gaps are the worst failure mode for sacred or covenant content.

### 10. Bracket-depth counters must be string-aware
**Finding:** `findKeyBounds` in apply-hadith-sources.mjs counted raw `[` / `]` to locate array bounds. After the first patches wrote hadith sources containing translator interpolations like `"[the people of] al-Islam"` inside backtick template literals, subsequent calls to `findKeyBounds` exited the array early at a bracket inside a string — producing `KEY NOT FOUND` for the same key that had worked moments earlier. Silent because each individual error looked like a title/key mismatch.
**Lesson:** Any parser that walks JS source counting delimiters (brackets, braces, parens) MUST skip over string literals — single-quoted, double-quoted, and backtick, respecting `\` escapes. Symptom to watch for: a key that succeeds on N patches then suddenly fails on the (N+1)th without the key itself changing. That's an accumulated-content bug, not a data-mismatch bug.

### 11. Reconcile extracted-runtime values vs. raw-source text when matching
**Finding:** Titles extracted via `import()` were clean strings (`"al-Mala'ikah"`, `"Ilm — know"`), but the same titles in the seed file's raw text are stored as `\'` (backslash-escaped apostrophe in single-quoted strings) and `\u2014` (JS Unicode escape for em dash). Regex built from extracted titles never matched the raw file, producing 107 silent `TITLE NOT FOUND` errors until a title-to-regex transformer was added that emits `(?:'|\\')` for ASCII apostrophe and `(?:—|\\u2014)` for non-ASCII chars.
**Lesson:** When one side of a match came from executed code and the other side is the raw source that produced it, they are NOT the same string. Executing the code resolves escapes; reading the file does not. Build your match regex to accept both forms: literal char OR its source-code escape. The same applies to `\n`, `\t`, and any `\xHH` / `\uXXXX` sequences — resolve them in the matcher, not the data.

### 12. Local heuristic > LLM API when account credits are blocked and filter rules are enumerable
**Finding:** The plan was to rerank ~11K hadith candidates via Claude Haiku 4.5 Batches API ($3–4, 5–30 min), but the Anthropic account had $0 credits. Pivoted to a local script encoding per-submodule topic models with a hard-veto domain-clash filter (punishment/war/menstrual/polytheist word clusters). Runs in seconds, free, deterministic, and auditable. Survival rate: 56.8% — with 100% of the known-bad audit cases now rejected.
**Lesson:** Reach for an LLM only when the filter rules are too subjective or contextual to enumerate. For covenant-sensitive work where the bad patterns are nameable (hadd punishments for non-legal subtasks, menstrual fiqh for non-purity subtasks, etc.), an inspectable rule set beats an opaque model — you can see exactly why each candidate was dropped, and the scholar reviewing the output can critique the rules instead of trusting a black box.

### 13. Distinguish data failures from schema-gap failures before exiting non-zero
**Finding:** apply-hadith-sources.mjs originally summed `titleNotFound + keyNotFound + sidecarMiss` and exited 1 if any were > 0. But 216 `keyNotFound` errors were for moontrance submodules that don't exist in the seed files yet — expected schema gaps, not bugs. This masked the real signal (title mismatches) and blocked apply until every moontrance block was hand-filtered out.
**Lesson:** "Expected to exist and mismatches" (title-not-found) and "not yet implemented" (key-not-found for a future module) are different error classes. Fail loudly on the first, warn and continue on the second. Surface both counts separately in the summary so the human can see which bucket each failure fell into.
