// BBOS Pipeline Dashboard - ADAPTER (the single data seam).
// ===========================================================================
// Components in pipeline-dashboard/ consume ONLY buildPipelineViewModel().
// They never touch live stores directly. This is deliberate: this is the one
// place that knows where data comes from. The redesigned dashboard components
// stay untouched regardless of whether this body is mock-fed or live-fed.
//
// STATUS (2026-06-04, follow-up wiring pass): the mappable concepts now read
// LIVE stores for stages IDY→RET — stage status/progress, governing attributes,
// per-stage duʿāʾ (incl. transliteration), spiritual notes, research/asset
// items (with real labels, G-labels, status, and field content), and the stage
// gate (label + verdict-derived status + gate checks). The no-live-equivalent
// concepts stay inert (mock seed): the OPT retrospective (metrics / Barakah
// Health Index / Restoration Mandate), typed execution-task forms, JSON
// stage-pack import, and most of the Approval Brief. See the ADR
// wiki/decisions/2026-06-04-bbos-redesigned-dashboard-adapter-shell.md.
//
// ---- THE CONTRACT (PipelineVM) --------------------------------------------
// PipelineVM = {
//   meta: { cycle, doneCount, totalStages, activeStageId, briefSections },
//   stages: StageVM[]
// }
// StageVM = {
//   id, order, code, n, name, tagline, layer, status, progress,
//   attributes: string[],
//   dua: { arabic, translit, meaning },
//   gate: { label, status },
//   execution: ExecVM,
//   brief: { identity: { project, operator, client } }
// }
// ExecVM = {
//   type,                                  // import_review | execution_tracking | field_execution | retrospective_dashboard
//   spiritualOpen: { attr, note },
//   spiritualGate: { attr, note },
//   researchItems: ItemVM[],
//   assetItems: ItemVM[],
//   executionTasks: TaskVM[] | undefined,  // execution-type stages only (inert this pass)
//   gateChecks: { id, label, passed }[] | undefined,
//   metrics | bhi | restorationItems       // retrospective (OPT) only — mock-fed
// }
// ItemVM = { id, taskType|null, label, glabel|null, status, desc, content|null }
//
// ---- LIVE SOURCES ---------------------------------------------------------
//   * BBOS_STAGES / getLayerForStage ......... stage list, order, layer
//   * project.bbosStage / project.bbosCycle .. active stage, cycle, status
//   * getBbosStageIslamic(id) ................ attributes, dua, spiritual notes
//   * getBbosTaskDefsByStage(id) ............. partition S/V/FP/PATCH -> research,
//                                              A/AF/IC -> asset
//   * tasks (bbosTaskType -> task) ........... label, glabel, content, status
//   * scoreStage(id, taskMap) ................ gate { status } + gate checks
// ===========================================================================

import { BBOS_STAGES, getLayerForStage } from "../../../../data/bbos/bbos-pipeline";
import { getBbosTaskDefsByStage } from "../../../../data/bbos/bbos-task-definitions";
import { getBbosStageIslamic } from "../../../../data/bbos/bbos-stage-islamic";
import { scoreStage } from "../../../../data/bbos/bbos-stage-score";

// ── Static domain constants (no live source) ───────────────────────────────
// Taglines and gate labels are not stored in BBOS_STAGES; they are fixed
// domain copy lifted from the approved mockup. Keyed by stage id.
const STAGE_TAGLINE = {
  IDY: "The honest beginning",
  CRD: "The honest foundation",
  STR: "Genuine seeing",
  OFR: "The covenant offer",
  OUT: "Outreach from tawakkul",
  SLS: "Discernment over closing",
  DEL: "Delivery as worship",
  RET: "Gratitude as ground",
  OPT: "Honest reckoning",
};

const STAGE_GATE_LABEL = {
  IDY: "Amanah Gate",
  CRD: "Amanah Gate",
  STR: "Truth-Gate Advisory",
  OFR: "Scope Map Review",
  OUT: "Scarcity Checkpoint",
  SLS: "Fit Call Gate",
  DEL: "Iḥsān Checklist",
  RET: "Ash-Shakūr Assessment",
  OPT: "Restoration Mandate",
};

