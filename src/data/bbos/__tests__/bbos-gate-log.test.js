// Contract guard for the BBOS gate-decision record (project.bbosGateLog).
import { describe, it, expect } from "vitest";
import { buildGateEntry, appendGateEntry, gateEntriesForStage, openConditions } from "../bbos-gate-log";
import { buildPipelineViewModel } from "../../../components/bbos/pipeline-dashboard/adapter/bbos-dashboard-adapter";

const project = { id: "p1", bbosEnabled: true, bbosStage: "CRD", bbosCycle: 2, columns: [] };

describe("buildGateEntry", () => {
  it("records a proceed with its basis, target stage and cycle", () => {
    const e = buildGateEntry(project, {
      stageId: "CRD", decision: "proceed", basis: "  All signals pass.  ", toStageId: "STR",
      closingNote: "", by: "OW",
    });
    expect(e.id).toMatch(/^gd_/);
    expect(e).toMatchObject({
      stageId: "CRD", decision: "proceed", basis: "All signals pass.", toStageId: "STR",
      cycle: 2, by: "OW", closingNote: null, conditions: null, reasonId: null,
    });
    expect(Number.isNaN(Date.parse(e.at))).toBe(false);
  });

  it("records a cycle close in the closing cycle, pointing at Identity", () => {
    const e = buildGateEntry(project, { stageId: "OPT", decision: "cycle", basis: "Reckoning complete.", toStageId: "CRD", reasonId: "riba" });
    expect(e).toMatchObject({ stageId: "OPT", decision: "cycle", cycle: 2, toStageId: "IDY", reasonId: null, conditions: null });
    expect(buildGateEntry(project, { stageId: "OPT", decision: "cycle", basis: "  " })).toBeNull();
  });

  it("keeps conditions only on a conditions decision, reason only on a halt", () => {
    const c = buildGateEntry(project, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "Close gap 2", reasonId: "riba" });
    expect(c.conditions).toBe("Close gap 2");
    expect(c.reasonId).toBeNull();
    const h = buildGateEntry(project, { stageId: "CRD", decision: "halt", basis: "b", reasonId: "riba", conditions: "x" });
    expect(h.reasonId).toBe("riba");
    expect(h.conditions).toBeNull();
  });

  it("refuses an empty basis, a missing stage, or an unknown decision", () => {
    expect(buildGateEntry(project, { stageId: "CRD", decision: "proceed", basis: "   " })).toBeNull();
    expect(buildGateEntry(project, { decision: "proceed", basis: "b" })).toBeNull();
    expect(buildGateEntry(project, { stageId: "CRD", decision: "maybe", basis: "b" })).toBeNull();
    expect(buildGateEntry(project, null)).toBeNull();
  });
});

describe("appendGateEntry", () => {
  it("appends without mutating, and returns the project unchanged when not loggable", () => {
    const once = appendGateEntry(project, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "c" });
    const twice = appendGateEntry(once, { stageId: "CRD", decision: "proceed", basis: "b2", toStageId: "STR" });
    expect(project.bbosGateLog).toBeUndefined();
    expect(once.bbosGateLog).toHaveLength(1);
    expect(twice.bbosGateLog.map((e) => e.decision)).toEqual(["conditions", "proceed"]);
    expect(appendGateEntry(project, { stageId: "CRD", decision: "proceed", basis: "" })).toBe(project);
  });
});

describe("gate log in the dashboard view-model", () => {
  it("exposes each stage's own entries on brief.gate.log, newest first", () => {
    let p = appendGateEntry(project, { stageId: "IDY", decision: "proceed", basis: "idy", toStageId: "CRD" });
    p = appendGateEntry(p, { stageId: "CRD", decision: "conditions", basis: "first", conditions: "c" });
    p = appendGateEntry(p, { stageId: "CRD", decision: "conditions", basis: "second", conditions: "c" });
    expect(gateEntriesForStage(p.bbosGateLog, "CRD").map((e) => e.basis)).toEqual(["second", "first"]);

    const vm = buildPipelineViewModel({ project: p, tasks: [] });
    const byId = Object.fromEntries(vm.stages.map((s) => [s.id, s]));
    expect(byId.CRD.brief.gate.log.map((e) => e.basis)).toEqual(["second", "first"]);
    expect(byId.IDY.brief.gate.log.map((e) => e.basis)).toEqual(["idy"]);
    expect(byId.STR.brief.gate.log).toEqual([]);
  });
});

