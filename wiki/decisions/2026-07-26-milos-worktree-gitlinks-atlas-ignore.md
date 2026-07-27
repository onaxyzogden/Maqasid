---
title: "MILOS — `.claude/worktrees/` is never tracked; the atlas submodule is `ignore = dirty` and its pointer stays uncommitted"
type: decision
date: 2026-07-26
status: accepted
tags: [git, submodule, worktree, atlas, repo-hygiene, housekeeping]
superseded_by: null
---

# MILOS — `.claude/worktrees/` is never tracked; atlas is `ignore = dirty` with an uncommitted pointer

## Context

For several sessions `git status` opened with six lines of constant noise that obscured real changes:

```
 D .claude/worktrees/crazy-jennings-1547c2
 M .claude/worktrees/mystifying-chatelet-186474
 D .claude/worktrees/mystifying-pare-766274
 M .claude/worktrees/nifty-lalande-2585df
 ? .claude/worktrees/vigilant-buck-1a9ff0
 M atlas
```

Investigation showed this was **not cosmetic**. Two independent defects were stacked:

**1. Six agent worktrees were committed as gitlinks.** Commits `c4e39e7` and `fdf364b` recorded `.claude/worktrees/*` at mode `160000` (gitlink) with **no matching entry in `.gitmodules`**. Consequences:

- `git submodule status` **fatally errored** — `no submodule mapping found in .gitmodules for path '.claude/worktrees/crazy-jennings-1547c2'` — which broke *every* `git submodule` command in the repo, including `--init` / `update` for the legitimate `atlas` submodule.
- The tracked set never matched reality: 6 gitlinks tracked, 5 directories on disk, and a registered worktree (`quizzical-volhard-3e42ca`) that was not tracked at all.
- `.gitignore` carried `.worktrees/`, which **never matches** the real path `.claude/worktrees/`. The ignore rule had been silently inert since it was written.

**2. The `atlas` submodule reports its own working tree.** `atlas` is a genuine submodule (separate repo `onaxyzogden/atlas`) carrying **34 dirty files** of active in-progress work. Per [CLAUDE.md](CLAUDE.md) atlas is *reference-only* inside MILOS — development happens in the atlas repo — so MILOS has no business reporting its file churn.

Critically, atlas's HEAD `e4031e2` (on `fix/portfolio-duplicate-project`) exists on **no remote**. Committing the pointer bump would record a commit that no recursive clone could ever fetch.

## Decision

**Three changes, committed together as `269498a`:**

1. **Untrack all six gitlinks** — `git rm -r --cached .claude/worktrees/`. Index-only; no working directory was touched.
2. **Ignore the path for real** — add `.claude/worktrees/` beside the existing (inert) `.worktrees/` rule in [.gitignore](.gitignore). Scoped to that path only: the eight legitimate tracked files under `.claude/` (`launch.json`, `settings.local.json`, `skills/*`, `plans/*`) remain tracked.
3. **Set `ignore = dirty` on atlas** in [.gitmodules](.gitmodules).

### Standing constraints this establishes

- **Never track anything under `.claude/worktrees/`.** Agent worktrees are ephemeral local state. If one ever reappears in `git status`, the ignore rule has been broken — fix the rule, do not commit the entry.
- **Never commit the `atlas` pointer while atlas HEAD is on no remote.** Verify with `git -C atlas log --oneline @{u}..` and confirm the commit is pushed before any pointer bump is considered.
- **Never run reset/checkout inside `atlas` from the MILOS repo.** It holds live work owned by the atlas repo.

### Why `ignore = dirty` and not `ignore = all`

`ignore = dirty` suppresses only atlas's **working-tree churn** (the 34 modified files). It still surfaces genuine **pointer drift** — which is why ` M atlas` correctly remains in `git status` today. That signal is real and deliberately kept visible: it says the checked-out atlas commit differs from the one MILOS records. `ignore = all` would hide that too, which would be a loss.

## Consequences

- `git submodule status` works again, printing the single expected line:
  `+e4031e2f16d07f6af206f5e2b065407ed8e45850 atlas (heads/fix/portfolio-duplicate-project)`
  The leading `+` is the pointer drift described above.
- `git status --short` no longer carries the six-line worktree block.
- **No branch was deleted.** Removing a git worktree does not delete its branch — that property was the safety net for the whole sweep. All four agent branches survive: `claude/charming-heisenberg-48c52c`, `claude/sleepy-lamarr-3f62e8`, `claude/practical-brahmagupta-f8d999`, `claude/vigilant-buck-1a9ff0`.
- Work preserved *before* any directory was removed: `mystifying-chatelet-186474` held an uncommitted `isPrayerLocked` → `prayerBannerActive` rename across `AppShell.jsx`, `threshold-store.js` and two `CONTEXT.md` files, committed to its own branch as `a1e5892`. `vigilant-buck-1a9ff0` held 136 untracked grounding-audit JSONs, copied to the session scratchpad before a `--force` removal.
- The Health-data mojibake ADR ([[2026-07-26-milos-health-data-mojibake-repair]]) was stranded on `claude/sleepy-lamarr-3f62e8` and was cherry-picked (`86facd0`, `cfa4761`) onto `feat/desktop-pillar-glyphs` before that worktree was swept.

## Known residue

Two now-empty directories — `.claude/worktrees/nifty-lalande-2585df` and `quizzical-volhard-3e42ca` — could not be unlinked: Windows reported *"being used by another process"*. Git had already emptied them and **deregistered both worktrees** (`git worktree list` shows only the main worktree and `mwt/glyphgen`), so this is filesystem residue only. Empty directories are invisible to git, and the path is now ignored regardless. They can be deleted once whatever holds the handle exits.

## Related

- [[milos]]
- [[2026-07-26-milos-health-data-mojibake-repair]] — the ADR rescued during this sweep
