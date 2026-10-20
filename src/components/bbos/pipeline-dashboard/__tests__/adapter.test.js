// Contract guard for the BBOS pipeline-dashboard adapter (mock → live pass).
// buildPipelineViewModel is a pure function: a synthetic project + tasks must
// yield a VM whose shape the redesigned dashboard components depend on.
import { describe, it, expect } from "vitest";
import { buildPipelineViewModel } from "../adapter/bbos-dashboard-adapter";
import { BBOS_STAGES } from "../../../../data/bbos/bbos-pipeline";
import { getBbosStageIslamic } from "../../../../data/bbos/bbos-stage-islamic";

const DONE_COL = "col-done";

// A project sitting at CRD (order 1): IDY complete, CRD active, rest available.
const project = {
  id: "proj-test",
  name: "Test Project",
  bbosStage: "CRD",
  bbosCycle: 2,
  columns: [
    { id: "col-todo", name: "To Do" },
    { id: DONE_COL, name: "Done" },
  ],
};

// Synthetic tasks: CRD scores 100% (QUALIFIED) via CRD-S3 + CRD-V1.
const tasks = [
  { bbosTaskType: "CRD-S3", columnId: DONE_COL, bbosFieldData: { overallProofStrength: "strong" } },
  {
    bbosTaskType: "CRD-V1",
    columnId: DONE_COL,
    gLabel: "G1",
    bbosFieldData: {
      gateARegulatory: "pass",
      gateBMarketFit: "pass",
      gateCCompetenceProof: "pass",
      gateDProvenDemand: "pass",
    },
  },
  // An OFR asset task with field data but not done → status in_review.
  { bbosTaskType: "OFR-A1", gLabel: "G1", bbosFieldData: { promiseGLabel: "G1" } },
];

const vm = buildPipelineViewModel({ project, bbosFilter: "all", tasks });

