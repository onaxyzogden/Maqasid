# website/ — Marketing Site (ogden-hub)

Static marketing/landing site. Merged from [ogden-hub](https://github.com/onaxyzogden/ogden-hub) via git subtree.

## Structure

| Directory | Purpose |
|---|---|
| `index.html` | Main landing page |
| `atlas/` | Atlas product section (land assessment tool) |
| `bbos/` | BBOS product section (business operating system) |
| `connect/` | Contact/connect pages |
| `journey/` | Journey narrative |
| `moontrance/` | Moontrance product section (faith-centered land community) |
| `vision/` | Vision statement |
| `CNAME` | Custom domain config (`bismillah.ogden.ag`) |

## Tech
Pure static HTML/CSS. No build system. No package.json. No Node.js.

## Deployment
- Domain: `bismillah.ogden.ag` (via CNAME)
- Currently deployed from the original ogden-hub repo on GitHub Pages
- Monorepo deployment: postponed (see `.github/workflows/deploy-website.yml`)
