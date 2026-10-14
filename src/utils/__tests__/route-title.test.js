import { describe, it, expect } from 'vitest';
import { titleForPath, FULL_TITLE } from '../route-title';

// WCAG 2.4.2: each route gets its own title instead of one shared string.
describe('titleForPath', () => {
  it.each([
    ['/', FULL_TITLE],
    ['/get-started', 'Get started · MIOS'],
    ['/app', 'Dashboard · MIOS'],
    ['/app/prophetic-path', 'Prophetic Path · MIOS'],
    ['/app/orientation', 'Orientation · MIOS'],
    ['/app/settings', 'Settings · MIOS'],
    ['/app/pillar/health', 'Health · MIOS'],
    ['/app/health-core', 'Health · Core · MIOS'],
    ['/app/faith-salah', 'Salah · MIOS'],
  ])('%s → %s', (path, title) => {
    expect(titleForPath(path)).toBe(title);
  });

  it('gives every distinct route a distinct title', () => {
    const paths = ['/app/prophetic-path', '/app/orientation', '/app/pillar/health', '/app/health-physical', '/app/settings'];
    expect(new Set(paths.map(titleForPath)).size).toBe(paths.length);
  });

  it('never throws on an unknown route', () => {
    expect(titleForPath('/app/some-new-page/123')).toBe('Some New Page · MIOS');
  });
});
