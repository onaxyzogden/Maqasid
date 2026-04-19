// Applies graded Amanah tiers from artifacts/amanah-grading/<pillar>.jsonl
// into src/data/seed-tasks/<pillar>-seed-tasks.js.
//
// Inserts `tier: 'Tx',` as the first field of each SUBTASK object.
// Subtask objects are detected by walking character-by-character to
// track whether we are inside a `subtasks: [` array.
//
// Idempotent: if a subtask object already has a `tier:` field within
// its first ~200 chars, it is skipped (won't double-insert).
//
// Matching: by ordered position (Nth subtask in the file = Nth entry
// in the graded list). Task-level objects are skipped.
//
// Usage: node scripts/apply-amanah-tiers.mjs <pillar>

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PILLAR = process.argv[2];
if (!PILLAR) {
  console.error("usage: node scripts/apply-amanah-tiers.mjs <pillar>");
  process.exit(2);
}

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SEED_PATH = resolve(ROOT, `src/data/seed-tasks/${PILLAR}-seed-tasks.js`);
const JSONL_PATH = resolve(ROOT, `artifacts/amanah-grading/${PILLAR}.jsonl`);

if (!existsSync(JSONL_PATH)) {
  console.error(`[apply-tiers] no jsonl at ${JSONL_PATH}`);
  process.exit(1);
}

// Load grade rows ordered by (moduleKey, taskIndex, subtaskIndex).
const gradeRows = [];
{
  const rowMap = new Map();
  for (const line of readFileSync(JSONL_PATH, "utf-8").split("\n")) {
    if (!line.trim()) continue;
    let row;
    try { row = JSON.parse(line); } catch { continue; }
    if (!row.tier) continue;
    const key = `${row.moduleKey}|${row.taskIndex}|${row.subtaskIndex}`;
    rowMap.set(key, row);
  }

  // Reconstruct the canonical order from the seed module.
  const mod = await import(pathToFileURL(SEED_PATH).href);
  const exportKey = Object.keys(mod).find((k) => k.endsWith("_SEED_TASKS"));
  const seed = mod[exportKey];
  for (const [moduleKey, tasks] of Object.entries(seed)) {
    tasks.forEach((task, tIdx) => {
      (task.subtasks || []).forEach((_st, sIdx) => {
        const key = `${moduleKey}|${tIdx}|${sIdx}`;
        gradeRows.push(rowMap.get(key) || null); // null = not yet graded
      });
    });
  }
}

console.error(`[apply-tiers] ${PILLAR}: ${gradeRows.filter(Boolean).length} graded rows, ${gradeRows.length} total subtasks`);

// Parse the source file and locate subtask object openings.
// Strategy: scan for `subtasks:` keyword, then once inside the subtasks
// array, track bracket depth to detect each `{` that opens a subtask.
// When a subtask opening `{` is found on a line, inject `tier: 'Tx',`
// on the NEXT line (or after the `{` on the same line if inline style).

const src = readFileSync(SEED_PATH, "utf-8");
const lines = src.split("\n");

// Walk lines, tracking whether we are inside a subtasks array.
// State: inSubtasksArray (bool), subtaskDepth (bracket depth when we entered)
let inSubtasksArray = false;
let subtasksArrayDepth = 0; // bracket depth at the opening `[`
let bracketDepth = 0;       // current `[` depth
let braceDepth = 0;         // current `{` depth
let subtaskObjDepth = -1;   // brace depth at subtask object open
let subtaskIndex = 0;       // ordered index into gradeRows
let pendingInsert = false;  // insert `tier:` after this line
let pendingIndent = "";

const out = [];
let applied = 0;
let skipped = 0;

for (let li = 0; li < lines.length; li++) {
  const line = lines[li];
  const trimmed = line.trim();

  // Detect `subtasks:` followed by `[` on the same line.
  if (!inSubtasksArray && /\bsubtasks\s*:\s*\[/.test(line)) {
    inSubtasksArray = true;
    // Count brackets opened on this line to set our array depth.
    for (const ch of line) {
      if (ch === "[") bracketDepth++;
      else if (ch === "]") bracketDepth--;
      else if (ch === "{") braceDepth++;
      else if (ch === "}") braceDepth--;
    }
    subtasksArrayDepth = bracketDepth;
    subtaskObjDepth = -1;
    out.push(line);
    continue;
  }

  // Update bracket/brace depth for current line.
  let lineOpenBraces = 0;
  let lineCloseBraces = 0;
  for (const ch of line) {
    if (ch === "[") bracketDepth++;
    else if (ch === "]") bracketDepth--;
    else if (ch === "{") { braceDepth++; lineOpenBraces++; }
    else if (ch === "}") { braceDepth--; lineCloseBraces++; }
  }

  if (inSubtasksArray) {
    // Detect exit from subtasks array.
    if (bracketDepth < subtasksArrayDepth) {
      inSubtasksArray = false;
      subtaskObjDepth = -1;
    }

    // Detect new subtask object opening: a `{` at the start of an
    // element in our array (brace depth increases inside the array).
    // A subtask object starts when we see a `{` that isn't part of
    // a nested object inside an already-open subtask.
    if (inSubtasksArray && subtaskObjDepth < 0 && lineOpenBraces > 0) {
      // This line opens a new subtask.
      subtaskObjDepth = braceDepth; // after processing this line

      const row = gradeRows[subtaskIndex];
      subtaskIndex++;

      if (row) {
        const tierLiteral = `'${row.tier}'`;
        // Escape rationale for embedding as a JS string (use JSON.stringify then
        // strip outer double-quotes and convert to single-quoted literal).
        const rationaleEscaped = JSON.stringify(row.rationale || '')
          .slice(1, -1)           // strip outer "
          .replace(/\\"/g, '"')   // unescape \" → "
          .replace(/'/g, "\\'");  // escape ' → \'
        const rationaleLiteral = `'${rationaleEscaped}'`;

        // Check if `tier:` already present in this line or the next 10 lines.
        const lookahead = lines.slice(li, li + 10).join("\n");
        if (/\btier\s*:/.test(lookahead)) {
          // Already has tier — skip.
          skipped++;
          out.push(line);
        } else {
          const indentMatch = line.match(/^(\s*)/);
          const indent = indentMatch ? indentMatch[1] + "  " : "          ";

          out.push(line);
          out.push(`${indent}tier: ${tierLiteral},`);
          out.push(`${indent}amanahRationale: ${rationaleLiteral},`);
          applied++;
          continue;
        }
      } else {
        // No grade yet for this subtask — leave as-is.
        out.push(line);
      }
      continue;
    }

    // Detect subtask object close.
    if (subtaskObjDepth > 0 && braceDepth < subtaskObjDepth) {
      subtaskObjDepth = -1;
    }
  }

  out.push(line);
}

const result = out.join("\n");
writeFileSync(SEED_PATH, result, "utf-8");
console.error(`[apply-tiers] ${PILLAR}: applied=${applied}, skipped=${skipped}, ungraded=${gradeRows.filter(r => !r).length}`);
