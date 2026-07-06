#!/usr/bin/env node
/**
 * generate-pillar-glyphs.mjs
 * ----------------------------------------------------------------------------
 * Source-of-truth generator for the LevelNavigator glyph CSS in
 * src/styles/level-navigator-responsive.css.
 *
 * The dashboard's seven top-level pillar segments (and, from Phase A, the
 * sub-pillar and prayer strips) render a lucide glyph purely in CSS: a
 * `.fln__segment-col[data-pillar-id="X"]::before` whose `mask-image` is an
 * inline SVG data-URI, filled by `var(--seg-color)`. Those data-URIs used to be
 * hand-written and duplicated across the mobile (max-width:767px) and desktop
 * (min-width:768px) media blocks -- drift-prone. This script derives them from
 * the same lucide icons the app renders, and injects them between the
 * `/* BEGIN GENERATED ... *\/` ... `/* END GENERATED ... *\/` markers in each
 * block, so a `maqasid.js` (or sub-pillar constants) icon change propagates to
 * both blocks automatically.
 *
 *   node scripts/generate-pillar-glyphs.mjs           # write CSS
 *   node scripts/generate-pillar-glyphs.mjs --check   # exit 1 if out of date
 *
 * The `--check` mode is a fail-on-drift ratchet wired into `npm run lint`.
 *
 * No React render, DOM, or SVG parse: it reads lucide's raw `__iconNode` arrays
 * ([tag, attrs] pairs) straight from node_modules and re-encodes them with the
 * exact byte recipe the hand-written URIs used, so the first run reproduces the
 * seven existing pillar glyphs with an empty git diff.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createServer } from 'vite';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');
const CSS_PATH = resolve(REPO, 'src/styles/level-navigator-responsive.css');
const ICON_DIR = resolve(REPO, 'node_modules/lucide-react/dist/esm/icons');
const SEL = '.fln__segments.fln__segments .fln__segment-col';

// ---- casing helpers -------------------------------------------------------
// PascalCase lucide name -> kebab module filename ("HeartPulse" -> "heart-pulse")
function pascalToKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
// camelCase SVG attr name -> kebab ("strokeWidth" -> "stroke-width")
function attrToKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// ---- lucide __iconNode loading --------------------------------------------
const nodeCache = new Map();

async function importIconNode(kebab) {
  const mod = await import(pathToFileURL(resolve(ICON_DIR, `${kebab}.js`)).href);
  return mod.__iconNode;
}

// Some lucide modules are alias-only (e.g. check-circle-2.js -> circle-check.js)
// and carry no __iconNode; follow the re-export to the module that does.
async function resolveAliasTarget(kebab) {
  const text = await readFile(resolve(ICON_DIR, `${kebab}.js`), 'utf8');
  const m = text.match(/from\s+['"]\.\/([a-z0-9-]+)\.js['"]/);
  return m ? m[1] : null;
}

async function loadIconNode(pascalName) {
  if (nodeCache.has(pascalName)) return nodeCache.get(pascalName);
  const kebab = pascalToKebab(pascalName);
  let node = await importIconNode(kebab).catch(() => undefined);
  if (node === undefined) {
    const target = await resolveAliasTarget(kebab);
    if (target) node = await importIconNode(target).catch(() => undefined);
  }
  if (!Array.isArray(node)) {
    throw new Error(`lucide __iconNode not found for "${pascalName}" (kebab "${kebab}")`);
  }
  nodeCache.set(pascalName, node);
  return node;
}

// ---- SVG data-URI encoder (byte-compatible with the hand-written URIs) -----
// Fixed open tag: no width/height, viewBox present, stroke #000 (mask ignores
// the paint but the bytes must match), attrs in this exact order.
const SVG_OPEN =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'" +
  " stroke='#000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>";

function encodeNode([tag, attrs]) {
  let s = `<${tag}`;
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'key') continue; // lucide render key -- not part of the SVG
    s += ` ${attrToKebab(k)}='${v}'`;
  }
  return `${s}/>`;
}

function iconNodeToDataUri(node) {
  const raw = SVG_OPEN + node.map(encodeNode).join('') + '</svg>';
  // Percent-encode ONLY < > # (as the hand-written URIs did); everything else
  // -- spaces, = ' / . - digits, letters -- stays literal.
  const enc = raw.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23');
  return `data:image/svg+xml,${enc}`;
}

// ---- CSS builders ---------------------------------------------------------
function selectorList(ids, suffix) {
  return ids
    .map((id, i) => `  ${SEL}[data-pillar-id="${id}"]${suffix}${i === ids.length - 1 ? ' {' : ','}`)
    .join('\n');
}

function perIdRule(id, uri, suffix) {
  return [
    `  ${SEL}[data-pillar-id="${id}"]${suffix} {`,
    `    -webkit-mask-image: url("${uri}");`,
    `            mask-image: url("${uri}");`,
    '  }',
  ].join('\n');
}

function perIdRules(entries, suffix) {
  return entries.map((e) => perIdRule(e.id, e.uri, suffix)).join('\n');
}

// Mobile block (@media max-width:767px): glyph replaces the numbered badge on
// .fln__segment-col::before; mask-size 76%.
function buildMobileRegion(entries) {
  const ids = entries.map((e) => e.id);
  const base = [
    selectorList(ids, '::before'),
    '    content: "";',
    '    background: var(--seg-color, var(--accent));',
    '    -webkit-mask-repeat: no-repeat;',
    '            mask-repeat: no-repeat;',
    '    -webkit-mask-position: center;',
    '            mask-position: center;',
    '    -webkit-mask-size: 76%;',
    '            mask-size: 76%;',
    '  }',
  ].join('\n');
  return `${base}\n\n${perIdRules(entries, '::before')}`;
}

// Desktop block (@media min-width:768px): glyph grouped above the label on
// .fln__segment-nav::before, so the label button is set to a centered block;
// mask-size 100% 100%.
function buildDesktopRegion(entries) {
  const ids = entries.map((e) => e.id);
  const labelRule = [
    selectorList(ids, ' .fln__segment-nav'),
    '    display: block;',
    '    text-align: center;',
    '    white-space: nowrap;',
    '    overflow: hidden;',
    '    text-overflow: ellipsis;',
    '  }',
  ].join('\n');
  const comment = [
    '  /* Grouped glyph: a bare seg-tinted lucide icon, ~18px (PillarCard size={18}),',
    '     clipped from the --seg-color fill by the icon mask -- same technique and',
    '     icons as the mobile badge swap. */',
  ].join('\n');
  const baseRule = [
    selectorList(ids, ' .fln__segment-nav::before'),
    '    content: "";',
    '    display: block;',
    '    margin: 0 auto 4px;   /* center the 18px glyph as a block; 4px gap to the label below */',
    '    width: 18px;',
    '    height: 18px;',
    '    background: var(--seg-color, var(--accent));',
    '    -webkit-mask-repeat: no-repeat;',
    '            mask-repeat: no-repeat;',
    '    -webkit-mask-position: center;',
    '            mask-position: center;',
    '    -webkit-mask-size: 100% 100%;   /* square 24-viewBox glyphs -> exact 18px, no intrinsic-size dependency */',
    '            mask-size: 100% 100%;',
    '  }',
  ].join('\n');
  return `${labelRule}\n\n${comment}\n${baseRule}\n\n${perIdRules(entries, ' .fln__segment-nav::before')}`;
}

