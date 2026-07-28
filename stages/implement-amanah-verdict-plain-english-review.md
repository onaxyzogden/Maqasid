---
phase: implement
slug: amanah-verdict-plain-english
status: review
amanah: pass
created: 2026-07-28 00:00
---

# Review Gate: implement — amanah-verdict-plain-english

## Summary

The three `AMANAH_TIERS` verdict sentences in the app were rewritten from system-voice
into plain English, at the operator's request (they selected *"The system may proceed."*
and *"The gate holds."* in the browser and asked for wording that is "more human like and
less engineer like").

`website/index.html` mirrors those three sentences word-for-word at lines 417–419. The
website is **read-only** to Claude Code under the Hemisphere Division, so this gate hands
the operator the exact swap rather than making it.

**No protocol semantics changed.** `wiki/concepts/amanah-gate-protocol.md` states the gate
rule in its own words — *"Bayyinah and Qarina may advance. Niyyah alone blocks"* — and its
tier table says *Verified* / *Declared*. Nothing in the protocol quotes these strings; they
are the config's phrasing. T1 and T2 still read as actionable, T3 still reads as blocked.

## Files Modified

Already changed (machine-side):
- `src/data/config/amanah-tiers.js` — all three `description` verdicts
- `src/pages/Landing.jsx` — hero h1 + subtitle (unrelated to this gate; see the same commit pair)
- `src/data/generated/__tests__/landing-demo-deck.test.js` — stale comment quoting the old h1

Awaiting the operator (read-only to Claude Code):
- `website/index.html:417-419`

## The swap

Replace the three `<em>` verdicts in the `.triptych` block. Nothing else on the line changes:

```html
<p class="triptych-line"><strong>Bayyinah</strong> &mdash; clear proof. Named evidence, primary source, documented pattern. <em>You can act on this.</em></p>
<p class="triptych-line"><strong>Qarina</strong> &mdash; contextual indication. Inferred, estimated, user-provided. <em>Act on it &mdash; knowing what it rests on.</em></p>
<p class="triptych-line"><strong>Niyyah</strong> &mdash; declared intention. Aspiration, stated but not yet evidenced. <em>Not something to act on yet.</em></p>
```

Note the `&mdash;` entity inside the Qarina verdict, to match the file's existing convention.

## Key Decisions

- **The app edit went into the shared config, not into `Landing.jsx`.** The verdict strings
  reach three surfaces — the landing evidence bento (via `splitTierDescription`), the landing
  demo card's `data-tip` tooltip, and `AmanahTierBadge`'s `title` in the live app. Editing
  the config improves all three and keeps one source of truth. Editing the page would have
  forked it.
- **All three tiers were reworded, not just the two the operator selected.** Leaving Qarina
  in system-voice between two plain neighbours would read as an oversight.
- **`splitTierDescription` still splits correctly.** It cuts at the *last* `". "`, so each
  description must remain exactly two sentences with no other `". "` in the tail. All three
  replacements satisfy this; the em-dash in the Qarina verdict sits after the cut point and
  does not affect it.

## Open Questions

**This one is genuinely the operator's call, not an oversight to be corrected.**
`website/index.html` is the cross-product OGDEN page describing the Amanah Gate Protocol as
*shared architecture* across MTC, OLOS and BBOS. Protocol voice may be the right register
there even though it is the wrong register on a consumer landing page. Three options:

1. Apply the swap above — one voice everywhere.
2. Leave the website in protocol voice deliberately — and this gate becomes the record of
   why the two surfaces differ, so the divergence is not re-flagged as drift later.
3. A middle wording specific to the website.

Either 1 or 2 closes this gate. Only silence leaves it ambiguous.

## Amanah Gate

- [x] Halal purpose confirmed — marketing/UI copy clarity
- [x] No riba/gharar concerns — no banned term added or removed
- [x] Itqan standard met — build, tests and lint run before hand-off
- [x] Existing tests still pass
- [x] **No fiqh authored** — no ruling, rakʿah count or hadith grade written, paraphrased,
      softened or relocated; no `sources[]`, no `DAY_VARIANTS[].quote`, no FAQ answer touched
- [x] Gate semantics preserved — T1/T2 actionable, T3 not yet

## Reviewer Notes

## Decision

- [ ] **Approved** — apply the swap (option 1)
- [ ] **Approved as divergence** — website keeps protocol voice (option 2)
- [ ] **Rejected** — rework needed (see notes above)