// Approval-Brief left-nav section list (static UI scaffold — order + icons are
// fixed domain copy; each section's *content* is assembled live in buildBrief).
const BRIEF_SECTIONS = [
  { id: "project", label: "Project Identification", icon: "◈" },
  { id: "covenant", label: "Covenant Statement", icon: "⧁" },
  { id: "findings", label: "Key Findings", icon: "◉" },
  { id: "constraints", label: "Constraints & Dependencies", icon: "◐" },
  { id: "assets", label: "Assets Produced", icon: "◫" },
  { id: "gate", label: "Stage Decision", icon: "◆" },
  { id: "closing", label: "Stewardship Closing", icon: "◬" },
];

// ── OPT retrospective metric metadata (no live source for labels/desc) ───────
// Values come live from OPT task field-data; the display label/unit/desc are
// fixed domain copy. metrics → OPT-S1 Canonical Metrics; bhi → OPT-A2.
const OPT_METRICS = [
  { id: "CM1", taskId: "OPT-S1", field: "cm1OutreachConversion", unit: "%", label: "CM-1 · Qualified Outreach Conversion" },
  { id: "CM2", taskId: "OPT-S1", field: "cm2FitToClose", unit: "%", label: "CM-2 · Fit-to-Close Rate" },
  { id: "CM3", taskId: "OPT-S1", field: "cm3MilestoneCompletion", unit: "%", label: "CM-3 · Client Milestone Completion" },
  { id: "CM4", taskId: "OPT-S1", field: "cm4UnpromptedReferral", unit: "%", label: "CM-4 · Unprompted Referral Rate" },
];

const OPT_BHI = [
  { id: "BHI1", taskId: "OPT-A2", field: "bhi1ReferralRate", kind: "pct", label: "BHI-1 · Unprompted Referral Rate", desc: "Clients referring without being asked" },
  { id: "BHI2", taskId: "OPT-A2", field: "bhi2EnergyRating", kind: "ten", label: "BHI-2 · Operator Post-Work Energy", desc: "Operator energy after client work (1–10 avg)" },
  { id: "BHI3", taskId: "OPT-A2", field: "bhi3RightFitRatio", kind: "pct", label: "BHI-3 · Right-Fit Client Ratio", desc: "Clients who were genuinely the right fit" },
  { id: "BHI4", taskId: "OPT-A2", field: "bhi4DecisionClarity", kind: "pct", label: "BHI-4 · Decision Clarity Rate", desc: "Decisions made with conviction, not pressure" },
  { id: "BHI5", taskId: "OPT-A2", field: "bhi5AssetIntegrity", kind: "ratio", label: "BHI-5 · Asset Integrity Currency", desc: "Proof assets passing spot-checks" },
];

// Phrase shown under the BHI hero, keyed by the live OPT-A2 overall reading.
const BHI_READING_PHRASE = {
  ALIGNED: "Covenant aligned · Barakah indicators healthy",
  MONITORING: "Covenant sustained · Some indicators to monitor",
  INVESTIGATE: "Investigation triggered · Structural weaknesses to address",
};

// ── Factory classification (mirrors BbosFullDashboard) ──────────────────────
// Research: S, V, FP, PATCH. Asset: A, AF, IC. Default → research.
const ASSET_PREFIXES = new Set(["A", "AF", "IC"]);

