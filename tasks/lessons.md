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
