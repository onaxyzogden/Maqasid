import { FAITH_SEED_TASKS } from '../src/data/seed-tasks/faith-seed-tasks.js';
import { writeFileSync } from 'fs';

const OUTPUT_PATH = 'C:\\Users\\MY OWN AXIS\\Downloads\\MILOS Quran and Hadith Matrix - Faith - output.csv';

const SUBMODULE_DISPLAY = {
  shahada: 'Shahada',
  salah: 'Salah',
  zakah: 'Zakah',
  sawm: 'Sawm',
  hajj: 'Hajj',
};

const LEVEL_DISPLAY = {
  core: 'CORE',
  growth: 'GROWTH',
  excellence: 'EXCELLENCE',
};

function escCsv(val) {
  const s = String(val ?? '').trim();
  return '"' + s.replace(/"/g, '""') + '"';
}

function parseWhyHow(description) {
  if (!description) return { why: '', how: '' };
  const whyMatch = description.match(/\*\*Why\?\*\*([\s\S]*?)(?=\*\*How\?\*\*|$)/i);
  const howMatch = description.match(/\*\*How\?\*\*([\s\S]*?)$/i);
  return {
    why: (whyMatch?.[1] ?? '').trim(),
    how: (howMatch?.[1] ?? '').trim(),
  };
}

const rows = [['Submodule Name', 'Level', 'Task Name', 'Subtask Name', 'Subtask Why', 'Subtask How']];

for (const [key, tasks] of Object.entries(FAITH_SEED_TASKS)) {
  // key format: faith_{submodule}_{level}
  const parts = key.split('_'); // ['faith', 'shahada', 'core']
  const level = LEVEL_DISPLAY[parts[parts.length - 1]];
  const submoduleKey = parts.slice(1, -1).join('_');
  const submodule = SUBMODULE_DISPLAY[submoduleKey] ?? submoduleKey;

  for (const task of tasks) {
    for (const subtask of (task.subtasks ?? [])) {
      const { why, how } = parseWhyHow(subtask.description);
      rows.push([submodule, level, task.title, subtask.title, why, how]);
    }
  }
}

const csv = rows.map(row => row.map(escCsv).join(',')).join('\r\n');
writeFileSync(OUTPUT_PATH, '\uFEFF' + csv, 'utf8'); // BOM for Excel compatibility
console.log(`Written ${rows.length - 1} rows to ${OUTPUT_PATH}`);
