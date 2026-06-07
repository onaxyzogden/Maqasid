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
    const crd = vm.stages.find((s) => s.id === "CRD");
    // CRD-S3 strong (5) + CRD-V1 four passes (20) = 25/25 → QUALIFIED → passed.
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