describe("resolving conditions", () => {
  const withConditions = () => appendGateEntry(project, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "Close gap 2" });

  it("adds a resolved entry that points at the conditions entry and takes its stage and cycle", () => {
    const p = withConditions();
    const cond = p.bbosGateLog[0];
    const r = buildGateEntry({ ...p, bbosCycle: 3 }, {
      decision: "resolved", resolvesId: cond.id, basis: "  Gap 2 closed by the signed MoU.  ", stageId: "STR", by: "OW",
    });
    expect(r).toMatchObject({
      decision: "resolved", resolvesId: cond.id, stageId: "CRD", cycle: 2,
      basis: "Gap 2 closed by the signed MoU.", conditions: null, toStageId: null, reasonId: null, by: "OW",
    });
  });

  it("refuses a resolution without a basis, without a target, or aimed at a non-conditions entry", () => {
    const p = appendGateEntry(withConditions(), { stageId: "CRD", decision: "proceed", basis: "b", toStageId: "STR" });
    const [cond, proceed] = p.bbosGateLog;
    expect(buildGateEntry(p, { decision: "resolved", resolvesId: cond.id, basis: "  " })).toBeNull();
    expect(buildGateEntry(p, { decision: "resolved", resolvesId: "gd_missing", basis: "b" })).toBeNull();
    expect(buildGateEntry(p, { decision: "resolved", basis: "b" })).toBeNull();
    expect(buildGateEntry(p, { decision: "resolved", resolvesId: proceed.id, basis: "b" })).toBeNull();
  });

  it("refuses to resolve the same conditions twice, and never edits the original entry", () => {
    const p = withConditions();
    const cond = p.bbosGateLog[0];
    const once = appendGateEntry(p, { decision: "resolved", resolvesId: cond.id, basis: "done" });
    expect(once.bbosGateLog).toHaveLength(2);
    expect(once.bbosGateLog[0]).toBe(cond);
    expect(appendGateEntry(once, { decision: "resolved", resolvesId: cond.id, basis: "again" })).toBe(once);
  });
});

describe("openConditions", () => {
  it("lists this stage's unresolved conditions in this cycle, oldest first", () => {
    let p = appendGateEntry(project, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "first" });
    p = appendGateEntry(p, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "second" });
    p = appendGateEntry(p, { stageId: "IDY", decision: "conditions", basis: "b", conditions: "other stage" });
    p = appendGateEntry({ ...p, bbosCycle: 1 }, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "old cycle" });
    expect(openConditions(p.bbosGateLog, "CRD", 2).map((e) => e.conditions)).toEqual(["first", "second"]);

    const first = p.bbosGateLog[0];
    p = appendGateEntry(p, { decision: "resolved", resolvesId: first.id, basis: "closed" });
    expect(openConditions(p.bbosGateLog, "CRD", 2).map((e) => e.conditions)).toEqual(["second"]);
    expect(openConditions(p.bbosGateLog, "CRD", 1).map((e) => e.conditions)).toEqual(["old cycle"]);
    expect(openConditions(undefined, "CRD", 2)).toEqual([]);
  });

  it("is exposed on brief.gate.openConditions for the project's current cycle", () => {
    let p = appendGateEntry(project, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "open one" });
    p = appendGateEntry(p, { stageId: "CRD", decision: "conditions", basis: "b", conditions: "closed one" });
    p = appendGateEntry(p, { decision: "resolved", resolvesId: p.bbosGateLog[1].id, basis: "closed" });
    const vm = buildPipelineViewModel({ project: p, tasks: [] });
    const crd = vm.stages.find((s) => s.id === "CRD");
    expect(crd.brief.gate.openConditions.map((e) => e.conditions)).toEqual(["open one"]);
    expect(crd.brief.gate.log[0].decision).toBe("resolved");
  });
});