function getSubLevelPrefix(subLevel) {
  if (!subLevel) return "OTHER";
  if (subLevel.startsWith("PATCH")) return "PATCH";
  if (subLevel.startsWith("AF"))  return "AF";
  if (subLevel.startsWith("IFB")) return "IFB";
  if (subLevel.startsWith("FP"))  return "FP";
  if (subLevel.startsWith("S"))   return "S";
  if (subLevel.startsWith("A"))   return "A";
  if (subLevel.startsWith("V"))   return "V";
  if (subLevel.startsWith("IC"))  return "IC";
  return "OTHER";
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function attrFraming(a) {
  if (!a) return { attr: "", note: "" };
  const title = a.title ? ` · ${a.title}` : "";
  return { attr: `${a.name}${title}`, note: a.body || "" };
}

function attrLabel(a) {
  const title = a.title ? ` · ${a.title}` : "";
  return `${a.name}${title}`;
}

/** Governing-attribute strings for a stage (live islamic data, with fallback). */
function attributesFor(stageId, stageMeta) {
  const islamic = getBbosStageIslamic(stageId);
  if (islamic?.attrs?.length) return islamic.attrs.map(attrLabel);
  // Fallback: split the BBOS_STAGES attrs string ("Al-Awwal · Al-Badi").
  if (stageMeta?.attrs) return stageMeta.attrs.split("·").map((s) => s.trim()).filter(Boolean);
  return [];
}

/** Per-stage duʿāʾ in the VM shape (translit comes from live `trans`). */
function duaFor(stageId) {
  const dua = getBbosStageIslamic(stageId)?.dua;
  if (!dua) return { arabic: "", translit: null, meaning: "" };
  return { arabic: dua.arabic || "", translit: dua.trans || null, meaning: dua.meaning || "" };
}

/** Join a task's non-empty field values into a readable content block. */
function buildContent(def, fieldData) {
  const parts = (def.fields || [])
    .map((f) => {
      const v = fieldData[f.id];
      if (v == null || String(v).trim() === "") return null;
      return `${f.label}: ${String(v).trim()}`;
    })
    .filter(Boolean);
  return parts.length ? parts.join("\n\n") : null;
}

/** Tri-state item status: filed (done) | in_review (has data) | pending. */
function itemFromDef(def, taskMap, doneColumnId) {
  const task = taskMap[def.id];
  const fieldData = task?.bbosFieldData || {};
  const isDone = !!task && (task.columnId === doneColumnId || task.completedAt);
  const hasData = Object.values(fieldData).some((v) => v != null && String(v).trim() !== "");
  const status = isDone ? "filed" : hasData ? "in_review" : "pending";
  return {
    id: def.id,
    taskType: def.id,
    label: def.label,
    glabel: task?.gLabel || null,
    status,
    desc: def.purpose || "",
    content: buildContent(def, fieldData),
  };
}

function partitionItems(defs, taskMap, doneColumnId) {
  const researchItems = [];
  const assetItems = [];
  for (const def of defs) {
    const item = itemFromDef(def, taskMap, doneColumnId);
    if (ASSET_PREFIXES.has(getSubLevelPrefix(def.subLevel))) assetItems.push(item);
    else researchItems.push(item);
  }
  return { researchItems, assetItems };
}

/** Gate status: complete→passed, available→pending, active→verdict-derived. */
function gateStatusFor(stageId, status, taskMap) {
  if (status === "complete") return "passed";
  if (status === "available") return "pending";
  const scored = scoreStage(stageId, taskMap);
  if (!scored) return "pending";
  if (scored.verdict === "QUALIFIED") return "passed";
  if (scored.verdict === "BLOCKED") return "pending";
  return "in_review"; // DEVELOPING / REVIEW NEEDED
}

/** Live ExecVM for the mappable stages (IDY→RET). Items are pre-partitioned. */
function buildLiveExecution(stageId, items, taskMap) {
  const attrs = getBbosStageIslamic(stageId)?.attrs || [];
  const scored = scoreStage(stageId, taskMap);
  const gateChecks = scored
    ? scored.signals.map((sig, i) => ({ id: `GC${i + 1}`, label: sig.label, passed: sig.pts >= 4 }))
    : [];
  return {
    type: "import_review",
    spiritualOpen: attrFraming(attrs[0]),
    spiritualGate: attrFraming(attrs[1] || attrs[0]),
    researchItems: items.researchItems,
    assetItems: items.assetItems,
    // executionTasks intentionally omitted — typed exec forms have no live model.
    gateChecks,
  };
}

// ── OPT retrospective (live) ─────────────────────────────────────────────────

/** Non-empty field value off a filed OPT task, or null. */
function optField(taskMap, taskId, fieldId) {
  const fd = taskMap[taskId]?.bbosFieldData;
  if (!fd) return null;
  const v = fd[fieldId];
  if (v == null || String(v).trim() === "") return null;
  return v;
}

const clamp10 = (n) => Math.max(0, Math.min(10, n));
const round1 = (n) => Math.round(n * 10) / 10;

function toNum(v) {
  const n = parseFloat(String(v).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

/** Normalize a raw BHI value to a 0–10 scale for the bar (kind: pct|ten|ratio). */
function normalizeBhi(raw, kind) {
  if (raw == null) return null;
  if (kind === "ratio") {
    const m = String(raw).match(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
    if (m) {
      const num = parseFloat(m[1]);
      const den = parseFloat(m[2]);
      if (den) return clamp10((num / den) * 10);
    }
    const n = toNum(raw);
    return n == null ? null : clamp10(n);
  }
  const n = toNum(raw);
  if (n == null) return null;
  return kind === "pct" ? clamp10(n / 10) : clamp10(n); // ten → as-is
}

/**
 * Live retrospective ExecVM for OPT. metrics/bhi/restorationItems are empty
 * arrays until the underlying OPT tasks are filed (components empty-state).
 */
function buildOptExecution(taskMap, cycle) {
  const attrs = getBbosStageIslamic("OPT")?.attrs || [];

  const metrics = OPT_METRICS
    .map((m) => {
      const v = optField(taskMap, m.taskId, m.field);
      return v == null ? null : { id: m.id, label: m.label, value: `${v}${m.unit || ""}` };
    })
    .filter(Boolean);

  const bhi = OPT_BHI
    .map((b) => {
      const val = normalizeBhi(optField(taskMap, b.taskId, b.field), b.kind);
      return val == null ? null : { id: b.id, label: b.label, desc: b.desc, value: round1(val) };
    })
    .filter(Boolean);

  const reading = optField(taskMap, "OPT-A2", "bhiOverallReading");
  const heroVal = bhi.length ? round1(bhi.reduce((a, b) => a + b.value, 0) / bhi.length) : null;
  const bhiHero = heroVal != null || reading
    ? {
        cycle: cycle || 1,
        value: heroVal,
        reading: reading || null,
        phrase: reading ? (BHI_READING_PHRASE[String(reading).toUpperCase()] || null) : null,
      }
    : null;

  const restorationItems = ["action1", "action2", "action3"]
    .map((f, i) => {
      const v = optField(taskMap, "OPT-S4", f);
      return v == null ? null : { id: `RI${i + 1}`, label: `Action ${i + 1}`, action: String(v) };
    })
    .filter(Boolean);

  return {
    type: "retrospective_dashboard",
    spiritualOpen: attrFraming(attrs[0]),
    spiritualGate: attrFraming(attrs[1] || attrs[0]),
    metrics,
    bhi,
    bhiHero,
    restorationItems,
  };
}

// ── Approval Brief (live) ────────────────────────────────────────────────────

/**
 * Assemble the live Approval-Brief view-model for a stage. Every section is
 * derived from live data: covenant readiness (islamic data), findings + gate
 * (scoreStage), constraints (OPT hold-list vs unmet gate signals), and assets
 * (the stage's research/asset items). closing is a read-only synthesis.
 */
function buildBrief(stageId, status, taskMap, items, identity, nextStageN) {
  const scored = scoreStage(stageId, taskMap);
  const readiness = getBbosStageIslamic(stageId)?.readiness || null;
  const findings = scored
    ? scored.signals.map((sig, i) => ({ id: `F${i + 1}`, label: sig.label, pts: sig.pts, passed: sig.pts >= 4 }))
    : [];

  let constraints;
  if (stageId === "OPT") {
    constraints = {
      kind: "holdlist",
      holdItems: optField(taskMap, "OPT-S5", "holdItems"),
      g72Check: optField(taskMap, "OPT-S5", "g72Check"),
    };
  } else {
    constraints = { kind: "signals", unmet: findings.filter((f) => !f.passed) };
  }

  const verdict = scored?.verdict || null;
  const gate = {
    label: STAGE_GATE_LABEL[stageId] || "",
    verdict,
    status: gateStatusFor(stageId, status, taskMap),
    checks: findings,
    nextStageN,
    canAct: status === "active",
  };

  return {
    identity,
    covenant: { readiness },
    findings,
    constraints,
    assets: { researchItems: items.researchItems, assetItems: items.assetItems },
    gate,
    closing: { verdict, project: identity.project },
  };
}

/**
 * Build the dashboard view-model. The single seam between data and UI.
 *
 * @param {{ project?: object, bbosFilter?: string, tasks?: object[] }} [opts]
 *   project — the project record (bbosStage, bbosCycle, columns).
 *   tasks   — live tasks for this project (each with bbosTaskType + bbosFieldData).
 *   bbosFilter — reserved (role/stage filter); not used for VM assembly yet.
 * @returns {PipelineVM}
 */
export function buildPipelineViewModel(opts = {}) {
  const { project, tasks } = opts;

  // Tasks keyed by their task-definition id (bbosTaskType), matching the legacy
  // dashboard's taskMap and the scoring module's expectations.
  const taskMap = {};
  for (const t of (tasks || [])) {
    if (t?.bbosTaskType) taskMap[t.bbosTaskType] = t;
  }
  const doneColumnId = project?.columns?.find((c) => c.name === "Done")?.id ?? null;
  const cycle = project?.bbosCycle || 1;

  const activeId = project?.bbosStage || "IDY";
  let activeIdx = BBOS_STAGES.findIndex((s) => s.id === activeId);
  if (activeIdx < 0) activeIdx = 0;

  const briefIdentity = {
    project: project?.name || "—",
    operator: "Yousef A.",
    client: "TBD",
  };

  const stages = BBOS_STAGES.map((s, i) => {
    const status = i < activeIdx ? "complete" : i === activeIdx ? "active" : "available";

    const defs = getBbosTaskDefsByStage(s.id) || [];
    const doneCount = defs.filter((d) => {
      const t = taskMap[d.id];
      return t && (t.columnId === doneColumnId || t.completedAt);
    }).length;
    const progress = defs.length ? Math.round((doneCount / defs.length) * 100) : 0;

    // Research/asset items are needed by both the execution view and the brief.
    const items = partitionItems(defs, taskMap, doneColumnId);

    const execution = s.id === "OPT"
      ? buildOptExecution(taskMap, cycle)
      : buildLiveExecution(s.id, items, taskMap);

    const nextStageN = i + 1 < BBOS_STAGES.length ? String(i + 2).padStart(2, "0") : null;

    return {
      id: s.id,
      order: i,
      code: s.id,
      n: String(i + 1).padStart(2, "0"),
      name: (s.label || s.id).toUpperCase(),
      tagline: STAGE_TAGLINE[s.id] || "",
      layer: getLayerForStage(s.id),
      status,
      progress,
      attributes: attributesFor(s.id, s),
      dua: duaFor(s.id),
      gate: { label: STAGE_GATE_LABEL[s.id] || "", status: gateStatusFor(s.id, status, taskMap) },
      execution,
      brief: buildBrief(s.id, status, taskMap, items, briefIdentity, nextStageN),
    };
  });

  const doneCount = stages.filter((s) => s.status === "complete").length;
  const active = stages.find((s) => s.status === "active");

  return {
    meta: {
      cycle: project?.bbosCycle || 1,
      doneCount,
      totalStages: stages.length,
      activeStageId: active ? active.id : null,
      briefSections: BRIEF_SECTIONS,
    },
    stages,
  };
}

/**
 * @typedef {object} PipelineVM
 * @property {object} meta
 * @property {StageVM[]} stages
 */

/**
 * @typedef {object} StageVM
 * @property {string} id
 * @property {number} order
 * @property {string} status
 * @property {number} progress
 */
