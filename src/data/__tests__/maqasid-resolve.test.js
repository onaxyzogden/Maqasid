import { describe, it, expect } from 'vitest';
import { resolveSubmoduleFromBoardId, resolveSubmoduleFromProject } from '../maqasid-resolve';
import { MAQASID_CORE_PILLARS, getPillarBoardSegments } from '../maqasid';
import { getPillarBoardIds } from '../submodule-registry';

describe('resolveSubmoduleFromBoardId', () => {
  // The regression. Environment's pillar id is `environment` while its
  // submodules are prefixed `env-`, so reassembling `${pillar}-${slug}` never
  // matched and every Environment board resolved to a null submoduleId.
  it('resolves Environment boards to their env- prefixed submoduleId', () => {
    expect(resolveSubmoduleFromBoardId('environment_resource_core')).toEqual({
      pillarId: 'environment',
      submoduleId: 'env-resource',
    });
    expect(resolveSubmoduleFromBoardId('environment_waste_growth')).toEqual({
      pillarId: 'environment',
      submoduleId: 'env-waste',
    });
    expect(resolveSubmoduleFromBoardId('environment_ecosystem_excellence')).toEqual({
      pillarId: 'environment',
      submoduleId: 'env-ecosystem',
    });
    expect(resolveSubmoduleFromBoardId('environment_sourcing_core')).toEqual({
      pillarId: 'environment',
      submoduleId: 'env-sourcing',
    });
  });

  it('still resolves pillar-prefixed submoduleIds unchanged', () => {
    expect(resolveSubmoduleFromBoardId('faith_salah_core').submoduleId).toBe('faith-salah');
    expect(resolveSubmoduleFromBoardId('health_physical_core').submoduleId).toBe('health-physical');
    expect(resolveSubmoduleFromBoardId('wealth_circulation_growth').submoduleId).toBe('wealth-circulation');
    expect(resolveSubmoduleFromBoardId('family_home_excellence').submoduleId).toBe('family-home');
  });

  it('still resolves Community bare submoduleIds unchanged', () => {
    expect(resolveSubmoduleFromBoardId('ummah_collective_core').submoduleId).toBe('collective');
    expect(resolveSubmoduleFromBoardId('ummah_neighbors_core').submoduleId).toBe('neighbors');
  });

  // The nine moontrance boards carry the `ummah_` prefix while their modules
  // belong to the moontrance pillar. The pillar is reported, the submodule is
  // not, and resolveSubmoduleFromProject's moduleId fallback finishes the job.
  it('reports the pillar but no submodule for a slug the pillar does not own', () => {
    expect(resolveSubmoduleFromBoardId('ummah_moontrance-land_core')).toEqual({
      pillarId: 'ummah',
      submoduleId: null,
    });
  });

  it('returns nulls for ids that do not fit the pattern', () => {
    expect(resolveSubmoduleFromBoardId(null)).toEqual({ pillarId: null, submoduleId: null });
    expect(resolveSubmoduleFromBoardId('')).toEqual({ pillarId: null, submoduleId: null });
    expect(resolveSubmoduleFromBoardId(42)).toEqual({ pillarId: null, submoduleId: null });
    expect(resolveSubmoduleFromBoardId('nodelimiter')).toEqual({ pillarId: null, submoduleId: null });
    expect(resolveSubmoduleFromBoardId('notapillar_thing_core')).toEqual({
      pillarId: null,
      submoduleId: null,
    });
  });

  // Every seeded board in the app must resolve to a submoduleId the pillar
  // actually declares. This is what would have caught the Environment gap.
  it('resolves every core board of every pillar to a canonical submoduleId', () => {
    for (const pillar of MAQASID_CORE_PILLARS) {
      for (const boardId of getPillarBoardIds(pillar.id, 'core')) {
        const { pillarId, submoduleId } = resolveSubmoduleFromBoardId(boardId);
        expect(pillarId).toBe(pillar.id);
        expect(pillar.subModuleIds).toContain(submoduleId);
      }
    }
  });

  // The resolver indexes subModuleIds by the position of the matching segment,
  // so the two arrays must stay aligned 1:1.
  it('keeps segments aligned with subModuleIds for every pillar', () => {
    for (const pillar of MAQASID_CORE_PILLARS) {
      expect(getPillarBoardSegments(pillar.id)).toHaveLength(pillar.subModuleIds.length);
    }
  });
});

describe('resolveSubmoduleFromProject', () => {
  // The user-visible defect: Environment tasks were the only ones in the app
  // stamped with a null pillarId, because the board-id parse failed and the
  // moduleId fallback found no pillar owning the bare slug `resource`.
  it('gives an Environment project a real pillarId and the canonical submoduleId', () => {
    expect(
      resolveSubmoduleFromProject({ id: 'environment_resource_core', moduleId: 'resource' })
    ).toEqual({ pillarId: 'environment', submoduleId: 'env-resource' });
  });

  it('prefers the board-id parse over moduleId', () => {
    expect(
      resolveSubmoduleFromProject({ id: 'faith_salah_core', moduleId: 'salat' })
    ).toEqual({ pillarId: 'faith', submoduleId: 'faith-salah' });
  });

  it('falls back to the Faith short-form table when the id does not resolve', () => {
    expect(resolveSubmoduleFromProject({ id: 'faith_core', moduleId: 'salat' })).toEqual({
      pillarId: 'faith',
      submoduleId: 'faith-salah',
    });
  });

  it('resolves a moontrance board through the moduleId fallback', () => {
    expect(
      resolveSubmoduleFromProject({ id: 'ummah_moontrance-land_core', moduleId: 'moontrance-land' })
    ).toEqual({ pillarId: 'moontrance', submoduleId: 'moontrance-land' });
  });

  it('returns nulls for a missing project', () => {
    expect(resolveSubmoduleFromProject(null)).toEqual({ pillarId: null, submoduleId: null });
    expect(resolveSubmoduleFromProject({ id: 'faith_core' })).toEqual({
      pillarId: null,
      submoduleId: null,
    });
  });
});
