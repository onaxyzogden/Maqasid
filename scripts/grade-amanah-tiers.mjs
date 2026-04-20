// Amanah Gate tier grader — uses NotebookLM (Muslim Scholar corpus) as the
// grading oracle. For each subtask in a pillar, builds the structured prompt
// (Bayyinah / Qarina / Aspiration), submits it via `python -m notebooklm ask
// --new --json`, parses <grade> + <rationale>, and appends one row to
// artifacts/amanah-grading/<pillar>.jsonl.
//
// Resumable: skips subtasks already present in the jsonl.
// Hard stop after 3 consecutive failures.
//
// Usage: node scripts/grade-amanah-tiers.mjs <pillar>
//   e.g. node scripts/grade-amanah-tiers.mjs faith

import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, existsSync, appendFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const PILLAR = process.argv[2];
if (!PILLAR) {
  console.error("usage: node scripts/grade-amanah-tiers.mjs <pillar>");
  process.exit(2);
}

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SEED_PATH = resolve(ROOT, `src/data/seed-tasks/${PILLAR}-seed-tasks.js`);
const OUT_DIR = resolve(ROOT, "artifacts/amanah-grading");
const OUT_PATH = resolve(OUT_DIR, `${PILLAR}.jsonl`);
mkdirSync(OUT_DIR, { recursive: true });

const NOTEBOOK_ID =
  process.env.MILOS_MS_ID || "be921648-2088-4860-bdd8-283a5e7301f3";
const PY = process.env.PYTHON || "python";
const PACE_MS = Number(process.env.AMANAH_PACE_MS || 4000);
const MAX_CONSECUTIVE_FAILS = 3;

const PROMPT_TEMPLATE = `<system_role>
You are an expert evaluator grading the textual alignment between a specific subtask and a reference source.
</system_role>

<instructions>
Evaluate the provided <subtask> against the <source>. Grade the subtask using exactly one of the following three classifications by strictly following this sequential logic:

1. Check for Bayyinah: Does the source provide explicit, clear proof of the subtask? If yes, the grade is "Bayyinah".
2. Check for Qarina: If it is not Bayyinah, does the source provide a contextual indication or logical inference supporting the subtask? If yes, the grade is "Qarina".
3. Check for Aspiration: If the source provides neither clear proof nor contextual indication, the grade is "Aspiration".

Output your exact classification inside <grade></grade> tags.
Output a strict 1-sentence justification for your decision inside <rationale></rationale> tags.
</instructions>

<input>
<source>
{{INSERT_SOURCE_TEXT}}
</source>

<subtask>
{{INSERT_SUBTASK_TEXT}}
</subtask>
</input>`;

const GRADE_TO_TIER = { Bayyinah: "T1", Qarina: "T2", Aspiration: "T3" };

function buildPrompt(sources, title, description) {
  const source = (sources || "").trim() || "(no source provided)";
  const subtaskText = description
    ? `${title}\n\n${description}`
    : title;
  return PROMPT_TEMPLATE
    .replace("{{INSERT_SOURCE_TEXT}}", source)
    .replace("{{INSERT_SUBTASK_TEXT}}", subtaskText);
}

function parseGrade(text) {
  const g = text.match(/<grade>\s*([A-Za-z]+)\s*<\/grade>/i);
  const r = text.match(/<rationale>\s*([\s\S]*?)\s*<\/rationale>/i);
  if (!g) return null;
  const grade = g[1].trim();
  if (!GRADE_TO_TIER[grade]) return null;
  return {
    grade,
    tier: GRADE_TO_TIER[grade],
    rationale: r ? r[1].trim().replace(/\s+/g, " ") : "",
  };
}

function loadExistingIds() {
  if (!existsSync(OUT_PATH)) return new Set();
  const ids = new Set();
  for (const line of readFileSync(OUT_PATH, "utf-8").split("\n")) {
    if (!line.trim()) continue;
    try {
      ids.add(JSON.parse(line).idPath);
    } catch {}
  }
  return ids;
}

