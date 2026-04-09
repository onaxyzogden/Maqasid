---
name: gate
description: Create a review gate document in stages/ for human approval
user_invocable: true
---

# /gate — Create Review Gate

Create a review gate artifact for human approval. Usage: `/gate [phase] [slug]`

**Phases**: `research`, `design`, `implement`, `test`, `deploy`

## Steps

1. **Parse arguments**: Extract phase and slug from user input
2. **Gather context**:
   - Run `git diff --stat` to list modified files
   - Run `git log --oneline -5` to get recent commit context
   - Read `tasks/todo.md` for related active tasks
3. **Create gate file**: Write `stages/[phase]-[slug]-draft.md` using the template below
4. **Populate automatically**:
   - Fill in the summary from recent commit messages
   - Fill in the files modified from git diff
   - Set `created` to current date/time
   - Set `amanah: pending` and `status: draft`
5. **Notify**: Tell the user the gate file is ready for review in Obsidian

## Template

```markdown
---
phase: [phase]
slug: [slug]
status: draft
amanah: pending
created: [YYYY-MM-DD HH:mm]
---

# Review Gate: [phase] — [slug]

## Summary
[Auto-generated from recent commits and task context]

## Files Modified
[Auto-populated from git diff --stat]

## Amanah Gate
- [ ] Halal purpose confirmed
- [ ] No riba/gharar concerns
- [ ] Itqan standard met
- [ ] Existing tests still pass

## Key Decisions
[Extracted from commit messages or noted during implementation]

## Open Questions
[Any unresolved items to flag for reviewer]

## Reviewer Notes
[Space for human annotation]

## Decision
- [ ] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
```
