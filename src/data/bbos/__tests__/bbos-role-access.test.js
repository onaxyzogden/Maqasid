// Who may halt a BBOS pipeline: the Owner of the Amanah Proof Audit (CRD-V1),
// or the "all" view, which names no role. Both dashboards and the store share
// this rule. The role is declared, not signed in.
import { describe, it, expect } from 'vitest';
import { canHaltBbosPipeline } from '../bbos-role-access';

describe('canHaltBbosPipeline', () => {
  it('allows the "all" view (no role named)', () => {
    expect(canHaltBbosPipeline(null)).toBe(true);
    expect(canHaltBbosPipeline(undefined)).toBe(true);
    expect(canHaltBbosPipeline('all')).toBe(true);
  });

  it('allows the roles that own CRD-V1', () => {
    expect(canHaltBbosPipeline('OW')).toBe(true);
    expect(canHaltBbosPipeline('ST')).toBe(true);
  });

  it('refuses every other role, and an unknown one', () => {
    for (const role of ['CW', 'MB', 'SE', 'CL', 'FU', 'operator']) {
      expect(canHaltBbosPipeline(role)).toBe(false);
    }
  });
});
