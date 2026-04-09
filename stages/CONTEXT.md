# stages/ — Review Gates

## Purpose
Staging area where automated outputs land for human review before proceeding.
Each file represents a deliverable awaiting approval, revision, or rejection.

## Naming Convention
`[phase]-[slug]-[status].md`

| Segment | Values |
|---------|--------|
| phase | `research`, `design`, `implement`, `test`, `deploy` |
| slug | kebab-case descriptor (e.g., `crm-revamp`, `prayer-overlay-fix`) |
| status | `draft`, `review`, `approved`, `rejected` |

**Example**: `design-people-module-review.md`

## Workflow
1. Claude Code or automation produces output → saves to `stages/` with `-draft` status
2. Human reviews in Obsidian reading pane
3. Human renames status: `-draft` → `-review` → `-approved` or `-rejected`
4. Approved artifacts inform implementation in `src/`, `docs/`, etc.
5. Rejected artifacts get reworked — create new draft, do not overwrite

## Template
Use `stages/_template-gate.md` as the skeleton for new review gates.
Or run `/gate [phase] [slug]` in Claude Code to auto-generate.