describe("buildPipelineViewModel — contract", () => {
  it("returns meta + 9 stages keyed to BBOS_STAGES", () => {
    expect(vm.meta).toBeTruthy();
    expect(vm.meta.cycle).toBe(2);
    expect(vm.meta.totalStages).toBe(9);
    expect(vm.meta.activeStageId).toBe("CRD");
    expect(Array.isArray(vm.meta.briefSections)).toBe(true);
    expect(vm.stages.map((s) => s.id)).toEqual(BBOS_STAGES.map((s) => s.id));
  });

  it("every stage carries all required keys", () => {
    for (const s of vm.stages) {
      expect(s).toMatchObject({
        id: expect.any(String),
        order: expect.any(Number),
        code: s.id,
        n: expect.any(String),
        name: expect.any(String),
        tagline: expect.any(String),
        layer: expect.any(String),
        status: expect.stringMatching(/^(complete|active|available)$/),
        progress: expect.any(Number),
      });
      expect(Array.isArray(s.attributes)).toBe(true);
      expect(s.dua).toHaveProperty("arabic");
      expect(s.dua).toHaveProperty("translit");
      expect(s.dua).toHaveProperty("meaning");
      expect(s.gate).toHaveProperty("label");
      expect(s.gate).toHaveProperty("status");
      expect(s.execution).toBeTruthy();
      expect(s.brief.identity.project).toBe("Test Project");
    }
  });

  it("derives complete/active/available from the active stage index", () => {
    const byId = Object.fromEntries(vm.stages.map((s) => [s.id, s]));
    expect(byId.IDY.status).toBe("complete"); // order 0 < 1
    expect(byId.CRD.status).toBe("active");   // order 1 === 1
    expect(byId.STR.status).toBe("available"); // order 2 > 1
    expect(byId.OPT.status).toBe("available");
  });

  it("gate.status tracks the score verdict for the active stage", () => {
    // CRD-S3 strong (5) + CRD-V1 four passes (20) = 25/25 → QUALIFIED. With no
    // FP-02 rubric the Amanah Gate is incomplete, so the strip reads pending.
    expect(vm.stages.find((s) => s.id === "CRD").gate.status).toBe("pending");
    // Once the named gates are clear, the score decides: passed.
    const clean = {
      q1ProofVerifiable: "yes", q2RegulatoryVerifiable: "yes", q3UnverifiableClaims: "no", q4RunwaySufficient: "yes",
      q5RegulatoryMisuse: "no", q6GoalAlignment: "yes", q7EnergyAversion: "no", q8FalseInformation: "no",
      q9ScopeUnderstanding: "yes", q10CapacityRealistic: "yes",
    };
    const cleared = buildPipelineViewModel({
      project,
      tasks: [
        ...tasks.filter((t) => t.bbosTaskType !== "CRD-V1"),
        { ...tasks[1], bbosFieldData: { ...tasks[1].bbosFieldData, overallViability: "viable" } },
        { bbosTaskType: "CRD-FP02", columnId: DONE_COL, bbosFieldData: clean },
        { bbosTaskType: "CRD-V3", columnId: DONE_COL, bbosFieldData: { clearedCandidates: "Halal food co-ops, Ontario" } },
      ],
    });
    const crd = cleared.stages.find((s) => s.id === "CRD");
    expect(crd.gate.status).toBe("passed");
    expect(crd.gate.label).toBe("Amanah Gate");
  });

  it("partitions research vs asset items by sub-level prefix", () => {
    const ofr = vm.stages.find((s) => s.id === "OFR");
    const researchIds = ofr.execution.researchItems.map((i) => i.taskType);
    const assetIds = ofr.execution.assetItems.map((i) => i.taskType);
    expect(researchIds).toContain("OFR-S1"); // S → research
    expect(assetIds).toContain("OFR-A1");    // A → asset
    expect(researchIds).not.toContain("OFR-A1");
    // The OFR-A1 task has field data but is not Done → in_review.
    const a1 = ofr.execution.assetItems.find((i) => i.taskType === "OFR-A1");
    expect(a1.status).toBe("in_review");
    expect(a1.glabel).toBe("G1");
  });

  it("populates dua.translit from the live transliteration field", () => {
    const idy = vm.stages.find((s) => s.id === "IDY");
    expect(idy.dua.translit).toBe(getBbosStageIslamic("IDY").dua.trans);
    expect(idy.dua.translit).toBeTruthy();
  });

  it("OPT retrospective is live and empty-states when its tasks are unfilled", () => {
    const opt = vm.stages.find((s) => s.id === "OPT");
    expect(opt.execution.type).toBe("retrospective_dashboard");
    // No OPT-S1/A2/S4 tasks in this project → clean empty arrays + null hero.
    expect(opt.execution.metrics).toEqual([]);
    expect(opt.execution.bhi).toEqual([]);
    expect(opt.execution.bhiHero).toBeNull();
    expect(opt.execution.restorationItems).toEqual([]);
  });

  it("gateChecks are derived from the stage score signals", () => {
    const crd = vm.stages.find((s) => s.id === "CRD");
    expect(crd.execution.gateChecks.length).toBeGreaterThan(0);
    for (const gc of crd.execution.gateChecks) {
      expect(gc).toMatchObject({ id: expect.any(String), label: expect.any(String), passed: expect.any(Boolean) });
    }
    // All CRD signals maxed → all checks passed.
    expect(crd.execution.gateChecks.every((gc) => gc.passed)).toBe(true);
  });
});

// A project sitting at OPT (the reckoning stage) with filled retrospective tasks.
const optProject = {
  id: "proj-opt",
  name: "OPT Project",
  bbosStage: "OPT",
  bbosCycle: 3,
  columns: [
    { id: "col-todo", name: "To Do" },
    { id: DONE_COL, name: "Done" },
  ],
};

