# website/ — Marketing Site (ogden-hub)

Static marketing/landing site. Merged from [ogden-hub](https://github.com/onaxyzogden/ogden-hub) via git subtree.

## Structure

| Directory | Purpose |
|---|---|
| `index.html` | Main landing page |
| `atlas/` | OLOS product section (land assessment tool) |
| `bbos/` | BBOS product section (business operating system) |
| `connect/` | Contact/connect pages |
| `journey/` | Journey narrative |
| `moontrance/` | MTC product section (faith-centered land community) |
| `vision/` | Vision statement |
| `CNAME` | Custom domain config (`bismillah.ogden.ag`) |

## Tech
Pure static HTML/CSS. No build system. No package.json. No Node.js.

## Deployment
- Domain: `bismillah.ogden.ag` (via CNAME)
- Currently deployed from the original ogden-hub repo on GitHub Pages
- Monorepo deployment: postponed (see `.github/workflows/deploy-website.yml`)

## Cross-Product Architecture Notes

### Amanah Gate Protocol (identified 2026-04-14 via graphify)
All three products implement the same tiered evidential honesty pattern, but it is only named in BBOS:

| Product | Mechanism | Tiers |
|---|---|---|
| OLOS | Confidence Framework | High (federal API) / Medium (user-provided) / Low (derived) |
| BBOS | G-Label System | G1 (documented) / G2 (inferred) / G3 (aspiration) |
| MTC | Not yet implemented | Proposed: M1 (committed) / M2 (agreed) / M3 (declared) |

Decision record: `wiki/decisions/2026-04-14-amanah-gate-protocol.md`

### Documentation Gap
`rationale_land_as_trust` ("Land Is a Trust (Amanah) Not an Investment Vehicle") — on `index.html` — links the Amanah concept to OLOS and BBOS explicitly. It does **not** link to MTC, despite MTC being the most directly land-related product. This gap should be closed in a future copy update.

### Knowledge Graph
A graphify graph of this website lives at `website/graphify-out/graph.html`. Open in any browser. Run `/graphify --update website` after significant copy changes to keep it current.

God nodes (most connected): BBOS Product (12 edges), OLOS Product (11), BBOS Nine-Stage Pipeline (11).
