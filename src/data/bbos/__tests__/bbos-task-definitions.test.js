// Task-definition shape the gates depend on: every select option is a
// { value, label } object (the task panel renders opt.value / opt.label), and
// the IC checklists are structured pass/fail checks with the asset they certify.
import { describe, it, expect } from 'vitest';
import { BBOS_TASK_DEFINITIONS } from '../bbos-task-definitions';

const def = (id) => BBOS_TASK_DEFINITIONS.find((d) => d.id === id);
const field = (taskId, fieldId) => def(taskId).fields.find((f) => f.id === fieldId);
const values = (taskId, fieldId) => field(taskId, fieldId).options.map((o) => o.value);

describe('select options', () => {
  it('are all { value, label } objects', () => {
    const bad = BBOS_TASK_DEFINITIONS.flatMap((d) => d.fields
      .filter((f) => f.type === 'select' && !(f.options || []).every((o) => o && typeof o === 'object' && o.value && o.label))
      .map((f) => `${d.id}.${f.id}`));
    expect(bad).toEqual([]);
  });

  it('give the Constraint Gate stable values', () => {
    expect(values('OPT-S5', 'g72Check')).toEqual(['no', 'yes']);
    expect(values('OPT-A3', 'depletionType')).toEqual(['typeA', 'typeB', 'typeC']);
    expect(values('OPT-A3', 'guardrailsConfirmation')).toEqual(['yes', 'no']);
  });
});

describe('IC checklists', () => {
  const checksOk = (f, code) => {
    expect(f).toMatchObject({ type: 'icAssets', code });
    expect(f.checks).toHaveLength(5);
    f.checks.forEach((c, i) => {
      expect(c.label.startsWith(`${code}-${i + 1}:`)).toBe(true);
      expect(c.options.map((o) => o.value)).toEqual(['pass', 'fail']);
    });
  };

  it('OUT-IC lists every asset checked, each with its five checks', () => {
    checksOk(field('OUT-IC', 'icOutAssets'), 'IC-OUT');
  });

  it('DEL-A4 lists every IC-OFR and IC-DEL asset, each with its five checks', () => {
    checksOk(field('DEL-A4', 'icOfrAssets'), 'IC-OFR');
    checksOk(field('DEL-A4', 'icDelAssets'), 'IC-DEL');
  });

  it('no longer renders the single-asset fields (their stored answers are read through)', () => {
    for (const id of ['icOutAsset', 'icOut1', 'icOut5']) expect(field('OUT-IC', id)).toBeUndefined();
    for (const id of ['icOfrAsset', 'icOfr1', 'icDelAsset', 'icDel5']) expect(field('DEL-A4', id)).toBeUndefined();
  });

  it('keeps the old free-text IC fields as notes', () => {
    expect(field('DEL-A4', 'icOfrChecks')).toMatchObject({ type: 'textarea' });
    expect(field('DEL-A4', 'icDelChecks')).toMatchObject({ type: 'textarea' });
  });
});