const optTasks = [
  {
    bbosTaskType: "OPT-S1",
    columnId: DONE_COL,
    bbosFieldData: {
      cm1OutreachConversion: 72,
      cm2FitToClose: 64,
      cm3MilestoneCompletion: 88,
      cm4UnpromptedReferral: 31,
    },
  },
  {
    bbosTaskType: "OPT-A2",
    columnId: DONE_COL,
    bbosFieldData: {
      bhi1ReferralRate: 80,      // pct → 8.0
      bhi2EnergyRating: 8,       // ten → 8.0
      bhi3RightFitRatio: 75,     // pct → 7.5
      bhi4DecisionClarity: 90,   // pct → 9.0
      bhi5AssetIntegrity: "8/10", // ratio → 8.0
      bhiOverallReading: "ALIGNED",
    },
  },
  {
    bbosTaskType: "OPT-S4",
    columnId: DONE_COL,
    bbosFieldData: { action1: "Re-run the outreach cadence", action3: "Archive stale leads" },
  },
  {
    bbosTaskType: "OPT-S5",
    columnId: DONE_COL,
    bbosFieldData: { holdItems: "Two clients pending wali consent", g72Check: "No — score >= 7.0" },
  },
];

const optVm = buildPipelineViewModel({ project: optProject, bbosFilter: "all", tasks: optTasks });

describe("buildPipelineViewModel — OPT live retrospective + brief", () => {
  const opt = optVm.stages.find((s) => s.id === "OPT");

  it("maps OPT-S1 fields to value-only metrics (no benchmark/trend)", () => {
    expect(opt.execution.metrics).toHaveLength(4);
    const cm1 = opt.execution.metrics[0];
    expect(cm1.value).toBe("72%");
    expect(cm1).not.toHaveProperty("benchmark");
    expect(cm1).not.toHaveProperty("trend");
    expect(cm1).not.toHaveProperty("status");
  });

  it("normalizes OPT-A2 BHI fields to 0–10 and computes the hero average + reading", () => {
    expect(opt.execution.bhi).toHaveLength(5);
    const byId = Object.fromEntries(opt.execution.bhi.map((b) => [b.id, b.value]));
    // pct ÷10, ten as-is, ratio "8/10" → 8.
    expect(Object.values(byId)).toEqual([8, 8, 7.5, 9, 8]);
    expect(opt.execution.bhiHero.cycle).toBe(3);
    expect(opt.execution.bhiHero.value).toBe(8.1); // (8+8+7.5+9+8)/5
    expect(opt.execution.bhiHero.reading).toBe("ALIGNED");
  });

  it("derives restoration items from filed OPT-S4 actions only (no synth tags)", () => {
    // action1 + action3 filed, action2 blank → two items, in original order.
    expect(opt.execution.restorationItems).toHaveLength(2);
    const r = opt.execution.restorationItems[0];
    expect(r.label).toBe("Action 1");
    expect(r.action).toBe("Re-run the outreach cadence");
    expect(r).not.toHaveProperty("severity");
    expect(r).not.toHaveProperty("status");
  });

  it("brief carries live covenant readiness, findings, and assets", () => {
    expect(opt.brief.covenant.readiness).toBeTruthy();
    expect(Array.isArray(opt.brief.findings)).toBe(true);
    for (const f of opt.brief.findings) {
      expect(f).toMatchObject({ id: expect.any(String), label: expect.any(String), passed: expect.any(Boolean) });
    }
    expect(opt.brief.assets).toHaveProperty("researchItems");
    expect(opt.brief.assets).toHaveProperty("assetItems");
  });

  it("brief constraints use the OPT-S5 hold list", () => {
    expect(opt.brief.constraints.kind).toBe("holdlist");
    expect(opt.brief.constraints.holdItems).toBe("Two clients pending wali consent");
    expect(opt.brief.constraints.g72Check).toBe("No — score >= 7.0");
  });

  it("gate.canAct is true for the active OPT stage and false elsewhere", () => {
    expect(opt.brief.gate.canAct).toBe(true);
    const idy = optVm.stages.find((s) => s.id === "IDY"); // complete → not active
    expect(idy.brief.gate.canAct).toBe(false);
  });

  it("non-OPT stage constraints fall back to unmet gate signals", () => {
    const str = optVm.stages.find((s) => s.id === "STR");
    expect(str.brief.constraints.kind).toBe("signals");
    expect(Array.isArray(str.brief.constraints.unmet)).toBe(true);
  });
});