// ---- marker injection -----------------------------------------------------
function injectRegion(css, variant, body, EOL) {
  const beginRe = new RegExp(`[ \\t]*/\\* BEGIN GENERATED: pillar glyphs \\[${variant}\\][^\\r\\n]*\\*/`);
  const endRe = new RegExp(`[ \\t]*/\\* END GENERATED: pillar glyphs \\[${variant}\\] \\*/`);
  const b = beginRe.exec(css);
  if (!b) throw new Error(`BEGIN marker [${variant}] not found in ${CSS_PATH}`);
  const e = endRe.exec(css);
  if (!e) throw new Error(`END marker [${variant}] not found in ${CSS_PATH}`);
  const start = b.index + b[0].length + EOL.length; // first char of region body
  const stop = e.index - EOL.length; // the EOL immediately before the END marker
  if (stop < start) throw new Error(`markers [${variant}] out of order in ${CSS_PATH}`);
  return css.slice(0, start) + body + css.slice(stop);
}

// ---- app-module loading ----------------------------------------------------
// The pillar/sub-pillar/prayer data lives in app source that uses Vite-only
// resolution (extensionless imports like `./modules`, path aliases, .jsx, .css).
// Plain Node ESM can't load it, so evaluate through Vite's SSR loader -- the
// same resolution the app build uses. This also lets Phase A read `Icon.displayName`
// off the real lucide component bindings the constants files import.
let _viteServer;
async function ssrLoad(rootRelPath) {
  if (!_viteServer) {
    _viteServer = await createServer({
      root: REPO,
      appType: 'custom',
      logLevel: 'silent',
      server: { middlewareMode: true, hmr: false, watch: null },
      optimizeDeps: { noDiscovery: true },
    });
  }
  return _viteServer.ssrLoadModule(rootRelPath);
}
async function closeSsr() {
  if (_viteServer) {
    const server = _viteServer;
    _viteServer = undefined;
    await server.close();
  }
}

// ---- data source ----------------------------------------------------------
// 7 pillars: MAQASID_CORE_PILLARS[].icon is a PascalCase lucide name (string).
// Reading these strings is what makes a maqasid.js icon edit auto-propagate.
async function getPillars() {
  const mod = await ssrLoad('/src/data/maqasid.js');
  const list = mod.MAQASID_CORE_PILLARS;
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error('MAQASID_CORE_PILLARS is empty or not an array');
  }
  return list.map((p) => ({ id: p.id, iconName: p.icon }));
}

// ---- main -----------------------------------------------------------------
async function main() {
  const check = process.argv.includes('--check');
  try {
    const pillars = await getPillars();
    const entries = [];
    for (const p of pillars) {
      entries.push({ id: p.id, uri: iconNodeToDataUri(await loadIconNode(p.iconName)) });
    }

    const current = await readFile(CSS_PATH, 'utf8');
    const EOL = current.includes('\r\n') ? '\r\n' : '\n';
    const toEOL = (s) => (EOL === '\n' ? s : s.replace(/\n/g, EOL));

    let next = current;
    next = injectRegion(next, 'mobile', toEOL(buildMobileRegion(entries)), EOL);
    next = injectRegion(next, 'desktop', toEOL(buildDesktopRegion(entries)), EOL);

    if (check) {
      if (next !== current) {
        console.error(
          `generate-pillar-glyphs --check: CSS is out of date (${entries.length} glyphs). ` +
            'Run: npm run generate:pillar-glyphs',
        );
        process.exitCode = 1;
        return;
      }
      console.log(`generate-pillar-glyphs --check: up to date (${entries.length} glyphs)`);
      return;
    }

    if (next !== current) {
      await writeFile(CSS_PATH, next);
      console.log(`generate-pillar-glyphs: wrote ${entries.length} glyphs`);
    } else {
      console.log(`generate-pillar-glyphs: no change (${entries.length} glyphs)`);
    }
  } finally {
    await closeSsr();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
