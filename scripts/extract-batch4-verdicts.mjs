import fs from "node:fs";
import path from "node:path";

const dir = "tasks";
const files = fs.readdirSync(dir).filter(f => f.startsWith("B4-") && f.endsWith(".json"));
const results = [];
for (const f of files.sort()) {
  const slug = f.replace(/^B4-/, "").replace(/\.json$/, "");
  let raw = fs.readFileSync(path.join(dir, f), "utf8");
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  let parsed = null, verdict = null, error = null;
  try {
    parsed = JSON.parse(raw);
    const ans = parsed?.answer ?? "";
    if (!ans || ans.trim() === "") { error = "empty"; }
    else {
      const m = ans.match(/```(?:json)?\s*([\s\S]*?)```/);
      const inner = m ? m[1].trim() : ans.trim();
      try {
        verdict = JSON.parse(inner);
      } catch (e) {
        error = "no-json: " + ans.slice(0, 80).replace(/\s+/g, " ");
      }
    }
  } catch (e) {
    error = "parse-fail: " + e.message;
  }
  results.push({ slug, verdict, error });
}

console.log("PROBES:", results.length);
console.log();

const defects = [];
const advisory = [];
const ok = [];
const failed = [];
for (const r of results) {
  if (r.error) { failed.push(r); continue; }
  const v = r.verdict;
  if (!v || typeof v.ref_ok === "undefined") { failed.push({ ...r, error: "no-ref_ok" }); continue; }
  if (v.ref_ok === false) {
    defects.push(r);
  } else if (v.relevance === "unrelated") {
    advisory.push(r);
  } else {
    ok.push(r);
  }
}

console.log(`OK (ref_ok=true, relevance!=unrelated): ${ok.length}`);
console.log(`ADVISORY (ref_ok=true, relevance=unrelated): ${advisory.length}`);
for (const r of advisory) console.log(`  ${r.slug}  rel=${r.verdict.relevance}  summary=${(r.verdict.summary||"").slice(0,80)}`);
console.log();
console.log(`DEFECTS (ref_ok=false): ${defects.length}`);
for (const r of defects) console.log(`  ${r.slug}  correct=${r.verdict.correct_ref}  summary=${(r.verdict.summary||"").slice(0,100)}`);
console.log();
console.log(`FAILED/TIMEOUT: ${failed.length}`);
for (const r of failed) console.log(`  ${r.slug}  ${r.error}`);
