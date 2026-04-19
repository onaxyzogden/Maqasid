"""
Batch retrieval driver for MILOS grounding runtime.

For each subtask in the filter set (faith_shahada_core, skipping [0][0]):
  1. Ask Claude Scholar to propose 2 NotebookLM queries (Quran / Hadith).
  2. Parse the 2 queries out of the CS response.
  3. Issue both queries to Muslim Scholar.
  4. Save all three raw JSON outputs to artifacts/grounding-pilot/raw/.

Per-subtask budget: 1 CS call + 2 MS calls = 3 calls. Hard stop if CS parse fails
or MS returns an error 3 subtasks in a row.

Usage: python scripts/grounding-retrieve-batch.py
"""
from __future__ import annotations
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEUE = ROOT / "artifacts/grounding-pilot/faith-queue.json"
SEED = ROOT / "src/data/seed-tasks/faith-seed-tasks.js"
RAW = ROOT / "artifacts/grounding-pilot/raw"
RAW.mkdir(parents=True, exist_ok=True)

CS_ID = os.environ.get("MILOS_CS_ID", "5191ba7b-142c-436c-b967-86a5aa6d0f28")
MS_ID = os.environ.get("MILOS_MS_ID", "be921648-2088-4860-bdd8-283a5e7301f3")

PY = r"C:\Python314\python.exe"


def safe_id(id_path: str) -> str:
    s = id_path.replace(".", "-").replace("[", "-").replace("]", "-")
    while "--" in s:
        s = s.replace("--", "-")
    return s.strip("-")


MIN_OK_BYTES = 1024  # responses under this are auth/rate-limit error blobs


def _looks_like_error(outfile: Path) -> bool:
    """Treat <1KB files or those with top-level error:true as failures."""
    try:
        if outfile.stat().st_size < MIN_OK_BYTES:
            return True
        d = json.loads(outfile.read_text(encoding="utf-8"))
        if isinstance(d, dict) and d.get("error") is True:
            return True
    except Exception:
        return True
    return False


def run_ask(notebook_id: str, query: str, outfile: Path) -> bool:
    """Invoke notebooklm ask with exponential backoff on rate limits.

    Retries up to 3 times on rate-limit errors with 30s, 90s, 180s delays.
    Always sleeps 5s after a successful call to pace the API.
    Deletes garbage output files so they don't masquerade as successful caches.
    """
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"
    alt_home = os.environ.get("MILOS_NOTEBOOKLM_HOME")
    if alt_home:
        env["NOTEBOOKLM_HOME"] = alt_home

    delays = [30, 90, 180]  # backoff for up to 3 retries
    for attempt in range(len(delays) + 1):
        try:
            with open(outfile, "wb") as f:
                proc = subprocess.run(
                    [PY, "-m", "notebooklm", "ask", "--notebook", notebook_id, "--json", query],
                    stdout=f,
                    stderr=subprocess.STDOUT,
                    env=env,
                    timeout=300,
                )
            success = proc.returncode == 0 and not _looks_like_error(outfile)
            if success:
                time.sleep(5)  # pacing between calls
                return True
            # Delete the garbage so skip-if-exists doesn't trip next run
            try:
                outfile.unlink()
            except Exception:
                pass
            if attempt < len(delays):
                delay = delays[attempt]
                print(f"  retry {attempt + 1}/{len(delays)} in {delay}s (rate-limited/error)", file=sys.stderr)
                time.sleep(delay)
            else:
                return False
        except Exception as e:
            print(f"  ERROR running ask: {e}", file=sys.stderr)
            try:
                outfile.unlink()
            except Exception:
                pass
            if attempt < len(delays):
                time.sleep(delays[attempt])
            else:
                return False
    return False