describe("buildPipelineViewModel — named gates on the brief", () => {
  const stage = (vm, id) => vm.stages.find((s) => s.id === id);
  const withFp02 = (fd) => [...tasks, { bbosTaskType: "CRD-FP02", columnId: DONE_COL, bbosFieldData: fd }];

  it("carries the stage's named-gate evaluation, held by a star disqualifier", () => {
    const vm = buildPipelineViewModel({ project, tasks: withFp02({ q5RegulatoryMisuse: "yes" }) });
    const named = stage(vm, "CRD").brief.gate.named;
    expect(named.status).toBe("blocked");
    expect(named.holding).toBe(true);
    expect(named.gates.map((g) => g.id)).toEqual(["amanah", "viability"]);
  });

  it("lists acknowledgements a clear gate needs, and gates whose conditions are not yet recorded", () => {
    const fp = {
      q1ProofVerifiable: "no", q2RegulatoryVerifiable: "no", q3UnverifiableClaims: "no", q4RunwaySufficient: "no",
      q5RegulatoryMisuse: "no", q6GoalAlignment: "yes", q7EnergyAversion: "no", q8FalseInformation: "no",
      q9ScopeUnderstanding: "yes", q10CapacityRealistic: "yes",
    };
    const named = stage(buildPipelineViewModel({ project, tasks: withFp02(fp) }), "CRD").brief.gate.named;
    expect(named.unrecorded.map((g) => g.id)).toContain("amanah");
    const logged = { ...project, bbosGateLog: [{ id: "c1", decision: "conditions", stageId: "CRD", cycle: 2, gateId: "amanah", resolverRole: "OW" }] };
    const after = stage(buildPipelineViewModel({ project: logged, tasks: withFp02(fp) }), "CRD").brief.gate.named;
    expect(after.unrecorded.map((g) => g.id)).not.toContain("amanah");
  });

  it("never shows the stage strip as passed while a named gate holds the stage", () => {
    // The score alone is QUALIFIED (see "gate.status tracks the score verdict").
    const vm = buildPipelineViewModel({ project, tasks: withFp02({ q5RegulatoryMisuse: "yes" }) });
    expect(stage(vm, "CRD").gate.status).toBe("pending");
    expect(stage(vm, "CRD").brief.gate.status).toBe("pending");
  });

  it("is empty for a stage the Factory docs name no gate at", () => {
    const named = stage(buildPipelineViewModel({ project, tasks }), "STR").brief.gate.named;
    expect(named.gates).toEqual([]);
    expect(named.holding).toBe(false);
    expect(named.acknowledgements).toEqual([]);
  });
});

describe("buildPipelineViewModel — per-asset IC checklists", () => {
  const P = ["pass", "pass", "pass", "pass", "pass"];
  const outTasks = [
    ...tasks,
    {
      bbosTaskType: "OUT-IC",
      bbosFieldData: {
        icOutAssets: [
          { asset: "Cold email v2", checks: P },
          { asset: "Launch post", checks: ["fail", "fail", "pass", "pass", "pass"] },
        ],
      },
    },
  ];
  const out = buildPipelineViewModel({ project, tasks: outTasks }).stages.find((s) => s.id === "OUT");

  it("shows each asset as readable text, never [object Object]", () => {
    const items = [...out.brief.assets.researchItems, ...out.brief.assets.assetItems];
    const ic = items.find((i) => i.taskType === "OUT-IC");
    expect(ic.status).toBe("in_review");
    expect(ic.content).toContain("Cold email v2: passed");
    expect(ic.content).toContain("Launch post: NO-SHIP (failed IC-OUT-1, IC-OUT-2)");
    expect(ic.content).not.toContain("[object Object]");
  });

  it("passes the per-asset results to the Named gates panel", () => {
    const g = out.brief.gate.named.gates.find((x) => x.id === "baseline");
    expect(g.status).toBe("blocked");
    expect(g.assets.map((a) => [a.asset, a.verdict])).toEqual([["Cold email v2", "pass"], ["Launch post", "noship"]]);
  });
});
