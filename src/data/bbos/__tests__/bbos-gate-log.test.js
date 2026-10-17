// Contract guard for the BBOS gate-decision record (project.bbosGateLog).
import { describe, it, expect } from "vitest";
import { buildGateEntry, appendGateEntry, gateEntriesForStage } from "../bbos-gate-log";
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
