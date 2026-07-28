// Shared Vite SSR module loader for the codegen scripts.
//
// Some app modules use Vite-only resolution (extensionless imports like
// `./modules`, path aliases, .jsx, .css) and cannot be loaded by plain Node
// ESM. Evaluating them through Vite's SSR loader gives the same resolution the
// app build uses.
//
// Extracted verbatim from generate-pillar-glyphs.mjs so generate-landing-demo.mjs
// can reuse it. `npm run lint` runs the glyph --check, so a regression here
// fails loudly.

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

let _viteServer;

/**
 * Evaluate an app module by repo-root-relative path (e.g. '/src/data/maqasid.js').
 * @param {string} rootRelPath
 * @param {string} repoRoot absolute path to the repo root
 */
export async function ssrLoad(rootRelPath, repoRoot) {
  if (!_viteServer) {
    // configFile:false is load-bearing: letting createServer load the app's
    // vite.config.js makes every SSR fetchModule pathologically slow in this
    // environment (~10-60s per module, tripping the module runner's fixed 60s
    // transport timeout -- worse with a dev server running). The same config
    // VALUES passed inline are fast (<150ms/module), so import the app config
    // directly and reuse its alias map; everything else the generator needs is
    // Vite's defaults.
    const { createServer } = await import('vite');
    const appConfig = (await import(pathToFileURL(resolve(repoRoot, 'vite.config.js')).href)).default;
    _viteServer = await createServer({
      configFile: false,
      root: repoRoot,
      appType: 'custom',
      logLevel: 'silent',
      server: { middlewareMode: true, hmr: false, watch: null },
      resolve: { alias: appConfig.resolve.alias },
      optimizeDeps: { noDiscovery: true },
    });
  }
  return _viteServer.ssrLoadModule(rootRelPath);
}

export async function closeSsr() {
  if (_viteServer) {
    const server = _viteServer;
    _viteServer = undefined;
    await server.close();
  }
}
