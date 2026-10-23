// Gate status copy for the rail node and the Stage Overview strip.
import { describe, it, expect } from "vitest";
import { gateNodeIcon, gateStatusLabel, gateNodeTitle } from "../palette";

describe("gate status copy", () => {
  it("marks a held Amanah gate with a cross, naming the evidence, not a verdict", () => {
    expect(gateNodeIcon("amanah_hold")).toBe("✕");
    expect(gateStatusLabel("amanah_hold")).toBe("✕ Disqualifier on file");
    expect(gateNodeTitle({ label: "Amanah Gate", status: "amanah_hold" })).toBe("Amanah Gate: disqualifier on file");
  });

  it("keeps the existing statuses as they were", () => {
    expect(gateNodeIcon("passed")).toBe("✓");
    expect(gateStatusLabel("passed")).toBe("✓ Passed");
    expect(gateStatusLabel("in_review")).toBe("◐ In Review");
    expect(gateStatusLabel("pending")).toBe("○ Pending");
    expect(gateNodeTitle({ label: "Amanah Gate", status: "passed" })).toBeUndefined();
  });
});
