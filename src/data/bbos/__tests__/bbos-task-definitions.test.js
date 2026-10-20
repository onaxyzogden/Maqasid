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
  it('OUT-IC names the asset it certifies', () => {
    expect(field('OUT-IC', 'icOutAsset')).toMatchObject({ type: 'text' });
  });

  it('DEL-A4 has five pass/fail IC-OFR and five IC-DEL checks, each with its asset', () => {
    for (const p of ['icOfr', 'icDel']) {
      expect(field('DEL-A4', `${p}Asset`)).toMatchObject({ type: 'text' });
      for (const n of [1, 2, 3, 4, 5]) expect(values('DEL-A4', `${p}${n}`)).toEqual(['pass', 'fail']);
    }
  });

  it('keeps the old free-text IC fields as notes', () => {
    expect(field('DEL-A4', 'icOfrChecks')).toMatchObject({ type: 'textarea' });
    expect(field('DEL-A4', 'icDelChecks')).toMatchObject({ type: 'textarea' });
  });
});