function callNotebook(prompt) {
  return new Promise((resolve) => {
    const env = { ...process.env };
    if (process.env.NOTEBOOKLM_HOME) env.NOTEBOOKLM_HOME = process.env.NOTEBOOKLM_HOME;
    const child = spawn(
      PY,
      ["-m", "notebooklm", "ask", "--notebook", NOTEBOOK_ID, "--json", prompt],
      { windowsHide: true, env },
    );
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d.toString("utf-8")));
    child.stderr.on("data", (d) => (stderr += d.toString("utf-8")));
    const timer = setTimeout(() => child.kill("SIGTERM"), 5 * 60 * 1000);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

function extractAnswerText(stdout) {
  try {
    const obj = JSON.parse(stdout);
    if (typeof obj === "string") return obj;
    // Stale conversation: NotebookLM returns empty answer with turn_number:0.
    // Treat as no-source → auto-fallback to T2 Qarina via sentinel.
    if (obj.answer === "" && obj.turn_number === 0) return "__STALE_CONVERSATION__";
    if (obj.answer) return obj.answer;
    if (obj.text) return obj.text;
    if (obj.response) return typeof obj.response === "string" ? obj.response : JSON.stringify(obj.response);
    return JSON.stringify(obj);
  } catch {
    return stdout;
  }
}

function isStaleFallback(answer) {
  return answer === "__STALE_CONVERSATION__";
}

async function main() {
  const seedUrl = pathToFileURL(SEED_PATH).href;
  const mod = await import(seedUrl);
  const exportKey = Object.keys(mod).find((k) => k.endsWith("_SEED_TASKS"));
  const seed = mod[exportKey];

  const all = [];
  for (const [moduleKey, tasks] of Object.entries(seed)) {
    tasks.forEach((task, tIdx) => {
      (task.subtasks || []).forEach((st, sIdx) => {
        all.push({
          idPath: `${PILLAR}.${moduleKey}[${tIdx}].subtasks[${sIdx}]`,
          moduleKey,
          taskIndex: tIdx,
          subtaskIndex: sIdx,
          taskTitle: task.title,
          title: st.title,
          description: st.description || "",
          sources: typeof st.sources === "string" ? st.sources : "",
        });
      });
    });
  }

  const done = loadExistingIds();
  const todo = all.filter((s) => !done.has(s.idPath));
  console.error(`[amanah-grade] ${PILLAR}: ${all.length} total, ${done.size} done, ${todo.length} remaining`);

  let fails = 0;
  let graded = 0;
  const startedAt = Date.now();

  for (const st of todo) {
    const prompt = buildPrompt(st.sources, st.title, st.description);
    const t0 = Date.now();
    const { code, stdout, stderr } = await callNotebook(prompt);
    const dt = Math.round((Date.now() - t0) / 1000);

    if (code !== 0 || !stdout) {
      fails += 1;
      console.error(`  [FAIL ${fails}/${MAX_CONSECUTIVE_FAILS}] ${st.idPath} (${dt}s) — exit ${code} — ${stderr.slice(0, 200)}`);
      if (fails >= MAX_CONSECUTIVE_FAILS) {
        console.error("[amanah-grade] hard stop: 3 consecutive failures.");
        process.exit(1);
      }
      await new Promise((r) => setTimeout(r, 30_000));
      continue;
    }

    const answer = extractAnswerText(stdout);

    // Stale conversation auto-fallback: assign T2 and move on without counting as failure.
    if (isStaleFallback(answer)) {
      graded += 1;
      const row = {
        idPath: st.idPath, moduleKey: st.moduleKey,
        taskIndex: st.taskIndex, subtaskIndex: st.subtaskIndex,
        subtaskTitle: st.title,
        grade: "Qarina", tier: "T2",
        rationale: "Fallback assignment — NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.",
        gradedAt: new Date().toISOString(), durationSec: dt,
      };
      appendFileSync(OUT_PATH, JSON.stringify(row) + "\n", "utf-8");
      console.error(`  [STALE-FB ${graded}] T2 Qarina     ${st.idPath} (${dt}s) — stale conversation fallback`);
      await new Promise((r) => setTimeout(r, PACE_MS));
      continue;
    }

    const parsed = parseGrade(answer);
    if (!parsed) {
      fails += 1;
      console.error(`  [PARSE-FAIL ${fails}/${MAX_CONSECUTIVE_FAILS}] ${st.idPath} (${dt}s) — answer head: ${answer.slice(0, 200)}`);
      if (fails >= MAX_CONSECUTIVE_FAILS) {
        console.error("[amanah-grade] hard stop: 3 consecutive parse failures.");
        process.exit(1);
      }
      continue;
    }

    fails = 0;
    graded += 1;
    const row = {
      idPath: st.idPath,
      moduleKey: st.moduleKey,
      taskIndex: st.taskIndex,
      subtaskIndex: st.subtaskIndex,
      subtaskTitle: st.title,
      grade: parsed.grade,
      tier: parsed.tier,
      rationale: parsed.rationale,
      gradedAt: new Date().toISOString(),
      durationSec: dt,
    };
    appendFileSync(OUT_PATH, JSON.stringify(row) + "\n", "utf-8");
    const elapsed = Math.round((Date.now() - startedAt) / 60000);
    console.error(`  [${graded}/${todo.length}] ${parsed.tier} ${parsed.grade.padEnd(10)} ${st.idPath} (${dt}s, total ${elapsed}m)`);

    await new Promise((r) => setTimeout(r, PACE_MS));
  }

  console.error(`[amanah-grade] done. graded ${graded}, wrote to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("[amanah-grade] fatal:", err);
  process.exit(1);
});