def parse_cs_queries(cs_file: Path) -> list[str] | None:
    try:
        d = json.loads(cs_file.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"  CS parse error: {e}", file=sys.stderr)
        return None
    ans = d.get("answer", "")
    # Look for a <queries>...</queries> block first
    m = re.search(r"<queries>(.*?)</queries>", ans, re.DOTALL | re.IGNORECASE)
    block = m.group(1) if m else ans
    # Extract numbered lines "1. ..." "2. ..."
    lines = re.findall(r"^\s*(\d+)[\.\)]\s+(.+?)$", block, re.MULTILINE)
    qs = [ln[1].strip() for ln in lines if ln[1].strip()]
    # Dedupe while preserving order, take first 2
    seen = set()
    out = []
    for q in qs:
        if q not in seen:
            seen.add(q)
            out.append(q)
        if len(out) == 2:
            break
    return out if len(out) == 2 else None


def main():
    queue = json.loads(QUEUE.read_text(encoding="utf-8"))
    subtasks = [s for s in queue["subtasks"] if s["moduleKey"] == "faith_shahada_core"]
    subtasks = [s for s in subtasks if not (s["taskIndex"] == 0 and s["subtaskIndex"] == 0)]
    print(f"Processing {len(subtasks)} subtasks.")

    consecutive_failures = 0
    for i, s in enumerate(subtasks, 1):
        sid = safe_id(s["idPath"])
        cs_file = RAW / f"{sid}-cs.json"
        q1_file = RAW / f"{sid}-ms-q1.json"
        q2_file = RAW / f"{sid}-ms-q2.json"

        # Skip if already done
        if cs_file.exists() and q1_file.exists() and q2_file.exists():
            print(f"[{i}/{len(subtasks)}] SKIP (already retrieved): {s['idPath']}")
            consecutive_failures = 0
            continue

        print(f"[{i}/{len(subtasks)}] {s['idPath']} :: {s['subtaskTitle'][:70]}")
        task_title = s["taskTitle"]
        sub_title = s["subtaskTitle"]

        cs_prompt = (
            f"For a MILOS subtask titled '{sub_title}' under the parent task '{task_title}' "
            f"(module: {s['moduleKey']}), propose exactly 2 NotebookLM queries to a "
            "Quran/Hadith primary-source corpus: (1) Quran-biased — name likely primary ayat "
            "that directly or contextually anchor this subtask; (2) Hadith-biased — name "
            "likely Sahih hadith (Bukhari/Muslim preferred) that directly or contextually "
            "anchor this subtask. Return the queries inside a <queries></queries> block as "
            "a numbered list, each one sentence, ready to paste into a retrieval system. "
            "Do NOT answer the queries — query formulation only."
        )

        if not cs_file.exists():
            ok = run_ask(CS_ID, cs_prompt, cs_file)
            if not ok:
                print("  CS call failed.", file=sys.stderr)
                consecutive_failures += 1
                if consecutive_failures >= 3:
                    print("STOP: 3 consecutive failures.", file=sys.stderr)
                    sys.exit(1)
                continue

        queries = parse_cs_queries(cs_file)
        if not queries:
            print(f"  Could not parse 2 queries from CS. Writing fallback.", file=sys.stderr)
            # Fallback: synthesize generic queries
            queries = [
                f"Retrieve primary Quranic verses (Arabic and English) that directly or contextually establish: {sub_title}",
                f"Retrieve Sahih hadith (Bukhari/Muslim preferred) with grade that directly or contextually establish: {sub_title}",
            ]

        if not q1_file.exists():
            ok = run_ask(MS_ID, queries[0], q1_file)
            if not ok:
                print("  MS Q1 failed.", file=sys.stderr)
                consecutive_failures += 1
                if consecutive_failures >= 3:
                    sys.exit(1)
                continue
        if not q2_file.exists():
            ok = run_ask(MS_ID, queries[1], q2_file)
            if not ok:
                print("  MS Q2 failed.", file=sys.stderr)
                consecutive_failures += 1
                if consecutive_failures >= 3:
                    sys.exit(1)
                continue

        # record queries alongside
        meta_file = RAW / f"{sid}-meta.json"
        meta_file.write_text(
            json.dumps(
                {
                    "idPath": s["idPath"],
                    "taskTitle": task_title,
                    "subtaskTitle": sub_title,
                    "csQueryPrompt": cs_prompt,
                    "extractedQueries": queries,
                    "retrievedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )
        consecutive_failures = 0
        print("  OK.")

    print("DONE.")


if __name__ == "__main__":
    main()
